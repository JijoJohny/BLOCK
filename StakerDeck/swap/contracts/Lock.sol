// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Lock {
    uint256 public unlockTime;
    address public owner;

    event Withdrawal(uint256 amount, uint256 when);

    constructor(uint256 _unlockTime) payable {
        require(_unlockTime > block.timestamp, "Unlock time should be in the future");
        unlockTime = _unlockTime;
        owner = msg.sender;
    }

    // Function to withdraw funds after unlock time
    function withdraw() public {
        require(msg.sender == owner, "You aren't the owner");
        require(block.timestamp >= unlockTime, "You can't withdraw yet");

        uint256 amount = address(this).balance;
        payable(owner).transfer(amount);

        emit Withdrawal(amount, block.timestamp);
    }

    // Fallback function to accept Ether
    receive() external payable {}
}
