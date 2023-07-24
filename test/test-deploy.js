const {ethers} = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage",function(){
  let SimpleStorageFactory, simpleStorage;
  beforeEach(async function(){
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorageFactory.deploy()
  })


  it("Should start with a favorite number of 0",async function(){
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"

    assert.equal(currentValue.toString(), expectedValue)
    //expect(currentValue.toString().to.equal(expectedValue))
  })

  it("Should update when we call store", async function(){
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })
  it("Should start with a favorite number of 0",async function(){
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"

    assert.equal(currentValue.toString(), expectedValue)
    //expect(currentValue.toString().to.equal(expectedValue))
  })
  /*
  it("Should check the person added", async function(){
    const expectedName = "Patrick"
    const expectedNumber = "7"
    const transactionResponse = await simpleStorage.addPerson(expectedName,expectedNumber);
    await transactionResponse.wait(1)

   // const currentName = await simpleStorage.people[0].name;
    const currentNumber = await simpleStorage.people[0].favoriteNumber();
    //assert.equal(currentName.toString(), expectedName)
    assert.equal(currentNumber.toString(), expectedNumber)
  })
  */
})