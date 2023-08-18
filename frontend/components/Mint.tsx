'use client'
import React, { useEffect } from "react"
import { createContract } from "../web3/core/createContracts";
import { FunctionFragment, ParamType } from "ethers";
import { useWeb3Context } from "../web3/zustand/context/web3.hook";
import { useBalance } from "../web3/hooks/balance/useBalance";
import useBalanceForAddresses from "../web3/hooks/balance/useBalanceForAddresses";

export const MintComponent = () => {
    const { signer, account, accounts } = useWeb3Context((s) =>s);
    const[funcIntrerface,setFuncInterface] = React.useState<any>();
    let contractFunctions:{name:string, inputs:readonly ParamType[]}[] = [];
/*

    React.useEffect(() => {
       (async()=>{
        const contractName = 'Ink_Token';
        const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
        const token = await createContract(contractName, contractAddress, signer);
       
        token?.interface.forEachFunction(({name, inputs}:FunctionFragment) => setFuncInterface({name,inputs}));
       })()
    },[])
  


 

   /* const functions = (abi:any[]) => {
        abi.map(({name,inputs}:any) => async()=>{await token[name]})
    }*/

    

/*
    const functions = Object.values(token?.interface.fragments);
    functions.sort((a, b) => {
        const inputsA = a.inputs.length;
        const inputsB = b.inputs.length;
        return inputsA - inputsB;
    });
*/
    /*const methods = {
        mint:async (to?:string, amount?:number) => await token.mint(to, amount),
        balanceOf:async (account: string) =>
    }


 */
    

    const handleMint = async() => {
        const contractName = 'Ink_Token';
        const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
        const token = await createContract(contractName, contractAddress, signer);
        await token.waitForDeployment();
        const mint = await token.mint(account, 100)
        await mint.wait();
        const balance = await token.balanceOf(account);
        console.log(balance);
    }
  console.log( useBalanceForAddresses(['0x70997970C51812dc3A010C7d01b50e0d17dc79C8','0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC']));
  
       // console.log( useBalance());
 
 

    return (
        <>
           <button >
                Mint
           </button>
        </>
    )
}