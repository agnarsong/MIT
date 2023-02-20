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

describe('depositERC20 and withdrawERC20', function () {

  this.timeout(150000);
  this.slow(150000);
  
  before( async() => {
    amount = '50'

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

  // describe('depositETH 断言emit', () => {
  //   it('should trigger the deposit ETH function with the given amount', async () => {
  //     await expect(crossChainMessenger.depositETH(100000))
  //       .to.emit(l1sb, 'ETHDepositInitiated')
  //       .withArgs(
  //         await l1Signer.getAddress(),
  //         await l1Signer.getAddress(),
  //         100000,
  //         '0x'
  //       )
  //   })
  // })

  // describe('withdrawETH 断言emit', () => {
  //   it('should trigger the withdraw ETH function with the given amount', async () => {
  //     await expect(crossChainMessenger.withdrawETH(100000))
  //       .to.emit(l2sb, 'WithdrawalInitiated')
  //       .withArgs(
  //         ethers.constants.AddressZero,
  //         predeploys.BVM_ETH,
  //         await l2Signer.getAddress(),
  //         await l2Signer.getAddress(),
  //         100000,
  //         '0x'
  //       )
  //   })
  // })

  // describe('depositETH 使用sdk',()=>{

  //   it('should l1 and l2 balances are both greater than 0', async () => {
  //     [l1b,l2b] = await reportBalances()
  //     // console.log(l1b,l2b)

  //     l1b.should.be.at.least(0)
  //     l2b.should.be.at.least(0)
  //   })

  //   it('should all depositETH\'s response is correct', async () => {
  //     response = await crossChainMessenger.depositETH(ethers.utils.parseEther('0.01001'))
  //     await response.wait()
  //     // console.log(response)
  //     response.type!.should.to.equal(2)
  //     response.chainId.should.to.equal(+process.env.L1CHAINID!)
  //     response.hash.should.to.have.lengthOf(66)
  //   })

  //   // UNCONFIRMED_L1_TO_L2_MESSAGE 0
  //   // FAILED_L1_TO_L2_MESSAGE 1
  //   // STATE_ROOT_NOT_PUBLISHED 2
  //   // IN_CHALLENGE_PERIOD 3
  //   // READY_FOR_RELAY 4
  //   // RELAYED 5
  //   it('should MessageStatus is UNCONFIRMED_L1_TO_L2_MESSAGE', async () => {
  //     // console.log('===>', await crossChainMessenger.getMessageStatus(response.hash))

  //     await crossChainMessenger.waitForMessageStatus(
  //       response.hash,mantle.MessageStatus.UNCONFIRMED_L1_TO_L2_MESSAGE)
  //     gms = await crossChainMessenger.getMessageStatus(response.hash)
      
  //     gms.should.to.equal(0)
  //   })

  //   it('should function toCrossChainMessage can get message', async () => {

  //     const ccm = await crossChainMessenger.toCrossChainMessage(response.hash)

  //     ccm.transactionHash.should.to.equal(response.hash)
  //   })

  //   it('should MessageStatus is RELAYED', async () => {
  //     // console.log('===>', await crossChainMessenger.getMessageStatus(response.hash))

  //     await crossChainMessenger.waitForMessageStatus(
  //       response.hash,mantle.MessageStatus.RELAYED)
  //     gms = await crossChainMessenger.getMessageStatus(response.hash)
      
  //     gms.should.to.equal(5)
  //   })

  //   it('should l1 and l2 balances changes are correct', async () => {
  //     // console.log('===>', await crossChainMessenger.getMessageStatus(response.hash))

  //     let [nl1b,nl2b] = await reportBalances()
  //     // console.log(l1b,l2b)
  //     // console.log(nl1b,nl2b)
  //     nl1b.should.to.below(l1b.sub(ethers.utils.parseEther('0.01001')))
  //     nl2b.should.to.equal(l2b.add(ethers.utils.parseEther('0.01001')))
  //   })

  // })

  // describe('withdrawETH 使用sdk',()=>{

  //   it('should l1 and l2 balances are both greater than 0', async () => {
  //     [l1b,l2b] = await reportBalances()

  //     l1b.should.be.at.least(0)
  //     l2b.should.be.at.least(0)
  //   })

  //   it('should all withdrawETH\'s response is correct', async () => {
  //     response = await crossChainMessenger.withdrawETH(ethers.utils.parseEther('0.01'))

  //     response.chainId.should.to.equal(+process.env.L2CHAINID!)
  //     response.hash.should.to.have.lengthOf(66)
  //   })

  //   it('should MessageStatus is UNCONFIRMED_L1_TO_L2_MESSAGE', async () => {
  //     // console.log('===>', await crossChainMessenger.getMessageStatus(response.hash))
  //     await crossChainMessenger.waitForMessageStatus(
  //       response.hash, mantle.MessageStatus.UNCONFIRMED_L1_TO_L2_MESSAGE)
  //   })

  //   it('should function toCrossChainMessage can get message', async () => {
  //     await response.wait()
  //     const ccm = await crossChainMessenger.toCrossChainMessage(response.hash)

  //     ccm.transactionHash.should.to.equal(response.hash)
  //   })

  //   // it('should MessageStatus is STATE_ROOT_NOT_PUBLISHED', async () => {
  //   //   // console.log('===>', await crossChainMessenger.getMessageStatus(response.hash))

  //   //   await crossChainMessenger.waitForMessageStatus(
  //   //     response.hash,mantle.MessageStatus.STATE_ROOT_NOT_PUBLISHED)
  //   //   gms = await crossChainMessenger.getMessageStatus(response.hash)
      
  //   //   gms.should.to.equal(2)
  //   // })

  //   it('should MessageStatus is IN_CHALLENGE_PERIOD', async () => {
  //     // console.log('===>', await crossChainMessenger.getMessageStatus(response.hash))

  //     await crossChainMessenger.waitForMessageStatus(
  //       response.hash,mantle.MessageStatus.IN_CHALLENGE_PERIOD)
  //   })

  //   it('should MessageStatus is READY_FOR_RELAY', async () => {
  //     // console.log('===>', await crossChainMessenger.getMessageStatus(response.hash))

  //     await crossChainMessenger.waitForMessageStatus(
  //       response.hash,mantle.MessageStatus.READY_FOR_RELAY)
  //   })

  //   it('should finalizeMessage is success', async () => {
  //     const finalizeMessageResponse = await crossChainMessenger.finalizeMessage(response)

  //     finalizeMessageResponse.type!.should.to.equal(2)
  //   })

  //   it('should MessageStatus is RELAYED', async () => {
  //     // console.log('===>', await crossChainMessenger.getMessageStatus(response.hash))

  //     await crossChainMessenger.waitForMessageStatus(
  //       response.hash,mantle.MessageStatus.RELAYED)
  //     gms = await crossChainMessenger.getMessageStatus(response.hash)
      
  //     gms.should.to.equal(5)
  //   })

  //   it('should l1 and l2 balances changes are correct', async () => {
  //     let [nl1b,nl2b] = await reportBalances()
      
  //     // 因为手续费，实际的值均比期望的值小
  //     nl1b.should.to.below(l1b.add(ethers.utils.parseEther('0.01')))
  //     nl2b.should.to.below(l2b.sub(ethers.utils.parseEther('0.01')))
  //   })
  // })

  describe('depositERC20 通过 l1 sb 合约', () => {

    it('should get balance before', async () => {

      tr.ALLBALANCES.BEFORE.L1_ETH_Balance = await tr.SIGNERS.L1_Wallet.getBalance()
      tr.ALLBALANCES.BEFORE.L1_BIT_Balance = await tr.TOKEN_CONTRACTS.
        L1_BIT_TOKEN.balanceOf(tr.SIGNERS.L1_Wallet.address)
      tr.ALLBALANCES.BEFORE.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()
      console.log(tr.ALLBALANCES.BEFORE.L1_ETH_Balance)
      console.log(tr.ALLBALANCES.BEFORE.L1_BIT_Balance)
      console.log(tr.ALLBALANCES.BEFORE.L2_BIT_Balance)

      // l1用户的balance会被用于转账以及支付fee
      tr.ALLBALANCES.BEFORE.L1_ETH_Balance.should.be.at.least(0)
    })

    //approve
    it('shoule approve ERC20', async () => {

      tr.APPROVE_TX = await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.approve(
        process.env.Proxy__BVM_L1StandardBridge!,
        ethers.utils.parseEther(amount)
      )
      // console.log("\tapprove txhash: ", tr.APPROVE_TX.hash)
      tr.APPROVE_TX.type!.should.to.equal(2)
      tr.APPROVE_TX.chainId.should.to.equal(+process.env.L1CHAINID!)
      tr.APPROVE_TX.hash.should.to.have.lengthOf(66)
    })

    it('should get bit allowance before', async ()=>{

      let allowance = await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.allowance(
        tr.SIGNERS.L1_Wallet.address,
        process.env.Proxy__BVM_L1StandardBridge!
      )
      execSync('sleep 5');

      console.log("\tallowance: ", allowance)
    })

    it('should trigger the deposit ERC20 function with the given amount', async () => {

      tr.DEPOSIT_TX = await tr.CONTRACTS.L1_Standard_Bridge.depositERC20(
        process.env.TestBitToken!,
        process.env.L2_Bit_Token!,
        ethers.utils.parseEther(amount),
        3000000,
        '0x' + '22'.repeat(32)
      )
      console.log("\tdepositERC20 txhash: ", tr.DEPOSIT_TX.hash)
      // console.log("txdata: ", tx.data)
      tr.DEPOSIT_TX_RCPT = await tr.DEPOSIT_TX.wait()
      console.log("\trcpt status: ", tr.DEPOSIT_TX_RCPT.status)
      console.log("\trcpt to: ", tr.DEPOSIT_TX_RCPT.to)

      execSync('sleep 10');
    })

    it('should get bit allowance after', async ()=>{

      let allowance = await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.allowance(
        tr.SIGNERS.L1_Wallet.address,
        process.env.Proxy__BVM_L1StandardBridge!
      )

      console.log("\tallowance: ", allowance)
    })

    it('should get balance after', async () => {

      tr.ALLBALANCES.AFTER.L1_ETH_Balance = await tr.SIGNERS.L1_Wallet.getBalance()
      tr.ALLBALANCES.AFTER.L1_BIT_Balance = await tr.TOKEN_CONTRACTS.
        L1_BIT_TOKEN.balanceOf(tr.SIGNERS.L1_Wallet.address)
      tr.ALLBALANCES.AFTER.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()

      console.log("\tl1 balance: ", tr.ALLBALANCES.AFTER.L1_BIT_Balance)
      console.log("\tl2 balance: ", tr.ALLBALANCES.AFTER.L2_BIT_Balance)
    })
  })

  describe.skip('withdrawETH 使用 l2 sb 合约', () => {

    it('should get balance before', async () => {

      const l1b = await L1_BIT_TOKEN.balanceOf(l1Signer.address)
      const l2b = await l2Signer.getBalance()

      console.log("\tl1 balance: ", l1b)
      console.log("\tl2 balance: ", l2b)
    })
    
    it('should trigger the withdraw ETH function with the given amount', async () => {

      let tx = await L2_Standard_Bridge.withdraw(
        process.env.L2_Bit_Token!,
        50000000000,
        300000,
        '0x' + '22'.repeat(32))
      console.log("txhash: ",tx.hash)

      let rcpt = await tx.wait()
      console.log("rcpt status: ", rcpt.status)
      console.log("rcpt to: ", rcpt.to)

      execSync('sleep 10');
    })

    // it('l1 上的 standarbridge 确认withdrwa', async () => {

    //   let tx = await L1_Standard_Bridge.finalizeETHWithdrawal(
    //     300000,
    //     '0x' + '22'.repeat(32),
    //     {
    //       value: "5000000000000000000"
    //     }
    //   )
    //   console.log("txhash: ", tx.hash)

    //   // return legacyL1XDM.populateTransaction.relayMessage(resolved.target, resolved.sender, resolved.message, resolved.messageNonce, proof, (opts === null || opts === void 0 ? void 0 : opts.overrides) || {});

    // })

    it('should get balance after', async () => {

      const l1b = await L1_BIT_TOKEN.balanceOf(l1Signer.address)
      const l2b = await l2Signer.getBalance()

      console.log("l1 balance: ", l1b)
      console.log("l2 balance: ", l2b)
    })
  })

});