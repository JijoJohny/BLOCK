const { ethers } = require("hardhat");

async function main() {
    // Get the contract factory
    const Lock = await ethers.getContractFactory("Lock");

    // Calculate unlock time (1 year from now)
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = (await ethers.provider.getBlock('latest')).timestamp + ONE_YEAR_IN_SECS;

    // Deploy the contract with an initial funding of 1 ETH
    const initialFunding = ethers.utils.parseEther("0.01"); // 1 ETH
    const myContract = await Lock.deploy(unlockTime, { value: initialFunding });

    // Wait for deployment to complete
    await myContract.deployed();

    console.log("Lock contract deployed to:", myContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error deploying contract:", error);
        process.exit(1);
    });
