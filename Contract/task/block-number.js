const {task} = require("hardhat/config"); 
const { boolean } = require("hardhat/internal/core/params/argumentTypes");


task("block-number", "Prints the current block number").setAction(
    //const blocktask = asynch function() => {}
    //This is known as a anon function in javascript 
    async(taskArgs,hre) => { 
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`);
    }

)

module.exports = {}