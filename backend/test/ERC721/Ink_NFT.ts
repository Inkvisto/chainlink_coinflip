import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { expectEvent } from "../utils/expectEvent";

const deployFixture = async () => {
  const [owner, newOwner, approved, anotherApproved, operator, other] = await ethers.getSigners()

  const Ink_NFT = await ethers.getContractFactory("NFT");

  const name = 'Ink_NFT';
  const symbol = 'INKN';

  const nft = await Ink_NFT.deploy(name, symbol, operator.address);
  await nft.waitForDeployment();

  return { nft, owner, newOwner, approved, anotherApproved, operator, other };
};



/*

describe('Ink_NFT', () => {
  describe("mint", function () {
    it("increases token's id after each mint", async () => {
      const { nft, owner, newOwner, approved, anotherApproved, operator, other } = await loadFixture(deployFixture);

      const mint1 = await (await nft.safeMint('')).wait();
     if(mint1) expectEvent(mint1, 'TokenMinted', { tokenId: 1, uri: '', owner:operator.address});
    
     const mint2 = await (await nft.safeMint('')).wait();
     
     if(mint2) expectEvent(mint2, 'TokenMinted', { tokenId: 2, uri: '', owner:operator.address});
    });

  });

});

*/