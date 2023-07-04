import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-deploy';
import '@nomicfoundation/hardhat-chai-matchers'




const INFURA_API_KEY = 'ccef27f1eed0498eb8ec26c3f660bdbc'
const SEPOLIA_PRIVATE_KEY = '4cd8be56b851e508836b1a52e683ce0f2aa120b7799e3146f0ab3f2c9c24e347'

const config: HardhatUserConfig = {
  solidity: {
    version:"0.8.19",
    settings:{
      optimizer:{
        enabled: true
      }
     },
  },
  etherscan:{
    apiKey:'RSQ5H3Q1IN2K8CZMACJSK8AU9PR1F35HF8',
  },
  
  networks:{
    hardhat:{
      initialBaseFeePerGas: 0,
    },
    homestead: {
      url:'https://etherscan.io',
      gasPrice: 20e8,
      gas: 25e6,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  },
  gasReporter: {
    enabled:false,
    coinmarketcap:'313f8a67-62dd-4bf1-86e6-431538f803a9'
  },

  namedAccounts: {
    deployer: {
      default: 0, 
      1: 0, 
    },
    proposer:{
      default:1,
      1:1
    },
    executor: {
      default:2,
      0:2
    }
  }
};


export default config;
