'use client'

import React, { ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { createContract } from '../../../web3/core/createContracts';
import Image from 'next/image';
import { ethers } from 'ethers';
import { deployMarketplace } from '../../../web3/hooks/deployMarketplace';
import { useWeb3Context } from '../../../web3/zustand/context/web3.hook';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#fff',
    border: '1px solid grey',
    padding: '30px',
};

export default function MintNFTModal({addToList}:any) {
  const NFTStorage = (body: any) => fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    body,
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxZGY1ZWMwZC0yMzAyLTQzNmEtYWJlYy1kZmM3MjA3ZmVkZTkiLCJlbWFpbCI6InF3ZXJ0dWFzZGZnaDk1M0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNDY5NGMyYmY2MTliZWY3NDE5YzkiLCJzY29wZWRLZXlTZWNyZXQiOiIyNmMwYjEwM2NjMDU2MTZlOWYwZjE2MmUyZDFiNTkxY2M2MDIzOWI4ZTE5ZDA5ZmY1ZDAyZDliZTFmY2FhNjI1IiwiaWF0IjoxNjg3Nzg4ODkyfQ.PyfYT49E2U6P6YMo5Q6z-HmHOUJqco4hWtFmX4PHEpI`,

    }
})

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [file, setFile] = React.useState<any>();
    const [imageUrl, setImageUrl] = React.useState<string>();
    const { account, signer } = useWeb3Context((s) =>s);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
        }
    };


    const handleMint = async () => {      
      
        const market = deployMarketplace(signer);
        
        const auctionPrice = ethers.parseEther('0.0000025');
        
        const listingPrice = await market?.getListingPrice();
        const options = {
            pinataMetadata: {
              name: 'Tree image',
              keyvalues: {
                description: 'Some beautiful trees'
              }
            },
            pinataOptions: {
              cidVersion: 0
            }
          }

          const body =  new FormData();
          body.append("file", file);
          body.append("name", file?.name);
          body.append("pinataOptions", JSON.stringify(options));
        
          NFTStorage(body).then(async(result:any) => {
            const {IpfsHash} = await result.json();
            const tokenURI = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`
          
          //  const CID = 'QmZUTpsrszubZ5ajrfhuaFoDeFkVM8BMiddkJpuHnqsjpy';
        const token = await (await market?.createToken(tokenURI, auctionPrice, { value: listingPrice })).wait();
       
        
        addToList()
        handleClose()
      
          }).catch((err:any) => {
            //handle error here
            console.log(err);
          });

           
        };
        
    



    return (
        <div>
            <Button sx={{backgroundColor:'#fff', margin:'10px'}} onClick={handleOpen}>Mint NFT</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <input type="file" onChange={handleFileChange} />


                    {imageUrl && <div style={{ width: '200px', height: '200px', position: 'relative' }}>
                        <Image
                            fill={true}
                            style={{ objectFit: 'cover' }}
                            src={imageUrl}
                            alt='No file chosen'
                        />

                    </div>}

                    <Button onClick={handleMint}>Mint</Button>
                </Box>
            </Modal>
        </div>
    );
}



