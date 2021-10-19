import { init, getAccount, setAccount, toChecksumAddress } from "@/utils/web3";
import { removeAccount } from "../../utils/web3";
import { CHAIN_ID, NETWORK_ID } from "@/constants";

const state = {
  web3: null,
  address: getAccount(),
  web3Modal: undefined,
  provider: undefined,
  connected: false,
  chainId: CHAIN_ID,
  networkId: NETWORK_ID,
  assets: {}
};

const mutations = {
  SET_WEB3: (state, web3) => {
    state.web3 = web3;
  },
  SET_WEB3MODAL: (state, web3Modal) => {
    state.web3Modal = web3Modal;
  },
  SET_ADDRESS: (state, account) => {
    state.address = account;
  },
  SET_PROVIDER: (state, provider) => {
    state.provider = provider;
  },
  SET_CONNECTED: (state, connected) => {
    state.connected = connected;
  },
  SET_CHAINID: (state, chainId, networkId) => {
    state.chainId = chainId;
    state.networkId = networkId;
  },
  SET_ASSETS: (state, assets) => {
    state.assets = assets;
  }
};

const actions = {
  // 连接钱包
  async connect() {
    init();
  },
  // 切换网络
  changeWeb3({ commit }, web3) {
    commit("SET_WEB3", web3);
  },
  // 切换Web3Modal
  changeWeb3Modal({ commit }, web3Modal) {
    commit("SET_WEB3MODAL", web3Modal);
  },
  // 切换当前账号
  changeAddress({ commit }, account) {
    const address = account ? toChecksumAddress(account) : account;
    setAccount(address);
    commit("SET_CONNECTED", true);
    commit("SET_ADDRESS", address);
  },
  // 切换Provider
  changeProvider({ commit }, provider) {
    commit("SET_PROVIDER", provider);
  },
  // 切换连接状态
  changeConnected({ commit }, connected) {
    commit("SET_CONNECTED", connected);
  },
  // 切换链
  async changeChainId({ commit }, chainId) {
    const networkId = await state.web3.eth.net.getId();
    commit("SET_CHAINID", chainId, networkId);
  },
  // 切换当前账号
  changeAssets({ commit }, assets) {
    commit("SET_ASSETS", assets);
  },
  // 断开钱包链接
  async closeWallet({ commit }) {
    const web3 = state.web3;
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    state.web3Modal.clearCachedProvider();
    // 存储全局变量
    commit("SET_WEB3", null);
    commit("SET_WEB3MODAL", null);
    commit("SET_PROVIDER", null);
    commit("SET_CONNECTED", false);
    removeAccount();
    commit("SET_ADDRESS", "");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
