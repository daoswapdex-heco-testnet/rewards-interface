import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Cookies from "js-cookie";
import store from "@/store";
import { getChainData } from "@/utils/utilities";
import { CHAIN_ID } from "@/constants";

const currentAccount = "daoswapdex-web3-account";

// 监听钱包事件 OK
async function subscribeProvider(provider) {
  if (!provider.on) {
    return;
  }
  provider.on("disconnect", () => {
    store.dispatch("web3/closeWallet");
  });
  provider.on("accountsChanged", async accounts => {
    store.dispatch("web3/changeAddress", accounts[0]);
    // window.location.reload();
  });
  provider.on("chainChanged", () => {
    // store.dispatch("web3/changeChainId", chainId);
    window.location.reload();
  });
}
// 获取网络配置 OK
function getNetwork() {
  getChainData(CHAIN_ID).network;
}
// 获取Provider配置 OK
function getProviderOptions() {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider
    }
  };
  return providerOptions;
}

// 初始化web3 OK
function initWeb3(provider) {
  const web3 = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber
      }
    ]
  });

  return web3;
}

// 实例化Web3Modal
function getWeb3Modal() {
  return new Web3Modal({
    network: getNetwork(),
    cacheProvider: true,
    providerOptions: getProviderOptions()
  });
}

/**
 * 初始化 web3
 * @returns new Web3
 */
export async function init() {
  const web3Modal = getWeb3Modal();
  const provider = await web3Modal.connect();
  await subscribeProvider(provider);
  const web3 = initWeb3(provider);
  // 存储全局变量
  store.dispatch("web3/changeWeb3", web3);
  store.dispatch("web3/changeWeb3Modal", web3Modal);
  store.dispatch("web3/changeProvider", provider);
  store.dispatch("web3/changeConnected", true);
  const accounts = await web3.eth.getAccounts();
  const address = Web3.utils.toChecksumAddress(accounts[0]);
  store.dispatch("web3/changeAddress", address);
  store.dispatch("web3/changeChainId", await web3.eth.chainId());
  return web3;
}

/**
 * 获取当前操作账号Token
 * @returns currentAccount
 */
export function getAccount() {
  return Cookies.get(currentAccount);
}

/**
 * 设置当前操作账号Token
 * @returns currentAccount
 */
export function setAccount(account) {
  return Cookies.set(currentAccount, account);
}

/**
 * 清空当前操作账号Token
 * @returns currentAccount
 */
export function removeAccount() {
  return Cookies.remove(currentAccount);
}

/**
 * 格式化Token
 * @returns token
 */
export function toChecksumAddress(token) {
  return Web3.utils.toChecksumAddress(token);
}

/**
 * 检查Token
 * @returns token
 */
export function checkAddressChecksum(token) {
  return Web3.utils.checkAddressChecksum(token);
}

/**
 * 获取合约
 * @returns contract
 */
export function getContract(contractJson, token, web3) {
  return getContractByABI(contractJson.abi, token, web3);
}

/**
 * 获取合约
 * @returns contract
 */
export function getContractByABI(contractABI, token, web3) {
  if (!token) {
    return new web3.eth.Contract(contractABI);
  } else {
    return new web3.eth.Contract(contractABI, toChecksumAddress(token));
  }
}

/**
 * 格式化Wei To Ether
 * @returns etherValue
 */
export function weiToEther(amount, web3) {
  return web3.utils.fromWei(amount, "ether");
  // const decimalsVal = decimals || 18;
  // return amount / Math.pow(10, decimalsVal);
}

/**
 * 格式化Ether To Wei
 * @returns weiValue
 */
export function etherToWei(amount, web3) {
  return web3.utils.toWei(amount.toString(), "ether");
}
