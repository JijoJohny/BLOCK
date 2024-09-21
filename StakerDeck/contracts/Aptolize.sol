// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Aptolize {
    struct AdminData {
        uint256 deposits;
        address winner;
        uint256 lottery;
    }

    struct UserData {
        uint256 deposits;
    }

    mapping(address => AdminData) private adminData;
    mapping(address => UserData) private userData;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event WinnerPicked(address indexed user, uint256 amount);
    event Claimed(address indexed user, uint256 amount);

    modifier onlyAdmin() {
        require(adminData[msg.sender].deposits != 0, "No admin data initialized");
        _;
    }

    constructor() {
        adminData[msg.sender] = AdminData(0, msg.sender, 0);
    }

    function deposit(address user, uint256 amount) external onlyAdmin {
        require(amount > 0, "Amount must be greater than zero");

        userData[user].deposits += amount; // Directly incrementing deposits

        adminData[msg.sender].deposits += amount;

        emit Deposited(user, amount);
    }

    function withdraw(uint256 amount) external onlyAdmin {
        require(userData[msg.sender].deposits > 0, "No deposits to withdraw");
        require(userData[msg.sender].deposits >= amount, "Withdraw amount exceeded");

        userData[msg.sender].deposits -= amount;
        adminData[msg.sender].deposits -= amount;

        emit Withdrawn(msg.sender, amount);
    }

    function pickWinner(address[] calldata eligibleUsers, uint256 amount) external onlyAdmin {
        require(eligibleUsers.length > 0, "No eligible users");

        uint256 winningIndex = random(eligibleUsers.length);
        address winner = eligibleUsers[winningIndex];

        adminData[msg.sender].winner = winner;
        adminData[msg.sender].lottery = amount;

        emit WinnerPicked(winner, amount);
    }

    function claim() external onlyAdmin {
        require(adminData[msg.sender].winner == msg.sender, "Not the winner");

        uint256 amount = adminData[msg.sender].lottery;
        adminData[msg.sender].lottery = 0;
        adminData[msg.sender].winner = address(0);

        emit Claimed(msg.sender, amount);
        // Transfer logic here, e.g., send funds to the winner
    }

    function isLotteryWinner(address adminAddr, address user) external view returns (bool) {
        return adminData[adminAddr].winner == user;
    }

    function lotteryWinner() external view returns (address) {
        return adminData[msg.sender].winner;
    }

    function lottery() external view returns (uint256) {
        return adminData[msg.sender].lottery;
    }

    function random(uint256 upper) internal view returns (uint256) {
    return uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % upper;
}

}

