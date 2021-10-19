const getters = {
  fetching: state => state.web3.fetching,
  address: state => state.web3.address,
  web3: state => state.web3.web3,
  web3Modal: state => state.web3.web3Modal,
  provider: state => state.web3.provider,
  connected: state => state.web3.connected,
  chainId: state => state.web3.chainId,
  networkId: state => state.web3.networkId,
  assets: state => state.web3.assets
};
export default getters;
