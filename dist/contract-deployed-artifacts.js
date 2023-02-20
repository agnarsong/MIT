"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeployedContractArtifact = void 0;
const goerli_qa__Lib_AddressManager = require('../deployments/goerli-qa/Lib_AddressManager.json');
const goerli_qa__Proxy__BVM_L1CrossDomainMessenger = require('../deployments/goerli-qa/Proxy__BVM_L1CrossDomainMessenger.json');
const goerli_qa__Proxy__BVM_L1StandardBridge = require('../deployments/goerli-qa/Proxy__BVM_L1StandardBridge.json');
const goerli_qa__StateCommitmentChain = require('../deployments/goerli-qa/StateCommitmentChain.json');
const goerli_testnet__Lib_AddressManager = require('../deployments/goerli-testnet/Lib_AddressManager.json');
const goerli_testnet__Proxy__BVM_L1CrossDomainMessenger = require('../deployments/goerli-testnet/Proxy__BVM_L1CrossDomainMessenger.json');
const goerli_testnet__Proxy__BVM_L1StandardBridge = require('../deployments/goerli-testnet/Proxy__BVM_L1StandardBridge.json');
const goerli_testnet__StateCommitmentChain = require('../deployments/goerli-testnet/StateCommitmentChain.json');
const getDeployedContractArtifact = (name, network) => {
    return {
        goerli_qa__Lib_AddressManager,
        goerli_qa__Proxy__BVM_L1CrossDomainMessenger,
        goerli_qa__Proxy__BVM_L1StandardBridge,
        goerli_qa__StateCommitmentChain,
        goerli_testnet__Lib_AddressManager,
        goerli_testnet__Proxy__BVM_L1CrossDomainMessenger,
        goerli_testnet__Proxy__BVM_L1StandardBridge,
        goerli_testnet__StateCommitmentChain
    }[(network + '__' + name).replace(/-/g, '_')];
};
exports.getDeployedContractArtifact = getDeployedContractArtifact;
//# sourceMappingURL=contract-deployed-artifacts.js.map