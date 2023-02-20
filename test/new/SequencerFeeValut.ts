// 1、查询l2上BVM_SequencerFeeVault这个合约里面的bit balance
// 2、查询l1上bvmFeeWalletAddress这个地址里面的bit balance
// 3、在l2上请求BVM_SequencerFeeVault合约的withdraw（断言BVM_SequencerFeeVault的balance是否大于15）
// 4、确认l2的扣款和l1的到账

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

describe('test SequencerFeeValut', function () {

  this.timeout(150000);
  this.slow(150000);
  
  before(async() => {
    amount = '14'

    tr = {} as TestResult
    tr.ALLBALANCES = {
      BEFORE: {} as Balances,
      AFTER: {} as Balances
    } as AllBalances

    tr.SIGNERS = await getSigners();
    tr.CONTRACTS = await getContracts();
    tr.TOKEN_CONTRACTS = await getTokenContracts();
    tr.CROSS_CHAIN_MESSAGER = await crossChainMessenger()
  })

  it('should get balance before', async () => {

    const l1_bvmFeeWallet_balance = await tr.TOKEN_CONTRACTS.
      L1_BIT_TOKEN.balanceOf(process.env.bvmFeeWalletAddress)
    const l2_BVM_SequencerFeeVault_balance = await tr.TOKEN_CONTRACTS.
      L2_BIT_TOKEN.balanceOf(process.env.BVM_SequencerFeeVault)
    tr.ALLBALANCES.BEFORE.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()

    console.log(
        l1_bvmFeeWallet_balance, 
        l2_BVM_SequencerFeeVault_balance,
        tr.ALLBALANCES.BEFORE.L2_BIT_Balance)
  })

  it('should transfer to l2_BVM_SequencerFeeVault', async () => {

    let tx = await tr.SIGNERS.L2_Wallet.sendTransaction({
        from: tr.SIGNERS.L2_Wallet.address,
        to: process.env.BVM_SequencerFeeVault,
        data: '0x',
        value: ethers.utils.parseEther('14'),
        // gas: 300000
      })

    // console.log(tx)
  })

  it('should get balance after transfer', async () => {

    const l1_bvmFeeWallet_balance = await tr.TOKEN_CONTRACTS.
      L1_BIT_TOKEN.balanceOf(process.env.bvmFeeWalletAddress)
    const l2_BVM_SequencerFeeVault_balance = await tr.TOKEN_CONTRACTS.
      L2_BIT_TOKEN.balanceOf(process.env.BVM_SequencerFeeVault)
    tr.ALLBALANCES.AFTER.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()

    console.log(
        l1_bvmFeeWallet_balance, 
        l2_BVM_SequencerFeeVault_balance,
        tr.ALLBALANCES.BEFORE.L2_BIT_Balance)
  })

  it('L2_BVM_SequencerFeeVault withdraw',async () => {
    tr.WITHDRAW_TX = await tr.CONTRACTS.L2_BVM_SequencerFeeVault.withdraw()

    console.log(tr.WITHDRAW_TX)
  })

  it('should finalizeMessage is success', async () => {
    execSync('sleep 60');

    tr.FINALIZE_TX = await tr.CROSS_CHAIN_MESSAGER.finalizeMessage(tr.WITHDRAW_TX)

    tr.FINALIZE_TX.type!.should.to.equal(2)

    tr.FINALIZE_TX_RCPT = await tr.FINALIZE_TX.wait()
    console.log("\tfinalizeMessageResponse recp: ", tr.FINALIZE_TX_RCPT)
  })

  it('should get balance after withdraw', async () => {

    const l1_bvmFeeWallet_balance = await tr.TOKEN_CONTRACTS.
      L1_BIT_TOKEN.balanceOf(process.env.bvmFeeWalletAddress)
    const l2_BVM_SequencerFeeVault_balance = await tr.TOKEN_CONTRACTS.
      L2_BIT_TOKEN.balanceOf(process.env.BVM_SequencerFeeVault)
    tr.ALLBALANCES.AFTER.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()

    console.log(
        l1_bvmFeeWallet_balance, 
        l2_BVM_SequencerFeeVault_balance,
        tr.ALLBALANCES.BEFORE.L2_BIT_Balance)
  })

})