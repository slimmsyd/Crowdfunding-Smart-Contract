//predeploy stuff; 
const {ethers, run, network} = require("hardhat");
require("@nomiclabs/hardhat-etherscan");

const {networkConfig, developMentChain,INITAL_ANSWER, DECMIALS} = require("../helper-hardhat-config");


module.exports = async({getNamedAccounts,deployments }) => { 
  const {deploy, log} = deployments;
  const {deployer} = await getNamedAccounts(); 

    //Deploying on a localhost
  if(developMentChain.includes(network.name)) { 
      log("Local network detected! Deploying mocks..");
      await deploy("MockV3Aggregator", { 
          contract: "MockV3Aggregator", 
          from: deployer,
          log: true,
          args: [DECMIALS, INITAL_ANSWER]
      });
      log("Mock deployed")
      log("---------------------------")
  }
  
};

module.exports.tags = ["all", "mocks"]