// const { expect, assert } = require("chai");
// const { ethers } = require("hardhat");

// //Learning how to test 
// //Takes two params => Name{string} & function
// describe("SimpleStorage",function() { 
//   //Tell us what to do before the it()

//   let simpleStorageFactory;
//   let simpleStorage;
//   beforeEach(async function() { 
//      simpleStorageFactory =await ethers.getContractFactory("SimpleStorage"); 
//      simpleStorage = await simpleStorageFactory.deploy(); 

//   }) 


//   it("Should start with a number of 0", async function() { 
//     const currentValue = await simpleStorage.retrieve(); 
//     const expectedValue = "0"; 
//     //assert
//     //expect 
//     //asserting this retrieve to return 0(expected value)
//     assert.equal(currentValue.toString(), expectedValue);
//   })

//   it("Should update when we call store", async function() { 
//     const expectedValue = "8";
//     const transactionRes = await simpleStorage.store(expectedValue);
//     await transactionRes.wait(1)

//     const currentValue = await simpleStorage.retrieve();
    
//     assert.equal(currentValue.toString(), expectedValue);
//   })

//   it("Should add a person name and number to an array", async function () { 
//     const name = "Syd"; 
//     const expectedNum = "2"; 
//     const transactionRes = await simpleStorage.addPerson(name, expectedNum); 
//     await transactionRes.wait(1); 

//     const array = await simpleStorage.nameToNumber; 


//     assert.equal(array[name], name)

//   })


// } )