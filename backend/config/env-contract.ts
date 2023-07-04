import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { extendEnvironment } from "hardhat/config";

extendEnvironment(env => {
    const { contract } = env;
  
    env.contract = function (name:string, body:any) {
      // remove the default account from the accounts list used in tests, in order
      // to protect tests against accidentally passing due to the contract
      // deployer being used subsequently as function caller
      contract((name:string, accounts:SignerWithAddress[]) => body(accounts.slice(1)));
    };
  });