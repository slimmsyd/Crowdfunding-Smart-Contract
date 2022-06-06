const { assert, expect } = require("chai");
const {getNamedAccounts, ethers,  network, deployments} = require("hardhat");

  describe("Fundme", async function() {
    //Test only for the consturctor !
    let fundMe;
    let deployer;
    const sendValue = ethers.utils.parseEther("1") // 1eth 1000000000000000000

    beforeEach(async function()  { 
        //deploy fund me contract 
        //using hardhat deploy
        // const accounts = await ethers.getSigners() //return account section in network
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(['all']) //deploy all of the contracts
        fundMe = await ethers.getContract("Fundme", deployer)
        MockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
    
    
       });
  

   it("allows people to fund and withdraw", async function()  { 
    await fundMe.fund({value: sendValue})
    await fundMe.cheaperWithdraw();
    const endingBalance = await fundMe.provider.getBalance(fundMe.address);

    assert.equal(endingBalance.toString(), 0)

   })

  
}) 