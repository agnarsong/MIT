/* External Imports */
import { ethers } from 'ethers';

import { BigNumber, Wallet, Contract, ContractTransaction, 
  ContractReceipt, providers, Transaction } from "ethers";
import { Provider, TransactionRequest } from '@ethersproject/abstract-provider';
import * as mantle from "@mantleio/sdk";

import { expect } from 'chai';
import { should } from 'chai';

const getSigners = async () => {
  const l1RpcProvider = new ethers.providers.JsonRpcProvider(process.env.L1_URL)
  const l2RpcProvider = new ethers.providers.JsonRpcProvider(process.env.L2_URL)

  // 任意私钥创建的wallet
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const l1W = new ethers.Wallet(PRIVATE_KEY!, l1RpcProvider);
  const l2W = new ethers.Wallet(PRIVATE_KEY!, l2RpcProvider);
  const RECEIVER_PRIVATE_KEY = process.env.RECEIVER_PRIVATE_KEY;
  const l1RW = new ethers.Wallet(RECEIVER_PRIVATE_KEY!, l1RpcProvider);
  const l2RW = new ethers.Wallet(RECEIVER_PRIVATE_KEY!, l2RpcProvider);

  // 使用部署是的私钥创建wallet，避免权限问题
  const DEPLOY_PRIVATE_KEY = process.env.DEPLOY_PRIVATE_KEY;
  const l1DW = new ethers.Wallet(DEPLOY_PRIVATE_KEY!, l1RpcProvider);
  const l2DW = new ethers.Wallet(DEPLOY_PRIVATE_KEY!, l2RpcProvider);

  // FINALIZE_PRIVATE_KEY
  // l1 才需要而外执行 finalizeMessage
  const FINALIZE_PRIVATE_KEY = process.env.FINALIZE_PRIVATE_KEY;
  const l1FW = new ethers.Wallet(FINALIZE_PRIVATE_KEY!, l1RpcProvider);

  // 使用 mantle sdk 的 asL2Provider，创建 provider
  const l2RpcProviderBySDK = mantle.asL2Provider(
    new ethers.providers.JsonRpcProvider(process.env.L2_URL)
  )

  // 使用助记词创建wallet
  // const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC).
  // connect(l2RpcProvider)
  // 使用私钥创建
  const l2WBS = new ethers.Wallet(PRIVATE_KEY!, l2RpcProviderBySDK);
  const l2DWBS = new ethers.Wallet(DEPLOY_PRIVATE_KEY!, l2RpcProviderBySDK);

  return {
    L1_Wallet:                l1W,
    L2_Wallet:                l2W,
    L1_RECEIVER_Wallet:       l1RW,
    L2_RECEIVER_Wallet:       l2RW,
    L1_DEPLOY_Wallet:         l1DW,
    L2_DEPLOY_Wallet:         l2DW,
    L1_FINALIZE_Wallet:       l1FW,
    L2_Wallet_BY_SDK:         l2WBS,
    L2_DEPLOY_Wallet_BY_SDK:  l2DWBS
  }
}

