import { ethers, artifacts } from "hardhat"
import path from 'path';
import fs from 'fs';
import { NFT, Ink_Token, NFTMarketplace, CoinFlip, VRFCoordinatorV2Mock } from "../typechain-types";
import { EventLog } from "ethers";

async function main() {

    console.warn(
        "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );


    const [signer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", signer.address);
    console.log(await ethers.provider.getBalance(signer.address));
    
    
/*
    const BASE_FEE = "100000000000000000"
    const GAS_PRICE_LINK = "1000000000" // 0.000000001 LINK per gas


    const VRFCoordinatorV2MockFactory = await ethers.getContractFactory(
        "VRFCoordinatorV2Mock"
    )
    const VRFCoordinatorV2Mock = await VRFCoordinatorV2MockFactory.deploy(
        BASE_FEE,
        GAS_PRICE_LINK
    )

    await VRFCoordinatorV2Mock.waitForDeployment();


    const fundAmount = "1000000000000000000";
    const transaction = await VRFCoordinatorV2Mock.createSubscription()
    const transactionReceipt = await transaction.wait(1);
    const eventlog = transactionReceipt?.logs[0] as EventLog;

    const subscriptionId = eventlog.args[0];
    await VRFCoordinatorV2Mock.fundSubscription(subscriptionId, fundAmount);


    const vrfCoordinatorAddress = VRFCoordinatorV2Mock.target
    const keyHash = "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc"

    const coin = await ethers.deployContract(
        "CoinFlip", [subscriptionId, vrfCoordinatorAddress, keyHash], { signer, value: ethers.parseEther('0.2') }
    )

    await VRFCoordinatorV2Mock.addConsumer(subscriptionId, coin.target)
*/
    const token = await ethers.deployContract("Ink_Token", { signer });
    const nft = await ethers.deployContract("NFT", ['Ink_NFT', 'INFT', signer], { signer });
    const marketplace = await ethers.deployContract("NFTMarketplace", ['Ink_Marketplace', 'INKM'], { signer });


    await token.waitForDeployment();
    await nft.waitForDeployment();
    await marketplace.waitForDeployment();


    console.log('token:',await token.getAddress());
    console.log('nft:',await nft.getAddress());
    console.log('market:',await marketplace.getAddress());
    

    const contractsDir = path.join(__dirname, '/../../', 'frontend/contracts')


    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir)
    }

    saveFrontendFiles({ Ink_Token: token, NFT: nft, NFTMarketplace: marketplace })
    function saveFrontendFiles(contracts: { Ink_Token: Ink_Token, NFT: NFT, NFTMarketplace: NFTMarketplace }) {
        const contractsDir = path.join(__dirname, '/../..', 'frontend/contracts')

        if (!fs.existsSync(contractsDir)) {
            fs.mkdirSync(contractsDir)
        }

        Object.entries(contracts).forEach((contract_item) => {
            const [name, contract] = contract_item;


            if (contract.runner) {
                fs.writeFileSync(
                    path.join(contractsDir, '/', name + '-contract-address.json'),
                    JSON.stringify({ [name]: contract.runner.address }, null, 2)
                )
            }
            const ContractArtifact = artifacts.readArtifactSync(name)

            fs.writeFileSync(
                path.join(contractsDir, '/', name + ".json"),
                JSON.stringify(ContractArtifact, null, 2)
            )
        })
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

