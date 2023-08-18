'use client'
import { BrowserProvider, ethers } from "ethers";
import coinArtifact from '../../contracts/CoinFlip.json';
import useBetListenerDataStore from "../zustand/bet-listener-data.store";


export async function useListenCoinFlipEvents(provider:BrowserProvider | undefined,listener:any){ 
    const coinAddress = '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9';
    const readCoin =  new ethers.Contract(coinAddress, coinArtifact.abi, provider);
}

export default useListenCoinFlipEvents;

