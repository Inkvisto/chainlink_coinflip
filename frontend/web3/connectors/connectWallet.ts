'use client'
import { ethers } from "ethers";
const HARDHAT_NETWORK_ID = '31337';

const metamask = {name:'isMetaMask'};
export const coinBase = {name:'isCoinbaseWallet'};


export const connectWallet = async ( network_name: string = 'hardhat', wallet_name:string = metamask.name) => {

    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      
        
        let provider = window.ethereum;

        //check for wallets extensions, default uses metamask
        if(Array.isArray(window.ethereum.providers)){
            provider = window.ethereum.providers.find((provider:any) => provider[wallet_name])   
        }

        // reload page on chain change
        provider.on('chainChanged', async (args: any) => { window.location.reload()});

   
        const connector = new ethers.BrowserProvider(provider, "any");
        
        // connect to wallet
        await provider.send("eth_requestAccounts", []);


      //  if (network_name === 'hardhat' && provider.networkVersion !== HARDHAT_NETWORK_ID) throw NoHardhatNetworkError('Please connect to localhost:8545');
      
        return connector;
    } else {
        throw NoWalletError(`${wallet_name.slice(2)} not installed`)
    }

}


const NoWalletError = (message: string) => ({
    error: new Error(message),
    code: 'WALLET_ERROR'
});

const NoHardhatNetworkError = (message: string) => ({
    error: new Error(message),
    code: 'NETWORK_ERROR'
})
