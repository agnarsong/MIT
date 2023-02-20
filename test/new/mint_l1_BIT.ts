import { ethers } from "ethers";
import { 
  getSigners, getContracts, getTokenContracts, 
  crossChainMessenger, displayWei, TestResult,
  AllBalances, Balances } from '../../utils/setup'
import {execSync} from 'child_process';
import { expect } from "chai";

let tr: TestResult
let amount: string

describe('l1 执行mint BIT', function () {

  this.timeout(150000);
  this.slow(150000);
  
  before(async() => {
    amount = '100000000'

    tr = {} as TestResult
    tr.ALLBALANCES = {
      BEFORE: {} as Balances,
      AFTER: {} as Balances
    } as AllBalances

    tr.SIGNERS = await getSigners();
    tr.TOKEN_CONTRACTS = await getTokenContracts();
  });

  describe('执行mint BIT', () => {

    // 执行系列脚本之前需要确认
    // user和FINALIZE user的ETH以及BIT
    it('should get balance before', async () => {

      tr.ALLBALANCES.BEFORE.L1_ETH_Balance = await tr.SIGNERS.L1_Wallet.getBalance()
      tr.ALLBALANCES.BEFORE.L1_BIT_Balance = await tr.TOKEN_CONTRACTS.
        L1_BIT_TOKEN.balanceOf(tr.SIGNERS.L1_Wallet.address)
      tr.ALLBALANCES.BEFORE.L1_F_ETH_Balance = await tr.SIGNERS.L1_FINALIZE_Wallet.getBalance()
      tr.ALLBALANCES.BEFORE.L1_F_BIT_Balance = await tr.TOKEN_CONTRACTS.
        L1_BIT_TOKEN.balanceOf(tr.SIGNERS.L1_FINALIZE_Wallet.address)

      // 用户的ETH需要支付mint的gas fee
      expect(tr.ALLBALANCES.BEFORE.L1_ETH_Balance).to.be.above(0)
      expect(tr.ALLBALANCES.BEFORE.L1_F_ETH_Balance).to.be.above(0)
    })

    it('执行 mint tx', async () => {

      let tx1 = await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.
                          connect(tr.SIGNERS.L1_Wallet).mint(ethers.utils.parseEther(amount))
                          // mint()
      // console.log("===========>tx1", tx1)
      // console.log("===========>recp", (await tx1.wait())['events'][0]['topics'])
      expect(tx1.type).to.equal(2)

      let tx2 = await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.
                          connect(tr.SIGNERS.L1_FINALIZE_Wallet).mint(ethers.utils.parseEther(amount))
                          // mint()
      expect(tx2.type).to.equal(2)

      execSync('sleep 20');
    })

    it('should get balance after', async () => {

      tr.ALLBALANCES.AFTER.L1_ETH_Balance = await tr.SIGNERS.L1_Wallet.getBalance()
      tr.ALLBALANCES.AFTER.L1_BIT_Balance = await tr.TOKEN_CONTRACTS.
        L1_BIT_TOKEN.balanceOf(tr.SIGNERS.L1_Wallet.address)
      tr.ALLBALANCES.AFTER.L1_F_ETH_Balance = await tr.SIGNERS.L1_FINALIZE_Wallet.getBalance()
      tr.ALLBALANCES.AFTER.L1_F_BIT_Balance = await tr.TOKEN_CONTRACTS.
        L1_BIT_TOKEN.balanceOf(tr.SIGNERS.L1_FINALIZE_Wallet.address)
  
      console.log(`\ttest result:`)
      console.log(`\t           l1 User ETH balance old: ${displayWei(tr.ALLBALANCES.BEFORE.L1_ETH_Balance)} wei`)
      console.log(`\t           l1 User ETH balance new: ${displayWei(tr.ALLBALANCES.AFTER.L1_ETH_Balance)} wei`)
      console.log(`\t           l1 User BIT balance old: ${displayWei(tr.ALLBALANCES.BEFORE.L1_BIT_Balance)} wei`)
      console.log(`\t           l1 User BIT balance new: ${displayWei(tr.ALLBALANCES.AFTER.L1_BIT_Balance)} wei`)
      console.log(`\t  l1 Finalize User ETH balance old: ${displayWei(tr.ALLBALANCES.BEFORE.L1_F_ETH_Balance)} wei`)
      console.log(`\t  l1 Finalize User ETH balance new: ${displayWei(tr.ALLBALANCES.AFTER.L1_F_ETH_Balance)} wei`)
      console.log(`\t  l1 Finalize User BIT balance old: ${displayWei(tr.ALLBALANCES.BEFORE.L1_F_BIT_Balance)} wei`)
      console.log(`\t  l1 Finalize User BIT balance new: ${displayWei(tr.ALLBALANCES.AFTER.L1_F_BIT_Balance)} wei`)
      console.log(`\t                   mint BIT amount: ${displayWei(ethers.utils.parseEther(amount))} wei`)

      // 断言重置后的balance

    }) 
  })

});