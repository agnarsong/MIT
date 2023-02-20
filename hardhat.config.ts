import { HardhatUserConfig } from 'hardhat/types'
import * as dotenv from 'dotenv'
import { ethers } from 'ethers'

// Hardhat plugins
import '@openzeppelin/hardhat-upgrades'
import '@mantleio/hardhat-deploy-config'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
// import '@primitivefi/hardhat-dodoc'
import '@typechain/hardhat'
import 'hardhat-deploy'
import 'hardhat-gas-reporter'
import 'hardhat-output-validator'

import 'solidity-coverage'

// Hardhat tasks
import './tasks'

// Load environment variables from .env
dotenv.config()

const enableGasReport = !!process.env.ENABLE_GAS_REPORT
const privateKey = process.env.PRIVATE_KEY || '0x' + '11'.repeat(32) // this is to avoid hardhat error
const deploy = process.env.DEPLOY_DIRECTORY || 'deploy'

import { copySync, remove } from 'fs-extra'
import { subtask } from 'hardhat/config'
import {
  TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS,
  TASK_COMPILE_SOLIDITY_LOG_COMPILATION_RESULT,
  TASK_COMPILE_SOLIDITY_LOG_NOTHING_TO_COMPILE
} from 'hardhat/builtin-tasks/task-names'
import { spawnSync } from 'child_process'

subtask(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS).setAction(
  async (_, __, runSuper) => {
    console.log('running task')
    const paths = await runSuper()
    const filteredPaths = paths.filter(function (p) {
      return !p.includes('eigenda')
    })
    console.log('end task')
    return filteredPaths
  }
)

subtask(TASK_COMPILE_SOLIDITY_LOG_COMPILATION_RESULT).setAction(
  async (_, __, runSuper) => {
    console.log('running TASK_COMPILE_SOLIDITY_LOG_COMPILATION_RESULT')
    runSuper()
  }
)

subtask(TASK_COMPILE_SOLIDITY_LOG_NOTHING_TO_COMPILE).setAction(
  async (_, __, runSuper) => {
    console.log('running TASK_COMPILE_SOLIDITY_LOG_NOTHING_TO_COMPILE')
    runSuper()
  }
)

