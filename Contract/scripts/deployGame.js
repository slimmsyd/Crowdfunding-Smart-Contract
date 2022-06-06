const {ethers} = require("hardhat");
const { FEE, VRF, LINK_TOKEN, KEY_HASH } = require("../constants");
require("dotenv").config({path: ".env"});
require("@nomiclabs/hardhat-etherscan");

async function main() { 


    const contract = await ethers.getContractFactory("RandomGame");
    const deployContract = await contract.deploy(
        VRF,
        LINK_TOKEN,
        KEY_HASH,
        FEE
    );

    await deployContract.deployed();

    console.log("Verify Address", deployContract.address)

    //wait for etherscan to notice the contract has been deployed 
    await sleep(30000);
    await hre.run("verify:verify", {
        address: deployContract.address,
        constructorArguments: [VRF, LINK_TOKEN, KEY_HASH, FEE],
      });

    function sleep(ms) { 
        return new Promise((resolove) => setTimeout(resolove, ms))
    }

};


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


