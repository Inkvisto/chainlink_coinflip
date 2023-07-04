import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import expectCustomRevert from "../utils/expectCustomRevert";
import { expectEvent } from "../utils/expectEvent";
/*
const name = 'Ink_Token';
const symbol = 'INTK';
const initialSupply = 100n;

const deployNftFixture = async () => {
  const [owner, recipient] = await ethers.getSigners()
  const ERC20 = await ethers.getContractFactory("Ink_Token");
  const token = await ERC20.deploy();
  await token.waitForDeployment();

  return { token, owner, recipient };
};

const mintInitialSupplyFixture = async () => {
  const { token, owner } = await loadFixture(deployNftFixture);
 
  await token.mint(owner, initialSupply);
}

const approveFixture = async (spender:any, amount:any) => {
  const { token, recipient } = await loadFixture(deployNftFixture);
  await token.approve(recipient, 12n)
}

describe('ERC20', () => {
  it('has a name', async function () {
    const { token } = await loadFixture(deployNftFixture);
    expect(await token.name()).to.equal(name);
  });

  it('has a symbol', async function () {
    const { token } = await loadFixture(deployNftFixture);
    expect(await token.symbol()).to.equal(symbol);
  });

  it('has 18 decimals', async function () {
    const { token } = await loadFixture(deployNftFixture);
    expect(await token.decimals()).to.equal(18n);
  });

  describe('decrease allowance', () => {
    describe('when the spender is not the zero address', async () => {
      const { token, owner, recipient } = await loadFixture(deployNftFixture);
      const spender = recipient;

      function shouldDecreaseApproval(amount: bigint) {
        describe('when there was no approved amount before', function () {
          it('reverts', async () => {
            const allowance = await token.allowance(owner, spender);
            await expectCustomRevert(
              token.connect(owner).decreaseAllowance(spender, amount),
              'ERC20FailedDecreaseAllowance',
              [spender.address, allowance, amount],
            );
          });
        });

        describe('when the spender had an approved amount', function () {
          const approvedAmount = amount;

          beforeEach(async () => {
            await token.connect(owner).approve(spender, approvedAmount);
          });

          it('emits an approval event', async function () {
            expectEvent(
              await token.connect(owner).decreaseAllowance(spender, approvedAmount),
              'Approval',
              { owner: owner, spender: spender, value: 0n},
            );
          });

          it('decreases the spender allowance subtracting the requested amount', async function () {
            await token.connect(owner).decreaseAllowance(spender, approvedAmount - 1n);

            expect(await token.allowance(owner, spender)).to.equal(1n);
          });

          it('sets the allowance to zero when all allowance is removed', async function () {
            await token.connect(owner).decreaseAllowance(spender, approvedAmount);
            expect(await this.token.allowance(owner, spender)).to.equal(0n);
          });

          it('reverts when more than the full allowance is removed', async function () {
            await expectCustomRevert(
              token.connect(owner).decreaseAllowance(spender, approvedAmount + 1n),
              'ERC20FailedDecreaseAllowance',
              [spender, approvedAmount, approvedAmount + 1n],
            );
          });
        });
      }
      describe('when the sender has enough balance', function () {
        const amount = initialSupply;

        shouldDecreaseApproval(amount);
      });



    })
  })
})

*/



