const {getNamedAccounts, ethers} = require("hardhat"); 

async function main() { 
    const {deployer} = await getNamedAccounts;
    const fundMe = await ethers.getContract("Fundme", deployer)

    console.log("Funding contract..")
    const tx = await fundMe.fund({
        value: ethers.utils.parseEther("2"),
    })

    await tx.wait(1); 
    console.log("funded!")


};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

