import Web3 from 'web3'
import { ethers } from "ethers";
import { task, types } from "hardhat/config";
import { expect } from "chai";
import {execSync} from 'child_process';
import dotenv from 'dotenv'
dotenv.config()

const transferAmount='0.2'
const displayWei = (x: { toString: () => string; }) => x.toString().padStart(50, " ")

task("tL2BIT", "transfer layer 2 BIT")
  .setAction(async () => {
    const l2RpcProvider = new ethers.providers.JsonRpcProvider(process.env.L2_URL!)
    const l2UserWallet = new ethers.Wallet(process.env.PRIVATE_KEY!, l2RpcProvider)
    const l2FinalizeUserWallet = new ethers.Wallet(process.env.FINALIZE_PRIVATE_KEY!, l2RpcProvider)

    const L2_BIT_Balance = await l2UserWallet.getBalance()
    const L2_F_BIT_Balance = await l2FinalizeUserWallet.getBalance()
    const nonce = await l2UserWallet.provider.getTransactionCount(l2UserWallet.address, "latest")

    const toUtx = {
      from:     l2UserWallet.address,
      to:       l2FinalizeUserWallet.address,
      value:    ethers.utils.parseEther(transferAmount).mul(8),
      nonce:    nonce,
      // gasLimit: ethers.utils.hexlify("0x100000"), // 100000
      gasPrice: 0,
    }

    const toUtxRes = await l2UserWallet.sendTransaction(toUtx)

    console.log('transferERC20 result:')
    console.log('          to user tx hash:', toUtxRes.hash)

    execSync('sleep 60');
    console.log("  user's balance before t:", `${displayWei(L2_BIT_Balance)} wei`)
    console.log("   user's balance after t:", `${displayWei(await l2UserWallet.getBalance())} wei`)
    console.log("f user's balance before t:", `${displayWei(L2_F_BIT_Balance)} wei`)
    console.log(" f user's balance after t:", `${displayWei(await l2FinalizeUserWallet.getBalance())} wei`)
  });