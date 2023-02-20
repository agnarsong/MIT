import { ethers } from "hardhat";
import { 
  getSigners, getContracts, getTokenContracts, 
  crossChainMessenger, displayWei, TestResult,
  AllBalances, Balances } from '../utils/setup'

import {execSync} from 'child_process';
import dotenv from "dotenv"
import { Block } from "@ethersproject/providers";
dotenv.config()

let tr: TestResult
let amount: string
let lastest_blockNum: number
let b: Block

describe('同步测试', function () {

  this.timeout(150000);
  this.slow(150000);
  
  before(async() => {
    amount = '0.0005'

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

  describe('测试l1 l2的信息同步', () => {

    it('should get the lastest blocknum', async () => {

        lastest_blockNum = await tr.SIGNERS.L2_Wallet.provider.getBlockNumber()

        // console.log('lastest_blockNum: ', lastest_blockNum)

    })

    for (let i = 1; i < 6; i++) {
        it(`the ${i} time should get block by blocknum`, async () => {
            b = await tr.SIGNERS.L2_Wallet.provider.getBlock(i)
            // console.log('Block transactions 0: ', b.transactions)
            b.transactions.length.should.to.equal(1)
        })
        it(`the ${i} time should get tx by hash`, async () => {
            let tx = await tr.SIGNERS.L2_Wallet_BY_SDK.provider.getTransaction(b.transactions[0])

            console.log(await tx.wait())
            
        })
    }

    it.skip('should get balance after', async () => {

      tr.ALLBALANCES.AFTER.L1_ETH_Balance = await tr.SIGNERS.L1_Wallet.getBalance()
      tr.ALLBALANCES.AFTER.L2_ETH_Balance = await tr.TOKEN_CONTRACTS.L2_BIT_ETH_TOKEN.
        balanceOf(tr.SIGNERS.L2_Wallet.address)

      // console.log
      console.log(`\ttest result:`)
      console.log("\t    deposit txhash: ", tr.DEPOSIT_TX.hash, "\n")
      
      console.log(`\t    l1 balance old: ${displayWei(tr.ALLBALANCES.BEFORE.L1_ETH_Balance)} wei`)
      console.log(`\t    l1 balance new: ${displayWei(tr.ALLBALANCES.AFTER.L1_ETH_Balance)} wei`)
      console.log(`\t    l2 balance old: ${displayWei(tr.ALLBALANCES.BEFORE.L2_ETH_Balance)} wei`)
      console.log(`\t    l2 balance new: ${displayWei(tr.ALLBALANCES.AFTER.L2_ETH_Balance)} wei`)
      console.log(`\t    deposit amount: ${displayWei(ethers.utils.parseEther(amount))} wei`)

      tr.ALLBALANCES.AFTER.L1_ETH_Balance.should.to.below(
        tr.ALLBALANCES.BEFORE.L1_ETH_Balance.sub(
          ethers.utils.parseEther(amount)
        )
      )
      tr.ALLBALANCES.AFTER.L2_ETH_Balance.should.to.equal(
        tr.ALLBALANCES.BEFORE.L2_ETH_Balance.add(
          ethers.utils.parseEther(amount)
        )
      )
    }) 
  })  

});