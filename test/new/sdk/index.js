const Web3 = require('web3')
const ethers = require("ethers")
const mantle = require("@mantleio/sdk")

const l1RpcProvider = new ethers.providers.JsonRpcProvider("https://goerli.davionlabs.com")
const l2RpcProvider = new ethers.providers.JsonRpcProvider("https://rpc.testnet.mantle.xyz")

const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const l1Wallet = new ethers.Wallet(privateKey,l1RpcProvider);
const l2Wallet = new ethers.Wallet(privateKey, l2RpcProvider);

const web3 = new Web3("wss://ws.testnet.mantle.xyz")

let crossChainMessenger = new mantle.CrossChainMessenger({
    l1ChainId: 5,
    l2ChainId: 5001,
    l1SignerOrProvider: l1Wallet,
    l2SignerOrProvider: l2Wallet
})

async function main() {

    // console.log(await mantle.getL1GasPrice(l2RpcProvider))

    // web3.eth.getBlockNumber().then(console.log)

    // web3.eth.getPendingTransactions().then(console.log)

    web3.eth.getTransactionCount("0x39e3DfB537f83EBce3b427691c45c129a459b497").then(console.log);
}

main();