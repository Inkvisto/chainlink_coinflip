'use client'
import Image from "next/image"
import HeaderTabs from "../../MUI/header-tabs.mui"
import styles from './Header.module.scss'
import React, { useEffect } from "react"
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Avatar } from "@mui/material"
import { useWeb3Context } from "../../../web3/zustand/context/web3.hook"
export const HeaderComponent = () => {
    const { provider, signer, account } = useWeb3Context((s) => s);
    
    const [balance, setBalance] = React.useState<any>();
    const getBalance = React.useCallback(async () => {
        if (!account) {
            setBalance(undefined);
            return;
        } else if (provider) {
            const result = await provider.getBalance(account);
            setBalance(result);
        }
    }, [provider, account]);

React.useEffect(() => {
    getBalance()    
},[provider])
    return (
        <header className={styles.container}>
            <Image
                src="/logo.svg"
                className={styles.logo}
                alt="logo"
                width={180}
                height={37}
                priority
            />
            <HeaderTabs />
           <div className={styles.icons}>
           <span>Balance: {balance?.toString().slice(0,4)} ETH</span>
            <SearchIcon />
            <NotificationsNoneOutlinedIcon />
           </div>
            <Avatar sx={{ width: 100, height: 100 }} variant="rounded" alt="User Icon" src="/avatar.webp" />
        </header>
    )
}