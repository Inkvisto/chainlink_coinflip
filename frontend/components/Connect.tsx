'use client'

import React from "react";
//import { connectWallet } from "../web3/connectors/connectWallet";
import styles from './Connect.module.scss'
import { Button } from "@mui/material";
import { useWeb3Context } from "../web3/zustand/context/web3.hook";
import useBalance from "../web3/hooks/balance/useBalance";
import Eth from "./CoinFlip/Eth";
import createWeb3Store from "../web3/zustand/context/web3.storage";

const ConnectComponent = () => {  

  const { provider, isLoading } = useWeb3Context((s) =>s);
 const balance = useBalance();



  const handleConnect = async () => {  
    await createWeb3Store().getState().init();
    }
    return (<>
    {isLoading ? <>Connecting...</> : Boolean(localStorage.getItem('isConnected')) ? <Eth>{balance}</Eth>:  <Button className={styles.container} onClick={()=>handleConnect}>
         Connect Wallet
        </Button>}
    
    
    </>
        
    )
};

export default ConnectComponent;