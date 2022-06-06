const {getNamedAccounts, ethers} = require("hardhat"); 


async function main() { 
    const {deployer} = await getNamedAccounts;
    const fundMe = await ethers.getContract("Fundme", deployer)

    console.log("Funding contract..")
  
    const withdrawTx = await fundMe.cheaperWithdraw()
    //wait for tx res
    await withdrawTx.wait(1)
    console.log("Got it back"); 

    


};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

