import React from "react"
import Web3Context from "./web3.context"
import { Web3State } from "./web3.storage"
import { useStore } from "zustand"

export function useWeb3Context<T>(
    selector: (state: Web3State) => T,
    equalityFn?: (left: T, right: T) => boolean
  ): T {
    const store = React.useContext(Web3Context)
    if (!store) throw new Error('Missing Web3Context.Provider in the tree')
    return useStore(store, selector, equalityFn)
  }