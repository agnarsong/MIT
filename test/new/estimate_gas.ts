import { ethers } from "hardhat";
import {
  AllBalances,
  Balances,
  crossChainMessenger,
  displayGas,
  displayWei,
  getContracts,
  getEstimates,
  getSigners,
  getTokenContracts, 
  TestResult,
} from '../utils/setup'

import {execSync} from 'child_process';
import { BigNumber } from "ethers";
import dotenv from "dotenv"
dotenv.config()

type costs = {
  totalCost:  BigNumber,
  l1Gas:      BigNumber,
  l2Gas:      BigNumber,
  l1Cost:     BigNumber,
  l2Cost:     BigNumber
}

let estimated: costs
let real: costs
let tr: TestResult
let amount: string

const displayResults = (l2: boolean, estimated: costs, real: costs) => {
  if (l2) {
    console.log(`\tEstimates:`)
    console.log(`\t   Total gas cost: ${displayWei(estimated.totalCost)} wei`)
    console.log(`\t      L1 gas cost: ${displayWei(estimated.l1Cost)} wei`)
    console.log(`\t      L2 gas cost: ${displayWei(estimated.l2Cost)} wei`)
  
    console.log(`\n\tReal values:`)    
    console.log(`\t   Total gas cost: ${displayWei(real.totalCost)} wei`)
    console.log(`\t      L1 gas cost: ${displayWei(real.l1Cost)} wei`)
    console.log(`\t      L2 gas cost: ${displayWei(real.l2Cost)} wei`)
  
    console.log(`\n\tL1 Gas:`)
    console.log(`\t         Estimate: ${displayGas(estimated.l1Gas)}`)
    console.log(`\t             Real: ${displayGas(real.l1Gas)}`)  
    console.log(`\t       Difference: ${displayGas(real.l1Gas.sub(estimated.l1Gas))}`)
    
    console.log(`\n\tL2 Gas:`)
    console.log(`\t         Estimate: ${displayGas(estimated.l2Gas)}`)
    console.log(`\t             Real: ${displayGas(real.l2Gas)}`)  
    console.log(`\t       Difference: ${displayGas(real.l2Gas.sub(estimated.l2Gas))}`)  
  } else {
    console.log(`\tEstimates:`)
    console.log(`\t   Total gas cost: ${displayWei(estimated.totalCost)} wei`)
    console.log(`\t      L1 gas cost: ${displayWei(estimated.l1Cost)} wei`)
  
    console.log(`\n\tReal values:`)    
    console.log(`\t   Total gas cost: ${displayWei(real.totalCost)} wei`)
    console.log(`\t      L1 gas cost: ${displayWei(real.l1Cost)} wei`)
  
    console.log(`\n\tL1 Gas:`)
    console.log(`\t         Estimate: ${displayGas(estimated.l1Gas)}`)
    console.log(`\t             Real: ${displayGas(real.l1Gas)}`)  
    console.log(`\t       Difference: ${displayGas(real.l1Gas.sub(estimated.l1Gas))}`)
  }
}

