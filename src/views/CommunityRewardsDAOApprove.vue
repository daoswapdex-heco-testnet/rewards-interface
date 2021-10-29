<template>
  <div class="fill-height">
    <v-container v-if="web3 && connected" class="fill-height">
      <v-row justify="center">
        <v-col md="6">
          <v-card class="fill-width">
            <v-card outlined>
              <v-card-title>
                <v-avatar size="24" class="mr-2">
                  <img :src="require('@/assets/logo.png')" alt="DAO" />
                </v-avatar>
                <span class="title font-weight-light">
                  DAO {{ $t("Available Amount") }}
                </span>
              </v-card-title>
              <v-card-text>
                <v-row align="center">
                  <v-col class="display-3" cols="12">
                    {{ accountAssets.rewardsBalance }}
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider v-if="accountAssets.rewardsBalance > 0"></v-divider>
              <v-card-actions class="justify-center">
                <v-btn
                  v-if="accountAssets.rewardsBalance > 0"
                  large
                  color="primary"
                  dark
                  width="80%"
                  @click="openClaimDialog"
                  :disabled="accountAssets.rewardsBalance <= 0"
                >
                  {{ $t("Claim") }}
                </v-btn>
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <v-card>
                    <form>
                      <v-card-title>
                        <span class="headline">{{ $t("Claim") }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-text-field
                          v-model="releaseAmount"
                          :error-messages="releaseAmountErrors"
                          :label="$t('ClaimForm.Claim Amount')"
                          required
                          @input="$v.releaseAmount.$touch()"
                          @blur="$v.releaseAmount.$touch()"
                          :autofocus="releaseAmountFocus"
                        ></v-text-field>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="closeClaimDialog">
                          {{ $t("Close") }}
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          class="white--text"
                          @click="submit"
                        >
                          {{ $t("Submit") }}
                        </v-btn>
                      </v-card-actions>
                    </form>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-card>
          <!-- 当前钱包账号 -->
          <v-card justify="center" class="fill-width mt-10">
            <v-card-title>
              <span class="title font-weight-light">
                {{ $t("Current Token Address") }}
              </span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row align="center">
                <v-col
                  class="body-1"
                  cols="12"
                  @click="handleCopy(address, $event)"
                >
                  <p>
                    {{ address }}
                    <v-icon>mdi-content-copy</v-icon>
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <!-- 官方说明 -->
          <v-card justify="center" class="fill-width mt-10">
            <v-card-title>
              <span class="title font-weight-light">
                {{ $t("Current Token Address") }}
              </span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row align="center">
                <v-col class="body-1" cols="12">
                  <p @click="handleCopy(DAOAddress, $event)">
                    DAO contract: {{ DAOAddress }}
                    <v-icon>mdi-content-copy</v-icon>
                  </p>
                  <p @click="handleCopy(DATAddress, $event)">
                    DAT contract: {{ DATAddress }}
                    <v-icon>mdi-content-copy</v-icon>
                  </p>
                  <p>
                    {{ $t("DAO is offical goverance token for DAOSWAP.") }}
                  </p>
                  <p>
                    {{
                      $t("DAT is PE credential to exchange DAO by staking DAT.")
                    }}
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <!-- 遮罩层 -->
          <v-overlay z-index="9999" opacity="0.7" :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>
          <!-- 提示层 -->
          <v-snackbar
            v-model="operationResult.snackbar"
            :color="operationResult.color"
            centered
            top
            timeout="4000"
          >
            {{ $t(operationResult.text) }}
          </v-snackbar>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row justify="center">
        <v-col md="6">
          <v-card justify="center" class="fill-width">
            <v-card-actions class="justify-center">
              <!-- 连接钱包 -->
              <v-btn
                class="mr-2"
                v-if="!connected"
                color="#93B954"
                block
                @click="onConnect"
              >
                {{ $t("Connect Wallet") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, decimal } from "vuelidate/lib/validators";
import clip from "@/utils/clipboard";
import {
  CommunityRewardsDAOApproveContractAddress,
  DATAddress,
  DAOAddress
} from "@/constants";
import { getContract, weiToEther, etherToWei } from "@/utils/web3";
// 引入合约 ABI 文件
import CommunityRewards from "@/constants/contractJson/CommunityRewardsApprove.json";

export default {
  name: "CommunityRewardsDAOApprove",
  mixins: [validationMixin],
  validations: {
    releaseAmount: { required, decimal }
  },
  data: () => ({
    loading: false,
    DATAddress,
    DAOAddress,
    dialog: false,
    releaseAmountFocus: false,
    releaseAmount: undefined,
    // 当前账户相关信息
    accountAssets: {
      rewardsBalance: 0
    },
    // 提示框
    operationResult: {
      color: "success",
      snackbar: false,
      text: `Hello`
    }
  }),
  created() {
    if (this.web3 && this.connected) {
      this.getAccountAssets();
    } else {
      this.onConnect();
    }
  },
  watch: {
    web3(web3) {
      if (web3) {
        this.getAccountAssets();
      }
    },
    address(address) {
      if (address) {
        this.getAccountAssets();
      }
    }
  },
  computed: {
    connected() {
      return this.$store.state.web3.connected;
    },
    web3() {
      return this.$store.state.web3.web3;
    },
    address() {
      return this.$store.state.web3.address;
    },
    releaseAmountErrors() {
      const errors = [];
      if (!this.$v.releaseAmount.$dirty) return errors;
      !this.$v.releaseAmount.decimal &&
        errors.push(this.$t("ClaimForm.Invalid amount"));
      !this.$v.releaseAmount.required &&
        errors.push(this.$t("ClaimForm.The amount is required"));

      const releaseAmountValue = parseFloat(this.$v.releaseAmount.$model);
      if (releaseAmountValue <= 0) {
        errors.push(this.$t("ClaimForm.The amount is be gt zero"));
      }
      if (releaseAmountValue > this.accountAssets.rewardsBalance) {
        errors.push(this.$t("ClaimForm.The amount exceeds the balance"));
      }
      return errors;
    }
  },
  methods: {
    // 连接钱包 OK
    onConnect() {
      this.$store.dispatch("web3/connect");
    },
    // 断开连接钱包 OK
    closeWallet() {
      this.$store.dispatch("web3/closeWallet");
    },
    // 复制地址
    handleCopy(text, event) {
      clip(text, event);
      this.operationResult.color = "success";
      this.operationResult.snackbar = true;
      this.operationResult.text = "Cope Success";
    },
    // 打开提取框
    openClaimDialog() {
      this.dialog = true;
      this.releaseAmountFocus = true;
      this.releaseAmount = this.accountAssets.rewardsBalance;
    },
    closeClaimDialog() {
      this.$v.$reset();
      this.releaseAmount = undefined;
      this.dialog = false;
    },
    // 获取账号信息
    async getAccountAssets() {
      this.loading = true;
      try {
        const contract = getContract(
          CommunityRewards,
          CommunityRewardsDAOApproveContractAddress,
          this.web3
        );
        const rewardsInfo = await contract.methods
          .getRewardsInfoByAccount()
          .call({ from: this.address });
        this.accountAssets.rewardsBalance = weiToEther(
          rewardsInfo.rewardsAmount,
          this.web3
        );
      } catch (error) {
        console.info(error);
      }
      this.loading = false;
    },
    // 提币 TODO OK
    submit() {
      if (this.$v.$invalid) {
        // error info
      } else {
        this.$v.$touch();
        this.loading = true;
        this.dialog = false;
        // 处理额度
        const releaseAmount = etherToWei(this.releaseAmount, this.web3);
        // 执行合约
        getContract(
          CommunityRewards,
          CommunityRewardsDAOApproveContractAddress,
          this.web3
        )
          .methods.release(releaseAmount)
          .send({ from: this.address })
          .then(() => {
            this.loading = false;
            this.getAccountAssets();
          })
          .catch(e => {
            this.loading = false;
            console.info(e);
          });
      }
    }
  }
};
</script>
