require("@nomiclabs/hardhat-waffle");
require("dotenv").config({path: ".env"});
require("./task/block-number")
require("hardhat-gas-reporter");
require("hardhat-deploy")
require("@nomiclabs/hardhat-ethers");
const ALCHEMY_KEY = process.env.ALCHEMY_KEY;
const MUMBAI_KEY = process.env.MUMBAI_KEY;
const POLYSCAN_KEY = process.env.POLYSCAN_KEY;

const ALCHEMY_KEY_RINKEBY = process.env.ALCHEMY_KEY_RINKEBY;
const RINKEBY_KEY = process.env.RINKEBY_KEY;
const ETHER_SCAN_API = process.env.ETHER_SCAN_API;


module.exports = {
  // solidity: "0.8.8"
  solidity:  {
    compilers: [{version: "0.8.8"}, {version: "0.6.6"}],
  },
  defaultNetwork: "hardhat",
  networks:  {
    mumbai: { 
      url: "https://polygon-mumbai.g.alchemy.com/v2/izVf4WKjz4tDv3hI16hGu-9UktoMuHSi",
      accounts: [MUMBAI_KEY],
      chainId: 80001,
      blockConfirmations: 6 //Wait how long it'll take to verify contract
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
      //Don't need to give localhost Accounts
    },
    rinkeby: { 
      url: ALCHEMY_KEY_RINKEBY,
      accounts: [RINKEBY_KEY],
      chainId: 4,
      blockConfirmations: 6
    }
  },
  etherscan: { 
    apiKey: { 
      rinkeby: ETHER_SCAN_API
    }
  }, 
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currencey: "USD",
  },
  namedAccounts:  {
    deployer:  {
      default: 0,
    }
  }
};
