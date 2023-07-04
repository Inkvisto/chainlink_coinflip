// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;


import './ERC20/ERC20.sol';
import './utils/Ownable.sol';
import "./utils/cryptography/ECDSA.sol";

contract Ink_Token is ERC20, Ownable {
    constructor() ERC20('Ink_Token', 'INTK') {}
     function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    } 
}