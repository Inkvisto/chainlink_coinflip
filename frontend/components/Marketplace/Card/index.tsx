'use client'

import { Box, Button, Card, CardActions, CircularProgress, Divider, Stack, Typography } from "@mui/material"
import Image from "next/image"
import styles from "./Card.module.scss"
import React from "react"
import { deployMarketplace } from "../../../web3/hooks/deployMarketplace"
import { ethers } from "ethers"
import PriceTextField from "./PriceTextField"
import NFTPrice from "./NFTPrice"
import { useWeb3Context } from "../../../web3/zustand/context/web3.hook"

interface NftInfoType {
    tokenURI: string,
    tokenId: bigint,
    marketId: number,
    seller: string,
    owner: string,
    price: bigint,
    sold: boolean,
    canceled: boolean

}



export const CardComponent = ({ nft, action, updateNFT }: any) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [listingFee, setListingFee] = React.useState('');
    const [newPrice, setPrice] = React.useState('0');
    const [priceError, setPriceError] = React.useState(false);
    const { account, signer } = useWeb3Context((s) =>s);

    const market = deployMarketplace(signer);

    async function getAndSetListingFee() {
        if (!market) return;
        const listingFee = await market?.getListingPrice()
        setListingFee(ethers.formatUnits(listingFee, 'ether'))
    }

    React.useEffect(() => {
        getAndSetListingFee()
    }, [])

    const actions:any = {
        buy: {
            text: 'buy',
            method: buyNft
        },
        cancel: {
            text: 'cancel',
            method: cancelNft
        },
        sell: {
            text: listingFee ? `Sell (${listingFee} fee)` : 'Sell',
            method: sellNft
        },
        none: {
            text: '',
            method: () => { }
        }
    }


    async function buyNft(nft: NftInfoType) {

        
        const price =  ethers.parseEther('1')
        const transaction = await market?.createMarketSale(nft.tokenId, {
            value: 2500000000000n
        })
        await transaction.wait()
        updateNFT()
    }

    async function cancelNft(nft: NftInfoType) {
        const transaction = await market?.cancelMarketItem(nft.tokenId)
        await transaction.wait();
        updateNFT()
    }

    async function sellNft(nft: NftInfoType) {
        if (!newPrice) {
            setPriceError(true)
            return
        }
        setPriceError(false)
        const listingFee = await market?.getListingPrice()
        const priceInWei = ethers.parseUnits(newPrice, 'ether')
        const transaction = await market?.createMintedToken(nft.tokenId, priceInWei, { value: listingFee.toString() })
         await transaction.wait()
         updateNFT()
         return transaction
    }

    async function onClick(nft: NftInfoType) {
        try {
            setIsLoading(true)
            await actions[action].method(nft)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <Box className={styles.container}>

            <Stack direction='row' gap={10}>

                <Card>
                    <div style={{ width: '250px', height: '250px', position: 'relative' }}>
                        <Image
                            fill={true}
                            style={{ objectFit: 'cover' }}
                            src={nft.tokenURI}
                            alt='nft image'
                        />

                    </div>

                    <Divider />
                    <Stack direction='row' sx={{ padding: '10px', height:'100px' }} >
                        <div>
                            <div>Owner:{nft.owner.slice(0, 6)}</div>
                            <div>Seller:{nft.seller.slice(0, 6)}</div>
                        </div>
                        <div className={styles.priceContainer}>
                            {action === 'sell'
                                ? <PriceTextField listingFee={listingFee} error={priceError} disabled={isLoading} onChange={(e:any) => setPrice(e.target.value)} />
                                : <NFTPrice nft={nft} />
                            }
                        </div>
                    </Stack>

                    <Divider />
                    <CardActions className={styles.cardActions}>
                        <Button size="small" onClick={() => !isLoading && onClick(nft)}>
                            {isLoading
                                ? <CircularProgress size="20px" />
                                : actions[action].text
                            }
                        </Button>
                    </CardActions>

                </Card>



            </Stack>
        </Box>
    )
}

export default CardComponent;


/*  <div style={{width: '200px', height: '200px', position: 'relative'}}>
           <Image 
                fill={true}
                style={{objectFit:'cover'}}
            src='https://gateway.pinata.cloud/ipfs/QmWhvBHznq9b1XxdfyAPYUPncu1wWDC7zvjjqTRLkzEBoJ'
            alt='nft image'
            />
          
         </div>

         <div style={{width: '200px', height: '200px', position: 'relative'}}>
           <Image 
                fill={true}
                style={{objectFit:'cover'}}
                src='https://gateway.pinata.cloud/ipfs/QmZUTpsrszubZ5ajrfhuaFoDeFkVM8BMiddkJpuHnqsjpy'
            alt='nft image'
            />
          
         </div> */