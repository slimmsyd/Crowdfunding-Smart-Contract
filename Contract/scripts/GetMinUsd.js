const {getNamedAccounts, ethers} = require("hardhat"); 

async function main() { 
    const {deployer} = await getNamedAccounts;
    const fundMe = await ethers.getContract("Fundme", deployer)

    console.log("Getting the min usd");

    let min_usd = await fundMe.MIN_USD();
    

    console.log( min_usd.toString())


}



main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});

