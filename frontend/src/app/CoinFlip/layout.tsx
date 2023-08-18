
import React from 'react'

import Web3Provider from '../../../web3/zustand/context/web3.provider'


export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Web3Provider >
                {children}
            </Web3Provider>
        </>
    )
}
