import { ethers } from "hardhat";
import { 
  getSigners, getContracts, getTokenContracts, 
  crossChainMessenger, displayWei, TestResult,
  AllBalances, Balances, mantle } from '../utils/setup'

import {execSync} from 'child_process';
import dotenv from "dotenv"
dotenv.config()

let tr: TestResult
let amount: string

describe('depositETH and withdrawETH', function () {

  this.timeout(150000);
  this.slow(150000);
  
  before(async() => {
    amount = '0.05'

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

  // describe('通过 sdk depositETH, 验证event', () => {
  //   it('判断是否触发event, 及参数验证', async () => {
  //     await expect(crossChainMessenger.depositETH(100000))
  //       .to.emit(l1sb, 'ETHDepositInitiated')
  //       .withArgs(
  //         await l1DSigner.getAddress(),
  //         await l1DSigner.getAddress(),
  //         100000,
  //         '0x'
  //       )
  //   })
  // })

  // describe('通过 sdk withdrawETH时, 验证event', () => {
  //   it('判断是否触发event, 及参数验证', async () => {
  //     await expect(crossChainMessenger.withdrawETH(100000))
  //       .to.emit(l2sb, 'WithdrawalInitiated')
  //       .withArgs(
  //         ethers.constants.AddressZero,
  //         predeploys.BVM_ETH,
  //         await l2DSigner.getAddress(),
  //         await l2DSigner.getAddress(),
  //         100000,
  //         '0x'
  //       )
  //   })
  // })

  // describe('通过 sdk depositETH, 验证是否到账',()=>{

  //   it('should l1 and l2 balances are both greater than 0', async () => {
  //     [l1b,l2b] = await reportBalances()
  //     console.log(l1b,l2b)

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

  //     await crossChainMessenger.waitForMessageStatus(
  //       response.hash,mantle.MessageStatus.UNCONFIRMED_L1_TO_L2_MESSAGE)
  //     let gms = await crossChainMessenger.getMessageStatus(response.hash)
      
  //     gms.should.to.equal(0)
  //   })

  //   it('should function toCrossChainMessage can get message', async () => {

  //     const ccm = await crossChainMessenger.toCrossChainMessage(response.hash)

  //     ccm.transactionHash.should.to.equal(response.hash)
  //   })

  //   it('should MessageStatus is RELAYED', async () => {

  //     await crossChainMessenger.waitForMessageStatus(
  //       response.hash,mantle.MessageStatus.RELAYED)
  //     let gms = await crossChainMessenger.getMessageStatus(response.hash)
      
  //     gms.should.to.equal(5)
  //   })

  //   it('should l1 and l2 balances changes are correct', async () => {
  //     execSync('sleep 10');

  //     let [nl1b,nl2b] = await reportBalances()
  //     // console.log(l1b,l2b)
  //     // console.log(nl1b,nl2b)
  //     nl1b.should.to.below(l1b.sub(ethers.utils.parseEther('0.01001')))
  //     nl2b.should.to.equal(l2b.add(ethers.utils.parseEther('0.01001')))
  //   })

  // })

  // describe('通过 sdk withdrawETH, 验证是否到账',()=>{

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
  //     let gms = await crossChainMessenger.getMessageStatus(response.hash)
      
  //     gms.should.to.equal(5)
  //   })

  //   it('should l1 and l2 balances changes are correct', async () => {
  //     let [nl1b,nl2b] = await reportBalances()
      
  //     // 因为手续费，实际的值均比期望的值小
  //     nl1b.should.to.below(l1b.add(ethers.utils.parseEther('0.01')))
  //     nl2b.should.to.below(l2b.sub(ethers.utils.parseEther('0.01')))
  //   })
  // })

  describe('depositETH 通过 l1 sb 合约', () => {

    it('should get balance before', async () => {

      tr.ALLBALANCES.BEFORE.L1_ETH_Balance = await tr.SIGNERS.L1_Wallet.getBalance()

      console.log("before balanceOf BIT: ", await tr.SIGNERS.L2_Wallet.getBalance())

      console.log("totalSupply: ", await tr.TOKEN_CONTRACTS.L2_BIT_ETH_TOKEN.totalSupply())
      tr.ALLBALANCES.BEFORE.L2_ETH_Balance = await tr.TOKEN_CONTRACTS.
        L2_BIT_ETH_TOKEN.balanceOf(tr.SIGNERS.L2_Wallet.address)

      console.log("after balanceOf BIT: ", await tr.SIGNERS.L2_Wallet.getBalance())

      // l1用户的balance会被用于转账以及支付fee
      tr.ALLBALANCES.BEFORE.L1_ETH_Balance.should.be.at.least(0)
    })

    it('should trigger the deposit ETH function with the given amount', async () => {

      tr.DEPOSIT_TX = await tr.CONTRACTS.L1_Standard_Bridge.depositETH(
        300000,
        '0x' + '22'.repeat(32),
        {
          value: ethers.utils.parseEther(amount)
        }
      )
      // console.log("deposit txhash: ", tr.DEPOSIT_TX.hash)
      tr.DEPOSIT_TX.type!.should.to.equal(2)
      tr.DEPOSIT_TX.chainId.should.to.equal(+process.env.L1CHAINID!)
      tr.DEPOSIT_TX.hash.should.to.have.lengthOf(66)
      tr.DEPOSIT_TX_RCPT = await tr.DEPOSIT_TX.wait()
      // console.log("deposit rcpt status: ", tr.DEPOSIT_TX_RCPT.status)
      // console.log("deposit rcpt to: ", tr.DEPOSIT_TX_RCPT.to)
      tr.DEPOSIT_TX_RCPT.status?.should.to.equal(1)
      tr.DEPOSIT_TX_RCPT.to.should.to.equal(process.env.Proxy__BVM_L1StandardBridge!)

      execSync('sleep 30');
    })

    it('should get balance after', async () => {

      tr.ALLBALANCES.AFTER.L1_ETH_Balance = await tr.SIGNERS.L1_Wallet.getBalance()
      tr.ALLBALANCES.AFTER.L2_ETH_Balance = await tr.TOKEN_CONTRACTS.L2_BIT_ETH_TOKEN.
        balanceOf(tr.SIGNERS.L2_Wallet.address)

      // console.log
      console.log(`\tdeposit result:`)
      console.log("\t    deposit txhash: ", tr.DEPOSIT_TX.hash, "\n")
      
      console.log(`\t    l1 ETH balance old: ${displayWei(tr.ALLBALANCES.BEFORE.L1_ETH_Balance)} wei`)
      console.log(`\t    l1 ETH balance new: ${displayWei(tr.ALLBALANCES.AFTER.L1_ETH_Balance)} wei`)
      console.log(`\t    l2 ETH balance old: ${displayWei(tr.ALLBALANCES.BEFORE.L2_ETH_Balance)} wei`)
      console.log(`\t    l2 ETH balance new: ${displayWei(tr.ALLBALANCES.AFTER.L2_ETH_Balance)} wei`)
      console.log(`\t        deposit amount: ${displayWei(ethers.utils.parseEther(amount))} wei`)

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

  describe.skip('根据 hash 直接  finalizeMessage withdraw 的Tx', () => {

    it('执行finalizeMessage', async() => {
      tr.ALLBALANCES.BEFORE.L1_SB_Balance = await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.balanceOf(tr.CONTRACTS.L1_Standard_Bridge.address)
      // tr.ALLBALANCES.BEFORE.L1_SB_Balance = await tr.SIGNERS.L1_Wallet.provider.getBalance(tr.CONTRACTS.L1_Standard_Bridge.address)
      console.log("\tL1_SB_Balance: ", tr.ALLBALANCES.BEFORE.L1_SB_Balance)

      const txHash = '0xd143ecbb655cb0b67d02a8c689defaabebd41d9c43ef96530cf2e795d262bfca'
      // const txHash = '0x806e276dae35ffe8498cf4448add13588f0b5ce08bfeced7035e7f3761739135'
      // console.log(tr.SIGNERS.L1_FINALIZE_Wallet.address, await tr.SIGNERS.L1_FINALIZE_Wallet.getBalance())
      const withdrawTx = await tr.SIGNERS.L2_Wallet.provider.getTransaction(txHash)
      console.log('===>withdrawTx: ', withdrawTx)

      // let gms = await tr.CROSS_CHAIN_MESSAGER.getMessageStatus(withdrawTx.hash)
      // console.log('===>MessageStatus: ', gms)

      const finalizeMessageResponse = await tr.CROSS_CHAIN_MESSAGER.finalizeMessage(withdrawTx)
      console.log('===>finalizeMessageResponse: ', finalizeMessageResponse)
      const finalizeMessageRCPT = await finalizeMessageResponse.wait()
      console.log("===>finalizeMessageRCPT: ", finalizeMessageRCPT)

      tr.ALLBALANCES.AFTER.L1_SB_Balance = await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.balanceOf(tr.CONTRACTS.L1_Standard_Bridge.address)
      // tr.ALLBALANCES.AFTER.L1_SB_Balance = await tr.SIGNERS.L1_Wallet.provider.getBalance(tr.CONTRACTS.L1_Standard_Bridge.address)
      console.log("\tL1_SB_Balance: ", tr.ALLBALANCES.AFTER.L1_SB_Balance)

      finalizeMessageResponse.type!.should.to.equal(2)
    })
  })

  describe('withdrawETH 使用 l2 sb 合约', () => {

    it('should get balance before', async () => {

      tr.ALLBALANCES.BEFORE.L1_ETH_Balance = await tr.SIGNERS.L1_Wallet.getBalance()
      tr.ALLBALANCES.BEFORE.L1_F_ETH_Balance = await tr.SIGNERS.L1_FINALIZE_Wallet.getBalance()
      tr.ALLBALANCES.BEFORE.L2_ETH_Balance = await tr.TOKEN_CONTRACTS.
        L2_BIT_ETH_TOKEN.balanceOf(tr.SIGNERS.L2_Wallet.address)
      tr.ALLBALANCES.BEFORE.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()

      // l2用户的balance会被用于转账
      tr.ALLBALANCES.BEFORE.L2_ETH_Balance.should.be.at.least(0)
      // finalizeMessage用户的balance会被用于finalizeMessage时支付fee
      tr.ALLBALANCES.BEFORE.L1_F_ETH_Balance.should.be.at.least(0)
    })

    it('should trigger the withdraw ETH with the given amount', async () => {

      tr.WITHDRAW_TX = await tr.CONTRACTS.L2_Standard_Bridge.withdraw(
        process.env.L2_ETH_Token!,
        ethers.utils.parseEther(amount).div(2),
        1500000,
        '0x' + '22'.repeat(32))
      // console.log("\twithdraw response hash: ", tr.WITHDRAW_TX.hash)
      // 返回的type为null，可能需要关注
      // tr.WITHDRAW_TX.type!.should.to.equal(2)
      tr.WITHDRAW_TX.chainId.should.to.equal(+process.env.L2CHAINID!)
      tr.WITHDRAW_TX.hash.should.to.have.lengthOf(66)

      tr.WITHDRAW_TX_RCPT = await tr.WITHDRAW_TX.wait()
      // console.log("rcpt status: ", tr.WITHDRAW_TX_RCPT.status)
      // console.log("rcpt to: ", tr.WITHDRAW_TX_RCPT.to)
      tr.WITHDRAW_TX_RCPT.status?.should.to.equal(1)
      tr.WITHDRAW_TX_RCPT.to.should.to.equal(process.env.L2_Standard_Bridge!)
    
      execSync('sleep 5');
    })

    it.skip('should MessageStatus is RELAYED', async () => {

      // await tr.CROSS_CHAIN_MESSAGER.waitForMessageStatus(
      //         tr.WITHDRAW_TX.hash, mantle.MessageStatus.RELAYED
      //       )
      let gms = await tr.CROSS_CHAIN_MESSAGER.getMessageStatus(tr.WITHDRAW_TX.hash)

      gms.should.to.equal(5)
    })

    it('should finalizeMessage is success', async () => {
      
      // console.log('getMessageStatus: ', await tr.CROSS_CHAIN_MESSAGER.getMessageStatus(tr.WITHDRAW_TX))
      execSync('sleep 30');

      tr.FINALIZE_TX = await tr.CROSS_CHAIN_MESSAGER.finalizeMessage(tr.WITHDRAW_TX)

      tr.FINALIZE_TX.type!.should.to.equal(2)

      tr.FINALIZE_TX_RCPT = await tr.FINALIZE_TX.wait()
      // console.log("\tfinalizeMessageResponse recp: ", tr.FINALIZE_TX_RCPT)
    })

    it('should checkout balance after', async () => {
      execSync('sleep 30');

      tr.ALLBALANCES.AFTER.L1_ETH_Balance = await tr.SIGNERS.L1_Wallet.getBalance()
      tr.ALLBALANCES.AFTER.L1_F_ETH_Balance = await tr.SIGNERS.L1_FINALIZE_Wallet.getBalance()
      tr.ALLBALANCES.AFTER.L2_ETH_Balance = await tr.TOKEN_CONTRACTS.L2_BIT_ETH_TOKEN.balanceOf(
        tr.SIGNERS.L2_Wallet.address
      )
      tr.ALLBALANCES.AFTER.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()

      // console.log
      console.log(`\ttest result:`)
      console.log("\t              withdraw txhash: ", tr.WITHDRAW_TX.hash, "\n")
      console.log("\t       finalizeMessage txhash: ", tr.FINALIZE_TX.hash, "\n")
      
      console.log(`\tl1 finalize use's ETH balance old: ${displayWei(tr.ALLBALANCES.BEFORE.L1_F_ETH_Balance)} wei`)
      console.log(`\tl1 finalize use's ETH balance new: ${displayWei(tr.ALLBALANCES.AFTER.L1_F_ETH_Balance)} wei`)
      console.log(`\t               l1 ETH balance old: ${displayWei(tr.ALLBALANCES.BEFORE.L1_ETH_Balance)} wei`)
      console.log(`\t               l1 ETH balance new: ${displayWei(tr.ALLBALANCES.AFTER.L1_ETH_Balance)} wei`)
      console.log(`\t               l2 ETH balance old: ${displayWei(tr.ALLBALANCES.BEFORE.L2_ETH_Balance)} wei`)
      console.log(`\t               l2 ETH balance new: ${displayWei(tr.ALLBALANCES.AFTER.L2_ETH_Balance)} wei`)
      console.log(`\t                  withdraw amount: ${displayWei(ethers.utils.parseEther(amount).div(2))} wei`)
      console.log(`\t               l2 BIT balance old: ${displayWei(tr.ALLBALANCES.BEFORE.L2_BIT_Balance)} wei`)
      console.log(`\t               l2 BIT balance new: ${displayWei(tr.ALLBALANCES.AFTER.L2_BIT_Balance)} wei`)

      // 如果请求 finalizeMessage,那么l1的balance = 期望到账后的总额 - 执行finalizeMessage 消耗的gasfee
      // 可以使用另外一个账户执行 finalizeMessage，或者调整断言
      tr.ALLBALANCES.AFTER.L1_ETH_Balance.should.to.equal(
        tr.ALLBALANCES.BEFORE.L1_ETH_Balance.add(
          ethers.utils.parseEther(amount).div(2)
        )
      )
      // skip finalizeMessage, 需要跳过这个断言
      tr.ALLBALANCES.AFTER.L1_F_ETH_Balance.should.to.below(
        tr.ALLBALANCES.BEFORE.L1_F_ETH_Balance
      )
      tr.ALLBALANCES.AFTER.L2_ETH_Balance.should.to.equal(
        tr.ALLBALANCES.BEFORE.L2_ETH_Balance.sub(
          ethers.utils.parseEther(amount).div(2)
        )
      )
      // 现在l2的的fee为0，所以不扣fee
      tr.ALLBALANCES.AFTER.L2_BIT_Balance.should.to.equal(
        tr.ALLBALANCES.BEFORE.L2_BIT_Balance
      )
    })
  }) 

});