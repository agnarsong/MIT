"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractArtifact = void 0;
let iL1ChugSplashDeployer;
try {
    iL1ChugSplashDeployer = require('../artifacts/contracts/chugsplash/interfaces/iL1ChugSplashDeployer.sol/iL1ChugSplashDeployer.json');
}
catch (_a) { }
let L1ChugSplashProxy;
try {
    L1ChugSplashProxy = require('../artifacts/contracts/chugsplash/L1ChugSplashProxy.sol/L1ChugSplashProxy.json');
}
catch (_b) { }
let TransparentUpgradeableProxy;
try {
    TransparentUpgradeableProxy = require('../artifacts/contracts/chugsplash/TransparentUpgradeableProxy.sol/TransparentUpgradeableProxy.json');
}
catch (_c) { }
let BVM_EigenDataLayrChain;
try {
    BVM_EigenDataLayrChain = require('../artifacts/contracts/da/BVM_EigenDataLayrChain.sol/BVM_EigenDataLayrChain.json');
}
catch (_d) { }
let BVM_EigenDataLayrFee;
try {
    BVM_EigenDataLayrFee = require('../artifacts/contracts/da/BVM_EigenDataLayrFee.sol/BVM_EigenDataLayrFee.json');
}
catch (_e) { }
let AddressDictator;
try {
    AddressDictator = require('../artifacts/contracts/L1/deployment/AddressDictator.sol/AddressDictator.json');
}
catch (_f) { }
let ChugSplashDictator;
try {
    ChugSplashDictator = require('../artifacts/contracts/L1/deployment/ChugSplashDictator.sol/ChugSplashDictator.json');
}
catch (_g) { }
let BitTokenERC20;
try {
    BitTokenERC20 = require('../artifacts/contracts/L1/local/TestBitToken.sol/BitTokenERC20.json');
}
catch (_h) { }
let IL1CrossDomainMessenger;
try {
    IL1CrossDomainMessenger = require('../artifacts/contracts/L1/messaging/IL1CrossDomainMessenger.sol/IL1CrossDomainMessenger.json');
}
catch (_j) { }
let IL1ERC20Bridge;
try {
    IL1ERC20Bridge = require('../artifacts/contracts/L1/messaging/IL1ERC20Bridge.sol/IL1ERC20Bridge.json');
}
catch (_k) { }
let IL1StandardBridge;
try {
    IL1StandardBridge = require('../artifacts/contracts/L1/messaging/IL1StandardBridge.sol/IL1StandardBridge.json');
}
catch (_l) { }
let L1CrossDomainMessenger;
try {
    L1CrossDomainMessenger = require('../artifacts/contracts/L1/messaging/L1CrossDomainMessenger.sol/L1CrossDomainMessenger.json');
}
catch (_m) { }
let L1StandardBridge;
try {
    L1StandardBridge = require('../artifacts/contracts/L1/messaging/L1StandardBridge.sol/L1StandardBridge.json');
}
catch (_o) { }
let CanonicalTransactionChain;
try {
    CanonicalTransactionChain = require('../artifacts/contracts/L1/rollup/CanonicalTransactionChain.sol/CanonicalTransactionChain.json');
}
catch (_p) { }
let ChainStorageContainer;
try {
    ChainStorageContainer = require('../artifacts/contracts/L1/rollup/ChainStorageContainer.sol/ChainStorageContainer.json');
}
catch (_q) { }
let ICanonicalTransactionChain;
try {
    ICanonicalTransactionChain = require('../artifacts/contracts/L1/rollup/ICanonicalTransactionChain.sol/ICanonicalTransactionChain.json');
}
catch (_r) { }
let IChainStorageContainer;
try {
    IChainStorageContainer = require('../artifacts/contracts/L1/rollup/IChainStorageContainer.sol/IChainStorageContainer.json');
}
catch (_s) { }
let IStateCommitmentChain;
try {
    IStateCommitmentChain = require('../artifacts/contracts/L1/rollup/IStateCommitmentChain.sol/IStateCommitmentChain.json');
}
catch (_t) { }
let StateCommitmentChain;
try {
    StateCommitmentChain = require('../artifacts/contracts/L1/rollup/StateCommitmentChain.sol/StateCommitmentChain.json');
}
catch (_u) { }
let Sequencer;
try {
    Sequencer = require('../artifacts/contracts/L1/sequencer/Sequencer.sol/Sequencer.json');
}
catch (_v) { }
let ITssGroupManager;
try {
    ITssGroupManager = require('../artifacts/contracts/L1/tss/ITssGroupManager.sol/ITssGroupManager.json');
}
catch (_w) { }
let IStakingSlashing;
try {
    IStakingSlashing = require('../artifacts/contracts/L1/tss/ITssStakingSlashing.sol/IStakingSlashing.json');
}
catch (_x) { }
let TssGroupManager;
try {
    TssGroupManager = require('../artifacts/contracts/L1/tss/TssGroupManager.sol/TssGroupManager.json');
}
catch (_y) { }
let TssStakingSlashing;
try {
    TssStakingSlashing = require('../artifacts/contracts/L1/tss/TssStakingSlashing.sol/TssStakingSlashing.json');
}
catch (_z) { }
let BondManager;
try {
    BondManager = require('../artifacts/contracts/L1/verification/BondManager.sol/BondManager.json');
}
catch (_0) { }
let IBondManager;
try {
    IBondManager = require('../artifacts/contracts/L1/verification/IBondManager.sol/IBondManager.json');
}
catch (_1) { }
let IL2CrossDomainMessenger;
try {
    IL2CrossDomainMessenger = require('../artifacts/contracts/L2/messaging/IL2CrossDomainMessenger.sol/IL2CrossDomainMessenger.json');
}
catch (_2) { }
let IL2ERC20Bridge;
try {
    IL2ERC20Bridge = require('../artifacts/contracts/L2/messaging/IL2ERC20Bridge.sol/IL2ERC20Bridge.json');
}
catch (_3) { }
let L2CrossDomainMessenger;
try {
    L2CrossDomainMessenger = require('../artifacts/contracts/L2/messaging/L2CrossDomainMessenger.sol/L2CrossDomainMessenger.json');
}
catch (_4) { }
let L2StandardBridge;
try {
    L2StandardBridge = require('../artifacts/contracts/L2/messaging/L2StandardBridge.sol/L2StandardBridge.json');
}
catch (_5) { }
let L2StandardTokenFactory;
try {
    L2StandardTokenFactory = require('../artifacts/contracts/L2/messaging/L2StandardTokenFactory.sol/L2StandardTokenFactory.json');
}
catch (_6) { }
let BVM_BIT;
try {
    BVM_BIT = require('../artifacts/contracts/L2/predeploys/BVM_BIT.sol/BVM_BIT.json');
}
catch (_7) { }
let BVM_DeployerWhitelist;
try {
    BVM_DeployerWhitelist = require('../artifacts/contracts/L2/predeploys/BVM_DeployerWhitelist.sol/BVM_DeployerWhitelist.json');
}
catch (_8) { }
let BVM_ETH;
try {
    BVM_ETH = require('../artifacts/contracts/L2/predeploys/BVM_ETH.sol/BVM_ETH.json');
}
catch (_9) { }
let BVM_GasPriceOracle;
try {
    BVM_GasPriceOracle = require('../artifacts/contracts/L2/predeploys/BVM_GasPriceOracle.sol/BVM_GasPriceOracle.json');
}
catch (_10) { }
let BVM_L2ToL1MessagePasser;
try {
    BVM_L2ToL1MessagePasser = require('../artifacts/contracts/L2/predeploys/BVM_L2ToL1MessagePasser.sol/BVM_L2ToL1MessagePasser.json');
}
catch (_11) { }
let BVM_SequencerFeeVault;
try {
    BVM_SequencerFeeVault = require('../artifacts/contracts/L2/predeploys/BVM_SequencerFeeVault.sol/BVM_SequencerFeeVault.json');
}
catch (_12) { }
let IBVM_GasPriceOracle;
try {
    IBVM_GasPriceOracle = require('../artifacts/contracts/L2/predeploys/iBVM_GasPriceOracle.sol/IBVM_GasPriceOracle.json');
}
catch (_13) { }
let iBVM_L1BlockNumber;
try {
    iBVM_L1BlockNumber = require('../artifacts/contracts/L2/predeploys/iBVM_L1BlockNumber.sol/iBVM_L1BlockNumber.json');
}
catch (_14) { }
let iBVM_L2ToL1MessagePasser;
try {
    iBVM_L2ToL1MessagePasser = require('../artifacts/contracts/L2/predeploys/iBVM_L2ToL1MessagePasser.sol/iBVM_L2ToL1MessagePasser.json');
}
catch (_15) { }
let ITssRewardContract;
try {
    ITssRewardContract = require('../artifacts/contracts/L2/predeploys/iTssRewardContract.sol/ITssRewardContract.json');
}
catch (_16) { }
let TssRewardContract;
try {
    TssRewardContract = require('../artifacts/contracts/L2/predeploys/TssRewardContract.sol/TssRewardContract.json');
}
catch (_17) { }
let WETH9;
try {
    WETH9 = require('../artifacts/contracts/L2/predeploys/WETH9.sol/WETH9.json');
}
catch (_18) { }
let WBIT9;
try {
    WBIT9 = require('../artifacts/contracts/L2/tokens/wbit.sol/WBIT9.json');
}
catch (_19) { }
let WBITDeployer;
try {
    WBITDeployer = require('../artifacts/contracts/L2/tokens/wbit.sol/WBITDeployer.json');
}
catch (_20) { }
let CrossDomainEnabled;
try {
    CrossDomainEnabled = require('../artifacts/contracts/libraries/bridge/CrossDomainEnabled.sol/CrossDomainEnabled.json');
}
catch (_21) { }
let ICrossDomainMessenger;
try {
    ICrossDomainMessenger = require('../artifacts/contracts/libraries/bridge/ICrossDomainMessenger.sol/ICrossDomainMessenger.json');
}
catch (_22) { }
let Lib_CrossDomainUtils;
try {
    Lib_CrossDomainUtils = require('../artifacts/contracts/libraries/bridge/Lib_CrossDomainUtils.sol/Lib_CrossDomainUtils.json');
}
catch (_23) { }
let Lib_BVMCodec;
try {
    Lib_BVMCodec = require('../artifacts/contracts/libraries/codec/Lib_BVMCodec.sol/Lib_BVMCodec.json');
}
catch (_24) { }
let Lib_DefaultValues;
try {
    Lib_DefaultValues = require('../artifacts/contracts/libraries/constants/Lib_DefaultValues.sol/Lib_DefaultValues.json');
}
catch (_25) { }
let Lib_PredeployAddresses;
try {
    Lib_PredeployAddresses = require('../artifacts/contracts/libraries/constants/Lib_PredeployAddresses.sol/Lib_PredeployAddresses.json');
}
catch (_26) { }
let BN254;
try {
    BN254 = require('../artifacts/contracts/libraries/eigenda/BN254.sol/BN254.json');
}
catch (_27) { }
let DataLayrDisclosureLogic;
try {
    DataLayrDisclosureLogic = require('../artifacts/contracts/libraries/eigenda/DataLayrDisclosureLogic.sol/DataLayrDisclosureLogic.json');
}
catch (_28) { }
let IDataLayrPaymentManager;
try {
    IDataLayrPaymentManager = require('../artifacts/contracts/libraries/eigenda/lib/contracts/interfaces/IDataLayrPaymentManager.sol/IDataLayrPaymentManager.json');
}
catch (_29) { }
let IDataLayrServiceManager;
try {
    IDataLayrServiceManager = require('../artifacts/contracts/libraries/eigenda/lib/contracts/interfaces/IDataLayrServiceManager.sol/IDataLayrServiceManager.json');
}
catch (_30) { }
let IDelegationTerms;
try {
    IDelegationTerms = require('../artifacts/contracts/libraries/eigenda/lib/contracts/interfaces/IDelegationTerms.sol/IDelegationTerms.json');
}
catch (_31) { }
let IEigenLayrDelegation;
try {
    IEigenLayrDelegation = require('../artifacts/contracts/libraries/eigenda/lib/contracts/interfaces/IEigenLayrDelegation.sol/IEigenLayrDelegation.json');
}
catch (_32) { }
let IInvestmentStrategy;
try {
    IInvestmentStrategy = require('../artifacts/contracts/libraries/eigenda/lib/contracts/interfaces/IInvestmentStrategy.sol/IInvestmentStrategy.json');
}
catch (_33) { }
let IPaymentManager;
try {
    IPaymentManager = require('../artifacts/contracts/libraries/eigenda/lib/contracts/interfaces/IPaymentManager.sol/IPaymentManager.json');
}
catch (_34) { }
let IRegistry;
try {
    IRegistry = require('../artifacts/contracts/libraries/eigenda/lib/contracts/interfaces/IRegistry.sol/IRegistry.json');
}
catch (_35) { }
let IRepository;
try {
    IRepository = require('../artifacts/contracts/libraries/eigenda/lib/contracts/interfaces/IRepository.sol/IRepository.json');
}
catch (_36) { }
let IRepositoryAccess;
try {
    IRepositoryAccess = require('../artifacts/contracts/libraries/eigenda/lib/contracts/interfaces/IRepositoryAccess.sol/IRepositoryAccess.json');
}
catch (_37) { }
let IServiceManager;
try {
    IServiceManager = require('../artifacts/contracts/libraries/eigenda/lib/contracts/interfaces/IServiceManager.sol/IServiceManager.json');
}
catch (_38) { }
let IVoteWeigher;
try {
    IVoteWeigher = require('../artifacts/contracts/libraries/eigenda/lib/contracts/interfaces/IVoteWeigher.sol/IVoteWeigher.json');
}
catch (_39) { }
let BLS;
try {
    BLS = require('../artifacts/contracts/libraries/eigenda/lib/contracts/libraries/BLS.sol/BLS.json');
}
catch (_40) { }
let DataStoreUtils;
try {
    DataStoreUtils = require('../artifacts/contracts/libraries/eigenda/lib/contracts/libraries/DataStoreUtils.sol/DataStoreUtils.json');
}
catch (_41) { }
let Merkle;
try {
    Merkle = require('../artifacts/contracts/libraries/eigenda/lib/contracts/libraries/Merkle.sol/Merkle.json');
}
catch (_42) { }
let Parser;
try {
    Parser = require('../artifacts/contracts/libraries/eigenda/Parse.sol/Parser.json');
}
catch (_43) { }
let Lib_AddressManager;
try {
    Lib_AddressManager = require('../artifacts/contracts/libraries/resolver/Lib_AddressManager.sol/Lib_AddressManager.json');
}
catch (_44) { }
let Lib_AddressResolver;
try {
    Lib_AddressResolver = require('../artifacts/contracts/libraries/resolver/Lib_AddressResolver.sol/Lib_AddressResolver.json');
}
catch (_45) { }
let Lib_ResolvedDelegateProxy;
try {
    Lib_ResolvedDelegateProxy = require('../artifacts/contracts/libraries/resolver/Lib_ResolvedDelegateProxy.sol/Lib_ResolvedDelegateProxy.json');
}
catch (_46) { }
let Lib_RLPReader;
try {
    Lib_RLPReader = require('../artifacts/contracts/libraries/rlp/Lib_RLPReader.sol/Lib_RLPReader.json');
}
catch (_47) { }
let Lib_RLPWriter;
try {
    Lib_RLPWriter = require('../artifacts/contracts/libraries/rlp/Lib_RLPWriter.sol/Lib_RLPWriter.json');
}
catch (_48) { }
let Lib_MerkleTrie;
try {
    Lib_MerkleTrie = require('../artifacts/contracts/libraries/trie/Lib_MerkleTrie.sol/Lib_MerkleTrie.json');
}
catch (_49) { }
let Lib_SecureMerkleTrie;
try {
    Lib_SecureMerkleTrie = require('../artifacts/contracts/libraries/trie/Lib_SecureMerkleTrie.sol/Lib_SecureMerkleTrie.json');
}
catch (_50) { }
let Lib_Buffer;
try {
    Lib_Buffer = require('../artifacts/contracts/libraries/utils/Lib_Buffer.sol/Lib_Buffer.json');
}
catch (_51) { }
let Lib_Bytes32Utils;
try {
    Lib_Bytes32Utils = require('../artifacts/contracts/libraries/utils/Lib_Bytes32Utils.sol/Lib_Bytes32Utils.json');
}
catch (_52) { }
let Lib_BytesUtils;
try {
    Lib_BytesUtils = require('../artifacts/contracts/libraries/utils/Lib_BytesUtils.sol/Lib_BytesUtils.json');
}
catch (_53) { }
let Lib_MerkleTree;
try {
    Lib_MerkleTree = require('../artifacts/contracts/libraries/utils/Lib_MerkleTree.sol/Lib_MerkleTree.json');
}
catch (_54) { }
let AddressAliasHelper;
try {
    AddressAliasHelper = require('../artifacts/contracts/standards/AddressAliasHelper.sol/AddressAliasHelper.json');
}
catch (_55) { }
let IL2StandardERC20;
try {
    IL2StandardERC20 = require('../artifacts/contracts/standards/IL2StandardERC20.sol/IL2StandardERC20.json');
}
catch (_56) { }
let L2StandardERC20;
try {
    L2StandardERC20 = require('../artifacts/contracts/standards/L2StandardERC20.sol/L2StandardERC20.json');
}
catch (_57) { }
let FailingReceiver;
try {
    FailingReceiver = require('../artifacts/contracts/test-helpers/FailingReceiver.sol/FailingReceiver.json');
}
catch (_58) { }
let L1StandardBridgeUpgrade;
try {
    L1StandardBridgeUpgrade = require('../artifacts/contracts/test-helpers/L1StandardBridgeUpgrade.sol/L1StandardBridgeUpgrade.json');
}
catch (_59) { }
let TestERC20;
try {
    TestERC20 = require('../artifacts/contracts/test-helpers/TestERC20.sol/TestERC20.json');
}
catch (_60) { }
let Test;
try {
    Test = require('../artifacts/contracts/test-helpers/TestUpgrade.sol/Test.json');
}
catch (_61) { }
let TestUpgrade;
try {
    TestUpgrade = require('../artifacts/contracts/test-helpers/TestUpgrade.sol/TestUpgrade.json');
}
catch (_62) { }
let TestLib_CrossDomainUtils;
try {
    TestLib_CrossDomainUtils = require('../artifacts/contracts/test-libraries/bridge/TestLib_CrossDomainUtils.sol/TestLib_CrossDomainUtils.json');
}
catch (_63) { }
let TestLib_BVMCodec;
try {
    TestLib_BVMCodec = require('../artifacts/contracts/test-libraries/codec/TestLib_BVMCodec.sol/TestLib_BVMCodec.json');
}
catch (_64) { }
let TestLib_RLPReader;
try {
    TestLib_RLPReader = require('../artifacts/contracts/test-libraries/rlp/TestLib_RLPReader.sol/TestLib_RLPReader.json');
}
catch (_65) { }
let TestLib_RLPWriter;
try {
    TestLib_RLPWriter = require('../artifacts/contracts/test-libraries/rlp/TestLib_RLPWriter.sol/TestLib_RLPWriter.json');
}
catch (_66) { }
let TestLib_AddressAliasHelper;
try {
    TestLib_AddressAliasHelper = require('../artifacts/contracts/test-libraries/standards/TestLib_AddressAliasHelper.sol/TestLib_AddressAliasHelper.json');
}
catch (_67) { }
let TestLib_MerkleTrie;
try {
    TestLib_MerkleTrie = require('../artifacts/contracts/test-libraries/trie/TestLib_MerkleTrie.sol/TestLib_MerkleTrie.json');
}
catch (_68) { }
let TestLib_SecureMerkleTrie;
try {
    TestLib_SecureMerkleTrie = require('../artifacts/contracts/test-libraries/trie/TestLib_SecureMerkleTrie.sol/TestLib_SecureMerkleTrie.json');
}
catch (_69) { }
let TestLib_Buffer;
try {
    TestLib_Buffer = require('../artifacts/contracts/test-libraries/utils/TestLib_Buffer.sol/TestLib_Buffer.json');
}
catch (_70) { }
let TestLib_Bytes32Utils;
try {
    TestLib_Bytes32Utils = require('../artifacts/contracts/test-libraries/utils/TestLib_Bytes32Utils.sol/TestLib_Bytes32Utils.json');
}
catch (_71) { }
let TestLib_BytesUtils;
try {
    TestLib_BytesUtils = require('../artifacts/contracts/test-libraries/utils/TestLib_BytesUtils.sol/TestLib_BytesUtils.json');
}
catch (_72) { }
let TestLib_MerkleTree;
try {
    TestLib_MerkleTree = require('../artifacts/contracts/test-libraries/utils/TestLib_MerkleTree.sol/TestLib_MerkleTree.json');
}
catch (_73) { }
const getContractArtifact = (name) => {
    return {
        iL1ChugSplashDeployer,
        L1ChugSplashProxy,
        TransparentUpgradeableProxy,
        BVM_EigenDataLayrChain,
        BVM_EigenDataLayrFee,
        AddressDictator,
        ChugSplashDictator,
        BitTokenERC20,
        IL1CrossDomainMessenger,
        IL1ERC20Bridge,
        IL1StandardBridge,
        L1CrossDomainMessenger,
        L1StandardBridge,
        CanonicalTransactionChain,
        ChainStorageContainer,
        ICanonicalTransactionChain,
        IChainStorageContainer,
        IStateCommitmentChain,
        StateCommitmentChain,
        Sequencer,
        ITssGroupManager,
        IStakingSlashing,
        TssGroupManager,
        TssStakingSlashing,
        BondManager,
        IBondManager,
        IL2CrossDomainMessenger,
        IL2ERC20Bridge,
        L2CrossDomainMessenger,
        L2StandardBridge,
        L2StandardTokenFactory,
        BVM_BIT,
        BVM_DeployerWhitelist,
        BVM_ETH,
        BVM_GasPriceOracle,
        BVM_L2ToL1MessagePasser,
        BVM_SequencerFeeVault,
        IBVM_GasPriceOracle,
        iBVM_L1BlockNumber,
        iBVM_L2ToL1MessagePasser,
        ITssRewardContract,
        TssRewardContract,
        WETH9,
        WBIT9,
        WBITDeployer,
        CrossDomainEnabled,
        ICrossDomainMessenger,
        Lib_CrossDomainUtils,
        Lib_BVMCodec,
        Lib_DefaultValues,
        Lib_PredeployAddresses,
        BN254,
        DataLayrDisclosureLogic,
        IDataLayrPaymentManager,
        IDataLayrServiceManager,
        IDelegationTerms,
        IEigenLayrDelegation,
        IInvestmentStrategy,
        IPaymentManager,
        IRegistry,
        IRepository,
        IRepositoryAccess,
        IServiceManager,
        IVoteWeigher,
        BLS,
        DataStoreUtils,
        Merkle,
        Parser,
        Lib_AddressManager,
        Lib_AddressResolver,
        Lib_ResolvedDelegateProxy,
        Lib_RLPReader,
        Lib_RLPWriter,
        Lib_MerkleTrie,
        Lib_SecureMerkleTrie,
        Lib_Buffer,
        Lib_Bytes32Utils,
        Lib_BytesUtils,
        Lib_MerkleTree,
        AddressAliasHelper,
        IL2StandardERC20,
        L2StandardERC20,
        FailingReceiver,
        L1StandardBridgeUpgrade,
        TestERC20,
        Test,
        TestUpgrade,
        TestLib_CrossDomainUtils,
        TestLib_BVMCodec,
        TestLib_RLPReader,
        TestLib_RLPWriter,
        TestLib_AddressAliasHelper,
        TestLib_MerkleTrie,
        TestLib_SecureMerkleTrie,
        TestLib_Buffer,
        TestLib_Bytes32Utils,
        TestLib_BytesUtils,
        TestLib_MerkleTree
    }[name];
};
exports.getContractArtifact = getContractArtifact;
//# sourceMappingURL=contract-artifacts.js.map