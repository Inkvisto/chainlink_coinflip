import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { assert, expect } from "chai";
import { EventLog } from "ethers";
import { ethers, network } from "hardhat"
import { expectEvent } from "../utils/expectEvent";



const deployCoinFlipFixture = async () => {
    const [deployer, player] = await ethers.getSigners();

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

    const CoinFlip = await ethers.getContractFactory(
        "CoinFlip"
    )
    const coin = await CoinFlip
        .connect(deployer)
        .deploy(subscriptionId, vrfCoordinatorAddress, keyHash, {value: ethers.parseEther("0.2")})

    await VRFCoordinatorV2Mock.addConsumer(subscriptionId, coin.target)

    return { coin,VRFCoordinatorV2Mock, player }

}


describe("CoinFlip", async function() {
    it("should allow the player to place a bet", async () => {
        const {coin, player} = await loadFixture(deployCoinFlipFixture);
        const betAmount = ethers.parseEther("0.1");
        await coin.connect(player).bet(0, { value: betAmount });
    
        const playerByAddress = await coin.playersByAddress(player.address);
        expect(playerByAddress.betOngoing).to.be.true;
        expect(playerByAddress.betAmount).to.equal(betAmount);
      });

      it("should generate a random number and determine the bet result", async () => {
        const {coin, VRFCoordinatorV2Mock, player} = await loadFixture(deployCoinFlipFixture);
        const betAmount = ethers.parseEther("0.01");
        coin.on("BetResult",
        (address: string, win: boolean, value: any) => {
           console.log(address,  win, value);
          
       })


        const betReceipt = await (await coin.connect(player).bet(0, { value: betAmount })).wait();

        const betEventLog = betReceipt?.logs[1] as EventLog;

        const requestId = betEventLog.args[1];
        await VRFCoordinatorV2Mock.fulfillRandomWords(
            requestId,
            coin.target
        )

     
               



       


/*
        assert(
            firstRandomNumber > 0n,
            "First random number is greater than zero"
        )

        assert(
            secondRandomNumber > 0n,
            "Second random number is greater than zero"
        )
    
        const transaction = await coin.requestRandomWords();
        const transactionReceipt = await transaction.wait(1);
        const eventlog = transactionReceipt?.logs ;
        //const log = eventlog.eventName === 'GeneratedRandomNumber';
        console.log(eventlog);
        
        const randomNumber = log.data;
    /*
        const win = randomNumber.mod(2).eq(0);
        const amountWon = win ? betAmount + 2n : 0n;
    
        const playerBalanceBefore = await coin.getPlayerBalance();
        const contractBalanceBefore = await coin.getContractBalance();
    
        await coin.fulfillRandomWords(requestId, [randomNumber]);
        const playerByAddress = await coin.playersByAddress(player.address);
    
        expect(playerByAddress.betOngoing).to.be.false;
        expect(playerByAddress.betAmount).to.equal(ethers.BigNumber.from(0));
    
        const playerBalanceAfter = await coin.getPlayerBalance();
        const contractBalanceAfter = await coin.getContractBalance();
    
        expect(playerBalanceAfter).to.equal(playerBalanceBefore + amountWon);
        expect(contractBalanceAfter).to.equal(contractBalanceBefore - amountWon);*/
      });
    


})