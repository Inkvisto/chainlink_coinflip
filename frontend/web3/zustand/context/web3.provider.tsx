'use client';

import { useRef } from 'react'
import useWeb3Storage, { Web3State, Web3Store } from './web3.storage.js'
import Web3Context from './web3.context.js';

type Web3ProviderProps = React.PropsWithChildren<Web3State>

export function Web3Provider({ children, ...props }: Web3ProviderProps | any ) {
  const storeRef = useRef<Web3Store>()
  if (!storeRef.current) {
    storeRef.current = useWeb3Storage(props)
  }

  return (
    <Web3Context.Provider value={storeRef.current}>
      {children}
    </Web3Context.Provider>
  )
};

export default Web3Provider;