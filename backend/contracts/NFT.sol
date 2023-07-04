// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
import './ERC721/ERC721.sol';
import './ERC721/extensions/ERC721URIStorage.sol';
import './access/Ownable.sol';

contract NFT is ERC721URIStorage {
    uint256 private _nextTokenId;
    string private _baseTokenURI;
    address private marketplaceAddress;
    mapping(uint256 => address) private _creators;
     event TokenMinted(uint256 indexed tokenId, string tokenURI, address owner);

    constructor(string memory name, string memory symbol, address _marketplaceAddress) ERC721(name,symbol) {
            _setBaseURI("ipfs://");
            marketplaceAddress = _marketplaceAddress;
    }
     function safeMint(string memory uri)
        public
    {
         uint256 tokenId = _nextTokenId+=1;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        _creators[tokenId] = msg.sender;
         setApprovalForAll(marketplaceAddress, true);
        emit TokenMinted(tokenId, uri, marketplaceAddress);
    }
    
     function _burn(uint256 tokenId) internal override(ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
      function _setBaseURI(string memory baseURI) private {
        _baseTokenURI = baseURI;
    }

      function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
        function getTokenCreatorById(uint256 tokenId) public view returns (address) {
        return _creators[tokenId];
    }

    function getTokensCreatedByMe() public view returns (uint256[] memory) {
        uint256 numberOfExistingTokens = _nextTokenId;
        uint256 numberOfTokensCreated = 0;

        for (uint256 i = 0; i < numberOfExistingTokens; i++) {
            uint256 tokenId = i + 1;
            if (_creators[tokenId] != msg.sender) continue;
            numberOfTokensCreated += 1;
        }

        uint256[] memory createdTokenIds = new uint256[](numberOfTokensCreated);
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < numberOfExistingTokens; i++) {
            uint256 tokenId = i + 1;
            if (_creators[tokenId] != msg.sender) continue;
            createdTokenIds[currentIndex] = tokenId;
            currentIndex += 1;
        }

        return createdTokenIds;
    }

}