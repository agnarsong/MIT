// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IERC20Test.sol";

contract CustomERC20 is ERC20, IERC20Test, Ownable {
    constructor(string memory name, string memory symbol)
        ERC20(name, symbol)
    {
        _mint(msg.sender, 1000000 * 10**18);
    }

    function mint(address to, uint256 amount) external override {
        _mint(to, amount);
    }

    function burnFrom(address account, uint256 amount) external override {
        _burn(account, amount);
    }

    function approve(address spender, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        _approve(_msgSender(), spender, amount);
        return true;
    }


    function transfers(address _token,address[] calldata to) 
        public
        payable
    {
        CustomERC20 token = CustomERC20(_token);
        for (uint256 i = 0; i < to.length; i++) {
            token.transfer(to[i], 1);
        }
    }

    function runOutOfGas(uint64 num) public {

        bytes32 h;
        for (uint256 i = 0; i < num; i++) {
            h = keccak256(abi.encodePacked(h));
        }
    }
}
