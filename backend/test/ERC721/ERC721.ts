import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { artifacts, ethers } from "hardhat";
import Enum from "../utils/enum";
import 'dotenv/config';
import { ZERO_ADDRESS } from "../constants";
import expectCustomRevert from "../utils/expectCustomRevert";
import { AddressLike, BigNumberish, ContractTransactionReceipt, ContractTransactionResponse } from "ethers";
import { expectEvent } from "../utils/expectEvent";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
/*
const RevertType = Enum('None', 'RevertWithoutMessage', 'RevertWithMessage', 'RevertWithCustomError', 'Panic');

const firstTokenId = 1n;
const secondTokenId = 2n;
const nonExistentTokenId = 99n;
const fourthTokenId = 4n;
const baseURI = 'https://api.example.com/v1/';

const RECEIVER_MAGIC_VALUE = '0x150b7a02';

const deployFixture = async () => {
  const [owner, newOwner, approved, anotherApproved, operator, other] = await ethers.getSigners()

  const ERC721 = await ethers.getContractFactory("ERC721Mock");

  const name = 'Ink_ERC721';
  const symbol = 'INFT';

  const token = await ERC721.deploy(name, symbol);
  await token.waitForDeployment();

  return { token, owner, newOwner, approved, anotherApproved, operator, other };
};

const deployReceiverFixture = async () => {
  const [owner, newOwner, approved, anotherApproved, operator, other] = await ethers.getSigners()

  const ERC721ReceiverMock = await ethers.getContractFactory("ERC721ReceiverMock");



  const receiver = await ERC721ReceiverMock.deploy(RECEIVER_MAGIC_VALUE, RevertType.None);
  await receiver.waitForDeployment();

  return { receiver, owner, newOwner, approved, anotherApproved, operator, other };
}

const mintFixture = async () => {
  const { token, owner } = await loadFixture(deployFixture);

  await token.safeMint(owner.address, firstTokenId);
  await token.safeMint(owner.address, secondTokenId);
};

const approveFixture = async () => {
  const { token, owner, approved, operator, other } = await loadFixture(deployFixture);
  await loadFixture(mintFixture);
  await token.connect(owner).$_approve(approved, firstTokenId);
  await token.connect(owner).$_setApprovalForAll(operator, true);

  return { token, owner, approved, operator, other };
}

describe('ERC721', () => {
  it('with minted tokens', async () => {
    const { token, owner, other } = await loadFixture(deployFixture);
    await loadFixture(mintFixture);

    describe('balanceOf', () => {
      context('when the given address owns some tokens', () => {
        it('returns the amount of tokens owned by the given address', async function () {
          expect(await token.balanceOf(owner.address)).to.equal(2n);
        });
      });
      context('when the given address does not own any tokens', function () {
        it('returns 0', async function () {
          expect(await token.balanceOf(other.address)).to.equal(0n);
        });
      });
      context('when querying the zero address', async function () {
        it('throws', async function () {
          await expectCustomRevert(token.balanceOf(ZERO_ADDRESS), 'ERC721InvalidOwner', [ZERO_ADDRESS]);
        })
      });
    });

    describe('ownerOf', function () {
      context('when the given token ID was tracked by this token', function () {
        const tokenId = firstTokenId;

        it('returns the owner of the given token ID', async function () {
          expect(await token.ownerOf(tokenId)).to.equal(owner.address);
        });
      });

      context('when the given token ID was not tracked by this token', function () {
        const tokenId = nonExistentTokenId;

        it('reverts', async function () {
          await expectCustomRevert(token.ownerOf(tokenId), 'ERC721NonexistentToken', [tokenId]);
        });
      });
    });

    const transferWasSuccessful = async (receipt: ContractTransactionReceipt | null) => {
      describe('transferWasSuccessful', () => {
        it('transfers the ownership of the given token ID to the given address', async function () {
          expect(await token.ownerOf(firstTokenId)).to.equal(other.address);
        });

        it('emits a Transfer event', async () => {
          if (receipt) expectEvent(receipt, 'Transfer', { from: owner.address, to: other.address, tokenId: firstTokenId });
        });

        it('clears the approval for the token ID', async function () {
          expect(await token.getApproved(firstTokenId)).to.equal(ZERO_ADDRESS);
        });

        it('adjusts owners balances', async () => {
          expect(await token.balanceOf(owner)).to.equal(1n);
        });
      })
    }

    describe('transfers', function () {
      const data = '0x42';

      it('via transferFrom', async () => {
        const { token, owner, other } = await loadFixture(approveFixture);
        const receipt = await (await token.transferFrom(owner.address, other.address, firstTokenId)).wait();
        await transferWasSuccessful(receipt);
        describe('to a valid receiver contract', function () {
          it('calls onERC721Received', async function () {
            await loadFixture(approveFixture)
            const { receiver, owner } = await loadFixture(deployReceiverFixture);
            const receipt = await (await token.transferFrom(owner.address, await receiver.getAddress(), firstTokenId)).wait();
          });

          it('calls onERC721Received from approved', async function () {
            await loadFixture(approveFixture)
            const { receiver, owner } = await loadFixture(deployReceiverFixture);
            const receipt = await (await token.transferFrom(owner.address, await receiver.getAddress(), firstTokenId)).wait();

          });

          describe('with an invalid token id', function () {
            it('reverts', async function () {
              const { receiver, owner } = await loadFixture(deployReceiverFixture);
              await expectCustomRevert(
                token.transferFrom(owner.address, await receiver.getAddress(), nonExistentTokenId),
                'ERC721NonexistentToken',
                [nonExistentTokenId],
              );
            });
          });
        });
      });

      it('via safeTransferFrom', async () => {
        context('with data', () => {
          it('check successful of transfer', async () => {
            const { token, owner, other } = await loadFixture(approveFixture);
            const receipt = await (await token["safeTransferFrom(address,address,uint256,bytes)"](owner.address, other.address, firstTokenId, data)).wait();
            await transferWasSuccessful(receipt);
          })
        });
        context('without data', () => {
          it('check successful of transfer', async () => {
            const { token, owner, other } = await loadFixture(approveFixture);
            const receipt = await (await token["safeTransferFrom(address,address,uint256)"](owner.address, other.address, firstTokenId)).wait();
            await transferWasSuccessful(receipt);
          })
        });
      });
    });


  });
})



*/