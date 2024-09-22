// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IKiln {
    function stake(address stablecoin, uint256 amount) external;
}

contract Stakelize is Ownable {
    IERC20 public stablecoin; // Stablecoin to stake
    IKiln public kiln; // Kiln contract

    event StablecoinsStaked(address indexed user, uint256 amount);

    constructor(address _stablecoin, address _kiln) Ownable(msg.sender) {
        stablecoin = IERC20(_stablecoin);
        kiln = IKiln(_kiln);
    }

    function stakeStablecoins(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");

        // Step 1: Transfer stablecoins from the user
        stablecoin.transferFrom(msg.sender, address(this), amount);

        // Step 2: Stake the stablecoins
        stablecoin.approve(address(kiln), amount);
        kiln.stake(address(stablecoin), amount);

        emit StablecoinsStaked(msg.sender, amount);
    }
}
