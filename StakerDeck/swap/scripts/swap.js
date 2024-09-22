const { ethers } = require("hardhat");

async function main() {
    const Swap = await ethers.getContractFactory("Swap");
    const swapContract = await Swap.deploy();
    await swapContract.deployed();

    console.log("Swap contract deployed to:", swapContract.address);

    const token0 = "0xb14E360b3B6046e5657A3D0da67E2dc0393AC4Fa"; // Replace with actual token0 address
    const token1 = "0x2C032Aa43D119D7bf4Adc42583F1f94f3bf3023a"; // Replace with actual token1 address
    const fee = 3000;
    const tickSpacing = 60;
    const hookAddr = "0x90609361D7E549662C2E5A877040649475514950"; // Replace with actual hook address

    const poolKey = {
        currency0: token0,
        currency1: token1,
        fee: fee,
        tickSpacing: tickSpacing,
        hooks: hookAddr
    };

    const amountToSwap = ethers.utils.parseUnits("1", 18); // Swap 1 token0
    const zeroForOne = true; // token0 -> token1

    const tx = await swapContract.swap(poolKey, -amountToSwap.toString(), zeroForOne, "0x");
    await tx.wait();

    console.log("Swap executed");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