describe.skip('test l1 estimate gas use or unuse sdk', function () {

  this.timeout(150000);
  this.slow(150000);
  
  before(async() => {
    amount = '0.0005'

    estimated = {} as costs
    real = {} as costs
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

  describe('test estimate gas unuse sdk', () => {

    it('should get fakeTx estimateGas\'s messages', async () => {

      let l1gasPrice = await tr.SIGNERS.L1_Wallet.getGasPrice()

      estimated.l1Gas = await tr.CONTRACTS.L1_Standard_Bridge.estimateGas.depositETH(
        300000,
        '0x' + '22'.repeat(32),
        {
          value: ethers.utils.parseEther(amount)
        }
      )
      
      estimated.totalCost = estimated.l1Cost = estimated.l1Gas.mul(l1gasPrice)
    })

    it('should get balance before', async () => {

      tr.ALLBALANCES.BEFORE.L1_ETH_Balance = await tr.SIGNERS.L1_Wallet.getBalance()
      tr.ALLBALANCES.BEFORE.L1_ETH_Balance.should.be.at.least(0)
    })

    it('should get realTx estimateGas\'s messages', async () => {

      const realTx = await tr.CONTRACTS.L1_Standard_Bridge.depositETH(
        300000,
        '0x' + '22'.repeat(32),
        {
          value: ethers.utils.parseEther(amount)
        }
      )

      execSync('sleep 5');
      const realTxResp = await realTx.wait()
      
      execSync('sleep 5');
      real.l1Gas = realTxResp.gasUsed
      real.l1Cost = realTxResp.gasUsed.mul(realTxResp.effectiveGasPrice)
    })

    it('should get balance before', async () => {

      tr.ALLBALANCES.AFTER.L1_ETH_Balance = await tr.SIGNERS.L1_Wallet.getBalance()

      real.totalCost = tr.ALLBALANCES.BEFORE.L1_ETH_Balance.
                        sub(tr.ALLBALANCES.AFTER.L1_ETH_Balance).
                        sub(ethers.utils.parseEther(amount))

      displayResults(false, estimated, real)
    })
  })
});

describe('test l2 estimate gas use or unuse sdk', function () {

  this.timeout(150000);
  this.slow(150000);
  
  before(async() => {
    amount = '0.0005'

    estimated = {} as costs
    real = {} as costs
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

  describe.skip('test estimate gas use sdk', () => {

    it('should get fakeTx estimateGas\'s messages', async () => {

      const fakeTxReq = await tr.CONTRACTS.L2_Standard_Bridge_BY_SDK.populateTransaction.withdraw(
        process.env.L2_ETH_Token!,
        ethers.utils.parseEther(amount),
        1500000,
        '0x' + '22'.repeat(32))

      const fakeTx = await tr.SIGNERS.L2_Wallet_BY_SDK.populateTransaction(fakeTxReq)
      // fakeTx.gasPrice = ethers.BigNumber.from(4100)
      // console.log("fakeTx: ", fakeTx)

      estimated = await getEstimates(tr.SIGNERS.L2_Wallet_BY_SDK.provider, fakeTx)
      estimated.l2Gas = await tr.CONTRACTS.L2_Standard_Bridge_BY_SDK.estimateGas.withdraw(
        process.env.L2_ETH_Token!,
        ethers.utils.parseEther(amount),
        1500000,
        '0x' + '22'.repeat(32))

    })

    it('should get balance before', async () => {

      tr.ALLBALANCES.BEFORE.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()

      // l2用户的balance会被用于转账以及支付fee
      tr.ALLBALANCES.BEFORE.L2_BIT_Balance.should.be.at.least(0)
    })

    it('should get realTx estimateGas\'s messages', async () => {

      const realTx = await tr.CONTRACTS.L2_Standard_Bridge_BY_SDK.withdraw(
        process.env.L2_ETH_Token!,
        ethers.utils.parseEther(amount),
        1500000,
        '0x' + '22'.repeat(32))

      const realTxResp = await realTx.wait()

      // 当下部分数据没有返回，直接给0值
      // real.l1Gas = realTxResp.l1GasUsed
      real.l1Gas = BigNumber.from(0)
      real.l2Gas = realTxResp.gasUsed
      // real.l1Cost = realTxResp.l1Fee
      real.l1Cost = BigNumber.from(0)
    })

    it('should get balance after', async () => {

      tr.ALLBALANCES.AFTER.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()
      real.totalCost = tr.ALLBALANCES.BEFORE.L2_BIT_Balance.sub(tr.ALLBALANCES.AFTER.L2_BIT_Balance)
      real.l2Cost = real.totalCost.sub(real.l1Cost)

      displayResults(true, estimated, real)
    })

  })

  describe('test estimate gas unuse sdk', () => {

    it('should get l2 bit balance before', async () => {

      tr.ALLBALANCES.BEFORE.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()

      // l1用户的balance会被用于转账以及支付fee
      tr.ALLBALANCES.BEFORE.L2_BIT_Balance.should.be.at.
        least(ethers.utils.parseEther(amount))
    })

    it('should get fakeTx estimateGas\'s messages', async () => {

      const fakeTxReq = await tr.CONTRACTS.L2_Standard_Bridge.populateTransaction.withdraw(
        process.env.L2_Bit_Token!,
        ethers.utils.parseEther(amount),
        1500000,
        '0x' + '22'.repeat(32))

      const fakeTx = await tr.SIGNERS.L2_Wallet.populateTransaction(fakeTxReq)
      // fakeTx.gasPrice = ethers.BigNumber.from(4100)
      // console.log("fakeTx: ", fakeTx)

      estimated = await getEstimates(tr.SIGNERS.L2_Wallet.provider, fakeTx)
      estimated.l2Gas = await tr.CONTRACTS.L2_Standard_Bridge.estimateGas.withdraw(
        process.env.L2_Bit_Token!,
        ethers.utils.parseEther(amount),
        1500000,
        '0x' + '22'.repeat(32))
    })

    it('should get balance before', async () => {

      tr.ALLBALANCES.BEFORE.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()

      // l2用户的balance会被用于转账以及支付fee
      tr.ALLBALANCES.BEFORE.L2_BIT_Balance.should.be.at.least(0)
    })

    it('should get realTx estimateGas\'s messages', async () => {

      const realTx = await tr.CONTRACTS.L2_Standard_Bridge.withdraw(
        process.env.L2_Bit_Token!,
        ethers.utils.parseEther(amount),
        1500000,
        '0x' + '22'.repeat(32))

      execSync('sleep 5');
      const realTxResp = await realTx.wait()

      execSync('sleep 5');

      const withdrawals = await tr.CROSS_CHAIN_MESSAGER.getWithdrawalsByAddress(tr.SIGNERS.L2_Wallet.address)
      console.log("====>withdrawals: ", withdrawals)

      // real.l1Gas = realTxResp.l1GasUsed
      real.l1Gas = BigNumber.from(0)
      real.l2Gas = realTxResp.gasUsed
      // real.l1Cost = realTxResp.l1Fee
      real.l1Cost = BigNumber.from(0)
    })

    it('should get balance after', async () => {

      tr.ALLBALANCES.AFTER.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()
      console.log(tr.ALLBALANCES.BEFORE.L2_BIT_Balance)
      console.log(tr.ALLBALANCES.AFTER.L2_BIT_Balance)
      real.totalCost = tr.ALLBALANCES.BEFORE.L2_BIT_Balance.
                          sub(tr.ALLBALANCES.AFTER.L2_BIT_Balance).
                          sub(ethers.utils.parseEther(amount))
      real.l2Cost = real.totalCost.sub(real.l1Cost)

      displayResults(true, estimated, real)
    })
  })
});