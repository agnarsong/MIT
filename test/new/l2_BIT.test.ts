import { ethers } from "hardhat";
import { 
  getSigners, getContracts, getTokenContracts, 
  crossChainMessenger, displayWei, TestResult,
  AllBalances, Balances } from '../utils/setup'

import {execSync} from 'child_process';
import dotenv from "dotenv"
dotenv.config()

let tr: TestResult
let amount: string

describe('l2 BIT Test', function () {

  this.timeout(150000);
  this.slow(150000);
  
  before( async() => {
    amount = '1.234567'

    tr = {} as TestResult
    tr.ALLBALANCES = {
      BEFORE: {} as Balances,
      AFTER: {} as Balances
    } as AllBalances

    tr.SIGNERS = await getSigners();
    tr.CONTRACTS = await getContracts();
    tr.TOKEN_CONTRACTS = await getTokenContracts();
    tr.CROSS_CHAIN_MESSAGER = await crossChainMessenger()
  });

  describe('BIT transfer', () => {

    it('should get balance before', async () => {

      tr.ALLBALANCES.BEFORE.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()
      tr.ALLBALANCES.BEFORE.L2_R_BIT_Balance = await tr.SIGNERS.L2_RECEIVER_Wallet.getBalance()

      // l2用户的bit balance会被用于转账以及支付fee
      tr.ALLBALANCES.BEFORE.L2_BIT_Balance.should.be.at.least(0)
    })

    it('should transfer bit to receiver', async ()=>{

      tr.TX = await tr.SIGNERS.L2_Wallet.sendTransaction({
        from: tr.SIGNERS.L2_Wallet.address,
        to: tr.SIGNERS.L2_RECEIVER_Wallet.address,
        value: ethers.utils.parseUnits(amount),
        gasPrice: 0
      })

      // console.log("tx: ", tr.TX)
    })

    it('should get balance after', async () => {

      tr.ALLBALANCES.AFTER.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()
      tr.ALLBALANCES.AFTER.L2_R_BIT_Balance = await tr.SIGNERS.L2_RECEIVER_Wallet.getBalance()

      console.log(`\ttransfer result:`)

      console.log("\t         l2 BIT balance old: ", `${displayWei(tr.ALLBALANCES.BEFORE.L2_BIT_Balance)} wei`)
      console.log("\t         l2 BIT balance new: ", `${displayWei(tr.ALLBALANCES.AFTER.L2_BIT_Balance)} wei`)
      console.log("\tl2 Receiver BIT balance old: ", `${displayWei(tr.ALLBALANCES.BEFORE.L2_R_BIT_Balance)} wei`)
      console.log("\tl2 Receiver BIT balance new: ", `${displayWei(tr.ALLBALANCES.AFTER.L2_R_BIT_Balance)} wei`)
      console.log("\t         deposit BIT amount: ", `${displayWei(ethers.utils.parseUnits(amount))} wei`)

      console.log("\t           TX_HASH: ", tr.TX.hash)
    })
  })

});