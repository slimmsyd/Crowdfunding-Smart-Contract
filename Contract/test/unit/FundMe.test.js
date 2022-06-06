const { assert, expect } = require("chai");
const {getNamedAccounts, ethers,  network} = require("hardhat");

const { developmentChain } = require("../../helper-hardhat-config")
  describe("FundMe", async function() {
    //Test only for the consturctor 
    let fundMe;
    let deployer;
    let MockV3Aggregator;
    const sendValue = ethers.utils.parseEther("65") // 1eth 1000000000000000000

   beforeEach(async function()  { 
    //deploy fund me contract 
    //using hardhat deploy
    // const accounts = await ethers.getSigners() //return account section in network
    //
    deployer = (await getNamedAccounts()).deployer
    await deployments.fixture(['all']) //deploy all of the contracts
    fundMe = await ethers.getContract("Fundme", deployer)
    MockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)


   });
    describe("constructor", async function() { 
        it("sets the aggregator address correclty", async function() { 
            const response = await fundMe.getPriceFeed(); //wasn't a function but a decleartion
            assert.equal(response, MockV3Aggregator.address)
        })

    });

    describe("fund", async function() { 
        //test if contract does fail if not eth sent 
        it("fails if you do not send enough ETH", async function() { 
            await expect(fundMe.fund()).to.be.revertedWith("Didn't send enough");
            // await fundMe.fund;
        });
        it("updates the amount funded data structure", async function() { 
            await fundMe.fund({value: sendValue })  
            const response = await fundMe.getAddressToAmountFunded(
                deployer
            );

                assert.equal(response.toString(), sendValue.toString())//to string because of big number value
        });
        it("add funders to funders array", async function() { 
            await fundMe.fund({value: sendValue});
            //calling the funders array
            const funder = await fundMe.getFunders(0);
            //funder should be the same as deployer addres
            assert.equal(funder, deployer);
        })
    });

    describe("withdraw", async function() { 
        beforeEach(async function() { 
            //add funds to contract
            await fundMe.fund({value: sendValue});

        });


        it("withdraw ETH from a single founder", async function()  {
            //Arrange
            const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const startingDeployerBalance = await fundMe.provider.getBalance(deployer);

            //Act
            const transactionResponse = await fundMe.withdraw();
            const transactionRecieved = await transactionResponse.wait(1); //gets the gas 
            const {gasUsed, effectiveGasPrice} = transactionRecieved
            const gasCost = gasUsed.mul(effectiveGasPrice); //mul because we are 
            
            //balance changes after transaction is mined
            const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const endingDeployerBalance = await fundMe.provider.getBalance(deployer);

            //Assert
            assert.equal(endingFundMeBalance, 0);
            //cal gas cost 
            assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(), endingDeployerBalance.add(gasCost).toString());
        });


        /** THIS TEST IS NOT WORKING FOR SOME REASON */
        it("allows us to withdraw with multiple funders", async function() {
            const accounts = await ethers.getSigners(); //get accounts in array

       
            //loop throught accounts
            for(let i = 1; i< 6; i++) { 
                //create new objects to this account
                const fundMeConnectedContract = await fundMe.connect(accounts[i]);
                await fundMeConnectedContract.fund({value: sendValue});
                
            }



            const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const startingDeployerBalance = await fundMe.provider.getBalance(deployer);

            //act

            const transactionResponse = await fundMe.withdraw();
            const transactionRecieved = await transactionResponse.wait(1); //gets the gas 
            const {gasUsed, effectiveGasPrice} = transactionRecieved
            const gasCost = gasUsed.mul(effectiveGasPrice);
            console.log(`GasCost: ${gasCost}`)
            console.log(`GasUsed: ${gasUsed}`)
            console.log(`GasPrice: ${effectiveGasPrice}`)
            
            const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const endingDeployerBalance = await fundMe.provider.getBalance(deployer);
        
       
            //cal gas cost 
            assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(), endingDeployerBalance.add(gasCost).toString());

            //make sure funders are rest properly 
            await expect(fundMe.getFunders(0)).to.be.reverted


          

        })

        it("only allows owner to withdraw", async function() { 
            const accounts = await ethers.getSigners();
            const attacker = accounts[1]
            const attackerContractContract = await fundMe.connect(attacker); //account object

            await expect(attackerContractContract.withdraw()).to.be.reverted


        })

    })


    describe("withdraw", async function() { 
        beforeEach(async function() { 
            //add funds to contract
            await fundMe.fund({value: sendValue});
    
        });
    
    
        it("withdraw ETH from a single founder", async function()  {
            //Arrange
            const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const startingDeployerBalance = await fundMe.provider.getBalance(deployer);
    
            //Act
            const transactionResponse = await fundMe.cheaperWithdraw();
            const transactionRecieved = await transactionResponse.wait(1); //gets the gas 
            const {gasUsed, effectiveGasPrice} = transactionRecieved
            const gasCost = gasUsed.mul(effectiveGasPrice); //mul because we are 
            
            //balance changes after transaction is mined
            const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const endingDeployerBalance = await fundMe.provider.getBalance(deployer);
    
            //Assert
            assert.equal(endingFundMeBalance, 0);
            //cal gas cost 
            assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(), endingDeployerBalance.add(gasCost).toString());
        });
    
    
        /** THIS TEST IS NOT WORKING FOR SOME REASON */
        it("allows us to withdraw with multiple funders", async function() {
            const accounts = await ethers.getSigners(); //get accounts in array
    
       
            //loop throught accounts
            for(let i = 1; i< 6; i++) { 
                //create new objects to this account
                const fundMeConnectedContract = await fundMe.connect(accounts[i]);
                await fundMeConnectedContract.fund({value: sendValue});
                
            }
    
    
    
            const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const startingDeployerBalance = await fundMe.provider.getBalance(deployer);
    
            //act
    
            const transactionResponse = await fundMe.cheaperWithdraw();
            const transactionRecieved = await transactionResponse.wait(1); //gets the gas 
            const {gasUsed, effectiveGasPrice} = transactionRecieved
            const gasCost = gasUsed.mul(effectiveGasPrice);
            console.log(`GasCost: ${gasCost}`)
            console.log(`GasUsed: ${gasUsed}`)
            console.log(`GasPrice: ${effectiveGasPrice}`)
            
            const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const endingDeployerBalance = await fundMe.provider.getBalance(deployer);
        
       
            //cal gas cost 
            assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(), endingDeployerBalance.add(gasCost).toString());
            console.log(fundMe.getFunders(1), "This is a funder ")
    
            //make sure funders are rest properly 
            await expect(fundMe.getFunders(0)).to.be.reverted
            
    
                assert.equal(await fundMe.getAddresToAmountFunded[accounts[1]], 0)
    
        })
    
        it("only allows owner to withdraw", async function() { 
            const accounts = await ethers.getSigners();
            const attacker = accounts[3]
            console.log(`This is attacker ${attacker}`)
            const attackerContractContract = await fundMe.connect(attacker); //account object
        
            await expect(attackerContractContract.cheaperWithdraw()).to.be.reverted
    
    
        })
    
    })


})


