import { ethers } from "hardhat";
import { Contract, constants } from 'ethers'
import { Interface } from 'ethers/lib/utils'
import { 
  getSigners, getContracts, getTokenContracts, 
  crossChainMessenger, displayWei, TestResult,
  AllBalances, Balances, expect, NON_NULL_BYTES32 } from '../utils/setup'

import {execSync} from 'child_process';
import dotenv from "dotenv"
dotenv.config()

let tr: TestResult
let tokenID: number
let L1ERC721: Contract
let L2ERC721: Contract
const FINALIZATION_GAS = 600_000
const DUMMY_L2_ERC721_ADDRESS = ethers.utils.getAddress(
    '0x' + 'abba'.repeat(10)
)
const ERR_INVALID_X_DOMAIN_MESSAGE =
  'ERC721Bridge: function can only be called from the other bridge'

const NON_ZERO_ADDRESS = '0x' + '11'.repeat(20)

let IL2ERC721Bridge: Interface

// describe.skip("ERC721 contract", () =>{

//     async function deployTokenFixture() {
//         const [owner, addr1, addr2] = await ethers.getSigners();
//         const erc721 = await new TestERC721__factory(owner).deploy();
//         await erc721.deployed();
//         return { erc721, owner, addr1, addr2 };
//       }

//     describe("Deployment", () => {
    
//         it("Should set the right name", async () => {
//             const { erc721 } = await loadFixture(deployTokenFixture);
//             expect(await erc721.name()).to.equal("TestNFT");
//         });
        
//         it("Should set the right owner", async () => {
//             const { erc721, owner } = await loadFixture(deployTokenFixture);
//             expect(await erc721.owner()).to.equal(owner.address);
//         });

//         it("Should set the right symbol", async () => {
//             const { erc721 } = await loadFixture(deployTokenFixture);
//             expect(await erc721.symbol()).to.equal("TNFT");
//         });

//         it("Should assign the total supply of tokens to the owner", async  () => {
//             const { erc721, owner } = await loadFixture(deployTokenFixture);
//             const ownerBalance = await erc721.balanceOf(owner.address);
//             expect(await erc721.totalSupply()).to.equal(ownerBalance);
//         });
//     });

//     describe("mint", ()=>{
//         it("Should mint a token with token ID 1 & 2 to account1", async  () => {
//             const { erc721, owner } = await loadFixture(deployTokenFixture);

//             await erc721.safeMint(owner.address, 1);
//             expect(await erc721.ownerOf(1)).to.equal(owner.address);
      
//             await erc721.safeMint(owner.address, 2);
//             expect(await erc721.ownerOf(2)).to.equal(owner.address);
      
//             expect(await erc721.balanceOf(owner.address)).to.equal(2);
            
//             const svg = await erc721.tokenURI(2)
//             console.log("svg: ", svg)
//           });
      
//     })
// })

