const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock Contract", function () {
    let lock;
    let owner;
    let otherAccount;
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;

    beforeEach(async function () {
        [owner, otherAccount] = await ethers.getSigners();

        const unlockTime = (await ethers.provider.getBlock('latest')).timestamp + ONE_YEAR_IN_SECS;

        const Lock = await ethers.getContractFactory("Lock");
        lock = await Lock.deploy(unlockTime, { value: ethers.utils.parseEther("1") });
        await lock.deployed();
    });

    it("Should set the right unlock time", async function () {
        const unlockTime = (await ethers.provider.getBlock('latest')).timestamp + ONE_YEAR_IN_SECS;
        expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it("Should set the right owner", async function () {
        expect(await lock.owner()).to.equal(owner.address);
    });

    it("Should allow owner to withdraw after unlock time", async function () {
        const unlockTime = (await ethers.provider.getBlock('latest')).timestamp + ONE_YEAR_IN_SECS;

        // Increase time to unlock
        await ethers.provider.send("evm_increaseTime", [ONE_YEAR_IN_SECS]);
        await ethers.provider.send("evm_mine");

        await expect(lock.withdraw()).to.emit(lock, "Withdrawal");
    });

    it("Should revert if not called by owner", async function () {
        await ethers.provider.send("evm_increaseTime", [ONE_YEAR_IN_SECS]);
        await ethers.provider.send("evm_mine");

        await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith("You aren't the owner");
    });

    it("Should revert if called too soon", async function () {
        await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
    });
});
