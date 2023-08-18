'use client';

import { createStore } from 'zustand'
import { BrowserProvider, JsonRpcSigner, ethers } from "ethers";
import useTransactionHistory from '../../../components/Marketplace/moralis/NftTxHistory.js';
import { connectWallet } from '../../connectors/connectWallet.js';

const DEFAULT_PROPS = {
  provider: undefined,
  accounts: undefined,
  account: undefined,
  signer: undefined,
  chainId: 31337n,
  history:undefined,
  isLoading:true,
  connectType:'default'
}

export interface Web3Props {
    provider: BrowserProvider | undefined,
    accounts: JsonRpcSigner[] | undefined,
    account: JsonRpcSigner | undefined
    signer: JsonRpcSigner |  undefined,
    chainId: bigint,
    history:any,
    isLoading:boolean,
    connectType:string,
  
}

export interface Web3State extends Web3Props {
  init: (chainId?:number) => Promise<void>
}

export type Web3Store = ReturnType<typeof createWeb3Store>

export const createWeb3Store = (initialProps?:Partial<Web3Props>) =>{
  const storage =  createStore<Web3State>((set) => ({
     ...DEFAULT_PROPS,
     ...initialProps,
    init: async(chainId?:number) => {
      const connector = await connectWallet();
      window.ethereum.on('accountsChanged', async () => window.location.reload());
      const accounts = await connector.listAccounts();    
      const history = await useTransactionHistory();
      set({
          provider: connector,
          accounts: await connector.listAccounts(),
          account: accounts[0],
          signer: await connector.getSigner(),
          chainId: (await connector.getNetwork()).chainId,
          history,
          isLoading:false
      });
      
    }
  }));

storage.getState().init();  
return storage;

}

export default createWeb3Store;