const getContracts = async () => {
  // const greeterJSON = JSON.parse(fs.readFileSync("Greeter.json")) 
  const L1_CROSS_DOMAIN_MESSENGER_ABI =await import(
    '../artifacts/contracts/L1/messaging/L1CrossDomainMessenger.sol/L1CrossDomainMessenger.json'
  )
  const L2_CROSS_DOMAIN_MESSENGER_ABI =await import(
    '../artifacts/contracts/L2/messaging/L2CrossDomainMessenger.sol/L2CrossDomainMessenger.json'
  )
  const L1_Standard_Bridge_ABI =await import(
    '../artifacts/contracts/L1/messaging/L1StandardBridge.sol/L1StandardBridge.json'
  )
  const L1_ERC721_Bridge_ABI =await import(
    '../artifacts/contracts/custom/op-erc721/ERC721Bridge.sol/ERC721Bridge.json'
  )
  const L2_Standard_Bridge_ABI =await import(
    '../artifacts/contracts/L2/messaging/L2StandardBridge.sol/L2StandardBridge.json'
  )
  const L2_ERC721_Bridge_ABI =await import(
    '../artifacts/contracts/custom/op-erc721/ERC721Bridge.sol/ERC721Bridge.json'
  )
  const L2_BVM_GasPriceOracle_ABI =await import(
    '../artifacts/contracts/L2/predeploys/BVM_GasPriceOracle.sol/BVM_GasPriceOracle.json'
  )

  const L2_BVM_SequencerFeeVault_ABI =await import(
    '../artifacts/contracts/L2/predeploys/BVM_SequencerFeeVault.sol/BVM_SequencerFeeVault.json'
  )

  const Sequencer_ABI = await import(
    '../artifacts/contracts/L1/sequencer/Sequencer.sol/Sequencer.json'
  )

  let signers = await getSigners()

  const sequencer = new ethers.Contract(
    process.env.Sequencer!, 
    Sequencer_ABI.abi, 
    signers.L1_Wallet
  )
  const l1cdm = new ethers.Contract(
    process.env.Proxy__BVM_L1CrossDomainMessenger!, 
    L1_CROSS_DOMAIN_MESSENGER_ABI.abi, 
    signers.L1_Wallet
  )
  const l2cdm = new ethers.Contract(
    process.env.L2_CROSS_DOMAIN_MESSENGER!, 
    L2_CROSS_DOMAIN_MESSENGER_ABI.abi, 
    signers.L2_Wallet
  )
  const l2cdmbs = new ethers.Contract(
    process.env.L2_CROSS_DOMAIN_MESSENGER!, 
    L2_CROSS_DOMAIN_MESSENGER_ABI.abi, 
    signers.L2_Wallet_BY_SDK
  )
  const l1sb = new ethers.Contract(
    process.env.Proxy__BVM_L1StandardBridge!, 
    L1_Standard_Bridge_ABI.abi, 
    signers.L1_Wallet
  )
  const l1erc721 = new ethers.Contract(
    process.env.L1ERC721Bridge!, 
    L1_ERC721_Bridge_ABI.abi, 
    signers.L1_Wallet
  )
  const l2sb = new ethers.Contract(
    process.env.L2_Standard_Bridge!, 
    L2_Standard_Bridge_ABI.abi, 
    signers.L2_Wallet
  )
  const l2erc721 = new ethers.Contract(
    process.env.L2ERC721Bridge!, 
    L2_ERC721_Bridge_ABI.abi, 
    signers.L2_Wallet
  )
  const l2sbbs = new ethers.Contract(
    process.env.L2_Standard_Bridge!, 
    L2_Standard_Bridge_ABI.abi, 
    signers.L2_Wallet_BY_SDK
  )
  const l2bgpo = new ethers.Contract(
    '0x420000000000000000000000000000000000000F', 
    L2_BVM_GasPriceOracle_ABI.abi, 
    signers.L2_Wallet
  )
  const l2sfv = new ethers.Contract(
    process.env.BVM_SequencerFeeVault!, 
    L2_BVM_SequencerFeeVault_ABI.abi, 
    signers.L2_Wallet
  )
  const l2sfvbs = new ethers.Contract(
    process.env.BVM_SequencerFeeVault!, 
    L2_BVM_SequencerFeeVault_ABI.abi, 
    signers.L2_Wallet_BY_SDK
  )

  return {
    L1_CROSS_DOMAIN_MESSENGER:        l1cdm,
    L2_CROSS_DOMAIN_MESSENGER:        l2cdm,
    L2_CROSS_DOMAIN_MESSENGER_BY_SDK: l2cdmbs,
    L1_Standard_Bridge:               l1sb,
    L1_ERC721_Bridge:                 l1erc721,
    L2_Standard_Bridge:               l2sb,
    L2_ERC721_Bridge:                 l2erc721,
    L2_Standard_Bridge_BY_SDK:        l2sbbs,
    L2_BVM_GasPriceOracle:            l2bgpo,
    L2_BVM_SequencerFeeVault:         l2sfv,
    L2_BVM_SequencerFeeVault_BY_SDK:  l2sfvbs,
    SEQUENCER:                        sequencer
  }
}

