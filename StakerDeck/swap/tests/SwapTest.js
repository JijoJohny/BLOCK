const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Swap Contract", function () {
    let swap;
    let owner;
    let addr1;
    const TOKEN0_ADDRESS = "0xb14E360b3B6046e5657A3D0da67E2dc0393AC4Fa"; // Replace with actual token address
    const TOKEN1_ADDRESS = "0x2C032Aa43D119D7bf4Adc42583F1f94f3bf3023a"; // Replace with actual token address

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        const Swap = await ethers.getContractFactory("Swap");
        swap = await Swap.deploy(); // Ensure the contract is deployed
        await swap.deployed();
    });

    it("Should perform a swap", async function () {
        const poolKey = {
            currency0: TOKEN0_ADDRESS,
            currency1: TOKEN1_ADDRESS,
            fee: 3000,
            tickSpacing: 60,
            hooks: ethers.constants.AddressZero // or your hook address
        };

        const amountSpecified = ethers.utils.parseUnits("1", 18); // Example amount
        const zeroForOne = true; // Example direction

        await expect(swap.swap(poolKey, amountSpecified, zeroForOne, "0x"))
            .to.emit(swap, "SwapExecuted") // Replace with actual event emitted
            .withArgs(/* expected args */);
    });
});

