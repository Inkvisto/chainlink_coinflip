'use client'
import { ethers } from "ethers";
import marketplaceArtifact from '../../contracts/NFTMarketplace.json';

export const deployMarketplace = (signer:any) => {
    const contractName = 'NFTMarketplace';
    const contractAddress = '0x86Db4ED875EE8Ba56FF3C66E359B2c79473b09eF';
    return new ethers.Contract(contractAddress, marketplaceArtifact.abi, signer);
}

export default deployMarketplace;