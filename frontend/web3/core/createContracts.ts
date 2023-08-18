import { ContractRunner, ethers } from "ethers";

export const deployContract = async (contractName: string, signer: ContractRunner | null, ...args: any) => {
  const artifact = await import(`../../contracts/${contractName}.json`);

  const contract = await new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer).deploy(...args);
  await contract.waitForDeployment();
  return contract;

}

export const createContract = async (contractName: string, address: string, signer: ContractRunner) => {
  const { abi } = await import(`../../contracts/${contractName}.json`);

  return new ethers.Contract(address, abi, signer);
}


export const getContract = async (contractName: string, provider: ContractRunner) => {

  const { abi } = await import(`../../contracts/${contractName}.json`);
  const {Ink_Token} = await import (`../../contracts/${contractName}-contract-address.json`)

  return new ethers.Contract(Ink_Token, abi, provider);

}