const config: HardhatUserConfig = {
  networks: {
    // hardhat: {
    //   forking: {
    //     url: 'https://bitnetwork-l2geth.qa.davionlabs.com'
    //   },
    //   gasPrice: 1000000000,
    //   chainId: 1705004,
    //   gas: 4100000,
    //   from:'0xD6f15EAC1Cb3B4131Ab4899a52E711e19DEeA73f'
    // },
    // ropsten: {
    //   url: process.env.ROPSTEN_URL || "",
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    // },
    opl2: { // Optimism Goerli
      url: "https://goerli.optimism.io",
      // accounts: {
      //   mnemonic:'enforce image nasty ahead clutch muscle foil broom thought shoot bless critic'
      // },
      accounts:['0x7eefd641410560e690736ee331bd32512c9b58419a877eff2189facbef33cd1e'],
      chainId: 420,
      gas: 10000000,
      gasPrice: 1,
      //explorer: https://blockscout.com/optimism/goerli/
    },
    opl1: { // Optimism Goerli
      url: "https://rpc.ankr.com/eth_goerli",
      // accounts: {
      //   mnemonic:'enforce image nasty ahead clutch muscle foil broom thought shoot bless critic'
      // },
      accounts:['0x7eefd641410560e690736ee331bd32512c9b58419a877eff2189facbef33cd1e'],
      chainId: 5,
      gas: 10000000,
      gasPrice: 5000000,
      //explorer: https://blockscout.com/optimism/goerli/
    },
    l2: {
      url: "http://localhost:8545",
      // accounts: {
      //   mnemonic:'enforce image nasty ahead clutch muscle foil broom thought shoot bless critic'
      // },
      // accounts:['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'],
      accounts:['0x8f14df1da1a318bec99800b72c5031e4fdc4ec017f00ab9659339ecb0193120e'],
      chainId: 17,
      gas: 10000000,
      gasPrice: 1,
    },
    l1: {
      url: "http://localhost:9545",
      // accounts: {
      //   mnemonic:'enforce image nasty ahead clutch muscle foil broom thought shoot bless critic'
      // },
      // accounts:['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'],
      accounts:['0x8f14df1da1a318bec99800b72c5031e4fdc4ec017f00ab9659339ecb0193120e'],
      chainId: 31337,
      gas: 10000000,
      gasPrice: 5000000,
    },
    qal2: { // Optimism Goerli
      // url: "https://mantle-verifier.qa.davionlabs.com",
      url: "https://mantle-l2geth.qa.davionlabs.com",
      accounts: ['7eefd641410560e690736ee331bd32512c9b58419a877eff2189facbef33cd1e'],
      chainId: 1705003,
      gas: 10000000,
      gasPrice: 1,
  },
  },
  mocha: {
    timeout: 50000,
  },
  solidity: {
    compilers: [
      {
        version: '0.8.9',
        settings: {
          optimizer: { enabled: true, runs: 10_000 },
        },
      },
      {
        version: '0.5.17', // Required for WETH9
        settings: {
          optimizer: { enabled: true, runs: 10_000 },
        },
      },
      {
        version: '0.8.15',
        settings: {
          optimizer: { enabled: true, runs: 10_000 },
        },
      },
    ],
    settings: {
      metadata: {
        bytecodeHash: 'none',
      },
      outputSelection: {
        '*': {
          '*': ['metadata', 'storageLayout'],
        },
      },
    },
  },
  typechain: {
    outDir: 'dist/types',
    target: 'ethers-v5',
  },
  paths: {
    deploy: './deploy',
    deployments: './deployments',
    deployConfig: './deploy-config',
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  gasReporter: {
    enabled: enableGasReport,
    currency: 'USD',
    gasPrice: 100,
    outputFile: process.env.CI ? 'gas-report.txt' : undefined,
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
    },
  },
  dodoc: {
    runOnCompile: true,
    exclude: [
      'Helper_GasMeasurer',
      'Helper_SimpleProxy',
      'TestERC20',
      'TestLib_CrossDomainUtils',
      'TestLib_BVMCodec',
      'TestLib_RLPReader',
      'TestLib_RLPWriter',
      'TestLib_AddressAliasHelper',
      'TestLib_MerkleTrie',
      'TestLib_SecureMerkleTrie',
      'TestLib_Buffer',
      'TestLib_Bytes32Utils',
      'TestLib_BytesUtils',
      'TestLib_MerkleTree',
    ],
  },
  outputValidator: {
    runOnCompile: true,
    errorMode: false,
    checks: {
      events: false,
      variables: false,
    },
    exclude: ['contracts/test-helpers', 'contracts/test-libraries'],
  },
  deployConfigSpec: {
    isForkedNetwork: {
      type: 'boolean',
      default: false,
    },
    numDeployConfirmations: {
      type: 'number',
      default: 0,
    },
    gasPrice: {
      type: 'number',
      default: undefined,
    },
    l1BlockTimeSeconds: {
      type: 'number',
    },
    l2BlockGasLimit: {
      type: 'number',
    },
    l2ChainId: {
      type: 'number',
    },
    ctcL2GasDiscountDivisor: {
      type: 'number',
    },
    ctcEnqueueGasCost: {
      type: 'number',
    },
    sccFaultProofWindowSeconds: {
      type: 'number',
    },
    sccSequencerPublishWindowSeconds: {
      type: 'number',
    },
    blockStaleMeasure: {
      type: 'number',
    },
    daFraudProofPeriod: {
      type: 'number',
    },
    l2SubmittedBlockNumber: {
      type: 'number',
    },
    bvmSequencerAddress: {
      type: 'address',
    },
    bvmProposerAddress: {
      type: 'address',
    },
    bvmBlockSignerAddress: {
      type: 'address',
    },
    bvmFeeWalletAddress: {
      type: 'address',
    },
    bvmAddressManagerOwner: {
      type: 'address',
    },
    bvmGasPriceOracleOwner: {
      type: 'address',
    },
    bvmFeeWalletOwner: {
      type: 'address',
    },
    bvmWhitelistOwner: {
      type: 'address',
      default: ethers.constants.AddressZero,
    },
    dataManagerAddress: {
      type: 'address',
    },
    bvmEigenSequencerAddress: {
      type: 'address',
    },
    sccAddress: {
      type: 'address',
      default: 0,
    },
    gasPriceOracleOverhead: {
      type: 'number',
      default: 2750,
    },
    gasPriceOracleScalar: {
      type: 'number',
      default: 1_500_000,
    },
    gasPriceOracleDecimals: {
      type: 'number',
      default: 6,
    },
    gasPriceOracleIsBurning: {
      type: 'number',
      default: 1,
    },
    gasPriceOracleCharge: {
      type: 'number',
      default: 0,
    },
    gasPriceOracleL1BaseFee: {
      type: 'number',
      default: 1,
    },
    gasPriceOracleL2GasPrice: {
      type: 'number',
      default: 1,
    },
    hfBerlinBlock: {
      type: 'number',
      default: 0,
    },
  },
}

if (
  process.env.CONTRACTS_TARGET_NETWORK &&
  process.env.CONTRACTS_DEPLOYER_KEY &&
  process.env.CONTRACTS_RPC_URL
) {
  config.networks[process.env.CONTRACTS_TARGET_NETWORK] = {
    accounts: [process.env.CONTRACTS_DEPLOYER_KEY],
    url: process.env.CONTRACTS_RPC_URL,
    live: true,
    saveDeployments: true,
    gas: 'auto',
    gasPrice: 'auto',
    tags: [process.env.CONTRACTS_TARGET_NETWORK],
  }
}

export default config
