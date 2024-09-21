const hre = require("hardhat");

async function main() {
    const Lock = await hre.ethers.getContractFactory("Lock");
    const lock = await Lock.deploy({ value: hre.ethers.utils.parseEther("0.1") }); // Example value

    await lock.deployed();
    console.log("Lock deployed to:", lock.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
