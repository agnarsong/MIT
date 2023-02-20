import { ethers } from "hardhat";
import { 
  getSigners, getContracts, getTokenContracts, 
  crossChainMessenger, displayWei, TestResult,
  AllBalances, Balances } from '../utils/setup'
import dotenv from "dotenv"
import { Contract } from "ethers";
dotenv.config()

let tr: TestResult
let amount: string
let tERC20: Contract
let ToAddress: string

describe('在l2上测试部署各种合约', function () {

  this.timeout(150000);
  this.slow(150000);
  
  before(async() => {
    amount = '0.0005'

    tr = {} as TestResult
    tr.ALLBALANCES = {
      BEFORE: {} as Balances,
      AFTER: {} as Balances
    } as AllBalances

    tr.SIGNERS = await getSigners();
    tr.CONTRACTS = await getContracts();
    tr.TOKEN_CONTRACTS = await getTokenContracts();
    tr.CROSS_CHAIN_MESSAGER = await crossChainMessenger()
    ToAddress = '0x875F0DE6b6Ed7C9EC01B3f3f06f5397d79d9D599'
  });

  describe('测试ERC20部署', () => {

    it('部署ERC20', async () => {
      tr.ALLBALANCES.BEFORE.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()
      
      const tERC20_json =await import(
        '../artifacts/contracts/CustomERC20.sol/CustomERC20.json'
      )

      tERC20 = await new ethers.ContractFactory(
        tERC20_json.abi, 
        tERC20_json.bytecode,
        tr.SIGNERS.L2_Wallet
      ).deploy("testErc20", "T20")
      
      await tERC20.deployed();
      
      const code = await tr.SIGNERS.L2_Wallet.provider.getCode(tERC20.address)

      tr.ALLBALANCES.AFTER.L2_BIT_Balance = await tr.SIGNERS.L2_Wallet.getBalance()

      console.log(tr.ALLBALANCES.BEFORE.L2_BIT_Balance)
      console.log(tr.ALLBALANCES.AFTER.L2_BIT_Balance)
      code.should.not.to.equal('0x')
    })

    describe.skip('ERC20基本功能请求', () => {
      // https://github.com/ethereum-optimism/Waffle-ERC20-Example/blob/master/test/erc20.spec.js
      it('should assigns initial balance', async () => {
        const b = await tERC20.balanceOf(tr.SIGNERS.L2_Wallet.address)
        b.should.to.equal(ethers.utils.parseEther('1000000'))
      })

      it('should mint balance', async () => {
        await tERC20.mint(
          tr.SIGNERS.L2_Wallet.address, 
          ethers.utils.parseEther('10')
        )

        const nb = await tERC20.balanceOf(tr.SIGNERS.L2_Wallet.address)
        nb.should.to.equal(ethers.utils.parseEther('1000010'))
      })

      it('should correctly set vanity information', async () => {
        const name = await tERC20.name()
        name.should.to.equal('testErc20')

        const decimals = await tERC20.decimals()
        decimals.should.to.equal(18)

        const symbol = await tERC20.symbol()
        symbol.should.to.equal('T20')
      })

      it('should transfer amount to destination account', async () => {
        const tx = await tERC20.connect(tr.SIGNERS.L2_Wallet).transfer(ToAddress, 7)
        await tx.wait()
        const walletToBalance = await tERC20.balanceOf(ToAddress)
        walletToBalance.should.to.equal(7)
      })

      it('should emit Transfer event', async () => {
        const tx = tERC20.connect(tr.SIGNERS.L2_Wallet).transfer(ToAddress, 7)
        await tx.should
          .to.emit(tERC20, 'Transfer')
          .withArgs(tr.SIGNERS.L2_Wallet.address, ToAddress, 7)
      })

      // it('should not transfer above the amount', async () => {
      //   const walletToBalanceBefore = await tERC20.balanceOf(ToAddress)
      //   await tERC20.transfer(ToAddress, 1007) .to.be.reverted
      //   const walletToBalanceAfter = await ERC20.balanceOf(ToAddress)
      //   expect(walletToBalanceBefore).to.eq(walletToBalanceAfter)
      // })

      // it.skip('should not transfer from empty account', async () => {
      //   const ERC20FromOtherWallet = tERC20.connect(walletEmpty)
      //   await expect(ERC20FromOtherWallet.transfer(walletEmptyAddress, 1)).to.be
      //     .reverted
      // })
    })
  })

  describe.skip('测试ERC721部署', () => {

    it('部署ERC721', async () => {

      const tERC20_json =await import(
        '../artifacts/contracts/SimpleERC20.sol/BitETHERC20.json'
      )

      tERC20 = await new ethers.ContractFactory(
        tERC20_json.abi, 
        tERC20_json.bytecode,
        tr.SIGNERS.L2_Wallet
      ).deploy("testBit", "TB")
      
      await tERC20.deployed();
      // 断言
      console.log("L1 ERC20 Token deployed to:", tERC20.address);

    })

    it('ERC721基本功能请求', async () => {
      
    })
  }) 

  describe.skip('测试ERC1155部署', () => {

    it('部署ERC1155', async () => {

      const tERC20_json =await import(
        '../artifacts/contracts/SimpleERC20.sol/BitETHERC20.json'
      )

      tERC20 = await new ethers.ContractFactory(
        tERC20_json.abi, 
        tERC20_json.bytecode,
        tr.SIGNERS.L2_Wallet
      ).deploy("testBit", "TB")
      
      await tERC20.deployed();
      // 断言
      console.log("L1 ERC20 Token deployed to:", tERC20.address);

    })

    it('ERC1155基本功能请求', async () => {
      
    })
  }) 

  describe.skip('测试swap部署', () => {

    it('部署swap', async () => {

      const tERC20_json =await import(
        '../artifacts/contracts/SimpleERC20.sol/BitETHERC20.json'
      )

      tERC20 = await new ethers.ContractFactory(
        tERC20_json.abi, 
        tERC20_json.bytecode,
        tr.SIGNERS.L2_Wallet
      ).deploy("testBit", "TB")
      
      await tERC20.deployed();
      // 断言
      console.log("L1 ERC20 Token deployed to:", tERC20.address);

    })

    it('swap基本功能请求', async () => {
      
    })
  }) 
});