const getTokenContracts = async () => {
  // const greeterJSON = JSON.parse(fs.readFileSync("Greeter.json")) 
  const Bit_Token =await import(
    '../artifacts/contracts/L1/local/TestBitToken.sol/BitTokenERC20.json'
  )
  const Bit_ETH_Token =await import(
    '../artifacts/contracts/L2/predeploys/BVM_ETH.sol/BVM_ETH.json'
  )

  let signers = await getSigners()
  let l1bit = new ethers.Contract(
    process.env.TestBitToken!, 
    Bit_Token.abi,
    signers.L1_Wallet 
  )
  let l2bit = new ethers.Contract(
    process.env.L2_Bit_Token!, 
    Bit_Token.abi, 
    signers.L2_Wallet
  )
  let l2eth = new ethers.Contract(
    process.env.L2_ETH_Token!, 
    Bit_ETH_Token.abi, 
    signers.L2_Wallet
  )

  return {
    L1_BIT_TOKEN:     l1bit,
    L2_BIT_TOKEN:     l2bit,
    L2_BIT_ETH_TOKEN: l2eth
  }
}

const crossChainMessenger = async () => {

  let signers = await getSigners()
  // let contracts = await getContracts()

  return new mantle.CrossChainMessenger({
    l1ChainId: process.env.L1CHAINID!,
    l2ChainId: process.env.L2CHAINID!,
    l1SignerOrProvider: signers.L1_FINALIZE_Wallet,
    l2SignerOrProvider: signers.L2_Wallet,
    // contracts: {
    //   l1: {
    //     L1StandardBridge: contracts.L1_Standard_Bridge, 
    //     L1CrossDomainMessenger: contracts.L1_CROSS_DOMAIN_MESSENGER
    //   },
    //   l2: {
    //     L2StandardBridge: contracts.L2_Standard_Bridge,
    //     L2CrossDomainMessenger:contracts.L2_CROSS_DOMAIN_MESSENGER
    //   }
    // }
  })
}

const displayWei = (x: { toString: () => string; }) => x.toString().padStart(50, " ")                     
const displayGas = (x: { toString: () => string; }) => x.toString().padStart(10, " ")

export type TestResult = {
  CROSS_CHAIN_MESSAGER: mantle.CrossChainMessenger,
  SIGNERS:              Signers,
  ALLBALANCES:          AllBalances,
  CONTRACTS:            Contracts,
  TOKEN_CONTRACTS:      TokenContracts,
  
  DEPOSIT_TX:           ContractTransaction,
  DEPOSIT_TX_RCPT:      ContractReceipt,
  WITHDRAW_TX:          ContractTransaction,
  WITHDRAW_TX_RCPT:     ContractReceipt,
  TX:                   Transaction,
  TX_RCPT:              ContractReceipt,

  APPROVE_TX:           ContractTransaction,
  APPROVE_TX_RCPT:      ContractReceipt,

  FINALIZE_TX:          ContractTransaction,
  FINALIZE_TX_RCPT:     ContractReceipt
}

export type Signers = {
  L1_Wallet:                Wallet,
  L2_Wallet:                Wallet,
  L1_RECEIVER_Wallet:       Wallet,
  L2_RECEIVER_Wallet:       Wallet,
  L1_DEPLOY_Wallet:         Wallet,
  L2_DEPLOY_Wallet:         Wallet,
  L1_FINALIZE_Wallet:       Wallet,
  L2_Wallet_BY_SDK:         Wallet,
  L2_DEPLOY_Wallet_BY_SDK:  Wallet
}

export type Contracts = {
  L1_CROSS_DOMAIN_MESSENGER:        Contract,
  L2_CROSS_DOMAIN_MESSENGER:        Contract,
  L2_CROSS_DOMAIN_MESSENGER_BY_SDK: Contract,
  L1_Standard_Bridge:               Contract,
  L1_ERC721_Bridge:                 Contract,
  L2_Standard_Bridge:               Contract,
  L2_ERC721_Bridge:                 Contract,
  L2_Standard_Bridge_BY_SDK:        Contract,
  L2_BVM_GasPriceOracle:            Contract,
  L2_BVM_SequencerFeeVault:         Contract,
  L2_BVM_SequencerFeeVault_BY_SDK:  Contract,
  SEQUENCER:                        Contract
}

export type TokenContracts = {
  L1_BIT_TOKEN:     Contract,
  L2_BIT_TOKEN:     Contract,
  L2_BIT_ETH_TOKEN: Contract
}

export type AllBalances = {
  BEFORE: Balances,
  AFTER:  Balances
}

