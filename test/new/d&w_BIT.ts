import { ethers } from "hardhat";
import { 
  getSigners, getContracts, getTokenContracts, 
  crossChainMessenger, displayWei, TestResult,
  AllBalances, Balances, expect } from '../../utils/setup'

import {execSync} from 'child_process';

let tr: TestResult
let amount: string

describe('depositBIT and withdrawBIT', function () {

  this.timeout(150000);
  this.slow(150000);
  
  before( async() => {
    amount = '12100'

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

  describe('depositBIT 通过 l1 sb 合约', () => {

    it('should get balance before', async () => {

      tr.ALLBALANCES.BEFORE.L1_ETH_Balance = await tr.SIGNERS.L1_Wallet.getBalance()
      tr.ALLBALANCES.BEFORE.L1_BIT_Balance = await tr.TOKEN_CONTRACTS.
        L1_BIT_TOKEN.balanceOf(tr.SIGNERS.L1_Wallet.address)
      tr.ALLBALANCES.BEFORE.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()
      tr.ALLBALANCES.BEFORE.L1_SB_Balance = await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.balanceOf(tr.CONTRACTS.L1_Standard_Bridge.address)
      tr.ALLBALANCES.BEFORE.L2_T_Supply = await tr.TOKEN_CONTRACTS.L2_BIT_TOKEN.totalSupply()

      // l1用户的balance会被用于转账以及支付fee
      expect(tr.ALLBALANCES.BEFORE.L1_ETH_Balance).to.be.at.least(0)
    })

    //approve
    it('shoule approve BIT', async () => {

      tr.APPROVE_TX = await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.approve(
        process.env.Proxy__BVM_L1StandardBridge!,
        ethers.utils.parseEther(amount)
      )
      // console.log("\tapprove txhash: ", tr.APPROVE_TX.hash)
      expect(tr.APPROVE_TX.type!).to.equal(2)
      expect(tr.APPROVE_TX.chainId).to.equal(+process.env.L1CHAINID!)
      expect(tr.APPROVE_TX.hash).to.have.lengthOf(66)
    })

    it('should get bit allowance before', async ()=>{

      let allowance = await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.allowance(
        tr.SIGNERS.L1_Wallet.address,
        process.env.Proxy__BVM_L1StandardBridge!
      )

      execSync('sleep 5');
      console.log("\tallowance: ", allowance)
    })

    it('should trigger the deposit BIT function with the given amount', async () => {

      tr.DEPOSIT_TX = await tr.CONTRACTS.L1_Standard_Bridge.depositERC20(
        process.env.TestBitToken!,
        process.env.L2_Bit_Token!,
        ethers.utils.parseEther(amount),
        3000000,
        '0x' + '22'.repeat(32)
      )
      // console.log("\tdepositBIT txhash: ", tr.DEPOSIT_TX.hash)
      // console.log("txdata: ", tx.data)
      tr.DEPOSIT_TX_RCPT = await tr.DEPOSIT_TX.wait()
      // console.log("\trcpt status: ", tr.DEPOSIT_TX_RCPT.status)
      // console.log("\trcpt to: ", tr.DEPOSIT_TX_RCPT.to)

      execSync('sleep 10');
    })

    it('should get bit allowance after', async ()=>{

      let allowance = await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.allowance(
        tr.SIGNERS.L1_Wallet.address,
        process.env.Proxy__BVM_L1StandardBridge!
      )

      execSync('sleep 10');
      console.log("\tallowance: ", allowance)
    })

    it('should get balance after', async () => {

      tr.ALLBALANCES.AFTER.L1_ETH_Balance = await tr.SIGNERS.L1_Wallet.getBalance()
      tr.ALLBALANCES.AFTER.L1_BIT_Balance = await tr.TOKEN_CONTRACTS.
        L1_BIT_TOKEN.balanceOf(tr.SIGNERS.L1_Wallet.address)
      tr.ALLBALANCES.AFTER.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()
      tr.ALLBALANCES.AFTER.L1_SB_Balance = await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.balanceOf(tr.CONTRACTS.L1_Standard_Bridge.address)
      tr.ALLBALANCES.AFTER.L2_T_Supply = await tr.TOKEN_CONTRACTS.L2_BIT_TOKEN.totalSupply()

      console.log(`\tdeposit result:`)

      console.log("\t   l1 ETH balance new: ", `${displayWei(tr.ALLBALANCES.BEFORE.L1_ETH_Balance)} wei`)
      console.log("\t   l1 BIT balance old: ", `${displayWei(tr.ALLBALANCES.BEFORE.L1_BIT_Balance)} wei`)
      console.log("\t   l1 BIT balance new: ", `${displayWei(tr.ALLBALANCES.AFTER.L1_BIT_Balance)} wei`)
      console.log("\t   l2 BIT balance old: ", `${displayWei(tr.ALLBALANCES.BEFORE.L2_BIT_Balance)} wei`)
      console.log("\t   l2 BIT balance new: ", `${displayWei(tr.ALLBALANCES.AFTER.L2_BIT_Balance)} wei`)
      console.log("\tl1 SB BIT balance old: ", `${displayWei(tr.ALLBALANCES.BEFORE.L1_SB_Balance)} wei`)
      console.log("\tl1 SB BIT balance new: ", `${displayWei(tr.ALLBALANCES.AFTER.L1_SB_Balance)} wei`)
      console.log("\t   l2 totalSupply old: ", `${displayWei(tr.ALLBALANCES.BEFORE.L2_T_Supply)} wei`)
      console.log("\t   l2 totalSupply new: ", `${displayWei(tr.ALLBALANCES.AFTER.L2_T_Supply)} wei`)
      console.log("\t   deposit BIT amount: ", `${displayWei(ethers.utils.parseEther(amount))} wei`)

      console.log("\t           DEPOSIT_TX: ", tr.DEPOSIT_TX.hash)
    })
  })

  describe('withdrawBIT 使用 l2 sb 合约', () => {

    it('should get balance before', async () => {

      tr.ALLBALANCES.BEFORE.L1_BIT_Balance = await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.balanceOf(tr.SIGNERS.L1_Wallet.address)
      tr.ALLBALANCES.BEFORE.L1_F_ETH_Balance = await tr.SIGNERS.L1_FINALIZE_Wallet.getBalance()
      tr.ALLBALANCES.BEFORE.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()
      tr.ALLBALANCES.BEFORE.L1_SB_Balance = await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.balanceOf(tr.CONTRACTS.L1_Standard_Bridge.address)
      tr.ALLBALANCES.BEFORE.L2_T_Supply = await tr.TOKEN_CONTRACTS.L2_BIT_TOKEN.totalSupply()

      expect(tr.ALLBALANCES.BEFORE.L1_F_ETH_Balance).to.be.at.least(0)
      // l2用户的balance会被用于转账
      expect(tr.ALLBALANCES.BEFORE.L2_BIT_Balance).to.be.at.least(0)
    })
    
    it('should trigger the withdraw BIT function with the given amount', async () => {

      tr.WITHDRAW_TX = await tr.CONTRACTS.L2_Standard_Bridge.withdraw(
        process.env.L2_Bit_Token!,
        ethers.utils.parseEther(amount).div(2),
        300000,
        '0x' + '22'.repeat(32))

      // console.log("\twithdraw response hash: ", tr.WITHDRAW_TX.hash)
      // 返回的type为null，可能需要关注
      // tr.WITHDRAW_TX.type!.should.to.equal(2)
      expect(tr.WITHDRAW_TX.chainId).to.equal(+process.env.L2CHAINID!)
      expect(tr.WITHDRAW_TX.hash).to.have.lengthOf(66)

      tr.WITHDRAW_TX_RCPT = await tr.WITHDRAW_TX.wait()
      // console.log("rcpt status: ", tr.WITHDRAW_TX_RCPT.status)
      // console.log("rcpt to: ", tr.WITHDRAW_TX_RCPT.to)
      expect(tr.WITHDRAW_TX_RCPT.status!).to.equal(1)
      expect(tr.WITHDRAW_TX_RCPT.to).to.equal(process.env.L2_Standard_Bridge!)

      execSync('sleep 10');
    })

    it.skip('should trigger the withdrawto 0 address BIT function with the given amount', async () => {
      
      tr.WITHDRAW_TX = await tr.CONTRACTS.L2_Standard_Bridge.withdrawTo(
        process.env.L2_Bit_Token!,
        ethers.constants.AddressZero,
        ethers.utils.parseEther(amount),
        300000,
        '0x' + '22'.repeat(32))

      // console.log("\twithdraw response hash: ", tr.WITHDRAW_TX.hash)
      // 返回的type为null，可能需要关注
      // tr.WITHDRAW_TX.type!.should.to.equal(2)
      expect(tr.WITHDRAW_TX.chainId).to.equal(+process.env.L2CHAINID!)
      expect(tr.WITHDRAW_TX.hash).to.have.lengthOf(66)

      tr.WITHDRAW_TX_RCPT = await tr.WITHDRAW_TX.wait()
      // console.log("rcpt status: ", tr.WITHDRAW_TX_RCPT.status)
      // console.log("rcpt to: ", tr.WITHDRAW_TX_RCPT.to)
      expect(tr.WITHDRAW_TX_RCPT.status!).to.equal(1)
      expect(tr.WITHDRAW_TX_RCPT.to).to.equal(process.env.L2_Standard_Bridge!)

      execSync('sleep 10');
    })

    it('should finalizeMessage is success', async () => {
      execSync('sleep 30');
      console.log('L1_Standard_Bridge\'s balance: ', await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.balanceOf(tr.CONTRACTS.L1_Standard_Bridge.address))

      tr.FINALIZE_TX = await tr.CROSS_CHAIN_MESSAGER.finalizeMessage(tr.WITHDRAW_TX)

      tr.FINALIZE_TX.type!.should.to.equal(2)

      tr.FINALIZE_TX_RCPT = await tr.FINALIZE_TX.wait()
      // console.log("\tfinalizeMessageResponse recp: ", tr.FINALIZE_TX_RCPT)
    })

    it('should get balance after', async () => {
      console.log('L1_Standard_Bridge\'s balance: ', await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.balanceOf(tr.CONTRACTS.L1_Standard_Bridge.address))


      const l2b = await tr.SIGNERS.L2_Wallet.getBalance()

      tr.ALLBALANCES.AFTER.L1_BIT_Balance = await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.balanceOf(tr.SIGNERS.L1_Wallet.address)
      tr.ALLBALANCES.AFTER.L1_F_ETH_Balance = await tr.SIGNERS.L1_FINALIZE_Wallet.getBalance()
      tr.ALLBALANCES.AFTER.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()
      tr.ALLBALANCES.AFTER.L1_SB_Balance = await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.balanceOf(tr.CONTRACTS.L1_Standard_Bridge.address)
      tr.ALLBALANCES.AFTER.L2_T_Supply = await tr.TOKEN_CONTRACTS.L2_BIT_TOKEN.totalSupply()

      console.log('0 address has BIT balance: ', await tr.TOKEN_CONTRACTS.L1_BIT_TOKEN.balanceOf(ethers.constants.AddressZero))
      // console.log
      console.log(`\twithdraw result:`)
      
      console.log(`\tl1 finalize use's ETH balance old: ${displayWei(tr.ALLBALANCES.BEFORE.L1_F_ETH_Balance)} wei`)
      console.log(`\tl1 finalize use's ETH balance new: ${displayWei(tr.ALLBALANCES.AFTER.L1_F_ETH_Balance)} wei`)
      console.log(`\t               l1 BIT balance old: ${displayWei(tr.ALLBALANCES.BEFORE.L1_BIT_Balance)} wei`)
      console.log(`\t               l1 BIT balance new: ${displayWei(tr.ALLBALANCES.AFTER.L1_BIT_Balance)} wei`)
      console.log(`\t               l2 BIT balance old: ${displayWei(tr.ALLBALANCES.BEFORE.L2_BIT_Balance)} wei`)
      console.log(`\t               l2 BIT balance new: ${displayWei(tr.ALLBALANCES.AFTER.L2_BIT_Balance)} wei`)
      console.log(`\t            l1 SB BIT balance old: ${displayWei(tr.ALLBALANCES.BEFORE.L1_SB_Balance)} wei`)
      console.log(`\t            l1 SB BIT balance new: ${displayWei(tr.ALLBALANCES.AFTER.L1_SB_Balance)} wei`)
      console.log(`\t               l2 totalSupply old: ${displayWei(tr.ALLBALANCES.BEFORE.L2_T_Supply)} wei`)
      console.log(`\t               l2 totalSupply new: ${displayWei(tr.ALLBALANCES.AFTER.L2_T_Supply)} wei`)
      console.log(`\t                  withdraw amount: ${displayWei(ethers.utils.parseEther(amount).div(2))} wei`)

      console.log("\t                  withdraw txhash: ", tr.WITHDRAW_TX.hash, "\n")
      console.log("\t           finalizeMessage txhash: ", tr.FINALIZE_TX.hash, "\n")

      // 如果请求 finalizeMessage,那么l1的balance = 期望到账后的总额 - 执行finalizeMessage 消耗的gasfee
      // 可以使用另外一个账户执行 finalizeMessage，或者调整断言
      expect(tr.ALLBALANCES.AFTER.L1_BIT_Balance).to.equal(
        tr.ALLBALANCES.BEFORE.L1_BIT_Balance.add(
          ethers.utils.parseEther(amount).div(2)
        )
      )
      // skip finalizeMessage, 需要跳过这个断言
      expect(tr.ALLBALANCES.AFTER.L1_F_ETH_Balance).to.below(
        tr.ALLBALANCES.BEFORE.L1_F_ETH_Balance
      )
      // 目前l2的gasfee为0，这里可能有问题
      expect(tr.ALLBALANCES.AFTER.L2_BIT_Balance).to.below(
        tr.ALLBALANCES.BEFORE.L2_BIT_Balance.sub(
          ethers.utils.parseEther(amount).div(2)
        )
      )
    })
  })

});