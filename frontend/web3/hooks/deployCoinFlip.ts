'use client'
import { ethers } from "ethers";
import coinArtifact from '../../contracts/CoinFlip.json';
import coordinatorArtifact from '../../contracts/VRFCoordinatorV2Mock.json';
import { useWeb3Context } from "../zustand/context/web3.hook";


export function useDeployCoinFlip(provider:any, signer:any):{coin:any, coordinator:any,readCoin:any} { 
    const coinAddress = '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9';
    const coordinatorAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
    const coin =  new ethers.Contract(coinAddress, coinArtifact.abi, signer);
    const readCoin =  new ethers.Contract(coinAddress, coinArtifact.abi, provider);
    const coordinator =  new ethers.Contract(coordinatorAddress, coordinatorArtifact.abi, signer);
    return {coin, readCoin, coordinator};
 
}

export default useDeployCoinFlip;

