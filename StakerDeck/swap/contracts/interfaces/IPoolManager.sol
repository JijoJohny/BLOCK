// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IPoolManager {
    // Define the SwapParams struct
    struct SwapParams {
        bool zeroForOne; // Direction of the swap
        int256 amountSpecified; // Amount specified for the swap
        uint160 sqrtPriceLimitX96; // Price limit for the swap
    }

    // Define the PoolKey struct
    struct PoolKey {
        address currency0; // Address of the first token
        address currency1; // Address of the second token
        uint24 fee; // Fee tier for the pool
        // You can add more properties as needed
    }

    // Define the TestSettings struct
    struct TestSettings {
        bool takeClaims; // Whether to take claims
        bool settleUsingBurn; // Whether to settle using burn
        // You can add more properties as needed
    }

    // Swap function
    function swap(
        PoolKey memory key,
        SwapParams memory params,
        TestSettings memory testSettings,
        bytes memory hookData
    ) external;
}
