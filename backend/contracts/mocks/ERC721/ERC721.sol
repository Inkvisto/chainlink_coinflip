// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.19;

import "../../ERC721/ERC721.sol";

contract ERC721Mock is ERC721 {
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) payable {
    }

    function baseURI() external view returns (string memory ret0) {
        (ret0) = super._baseURI();
    }

    function safeTransfer(address from,address to,uint256 tokenId,bytes calldata data) external {
        super._safeTransfer(from,to,tokenId,data);
    }

    function $_ownerOf(uint256 tokenId) external view returns (address ret0) {
        (ret0) = super._ownerOf(tokenId);
    }

    function exists(uint256 tokenId) external view returns (bool ret0) {
        (ret0) = super._exists(tokenId);
    }

    function isApprovedOrOwner(address spender,uint256 tokenId) external view returns (bool ret0) {
        (ret0) = super._isApprovedOrOwner(spender,tokenId);
    }

    function safeMint(address to,uint256 tokenId) external {
        super._safeMint(to,tokenId);
    }

    function safeMintWithData(address to,uint256 tokenId,bytes calldata data) external {
        super._safeMint(to,tokenId,data);
    }

    function mint(address to,uint256 tokenId) external {
        super._mint(to,tokenId);
    }

    function burn(uint256 tokenId) external {
        super._burn(tokenId);
    }

    function transfer(address from,address to,uint256 tokenId) external {
        super._transfer(from,to,tokenId);
    }

    function $_approve(address to,uint256 tokenId) external {
        super._approve(to,tokenId);
    }

    function $_setApprovalForAll(address operator,bool approved) external {
        super.setApprovalForAll(operator, approved);
    }

    function requireMinted(uint256 tokenId) external view {
        super._requireMinted(tokenId);
    }

    function beforeTokenTransfer(address from,address to,uint256 firstTokenId,uint256 batchSize) external {
        super._beforeTokenTransfer(from,to,firstTokenId,batchSize);
    }

    function afterTokenTransfer(address from,address to,uint256 firstTokenId,uint256 batchSize) external {
        super._afterTokenTransfer(from,to,firstTokenId,batchSize);
    }

    function unsafe_increaseBalance(address account,uint256 amount) external {
        super.__unsafe_increaseBalance(account,amount);
    }

    function msgSender() external view returns (address ret0) {
        (ret0) = super._msgSender();
    }

    function msgData() external view returns (bytes memory ret0) {
        (ret0) = super._msgData();
    }

    receive() external payable {}
}
