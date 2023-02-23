
import { ethers } from "hardhat";
import { 
  getSigners, getContracts, getTokenContracts, 
  crossChainMessenger, displayWei, TestResult,
  AllBalances, Balances, expect } from '../../utils/setup'

import {execSync} from 'child_process';

let tr: TestResult
let amount: string

describe('Sequencer\'s contract testcast', function () {

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

  describe("query testcases", () => {
    it ('should query bitToken', async () => {

      expect(await tr.CONTRACTS.SEQUENCER.bitToken()).to.be.equal(process.env.TestBitToken)
    })

    it ('should query epoch', async () => {

      expect(await tr.CONTRACTS.SEQUENCER.epoch()).to.be.equal(0)
    })

    it ('should query sequencerLimit', async () => {

      expect(await tr.CONTRACTS.SEQUENCER.sequencerLimit()).to.be.equal(100)
    })

    it ('should query scheduler', async () => {

      expect(await tr.CONTRACTS.SEQUENCER.scheduler()).to.be.equal("0xD55008B20Afe34c3A9999Cd2936AF149F8f58Ad3")
    })

    it ('should query getSequencers', async () => {

      let sequencers = await tr.CONTRACTS.SEQUENCER.getSequencers()
      let Owners = await tr.CONTRACTS.SEQUENCER.getOwners()

      expect(Owners[0]).to.be.equal(sequencers[0].owner)
    })
    
    it ('should query getOwners', async () => {

      console.log("getOwners", await tr.CONTRACTS.SEQUENCER.getOwners())
      // expect(await tr.CONTRACTS.SEQUENCER.bitToken()).to.be.equal(process.env.TestBitToken)
    })
  })

  describe.skip('depositBIT 通过 l1 sb 合约', () => {

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

});