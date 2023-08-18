import { AddressLike } from 'ethers';
;
import React from 'react';
import { useWeb3Context } from '../../zustand/context/web3.hook';


export const useBalanceForAddresses = (addresses: AddressLike | AddressLike[] | any = null) => {
    const [balances, setBalances] = React.useState<bigint[]>([]);
    const { provider } = useWeb3Context((s) => s);

      React.useEffect(() => {
             addresses.forEach(async(address:string) => {
                const newBalance = await provider?.getBalance(address);
                if(newBalance) setBalances((balance) => [...balance, newBalance]);                
            });

      },[provider])

    return balances;
};
export default useBalanceForAddresses;