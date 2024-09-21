const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Aptolize Contract", function () {
    let Aptolize, aptolize, admin, user;

    beforeEach(async () => {
        [admin, user] = await ethers.getSigners();
        Aptolize = await ethers.getContractFactory("Aptolize");
        aptolize = await Aptolize.deploy();
        await aptolize.deployed();
    });

    it("should allow admin to deposit", async () => {
        await aptolize.deposit(user.address, 100);
        const userData = await aptolize.userData(user.address);
        expect(userData.deposits).to.equal(100);
    });

    it("should not allow non-admin to deposit", async () => {
        await expect(aptolize.connect(user).deposit(user.address, 100)).to.be.revertedWith("No admin data initialized");
    });

    it("should allow admin to withdraw", async () => {
        await aptolize.deposit(user.address, 100);
        await aptolize.withdraw(100);
        const userData = await aptolize.userData(admin.address);
        expect(userData.deposits).to.equal(0);
    });

    it("should emit events on deposit and withdrawal", async () => {
        await expect(aptolize.deposit(user.address, 100))
            .to.emit(aptolize, "Deposited")
            .withArgs(user.address, 100);
        await expect(aptolize.withdraw(100))
            .to.emit(aptolize, "Withdrawn")
            .withArgs(admin.address, 100);
    });

    it("should pick a winner", async () => {
        await aptolize.deposit(user.address, 100);
        await aptolize.pickWinner([user.address], 50);
        const winner = await aptolize.adminData(admin.address);
        expect(winner.winner).to.equal(user.address);
    });

    it("should allow winner to claim", async () => {
        await aptolize.deposit(user.address, 100);
        await aptolize.pickWinner([user.address], 50);
        await aptolize.claim();
        const winner = await aptolize.adminData(admin.address);
        expect(winner.lottery).to.equal(0);
    });
});
