import { createContract, getContract } from "../../core/createContracts";

export const token =  async (governorAddress:string,signer:any):Promise<any> =>await getContract("Ink_Token",signer);

export const mint = async (token:any,address:any,tokenSupply:number) =>{
    await token.mint(address, tokenSupply);
  }

  export const total = async(token:any) => {
    await token.totalSupply()
  }