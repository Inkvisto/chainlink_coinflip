import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { create } from 'zustand'

export interface State {
  address:SignerWithAddress | undefined,
  value:bigint,
  win:boolean,
}

export interface Action {
  addListenerData:(message:State)=>void,
}

const DEFAULT_PROPS = {
  address:undefined,
  value:0n,
  win:undefined,
  profit: 0n
}

export const useBetListenerDataStore = create<Partial<State> & Action>((set) => ({
  ...DEFAULT_PROPS,
  addListenerData: ({address, value, win}:State) => set(() => ({ address, value, win }))
}));

export default useBetListenerDataStore;