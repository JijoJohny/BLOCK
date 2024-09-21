const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock Contract", function () {
    let Lock, lock, owner;

    beforeEach(async () => {
        [owner] = await ethers.getSigners();
        const unlockTime = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour from now
        Lock = await ethers.getContractFactory("Lock");
        lock = await Lock.deploy({ value: ethers.utils.parseEther("1.0") });
        await lock.deployed();
    });

    it("should set the unlock time to 1 hour from now", async () => {
        const unlockTime = await lock.unlockTime();
        expect(unlockTime).to.be.greaterThan(Math.floor(Date.now() / 1000));
    });

    it("should allow owner to withdraw after unlock time", async () => {
        await new Promise(resolve => setTimeout(resolve, 3600000)); // Wait for 1 hour
        await expect(lock.withdraw()).to.emit(lock, "Withdrawal");
    });

    it("should revert if not owner tries to withdraw", async () => {
        const [, user] = await ethers.getSigners();
        await expect(lock.connect(user).withdraw()).to.be.revertedWith("You aren't the owner");
    });

    it("should revert if trying to withdraw before unlock time", async () => {
        await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
    });
});
