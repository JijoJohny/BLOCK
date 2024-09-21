const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken Contract", function () {
    let MyToken, myToken, owner, user;

    beforeEach(async () => {
        [owner, user] = await ethers.getSigners();
        const initialSupply = ethers.utils.parseEther("1000");
        MyToken = await ethers.getContractFactory("MyToken");
        myToken = await MyToken.deploy(initialSupply);
        await myToken.deployed();
    });

    it("should have correct initial supply", async () => {
        const balance = await myToken.balanceOf(owner.address);
        expect(balance).to.equal(ethers.utils.parseEther("1000"));
    });

    it("should allow owner to mint tokens", async () => {
        await myToken.mint(user.address, ethers.utils.parseEther("100"));
        const balance = await myToken.balanceOf(user.address);
        expect(balance).to.equal(ethers.utils.parseEther("100"));
    });

    it("should allow users to burn tokens", async () => {
        await myToken.burn(ethers.utils.parseEther("100"));
        const balance = await myToken.balanceOf(owner.address);
        expect(balance).to.equal(ethers.utils.parseEther("900"));
    });

    it("should not allow non-owner to mint tokens", async () => {
        await expect(myToken.connect(user).mint(user.address, ethers.utils.parseEther("100"))).to.be.revertedWith("Ownable: caller is not the owner");
    });
});