describe("ERC721", function () {
    this.timeout(150000);
    this.slow(150000);
    
    before(async() => {  
        tr = {} as TestResult
        tr.ALLBALANCES = {
            BEFORE: {} as Balances,
            AFTER: {} as Balances
        } as AllBalances
    
        tr.SIGNERS = await getSigners();
        tr.CONTRACTS = await getContracts();
        tr.TOKEN_CONTRACTS = await getTokenContracts();
        tr.CROSS_CHAIN_MESSAGER = await crossChainMessenger()

        tokenID = 1

        const L2ERC721_json =await import('../artifacts/contracts/mantleContracts/contracts/L2/messaging/L2ERC721Bridge.sol/L2ERC721Bridge.json')
        const IL2ERC721Bridge = (await new ethers.ContractFactory(
                L2ERC721_json.abi, 
                L2ERC721_json.bytecode,
                tr.SIGNERS.L2_DEPLOY_Wallet
            )).interface

        const L1_ERC721_json =await import('../artifacts/contracts/TestERC721.sol/TestERC721.json')
        L1ERC721 = await new ethers.ContractFactory(
            L1_ERC721_json.abi, 
            L1_ERC721_json.bytecode,
            tr.SIGNERS.L1_DEPLOY_Wallet
        ).deploy('L1ERC721', 'ERC')

        await L1ERC721.deployed();
            
        console.log("L1ERC721.address: ", L1ERC721.address)
        const l1code = await tr.SIGNERS.L1_DEPLOY_Wallet.provider.getCode(L1ERC721.address)
        l1code.should.not.to.equal('0x')

        await L1ERC721.safeMint(tr.SIGNERS.L1_Wallet.address, tokenID)
        execSync('sleep 10');
        // L1 L1_Wallet's balance decreases by 1
        const L1_Wallet_b = await L1ERC721.balanceOf(tr.SIGNERS.L1_Wallet.address)
        expect(L1_Wallet_b).to.equal(1)
        // (await L1ERC721.ownerOf(tokenID)).should.to.equal(tr.SIGNERS.L1_Wallet.address)

        const L2_ERC721_json =await import('../artifacts/contracts/op-erc721/OptimismMintableERC721.sol/OptimismMintableERC721.json')
        L2ERC721 = await new ethers.ContractFactory(
            L2_ERC721_json.abi, 
            L2_ERC721_json.bytecode,
            tr.SIGNERS.L2_DEPLOY_Wallet
        ).deploy(
            process.env.L2ERC721Bridge!,
            process.env.L2CHAINID!,
            L1ERC721.address,
            'L2Token',
            'L2T',
            { gasLimit: 4_000_000 }
          )

        await L2ERC721.deployed();

        console.log("L2ERC721 address: ", L2ERC721.address);
        // const l2code = await tr.SIGNERS.L2_DEPLOY_Wallet.provider.getCode(L2ERC721.address);
        // l2code.should.not.to.equal('0x');
        (await L2ERC721.name()).should.to.equal('L2Token');
    })

    describe("ERC721 deposit", function () {
        // should approve
        it('should approve before bridgeERC721()', async () => {
            await L1ERC721.connect(tr.SIGNERS.L1_Wallet).
                approve(tr.CONTRACTS.L1_ERC721_Bridge.address, tokenID)
        })
    
        // query allowance
    
        it.skip('bridgeERC721() reverts if remote token is address(0)', async () => {
    
            expect(await
                tr.CONTRACTS.L1_ERC721_Bridge.connect(tr.SIGNERS.L1_Wallet).bridgeERC721(
                L1ERC721.address,
                constants.AddressZero,
                tokenID,
                FINALIZATION_GAS,
                NON_NULL_BYTES32
              )
            ).to.be.revertedWith("ERC721Bridge: remote token cannot be address(0)")
        })
    
        it('bridgeERC721() escrows the deposit and sends the correct deposit message', async () => {
            // alice calls deposit on the bridge and the L1 bridge calls transferFrom on the token.
            // emits an ERC721BridgeInitiated event with the correct arguments.
            await expect(
                tr.CONTRACTS.L1_ERC721_Bridge.connect(tr.SIGNERS.L1_Wallet).bridgeERC721(
                L1ERC721.address,
                L2ERC721.address,
                tokenID,
                FINALIZATION_GAS,
                NON_NULL_BYTES32
              )
            )
              .to.emit(tr.CONTRACTS.L1_ERC721_Bridge, 'ERC721BridgeInitiated')
              .withArgs(
                L1ERC721.address,
                L2ERC721.address,
                tr.SIGNERS.L1_Wallet.address,
                tr.SIGNERS.L1_Wallet.address,
                tokenID,
                NON_NULL_BYTES32
              )
      
            // const depositCallToMessenger =
            //   tr.CONTRACTS.L1_CROSS_DOMAIN_MESSENGER.getCall(0)
      
            // L1 L1_Wallet's balance decreases by 0
            const depositerBalance = await L1ERC721.balanceOf(tr.SIGNERS.L1_Wallet.address)
            expect(depositerBalance).to.equal(0)
      
            // bridge's balance increases by 1
            const bridgeBalance = await L1ERC721.balanceOf(tr.CONTRACTS.L1_ERC721_Bridge.address)
            expect(bridgeBalance).to.equal(1)
      
            // // Check the correct cross-chain call was sent:
            // // Message should be sent to the L2 bridge
            // expect(depositCallToMessenger.args[0]).to.equal(tr.CONTRACTS.L2_ERC721_Bridge.address)
            // // Message data should be a call telling the L2DepositedERC721 to finalize the deposit
      
            // // the L1 bridge sends the correct message to the L1 messenger
            // expect(depositCallToMessenger.args[1]).to.equal(
            // IL2ERC721Bridge.encodeFunctionData('finalizeBridgeERC721', [
            //     L2ERC721.address,
            //     L1ERC721.address,
            //     tr.SIGNERS.L1_Wallet.address,
            //     tr.SIGNERS.L1_Wallet.address,
            //     tokenID,
            //     NON_NULL_BYTES32,
            //   ])
            // )
            // expect(depositCallToMessenger.args[2]).to.equal(FINALIZATION_GAS)
      
            // Updates the deposits mapping
            expect(
              await tr.CONTRACTS.L1_ERC721_Bridge.deposits(
                L1ERC721.address,
                L2ERC721.address,
                tokenID
              )
            ).to.equal(true)
    
            // // L2 L1_Wallet's balance decreases by 1
            // const reciverBalance = await L2ERC721.balanceOf(tr.SIGNERS.L1_Wallet.address)
            // expect(reciverBalance).to.equal(1)
    
            console.log("L2ERC721 name: ", await L2ERC721.name())
            console.log("L1_Wallet's balance: ", await L2ERC721.balanceOf(tr.SIGNERS.L1_Wallet.address))
            console.log("L2_Wallet's balance: ", await L2ERC721.balanceOf(tr.SIGNERS.L2_Wallet.address))
            console.log(await L2ERC721.ownerOf(tokenID))
          })
    })

    describe.skip("ERC721 deposit", function () {
        it('onlyFromCrossDomainAccount: should revert on calls from a non-crossDomainMessenger L1 account', async () => {
            await expect(
              tr.CONTRACTS.L1_ERC721_Bridge.connect(tr.SIGNERS.L1_Wallet).finalizeBridgeERC721(
                L1ERC721.address,
                L2ERC721.address,
                constants.AddressZero,
                constants.AddressZero,
                tokenID,
                NON_NULL_BYTES32
              )
            ).to.be.revertedWith(ERR_INVALID_X_DOMAIN_MESSAGE)
          })
      
          it('onlyFromCrossDomainAccount: should revert on calls from the right crossDomainMessenger, but wrong xDomainMessageSender (ie. not the L2DepositedERC721)', async () => {
            await expect(
                tr.CONTRACTS.L1_ERC721_Bridge.finalizeBridgeERC721(
                L1ERC721.address,
                L2ERC721.address,
                constants.AddressZero,
                constants.AddressZero,
                tokenID,
                NON_NULL_BYTES32,
                {
                  from: tr.CONTRACTS.L1_CROSS_DOMAIN_MESSENGER.address,
                }
              )
            ).to.be.revertedWith(ERR_INVALID_X_DOMAIN_MESSAGE)
          })
      
          describe('withdrawal attempts that pass the onlyFromCrossDomainAccount check', () => {
            beforeEach(async () => {
              // First Alice will send an NFT so that there's a balance to be withdrawn
              await L1ERC721.connect(tr.SIGNERS.L1_Wallet).approve(tr.CONTRACTS.L1_ERC721_Bridge.address, tokenID)
      
              await tr.CONTRACTS.L1_ERC721_Bridge.connect(tr.SIGNERS.L1_Wallet).bridgeERC721(
                L1ERC721.address,
                L2ERC721.address,
                tokenID,
                FINALIZATION_GAS,
                NON_NULL_BYTES32
              )
      
              // make sure bridge owns NFT
              expect(await L1ERC721.ownerOf(tokenID)).to.equal(tr.CONTRACTS.L1_ERC721_Bridge.address)
      
            //   tr.CONTRACTS.L1_CROSS_DOMAIN_MESSENGER.xDomainMessageSender.returns(
            //     tr.CONTRACTS.L2_ERC721_Bridge.address
            //   )
            })
      
            it('should credit funds to the withdrawer to finalize withdrawal', async () => {
              // finalizing the withdrawal emits an ERC721BridgeFinalized event with the correct arguments.
              await expect(
                tr.CONTRACTS.L1_ERC721_Bridge.finalizeBridgeERC721(
                  L1ERC721.address,
                  L2ERC721.address,
                  NON_ZERO_ADDRESS,
                  NON_ZERO_ADDRESS,
                  tokenID,
                  NON_NULL_BYTES32,
                  { from: tr.CONTRACTS.L1_Standard_Bridge.address }
                )
              )
                .to.emit(tr.CONTRACTS.L1_ERC721_Bridge, 'ERC721BridgeFinalized')
                .withArgs(
                  L1ERC721.address,
                  L2ERC721.address,
                  NON_ZERO_ADDRESS,
                  NON_ZERO_ADDRESS,
                  tokenID,
                  NON_NULL_BYTES32
                )
      
              // NFT is transferred to new owner
              expect(await L1ERC721.ownerOf(tokenID)).to.equal(NON_ZERO_ADDRESS)
      
              // deposits state variable is updated
              expect(
                await tr.CONTRACTS.L1_ERC721_Bridge.deposits(
                  L1ERC721.address,
                  DUMMY_L2_ERC721_ADDRESS,
                  tokenID
                )
              ).to.equal(false)
            })
          })
    })

    describe('constructor', async () => {
    
        it('initializes correctly', async () => {
          expect(await tr.CONTRACTS.L2_ERC721_Bridge.messenger()).equals(
            tr.CONTRACTS.L2_CROSS_DOMAIN_MESSENGER.address
          )
          console.log("======1")
          expect(await tr.CONTRACTS.L2_ERC721_Bridge.otherBridge()).equals(tr.CONTRACTS.L1_ERC721_Bridge.address)
        })
    })
    
    // // test the transfer flow of moving a token from L1 to L2
    // describe('finalizeBridgeERC721', () => {
    // it('onlyFromCrossDomainAccount: should revert on calls from a non-crossDomainMessenger L2 account', async () => {
    //     await expect(
    //     L2ERC721Bridge.connect(alice).finalizeBridgeERC721(
    //         DUMMY_L1ERC721_ADDRESS,
    //         NON_ZERO_ADDRESS,
    //         NON_ZERO_ADDRESS,
    //         NON_ZERO_ADDRESS,
    //         TOKEN_ID,
    //         NON_NULL_BYTES32
    //     )
    //     ).to.be.revertedWith(ERR_INVALID_X_DOMAIN_MESSAGE)
    // })

    // it('onlyFromCrossDomainAccount: should revert on calls from the right crossDomainMessenger, but wrong xDomainMessageSender (ie. not the L1ERC721Bridge)', async () => {
    //     Fake__L2CrossDomainMessenger.xDomainMessageSender.returns(
    //     NON_ZERO_ADDRESS
    //     )

    //     await expect(
    //     L2ERC721Bridge.connect(l2MessengerImpersonator).finalizeBridgeERC721(
    //         DUMMY_L1ERC721_ADDRESS,
    //         NON_ZERO_ADDRESS,
    //         NON_ZERO_ADDRESS,
    //         NON_ZERO_ADDRESS,
    //         TOKEN_ID,
    //         NON_NULL_BYTES32,
    //         {
    //         from: Fake__L2CrossDomainMessenger.address,
    //         }
    //     )
    //     ).to.be.revertedWith(ERR_INVALID_X_DOMAIN_MESSAGE)
    // })

    // it('should credit funds to the depositor', async () => {
    //     Fake__L2CrossDomainMessenger.xDomainMessageSender.returns(
    //     DUMMY_L1BRIDGE_ADDRESS
    //     )

    //     // Assert that nobody owns the L2 token initially
    //     await expect(L2ERC721.ownerOf(TOKEN_ID)).to.be.revertedWith(
    //     'ERC721: owner query for nonexistent token'
    //     )

    //     // Successfully finalizes the deposit.
    //     const expectedResult = expect(
    //     L2ERC721Bridge.connect(l2MessengerImpersonator).finalizeBridgeERC721(
    //         L2ERC721.address,
    //         DUMMY_L1ERC721_ADDRESS,
    //         aliceAddress,
    //         bobsAddress,
    //         TOKEN_ID,
    //         NON_NULL_BYTES32,
    //         {
    //         from: Fake__L2CrossDomainMessenger.address,
    //         }
    //     )
    //     )

    //     // Depositing causes an ERC721BridgeFinalized event to be emitted.
    //     await expectedResult.to
    //     .emit(L2ERC721Bridge, 'ERC721BridgeFinalized')
    //     .withArgs(
    //         L2ERC721.address,
    //         DUMMY_L1ERC721_ADDRESS,
    //         aliceAddress,
    //         bobsAddress,
    //         TOKEN_ID,
    //         NON_NULL_BYTES32
    //     )

    //     // Causes a Transfer event to be emitted from the L2 ERC721.
    //     await expectedResult.to
    //     .emit(L2ERC721, 'Transfer')
    //     .withArgs(constants.AddressZero, bobsAddress, TOKEN_ID)

    //     // Bob is now the owner of the L2 ERC721
    //     const tokenIdOwner = await L2ERC721.ownerOf(TOKEN_ID)
    //     tokenIdOwner.should.equal(bobsAddress)
    // })
    // })
    
    describe('withdrawals', () => {
    let L2Token: Contract
    beforeEach(async () => {
        L2Token = await (
        await ethers.getContractFactory('OptimismMintableERC721')
        ).deploy(
        L2ERC721Bridge.address,
        100,
        DUMMY_L1ERC721_ADDRESS,
        'L2Token',
        'L2T'
        )

        await ethers.provider.send('hardhat_impersonateAccount', [
        L2ERC721Bridge.address,
        ])

        await ethers.provider.send('hardhat_setBalance', [
        L2ERC721Bridge.address,
        toRpcHexString(ethers.utils.parseEther('1')),
        ])

        const signer = await ethers.getSigner(L2ERC721Bridge.address)
        await L2Token.connect(signer).safeMint(aliceAddress, TOKEN_ID)
    })

    it('bridgeERC721() reverts if remote token is address(0)', async () => {
        await expect(
        L2ERC721Bridge.connect(alice).bridgeERC721(
            L2Token.address,
            constants.AddressZero,
            TOKEN_ID,
            FINALIZATION_GAS,
            NON_NULL_BYTES32
        )
        ).to.be.revertedWith('ERC721Bridge: remote token cannot be address(0)')
    })

    it('bridgeERC721() reverts when called by non-owner of nft', async () => {
        await expect(
        L2ERC721Bridge.connect(bob).bridgeERC721(
            L2Token.address,
            DUMMY_L1ERC721_ADDRESS,
            TOKEN_ID,
            0,
            NON_NULL_BYTES32
        )
        ).to.be.revertedWith(ERR_INVALID_WITHDRAWAL)
    })

    it('bridgeERC721() reverts if called by a contract', async () => {
        await expect(
        L2ERC721Bridge.connect(l2MessengerImpersonator).bridgeERC721(
            L2Token.address,
            DUMMY_L1ERC721_ADDRESS,
            TOKEN_ID,
            0,
            NON_NULL_BYTES32
        )
        ).to.be.revertedWith('ERC721Bridge: account is not externally owned')
    })

    it('bridgeERC721() burns and sends the correct withdrawal message', async () => {
        // Make sure that alice begins as the NFT owner
        expect(await L2Token.ownerOf(TOKEN_ID)).to.equal(aliceAddress)

        // Initiates a successful withdrawal.
        const expectedResult = expect(
        L2ERC721Bridge.connect(alice).bridgeERC721(
            L2Token.address,
            DUMMY_L1ERC721_ADDRESS,
            TOKEN_ID,
            0,
            NON_NULL_BYTES32
        )
        )

        // A successful withdrawal causes an ERC721BridgeInitiated event to be emitted from the L2 ERC721 Bridge.
        await expectedResult.to
        .emit(L2ERC721Bridge, 'ERC721BridgeInitiated')
        .withArgs(
            L2Token.address,
            DUMMY_L1ERC721_ADDRESS,
            aliceAddress,
            aliceAddress,
            TOKEN_ID,
            NON_NULL_BYTES32
        )

        // A withdrawal also causes a Transfer event to be emitted the L2 ERC721, signifying that the L2 token
        // has been burnt.
        await expectedResult.to
        .emit(L2Token, 'Transfer')
        .withArgs(aliceAddress, constants.AddressZero, TOKEN_ID)

        // Assert Alice's balance went down
        const aliceBalance = await L2Token.balanceOf(aliceAddress)
        expect(aliceBalance).to.equal(0)

        // Assert that the token isn't owned by anyone
        await expect(L2Token.ownerOf(TOKEN_ID)).to.be.revertedWith(
        'ERC721: owner query for nonexistent token'
        )

        const withdrawalCallToMessenger =
        Fake__L2CrossDomainMessenger.sendMessage.getCall(0)

        // Assert the correct cross-chain call was sent:
        // Message should be sent to the L1ERC721Bridge on L1
        expect(withdrawalCallToMessenger.args[0]).to.equal(DUMMY_L1BRIDGE_ADDRESS)
        // Message data should be a call telling the L1ERC721Bridge to finalize the withdrawal
        expect(withdrawalCallToMessenger.args[1]).to.equal(
        Factory__L1ERC721Bridge.interface.encodeFunctionData(
            'finalizeBridgeERC721',
            [
            DUMMY_L1ERC721_ADDRESS,
            L2Token.address,
            aliceAddress,
            aliceAddress,
            TOKEN_ID,
            NON_NULL_BYTES32,
            ]
        )
        )
        // gaslimit should be correct
        expect(withdrawalCallToMessenger.args[2]).to.equal(0)
    })

    it('bridgeERC721To() reverts if NFT receiver is address(0)', async () => {
        await expect(
        L2ERC721Bridge.connect(alice).bridgeERC721To(
            L2Token.address,
            DUMMY_L1ERC721_ADDRESS,
            constants.AddressZero,
            TOKEN_ID,
            0,
            NON_NULL_BYTES32
        )
        ).to.be.revertedWith('ERC721Bridge: nft recipient cannot be address(0)')
    })

    it('bridgeERC721To() reverts when called by non-owner of nft', async () => {
        await expect(
        L2ERC721Bridge.connect(bob).bridgeERC721To(
            L2Token.address,
            DUMMY_L1ERC721_ADDRESS,
            bobsAddress,
            TOKEN_ID,
            0,
            NON_NULL_BYTES32
        )
        ).to.be.revertedWith(ERR_INVALID_WITHDRAWAL)
    })

    it('bridgeERC721To() burns and sends the correct withdrawal message', async () => {
        // Make sure that alice begins as the NFT owner
        expect(await L2Token.ownerOf(TOKEN_ID)).to.equal(aliceAddress)

        // Initiates a successful withdrawal.
        const expectedResult = expect(
        L2ERC721Bridge.connect(alice).bridgeERC721To(
            L2Token.address,
            DUMMY_L1ERC721_ADDRESS,
            bobsAddress,
            TOKEN_ID,
            0,
            NON_NULL_BYTES32
        )
        )

        // A successful withdrawal causes an ERC721BridgeInitiated event to be emitted from the L2 ERC721 Bridge.
        await expectedResult.to
        .emit(L2ERC721Bridge, 'ERC721BridgeInitiated')
        .withArgs(
            L2Token.address,
            DUMMY_L1ERC721_ADDRESS,
            aliceAddress,
            bobsAddress,
            TOKEN_ID,
            NON_NULL_BYTES32
        )

        // A withdrawal also causes a Transfer event to be emitted the L2 ERC721, signifying that the L2 token
        // has been burnt.
        await expectedResult.to
        .emit(L2Token, 'Transfer')
        .withArgs(aliceAddress, constants.AddressZero, TOKEN_ID)

        // Assert Alice's balance went down
        const aliceBalance = await L2Token.balanceOf(aliceAddress)
        expect(aliceBalance).to.equal(0)

        // Assert that the token isn't owned by anyone
        await expect(L2Token.ownerOf(TOKEN_ID)).to.be.revertedWith(
        'ERC721: owner query for nonexistent token'
        )

        const withdrawalCallToMessenger =
        Fake__L2CrossDomainMessenger.sendMessage.getCall(0)

        // Assert the correct cross-chain call was sent.
        // Message should be sent to the L1ERC721Bridge on L1
        expect(withdrawalCallToMessenger.args[0]).to.equal(DUMMY_L1BRIDGE_ADDRESS)
        // The message data should be a call telling the L1ERC721Bridge to finalize the withdrawal
        expect(withdrawalCallToMessenger.args[1]).to.equal(
        Factory__L1ERC721Bridge.interface.encodeFunctionData(
            'finalizeBridgeERC721',
            [
            DUMMY_L1ERC721_ADDRESS,
            L2Token.address,
            aliceAddress,
            bobsAddress,
            TOKEN_ID,
            NON_NULL_BYTES32,
            ]
        )
        )
        // gas value is ignored and set to 0.
        expect(withdrawalCallToMessenger.args[2]).to.equal(0)
    })
    })

})


// event:
// Approval
// ApprovalForAll
// OwnershipTransferred
// Transfer

// function:
// approve
// burn
// renounceOwnership
// safeMint
// safeTransferFrom
// safeTransferFrom
// setApprovalForAll
// transferFrom
// transferOwnership


// balanceOf
// getApproved
// isApprovedForAll
// name  --
// owner --
// ownerOf
// supportsInterface
// symbol --
// tokenByIndex
// tokenOfOwnerByIndex
// tokenURI
// totalSupply --
