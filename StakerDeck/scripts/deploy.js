const { ethers } = require("hardhat");

async function main() {
    // Deploy MyToken
    const MyToken = await ethers.getContractFactory("MyToken");
    const initialSupply = ethers.utils.parseUnits("100000", 18); // Initial supply with 18 decimals
    const myToken = await MyToken.deploy(initialSupply); 
    await myToken.deployed();
    console.log("MyToken deployed to:", myToken.address);

    // Deploy Lock
    const Lock = await ethers.getContractFactory("Lock");
    const unlockTime = Math.floor(Date.now() / 1000) + 3600; // Set unlock time to 1 hour from now
    const lock = await Lock.deploy(unlockTime); // Pass the unlock time if necessary
    await lock.deployed();
    console.log("Lock deployed to:", lock.address);

    // Deploy Aptolize
    const Aptolize = await ethers.getContractFactory("Aptolize");
    const aptolize = await Aptolize.deploy(); // No arguments passed
    await aptolize.deployed();
    console.log("Aptolize deployed to:", aptolize.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
