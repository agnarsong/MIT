import { ethers } from "hardhat";
import * as mantle from "@mantleio/sdk"
import { Contract, ContractTransaction } from "ethers";
import {execSync} from 'child_process';
import { 
  getSigners, getContracts, getTokenContracts, 
  crossChainMessenger, displayWei, TestResult,
  AllBalances, Balances } from '../utils/setup'

import dotenv from "dotenv"
dotenv.config()

let tr: TestResult
let amount: string
let response: ContractTransaction

let l1Greeter: Contract
let l2Greeter: Contract
let fromL1_ControlL2Greeter: Contract
let fromL2_ControlL1Greeter: Contract


describe('Communication between contracts on L1 and L2', function () {

  this.timeout(150000);
  this.slow(150000);
  
  before(async() => {
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

    const l1Greeter_json =await import(
      '../artifacts/contracts/op-cross-messages/Greeter.sol/Greeter.json'
    )
    const l2Greeter_json =await import(
      '../artifacts/contracts/op-cross-messages/Greeter.sol/Greeter.json'
    )
    const fromL1_ControlL2Greeter_json =await import(
      '../artifacts/contracts/op-cross-messages/FromL1_ControlL2Greeter.sol/FromL1_ControlL2Greeter.json'
    )
    const fromL2_ControlL1Greeter_json =await import(
      '../artifacts/contracts/op-cross-messages/FromL2_ControlL1Greeter.sol/FromL2_ControlL1Greeter.json'
    )

    l1Greeter = await new ethers.ContractFactory(
      l1Greeter_json.abi, 
      l1Greeter_json.bytecode,
      tr.SIGNERS.L1_Wallet
    ).deploy("l1 default messages!")
    await l1Greeter.deployed();
    // console.log("l1Greeter address: ", l1Greeter.address)
    
    l2Greeter = await new ethers.ContractFactory(
      l2Greeter_json.abi, 
      l2Greeter_json.bytecode,
      tr.SIGNERS.L2_Wallet
    ).deploy("l2 default messages!")
    await l2Greeter.deployed();
    // console.log("l2Greeter address: ", l2Greeter.address)

    fromL1_ControlL2Greeter = await new ethers.ContractFactory(
      fromL1_ControlL2Greeter_json.abi, 
      fromL1_ControlL2Greeter_json.bytecode,
      tr.SIGNERS.L1_Wallet
    ).deploy(process.env.Proxy__BVM_L1CrossDomainMessenger!, l2Greeter.address)
    await fromL1_ControlL2Greeter.deployed();
    // console.log("fromL1_ControlL2Greeter address: ", fromL1_ControlL2Greeter.address)

    fromL2_ControlL1Greeter = await new ethers.ContractFactory(
      fromL2_ControlL1Greeter_json.abi, 
      fromL2_ControlL1Greeter_json.bytecode,
      tr.SIGNERS.L2_Wallet
    ).deploy(process.env.L2_CROSS_DOMAIN_MESSENGER!, l1Greeter.address)
    await fromL2_ControlL1Greeter.deployed();
    // console.log("fromL2_ControlL1Greeter address: ", fromL2_ControlL1Greeter.address)

  });

  describe('L1 message to L2',()=>{

    it('should get l2 greeter message', async () => {
      let message = await l2Greeter.greet()

      message.should.be.equal("l2 default messages!")
    })

    it('should l1 can cross message to l2', async () => {
      
      let tx = await fromL1_ControlL2Greeter.setGreeting("l1 have updated l2 message!")
      let rcpt = await tx.wait()
      // console.log(rcpt)

      execSync('sleep 5');
    })

    it('should get l2 updated greeter message', async () => {
      let m2 = await l2Greeter.greet()
      m2.should.be.equal("l1 have updated l2 message!")
    })
  })

  describe('L2 message to L1',()=>{

    it('should get l1 greeter message', async () => {
      let message = await l1Greeter.greet()

      message.should.be.equal("l1 default messages!")
    })

    it('should l2 can cross message to l1', async () => {

      response = await fromL2_ControlL1Greeter.setGreeting("l2 have updated l1 message!")
      let rcpt = await response.wait()
      // console.log(response.hash, rcpt.to)

      execSync('sleep 20');
    })

    it('should finalizeMessage is success', async () => {
      const finalizeMessageResponse = await tr.CROSS_CHAIN_MESSAGER.finalizeMessage(response)

      finalizeMessageResponse.type!.should.to.equal(2)
    })

    it('should MessageStatus is RELAYED', async () => {

      await tr.CROSS_CHAIN_MESSAGER.waitForMessageStatus(
        response.hash,mantle.MessageStatus.RELAYED)
      let gms = await tr.CROSS_CHAIN_MESSAGER.getMessageStatus(response.hash)
      
      gms.should.to.equal(5)
    })

    it('should get l1 updated greeter message', async () => {
      let m1 = await l1Greeter.greet()

      m1.should.be.equal("l2 have updated l1 message!")
    })
  })
});