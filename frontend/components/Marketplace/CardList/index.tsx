'use client'

import React from "react"
import styles from './CardList.module.scss'
import { deployMarketplace } from "../../../web3/hooks/deployMarketplace";
import MintNFTModal from "../Actions/MintNFTModal";
import CardComponent from "../Card";
import { ethers } from "ethers";
import { Fade, Grid, LinearProgress } from "@mui/material";
import SelectFilter from "./SelectFilter";
import { useWeb3Context } from "../../../web3/zustand/context/web3.hook";

interface NftInfo {
    tokenURI: string,
    tokenId: bigint,
    marketId: number,
    seller: string,
    owner: string,
    price: bigint,
    sold: boolean,
    canceled: boolean

}

export default function CardListComponent() {
    const [nfts, setNfts] = React.useState<NftInfo[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [nftFilter, setNftFilter] = React.useState('all')
    const [withCreateToken, setWithCreateToken] = React.useState(false);
    const { account, signer, history, provider } = useWeb3Context((s) => s);



    const getNfts = async (mutability: boolean = false) => {
        const market = deployMarketplace(signer);
        const fetchFilter: any = {
            'all': await market?.fetchMarketItems(),
            'listed': await market?.fetchItemsListed(),
            'owned': await market?.fetchMyNFTs()
        }
console.log(history);


        history?.result.map(async (e: any) => {
            let pendingTx = await provider?.getTransaction(e.transaction_hash);
            const res = market.interface.parseTransaction({ data: pendingTx?.data, value: pendingTx?.value })
            console.log(res);
        }
        )


        for (const [k, v] of Object.entries(fetchFilter[nftFilter])) {

            const keys = ['tokenId', 'seller', 'owner', 'price', 'sold', 'cancelled']

            const updatedArr = Object.entries(v).map(innerArr => {
                return innerArr.map(key => {
                    const updatedKey = keys.find((value, index) => key === index.toString());
                    return updatedKey !== undefined ? updatedKey : key;
                });
            });

            const info = Object.fromEntries(updatedArr);


            if (info.tokenId !== 0n) {
                const tokenURI = await market?.tokenURI(info.tokenId)
                mutability ? setNfts([...nfts, { tokenURI, ...info }]) : addToList({ tokenURI, ...info });
            }

        }


    }
    React.useEffect(() => {
        if (signer) getNfts()

    }, [nftFilter, signer])

    async function updateNFT(index: number, tokenId: bigint) {
        const market = await deployMarketplace(signer);
        const [foundMarketItem, hasFound] = await market?.getLatestMarketItemByTokenId(tokenId)
        const updatedNFt = hasFound ? foundMarketItem : {};
        const keys = ['tokenId', 'seller', 'owner', 'price', 'sold', 'cancelled'];

        const arr = Object.values(updatedNFt).map((e, i) => {
            const key = keys[i];

            return [key, e]
        })
        const info = Object.fromEntries(arr)


        const tokenURI = await market?.tokenURI(info.tokenId);


        setNfts((prevNfts: NftInfo[]) => {
            const updatedNfts = [...prevNfts];

            if (nfts) updatedNfts[index] = { tokenURI, ...info }


            return updatedNfts
        })
    }

    async function addToList(nft: any) {
        setNfts(prevNfts => [nft, ...prevNfts]);
    }

    function NFT({ nft, index }: { nft: NftInfo, index: number }) {
        if (!nft.owner) {
            return <MintNFTModal addToList={() => getNfts(true)} />
        }

        if (nft.owner === account.address) {
            return <CardComponent nft={nft} action="sell" updateNFT={() => updateNFT(index, nft.tokenId)} />
        }

        if (nft.seller === account.address && !nft.sold) {
            return <CardComponent nft={nft} action="cancel" updateNFT={() => updateNFT(index, nft.tokenId)} />
        }

        if (nft.seller !== account.address) {
            return <CardComponent nft={nft} action="buy" updateNFT={() => updateNFT(index, nft.tokenId)} />
        }

        return <CardComponent nft={nft} action="none" />
    }

    // if (isLoading) return <LinearProgress/>
    if (!isLoading && !nfts.length) return <> <Grid item xs={12} sm={6} md={3} className={styles.gridItem}>
        <MintNFTModal addToList={() => getNfts()} />
    </Grid>
        <SelectFilter nftFilter={nftFilter} setNftFilter={setNftFilter} setNfts={setNfts} /></>



    return (
        <>
            <MintNFTModal addToList={() => getNfts(true)} />
            <SelectFilter nftFilter={nftFilter} setNftFilter={setNftFilter} setNfts={setNfts} />
            <Grid container className={styles.grid} id="grid">
                {nfts.map((nft, i) =>
                    <Fade in={true} key={i}>
                        <Grid item xs={12} sm={6} md={3} className={styles.gridItem} >
                            <NFT nft={nft} index={i} />
                        </Grid>
                    </Fade>
                )}
            </Grid>
            <div>

            </div>
        </>
    )
}