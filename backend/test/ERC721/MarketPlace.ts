import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ZERO_ADDRESS } from "../constants";
/*
const tokenId = 1;
const auctionPrice = ethers.parseEther('1');

const deployFixture = async () => {
  const [owner, buyer] = await ethers.getSigners()

  const MarketPlace = await ethers.getContractFactory("NFTMarketplace");

  const name = 'Ink_MarketPlace';
  const symbol = 'INKM';

  const market = await MarketPlace.deploy(name, symbol);
  await market.waitForDeployment();

  return { market, owner, buyer };
};

const mintFixture = async () => {
  const { market, owner, buyer } = await loadFixture(deployFixture);
  const listingPrice = await market.getListingPrice();

  const mintToken = await market.createToken("https://www.mytokenlocation.com", auctionPrice, { value: listingPrice });


  return { market, mintToken, listingPrice, owner, buyer }
}

describe('Marketplace', () => {
  it('market interact', async () => {
    describe('create and sell tokens', () => {
      it('create', async () => {
        const { market, mintToken, listingPrice, owner } = await loadFixture(mintFixture);
        await market.createToken("https://www.mytokenlocation2.com", auctionPrice, { value: listingPrice });
        const tokenOwner = await market.ownerOf(tokenId);
        
        const marketAddress = await market.getAddress();

        expect(tokenOwner).to.equal(marketAddress);
        await expect(mintToken)
          .to.emit(market, 'MarketItemCreated')
          .withArgs(
            tokenId,
            owner.address,
            marketAddress,
            auctionPrice,
            false,
            false
          )

      });

      it('sell', async () => {
        const { market, buyer } = await loadFixture(mintFixture);
        await market.connect(buyer).createMarketSale(tokenId, { value: auctionPrice });
        const tokenOwner = await market.ownerOf(tokenId);
        expect(tokenOwner).to.equal(buyer.address);
      });


      it('resell item', async () => {
        const { market, listingPrice, buyer } = await loadFixture(mintFixture);
        await market.connect(buyer).createMarketSale(tokenId, { value: auctionPrice });
        await market.connect(buyer).resellToken(tokenId, auctionPrice, { value: listingPrice });
        const tokenOwner = await market.ownerOf(tokenId)
        expect(tokenOwner).to.equal(await market.getAddress());
      });

      it('cancel item', async () => {
        const { market, owner } = await loadFixture(mintFixture);

        await market.cancelMarketItem(tokenId);
        console.log(await market.fetchItemsListed())
        const tokenOwner = await market.ownerOf(tokenId)
        expect(tokenOwner).to.equal(owner.address)
      });

      it('reverts when cancel unexisted item', async () => {
        const { market } = await loadFixture(deployFixture);
        expect(market.cancelMarketItem(tokenId))
          .to.be.revertedWith('Market item has to exist')
      })
      it('reverts when cancel a item whose seller is not msg.sender', async () => {
        const { market, buyer } = await loadFixture(mintFixture);
        expect(market.connect(buyer).cancelMarketItem(tokenId))
          .to.be.revertedWith('Only item seller can perform this operation')
      });

      it('gets latest item by the token id', async function () {
        const { market, listingPrice , buyer } = await loadFixture(mintFixture);


        await market.connect(buyer).createMarketSale(1, { value: auctionPrice });

        await market.connect(buyer).resellToken(1, auctionPrice, { value: listingPrice });

        const marketItemResult = await market.fetchMarketItems();

      });
      it('does not get a Market Item by a nonexistent token id', async function () {
        const { market } = await loadFixture(deployFixture);

        const marketItemResult = await market.fetchItemsListed();

        expect(marketItemResult.length).to.equal(0)
      })

    })
  })

})


*/