const { ethers } = require("hardhat");

async function main() {
    // Get the contract factory for the Lock contract
    const Lock = await ethers.getContractFactory("Lock");

    // Calculate unlock time (1 year from now)
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = (await ethers.provider.getBlock('latest')).timestamp + ONE_YEAR_IN_SECS;

    // Deploy the contract with an initial funding of 1 ETH
    const initialFunding = ethers.utils.parseEther("1"); // 1 ETH
    const lockContract = await Lock.deploy(unlockTime, { value: initialFunding });

    // Wait for the deployment to be confirmed
    await lockContract.deployed();

    console.log("Lock contract deployed to:", lockContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error deploying Lock contract:", error);
        process.exit(1);
    });
