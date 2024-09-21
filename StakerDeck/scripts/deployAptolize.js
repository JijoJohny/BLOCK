const hre = require("hardhat");

async function main() {
    const Aptolize = await hre.ethers.getContractFactory("Aptolize");
    const aptolize = await Aptolize.deploy();

    await aptolize.deployed();
    console.log("Aptolize deployed to:", aptolize.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
