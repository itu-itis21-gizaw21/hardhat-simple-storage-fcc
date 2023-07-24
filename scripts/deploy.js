// imports
const {ethers, run, network} = require("hardhat");

// async main
async function main(){
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();
  const address = await simpleStorage.getAddress();
  console.log(`Deployed contract to: ${address} `);
  if(network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY){
       await simpleStorage.waitForDeployment();
       //await simpleStorage.deployTransaction.wait(6);
        await  verify(address, [])
  }
  const currentValue = await simpleStorage.retrieve()
  console.log(`Current Value is: ${currentValue}`)

  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated value is: ${updatedValue}`)
}

async function verify( contractAddress, args ){
    console.log("Verifying Contract...");
    try{
      await run("verify:verify",{
        address: contractAddress,
        constructerArgument: args
      });
    }catch(e){
      if(e.message.toLowerCase().includes("already verified")){
        console.log("Already Verified");
      }else{
        console.log(e)
      }
    }
}

// main
main()
    .then(()=> process.exit(0))
    .catch((error) =>{
      console.error(error);
      process.exit(1);
    })
