import { task } from "hardhat/config";
import { expect } from "chai";
import {execSync} from 'child_process';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { flatMap } from "lodash";
dotenv.config()

const transferAmount='0.2'

task("createWallet", "Create Wallet")
  .setAction(async () => {

    let tmpWallet = ethers.Wallet.createRandom();

    console.log("\taccount privateKey:", tmpWallet.privateKey)
    console.log("\t   account address:", (await tmpWallet.getAddress()).toString())
  });

task("qDE", "get deployer ETH")
  .setAction(async (hre) => {

    const l1RpcProvider = new ethers.providers.JsonRpcProvider(process.env.L1_URL!)
  
    const l1Wallet = new ethers.Wallet(process.env.DEPLOY_PRIVATE_KEY!, l1RpcProvider)
    console.log("\taddress:", l1Wallet.address)
    console.log("\tbalance:", (await l1Wallet.getBalance()).toString(), "Wei")
  });

task("transferETH", "transfer ETH to user from deployere with DEPLOY_PRIVATE_KEY")
  .setAction(async () => {
    const l1RpcProvider = new ethers.providers.JsonRpcProvider(process.env.L1_URL!)
  
    const l1Wallet = new ethers.Wallet(process.env.DEPLOY_PRIVATE_KEY!, l1RpcProvider)
    const l1UserWallet = new ethers.Wallet(process.env.PRIVATE_KEY!, l1RpcProvider)
    const l1FinalizeUserWallet = new ethers.Wallet(process.env.FINALIZE_PRIVATE_KEY!, l1RpcProvider)
    // l1 的服务未正常启动会报错
    const nonce = await l1Wallet.provider.getTransactionCount(l1Wallet.address, "latest")

    const toUtx = {
      from:     l1Wallet.address,
      to:       l1UserWallet.address,
      value:    ethers.utils.parseEther(transferAmount).mul(5),
      nonce:    nonce,
      // gasLimit: ethers.utils.hexlify("0x100000"), // 100000
      // gasPrice: gas_price,
    }

    const toFUtx = {
      from:     l1Wallet.address,
      to:       l1FinalizeUserWallet.address,
      value:    ethers.utils.parseEther(transferAmount),
      nonce:    nonce + 1,
      // gasLimit: ethers.utils.hexlify("0x100000"), // 100000
      // gasPrice: gas_price,
    }

    const toUtxRes = await l1Wallet.sendTransaction(toUtx)
    const toFUtxRes = await l1Wallet.sendTransaction(toFUtx)

    console.log('transferETH result:')
    console.log('         to user tx hash:', toUtxRes.hash)
    console.log('to finalize user tx hash:', toFUtxRes.hash)

    execSync('sleep 30');
    console.log("          user's balance:", (await l1UserWallet.getBalance()).toString(), "Wei")
    console.log(" finalize user's balance:", (await l1FinalizeUserWallet.getBalance()).toString(), "Wei")
  });

task("customAccounts", "echo custom accounts")
  .setAction(async () => {

    console.log('custom accounts:')    
    console.log('   transfer user:', ethers.utils.computeAddress(process.env.DEPLOY_PRIVATE_KEY!), process.env.DEPLOY_PRIVATE_KEY!)
    console.log('         l1 user:', ethers.utils.computeAddress(process.env.PRIVATE_KEY!), process.env.PRIVATE_KEY!)
    console.log('l1 finalize user:', ethers.utils.computeAddress(process.env.FINALIZE_PRIVATE_KEY!), process.env.FINALIZE_PRIVATE_KEY!)
  });