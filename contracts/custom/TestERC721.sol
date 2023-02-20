// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestERC721 is ERC721, ERC721Burnable, Ownable {
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://raw.githubusercontent.com/songyaoshun/TestContracts/main/metadata/json/";
    }

    function tokenURI(uint256 tokenId) override public view returns (string memory) {
        require(super._exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, Strings.toString(tokenId) ,".json")) : "";
    }

    // function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    //     internal
    //     override(ERC721, ERC721Enumerable)
    // {
    //     super._beforeTokenTransfer(from, to, tokenId);
    // }

    // function supportsInterface(bytes4 interfaceId)
    //     public
    //     view
    //     override(ERC721, ERC721Enumerable)
    //     returns (bool)
    // {
    //     return super.supportsInterface(interfaceId);
    // }
}