const supportedChains = [
  {
    name: "HECO Mainnet",
    short_name: "heco-mainnet",
    chain: "HECO",
    network: "heco-mainnet",
    chain_id: 128,
    network_id: 128,
    rpc_url: "https://http-mainnet-node.huobichain.com",
    native_currency: {
      symbol: "HT",
      name: "Huobi ECO Chain",
      decimals: "18",
      contractAddress: "",
      balance: ""
    }
  },
  {
    name: "HECO Testnet",
    short_name: "heco-testnet",
    chain: "HECO",
    network: "heco-testnet",
    chain_id: 256,
    network_id: 256,
    rpc_url: "https://http-testnet.hecochain.com",
    native_currency: {
      symbol: "HT",
      name: "Huobi ECO Chain",
      decimals: "18",
      contractAddress: "",
      balance: ""
    }
  }
];

export default supportedChains;
