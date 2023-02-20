import {expect} from "chai"
import {ethers} from "hardhat"

import { 
    getSigners, getContracts, getTokenContracts, 
    crossChainMessenger, displayWei, TestResult,
    AllBalances, Balances } from '../utils/setup'
import {execSync} from 'child_process';
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { check } from "prettier";

let tr: TestResult

describe("ERC20Token contract", function () {

    this.timeout(150000);
    this.slow(150000);
    
    before( async() => {
  
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

    async function deployTokenFixture() {

        const l2CustomERC20_json =await import(
            '../artifacts/contracts/CustomERC20.sol/CustomERC20.json'
          )

        const l2CustomERC20 = await new ethers.ContractFactory(
            l2CustomERC20_json.abi, 
            l2CustomERC20_json.bytecode,
            tr.SIGNERS.L2_Wallet
        ).deploy("Testcoin","abiton")
        await l2CustomERC20.deployed();
        // console.log(l2CustomERC20.address)
        const owner = tr.SIGNERS.L2_Wallet
        const [ , addr1, addr2] = await ethers.getSigners();
        
        return { l2CustomERC20, owner, addr1, addr2 };
      }

    describe.skip("Deployment", function () {
        
        it("Should set the right name", async () => {
            const { l2CustomERC20 } = await loadFixture(deployTokenFixture);
            expect(await l2CustomERC20.name()).to.equal("Testcoin");
        });
        
        it("Should set the right owner", async () => {
            const { l2CustomERC20 } = await loadFixture(deployTokenFixture);
            expect(await l2CustomERC20.owner()).to.equal(tr.SIGNERS.L2_Wallet.address);
        });
    
        it("Should set the right symbol", async () => {
            const { l2CustomERC20 } = await loadFixture(deployTokenFixture);
            expect(await l2CustomERC20.symbol()).to.equal("abiton");
        });
        
        it("Should set the right decimals", async () => {
            const { l2CustomERC20 } = await loadFixture(deployTokenFixture);
            expect(await l2CustomERC20.decimals()).to.equal(18);
        });

        it("Should assign the total supply of tokens to the owner", async function () {
            const { l2CustomERC20 } = await loadFixture(deployTokenFixture);
            const ownerBalance = await l2CustomERC20.balanceOf(tr.SIGNERS.L2_Wallet.address);
            expect(await l2CustomERC20.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("ERC20 transfers", function () {

        it("approve to contract's address 12345678", async () => {
            const { l2CustomERC20, owner } = await loadFixture(deployTokenFixture);

            await l2CustomERC20.approve(l2CustomERC20.address, 12345678)

            expect(await l2CustomERC20.allowance(owner.address, l2CustomERC20.address)).to.equal(12345678);
        });

        it("Should transfers to l2CustomERC20 addresses", async () => {
            const { l2CustomERC20 } = await loadFixture(deployTokenFixture);

            await l2CustomERC20.transfer(l2CustomERC20.address, 12345)

            console.log(await l2CustomERC20.balanceOf(l2CustomERC20.address))
            // expect(await l2CustomERC20.allowance(owner.address, l2CustomERC20.address)).to.equal(12345678);
        });

        it("Should not OOG", async () => {
            const { l2CustomERC20 } = await loadFixture(deployTokenFixture);

            let tx = await l2CustomERC20.runOutOfGas(20000)

            expect(tx.chainId).to.equal(17);
        });

        it("Should OOG", async () => {
            const { l2CustomERC20 } = await loadFixture(deployTokenFixture);

            await expect(l2CustomERC20.runOutOfGas(60000)).to.be.rejectedWith(
                'gas required exceeds allowance (30000000)'
              )
        });

        it.skip("Should transfers to some addresses", async () => {
            const { l2CustomERC20, owner, addr1 } = await loadFixture(deployTokenFixture);

            let addreses = [addr1.address]

            for (var _i = 0; _i < 1001; _i++) {
                addreses.push(addr1.address)
            }

            let tx = await l2CustomERC20.transfers(l2CustomERC20.address, addreses)

            console.log(tx)
            console.log(tx.hash)

            console.log(await l2CustomERC20.balanceOf(l2CustomERC20.address))
            console.log(await l2CustomERC20.balanceOf(owner.address))
            console.log(await l2CustomERC20.balanceOf(addr1.address))
            // expect(await l2CustomERC20.allowance(owner.address, l2CustomERC20.address)).to.equal(12345678);
        });

    })

    // @openzeppelin/contracts/access/Ownable.sol 这个的验证，目前不支持
    describe.skip("ERC20 Ownership",()=>{
    
        // it("Should transferOwnership to add1", async () => {
        //     const { erc20, addr1 } = await loadFixture(deployTokenFixture);
        //     await erc20.transferOwnership(addr1.address)
        //     expect(await erc20.owner()).to.equal(addr1.address);
        // });
        
        // it("Should fail if add1 transferOwnership to add2", async () => {
        //     const { erc20, addr1, addr2 } = await loadFixture(deployTokenFixture);
        //     await expect(
        //         await erc20.connect(addr1).transferOwnership(addr2.address)
        //       ).to.be.revertedWith("Ownable: caller is not the owner");
        // });

        it("Should set owner to nullAddress after renounceOwnership", async () => {
            const nullAddress = "0x0000000000000000000000000000000000000000";
            const { l2CustomERC20 } = await loadFixture(deployTokenFixture);
            await l2CustomERC20.renounceOwnership()
            expect(await l2CustomERC20.owner()).to.equal(nullAddress);
        });

        // it("Should fail if add1 renounceOwnership", async () => {
        //     const { erc20, addr1 } = await loadFixture(deployTokenFixture);
        //     await expect(
        //         await erc20.connect(addr1).renounceOwnership()
        //       ).to.be.revertedWith("Ownable: caller is not the owner");
        // });
    })

    describe.skip("ERC20 allowance", function () {
        it("Should default allowance is 0", async () => {
            const { l2CustomERC20, addr2 } = await loadFixture(deployTokenFixture);
            const spender = addr2.address;
            const ownerAllowance = await l2CustomERC20.allowance(tr.SIGNERS.L2_Wallet.address, spender);
            expect(ownerAllowance).to.equal(ethers.BigNumber.from(0));
        });
    
        it("Should approve allowance to spender", async () => {
            const { l2CustomERC20, addr2 } = await loadFixture(deployTokenFixture);
            const spender = addr2.address;
            await l2CustomERC20.approve(spender, ethers.BigNumber.from("1000000000000000000"))
            execSync('sleep 5');

            const ownerAllowance = await l2CustomERC20.allowance(tr.SIGNERS.L2_Wallet.address, spender);
            expect(ownerAllowance).to.equal(ethers.BigNumber.from("1000000000000000000"));
        });

        it("Should transferFrom the all allowances", async () => {
            const { l2CustomERC20, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);
            const spender = addr2.address;
            await l2CustomERC20.approve(spender, ethers.BigNumber.from("1000000000000000000"))
            execSync('sleep 1');

            let ownerAllowance = await l2CustomERC20.allowance(owner.address, spender);
            expect(ownerAllowance).to.equal(ethers.BigNumber.from("1000000000000000000"));

            await l2CustomERC20.mint(owner.address, ethers.BigNumber.from("2000000000000000000"))
            execSync('sleep 1');

            let ownerBalance = await l2CustomERC20.balanceOf(owner.address);
            expect(ownerBalance).to.equal(ethers.BigNumber.from("2000000000000000000"));

            await l2CustomERC20.connect(addr2).transferFrom(owner.address, addr1.address, ethers.BigNumber.from("1000000000000000000"))
            execSync('sleep 1');
            console.log("======2")
            ownerBalance = await l2CustomERC20.balanceOf(owner.address);
            expect(ownerBalance).to.equal(ethers.BigNumber.from("1000000000000000000"));

            let addr1Balance = await l2CustomERC20.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(ethers.BigNumber.from("1000000000000000000"));

            ownerAllowance = await l2CustomERC20.allowance(owner.address, spender);
            expect(ownerAllowance).to.equal(ethers.BigNumber.from(0));
        });
    
        it("Should decrease and increase allowance to spender", async () => {
            const { l2CustomERC20, owner, addr2 } = await loadFixture(deployTokenFixture);
            const spender = addr2.address;
            await l2CustomERC20.increaseAllowance(spender, ethers.BigNumber.from("1000000000000000000"))
            const ownerIncreaseAllowance = await l2CustomERC20.allowance(owner.address, spender);
            expect(ownerIncreaseAllowance).to.equal(ethers.BigNumber.from("1000000000000000000"));

            await l2CustomERC20.decreaseAllowance(spender, ethers.BigNumber.from("1000000000000000000"))
            const ownerDecreaseAllowance = await l2CustomERC20.allowance(owner.address, spender);
            expect(ownerDecreaseAllowance).to.equal(ethers.BigNumber.from(0));
        });
    })

    // describe("ERC20 mint",()=>{
    //     it("Should mint owner balances", async () => {
    //         const { erc20, owner } = await loadFixture(deployTokenFixture);
    //         await erc20.mint(owner.address, ethers.BigNumber.from("1000000000000000000"))
    //         const ownerBalance = await erc20.balanceOf(owner.address);
    //         expect(ownerBalance).to.equal(ethers.BigNumber.from("1000000000000000000"));

    //         expect(await erc20.totalSupply()).to.equal(
    //             ethers.BigNumber.from("1000000000000000000")
    //           );
    //     });
    
    //     it("Should mint owner and addr1 balances", async () => {
    //         const { erc20, owner, addr1} = await loadFixture(deployTokenFixture);
    //         await erc20.mint(owner.address, ethers.BigNumber.from("1000000000000000000"))
    //         const ownerBalance = await erc20.balanceOf(owner.address);
    //         expect(ownerBalance).to.equal(ethers.BigNumber.from("1000000000000000000"));

    //         await erc20.mint(addr1.address, ethers.BigNumber.from("2000000000000000000"))
    //         const addr1Balance = await erc20.balanceOf(addr1.address);
    //         expect(addr1Balance).to.equal(ethers.BigNumber.from("2000000000000000000"));

    //         expect(await erc20.totalSupply()).to.equal(
    //             ethers.BigNumber.from("3000000000000000000")
    //           );
    //     });
    // })

    // describe("Transactions", function () {

    //     it("Should fail if sender doesn't have enough tokens", async function () {
    //         const { erc20, owner, addr1, addr2} = await loadFixture(deployTokenFixture);
    //         const initialOwnerBalance = await erc20.balanceOf(owner.address);
    //         await expect(
    //           erc20.connect(addr1).transfer(owner.address, 1)
    //         ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  
    //         expect(await erc20.balanceOf(owner.address)).to.equal(
    //           initialOwnerBalance
    //         );
    //       });

    //     it("Should transfer tokens between accounts", async function () {
    //       const { erc20, owner, addr1, addr2} = await loadFixture(deployTokenFixture);

    //       await erc20.mint(owner.address, 50)
    //       const ownerBalance = await erc20.balanceOf(owner.address);
    //       expect(ownerBalance).to.equal(50);

    //       await  erc20.transfer(addr1.address, 10)
    //       const addr1Balance = await erc20.balanceOf(addr1.address);
    //       expect(addr1Balance).to.equal(10);
    //     //   await expect(
    //     //     erc20.transfer(addr1.address, 50)
    //     //   ).to.changeTokenBalances(erc20, [owner, addr1], [-50, 50]);
    
    //     await  erc20.connect(addr1).transfer(addr2.address, 10)
    //     const addr2Balance = await erc20.balanceOf(addr2.address);
    //     expect(addr2Balance).to.equal(10);
    //     //   await expect(
    //     //     erc20.connect(addr1).transfer(addr2.address, 50)
    //     //   ).to.changeTokenBalances(erc20, [addr1, addr2], [-50, 50]);
    //     });
    
    //     it("should emit Transfer events", async function () {
    //       const { erc20, owner, addr1, addr2} = await loadFixture(deployTokenFixture);

    //       await erc20.mint(owner.address, 150)
    //       const ownerBalance = await erc20.balanceOf(owner.address);
    //       expect(ownerBalance).to.equal(150);

    //       await expect(erc20.transfer(addr1.address, 50))
    //         .to.emit(erc20, "Transfer")
    //         .withArgs(owner.address, addr1.address, 50);
    
    //       await expect(erc20.connect(addr1).transfer(addr2.address, 50))
    //         .to.emit(erc20, "Transfer")
    //         .withArgs(addr1.address, addr2.address, 50);
    //     });

    //     // this check before check owner’s balances
    //     it("Should fail if transfer to 0 address", async () => {
    //         const { erc20, addr1 } = await loadFixture(deployTokenFixture);
    //         const nullAddress = "0x0000000000000000000000000000000000000000";
    //         await expect(
    //             erc20.transfer(nullAddress, 1)
    //         ).to.be.revertedWith("ERC20: transfer to the zero address");
    //     });
    
    //     it("Should fail if negative value to transfer is given", async () => {
    //         const { erc20, addr1 } = await loadFixture(deployTokenFixture);
    //         await expect(erc20.transfer(addr1.address, -1)).to.be.reverted;
    //     });

    //     it("Should received the full amount, isn't charged fee", async () => {
    //         const { erc20, owner, addr1 } = await loadFixture(deployTokenFixture);

    //         await erc20.mint(owner.address, 100)
    //         const ownerBalance = await erc20.balanceOf(owner.address);
    //         expect(ownerBalance).to.equal(100);

    //         await erc20.transfer(addr1.address, 100);
    //         expect(await erc20.balanceOf(addr1.address)).to.equal(
    //           ethers.BigNumber.from(100)
    //         );
    //       });
    //   });
})