import React from 'react';

import { AddressLike } from 'ethers';
import { useWeb3Context } from '../../zustand/context/web3.hook';


export const useBalance = (address: AddressLike | null = null) => {
    const [balance, setBalance] = React.useState<string>();
    const { account, provider } = useWeb3Context((s) => s);

    if (account) (async () => { setBalance((await provider?.getBalance(address ?? account?.address))?.toString()) })()

    return balance;
};
export default useBalance;