export type Balances = {
  L1_SB_Balance:      BigNumber,
  L2_T_Supply:        BigNumber,

  L1_ERC20_Balance:   BigNumber,
  L1_BIT_Balance:     BigNumber,
  L1_ETH_Balance:     BigNumber,
  L2_ERC20_Balance:   BigNumber,
  L2_BIT_Balance:     BigNumber,
  L2_ETH_Balance:     BigNumber,

  L1_R_ERC20_Balance: BigNumber,
  L1_R_BIT_Balance:   BigNumber,
  L1_R_ETH_Balance:   BigNumber,
  L2_R_ERC20_Balance: BigNumber,
  L2_R_BIT_Balance:   BigNumber,
  L2_R_ETH_Balance:   BigNumber,

  L1_D_ERC20_Balance: BigNumber,
  L1_D_BIT_Balance:   BigNumber,
  L1_D_ETH_Balance:   BigNumber,
  L2_D_ERC20_Balance: BigNumber,
  L2_D_BIT_Balance:   BigNumber,
  L2_D_ETH_Balance:   BigNumber,

  L1_F_ERC20_Balance: BigNumber,
  L1_F_BIT_Balance:   BigNumber,
  L1_F_ETH_Balance:   BigNumber,
  L2_F_ERC20_Balance: BigNumber,
  L2_F_BIT_Balance:   BigNumber,
  L2_F_ETH_Balance:   BigNumber
}

// Get estimates from the SDK
export const getEstimates = async (
  provider: Provider, 
  tx: TransactionRequest
  ) => {
    return {
      totalCost: await mantle.estimateTotalGasCost(provider, tx),
      l1Cost: await mantle.estimateL1GasCost(provider, tx),
      l2Cost: await mantle.estimateL2GasCost(provider, tx),
      l1Gas: await mantle.estimateL1Gas(provider, tx),
      l2Gas: ethers.utils.parseEther('0')
    }
}

export const defaultTransactionFactory = () => {
  return {
    to: '0x' + '1234'.repeat(10),
    gasLimit: 8_000_000,
    gasPrice: BigNumber.from(0),
    data: '0x',
    value: 0,
  }
}

// export const conditionalTest = (
//   condition: (env?: OptimismEnv) => Promise<boolean>,
//   name,
//   fn,
//   message?: string,
//   timeout?: number
// ) => {
//   it(name, async function () {
//     const shouldRun = await condition()
//     if (!shouldRun) {
//       console.log(message)
//       this.skip()
//       return
//     }

//     await fn()
//   }).timeout(timeout || envConfig.MOCHA_TIMEOUT * 2)
// }

// export const withdrawalTest = (name, fn, timeout?: number) =>
//   conditionalTest(
//     () => Promise.resolve(procEnv.RUN_WITHDRAWAL_TESTS),
//     name,
//     fn,
//     `Skipping withdrawal test.`,
//     timeout
//   )

export {
  mantle,
  displayWei,
  displayGas,
  expect, 
  should, 
  getSigners, 
  getContracts, 
  getTokenContracts, 
  crossChainMessenger 
}

export const NON_NULL_BYTES32 = '0x' + '11'.repeat(32)
export const NON_ZERO_ADDRESS = '0x' + '11'.repeat(20)

export const DEFAULT_TEST_GAS_L1 = 330_000
export const DEFAULT_TEST_GAS_L2 = 1_300_000
export const fundUser = async (
  messenger: mantle.CrossChainMessenger,
  amount: mantle.NumberLike,
  recipient?: string
) => {
  await messenger.waitForMessageReceipt(
    await messenger.depositETH(amount, {
      l2GasLimit: DEFAULT_TEST_GAS_L2,
      overrides: {
        gasPrice: DEFAULT_TEST_GAS_L1,
      },
    })
  )

  if (recipient !== undefined) {
    const tx = await messenger.l2Signer.sendTransaction({
      to: recipient,
      value: amount,
    })
    await tx.wait()
  }
}

// export const conditionalTest = (
//   condition: () => Promise<boolean>,
//   name,
//   fn,
//   message?: string,
//   timeout?: number
// ) => {
//   it(name, async function () {
//     const shouldRun = await condition()
//     if (!shouldRun) {
//       console.log(message)
//       this.skip()
//       return
//     }

//     await fn()
//   }).timeout(timeout || 120000 * 2)
// }