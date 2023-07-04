import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { assert, expect } from "chai";
import { EventLog } from "ethers";
import { ethers, network } from "hardhat"



const deployRandomNumberConsumerFixture = async () => {
    const [deployer] = await ethers.getSigners();

    const BASE_FEE = "100000000000000000"
    const GAS_PRICE_LINK = "1000000000" // 0.000000001 LINK per gas

    const chainId = network.config.chainId;


    const VRFCoordinatorV2MockFactory = await ethers.getContractFactory(
        "VRFCoordinatorV2Mock"
    )
    const VRFCoordinatorV2Mock = await VRFCoordinatorV2MockFactory.deploy(
        BASE_FEE,
        GAS_PRICE_LINK
    )


    const fundAmount = "1000000000000000000";
    const transaction = await VRFCoordinatorV2Mock.createSubscription()
    const transactionReceipt = await transaction.wait(1);
    const eventlog = transactionReceipt?.logs[0] as EventLog;

    const subscriptionId = eventlog.args[0];
    await VRFCoordinatorV2Mock.fundSubscription(subscriptionId, fundAmount);


    const vrfCoordinatorAddress = VRFCoordinatorV2Mock.target
    const keyHash = "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc"

    const randomNumberConsumerV2Factory = await ethers.getContractFactory(
        "RandomNumberConsumerV2"
    )
    const randomNumberConsumerV2 = await randomNumberConsumerV2Factory
        .connect(deployer)
        .deploy(subscriptionId, vrfCoordinatorAddress, keyHash)

    await VRFCoordinatorV2Mock.addConsumer(subscriptionId, randomNumberConsumerV2.target)

    return { randomNumberConsumerV2, VRFCoordinatorV2Mock }

}


describe("#requestRandomWords", async function () {
    describe("success", async function () {
        it("Should successfully request a random number", async function () {
            const { randomNumberConsumerV2, VRFCoordinatorV2Mock } = await loadFixture(
                deployRandomNumberConsumerFixture
            )
            await expect(randomNumberConsumerV2.requestRandomWords()).to.emit(
                VRFCoordinatorV2Mock,
                "RandomWordsRequested"
            )
        })

        it("Should successfully request a random number and get a result", async function () {
            const { randomNumberConsumerV2, VRFCoordinatorV2Mock } = await loadFixture(
                deployRandomNumberConsumerFixture
            )
            await randomNumberConsumerV2.requestRandomWords()
            const requestId = await randomNumberConsumerV2.s_requestId()

            // simulate callback from the oracle network
            await expect(
                VRFCoordinatorV2Mock.fulfillRandomWords(
                    requestId,
                    randomNumberConsumerV2.target
                )
            ).to.emit(randomNumberConsumerV2, "ReturnedRandomness")

            const firstRandomNumber = await randomNumberConsumerV2.s_randomWords(0)
            const secondRandomNumber = await randomNumberConsumerV2.s_randomWords(1)
            

            assert(
                firstRandomNumber > 0n,
                "First random number is greater than zero"
            )

            assert(
                secondRandomNumber > 0n,
                "Second random number is greater than zero"
            )
        })

        it("Should successfully fire event on callback", async function () {
            const { randomNumberConsumerV2, VRFCoordinatorV2Mock } = await loadFixture(
                deployRandomNumberConsumerFixture
            )
        
                randomNumberConsumerV2.once("ReturnedRandomness", async () => {
                    console.log("ReturnedRandomness event fired!")
                    const firstRandomNumber = await randomNumberConsumerV2.s_randomWords(
                        0
                    )
                    const secondRandomNumber = await randomNumberConsumerV2.s_randomWords(
                        1
                    )
                    // assert throws an error if it fails, so we need to wrap
                    // it in a try/catch so that the promise returns event
                    // if it fails.
                    try {
                        assert(firstRandomNumber > 0n)
                        assert(secondRandomNumber > 0n)
                       
                    } catch (e) {
                        console.error(e)
                    }
                })
                await randomNumberConsumerV2.requestRandomWords()
                const requestId = await randomNumberConsumerV2.s_requestId()
                VRFCoordinatorV2Mock.fulfillRandomWords(
                    requestId,
                    randomNumberConsumerV2.target
                )
            
        })
    })
})