const {ethers,deployments, run, network} = require("hardhat");
const { get } = require("http");
require("@nomiclabs/hardhat-etherscan");
const {verify} = require("../utils/verify")
// function deployFunc() { 
//     console.log("hi")

// };

// module.exports.default = deployFunc;

const {networkConfig, developMentChain} = require("../helper-hardhat-config");
//define the network
//anon function 
module.exports = async({getNamedAccounts,deployments }) => { 
    // const {getNamedAccounts, deployments} = hre; //hre.getNamedAccounts etc...
    const {deploy, log} = deployments;
    //way for us to getNamed accounts
    const {deployer} = await getNamedAccounts(); 
    const CHAINID = network.config.chainId;

    // let ethUsdPriceFeedAddress = networkConfig.chainID["ethUSDPriceFeed"]; 

    let ethUsdPriceFeedAddress
    if(developMentChain.includes(network.name)) { 
        //checking for local deployment
        const ethUSDAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUSDAggregator.address;
    }else { 
         ethUsdPriceFeedAddress = networkConfig[CHAINID]["ethUSDPriceFeed"]; 

    }
 

    //what happens when we want to change chains? 
    //going for loca host or hardhat we want to use a mock?  
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("Fundme", { 
        from: deployer,
        args: [ethUsdPriceFeedAddress], //price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1, //if none are given -> wait 1 block
    });
    if(!developMentChain.includes(network.name)) { 
        await verify(fundMe.address,args )
    }

    log("-------------------------")


};

module.exports.tags = ["all", "fundMe"]