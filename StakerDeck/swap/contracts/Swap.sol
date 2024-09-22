// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {IPoolManager} from "./interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {PoolSwapTest} from "v4-core/src/test/PoolSwapTest.sol";
import "v4-core/src/libraries/TickMath.sol";


contract Swap {
    PoolSwapTest swapRouter = PoolSwapTest(address(0x01));

    uint160 public constant MIN_PRICE_LIMIT = TickMath.MIN_SQRT_PRICE + 1;
    uint160 public constant MAX_PRICE_LIMIT = TickMath.MAX_SQRT_PRICE - 1;

    /// @notice Swap tokens
    /// @param key The pool where the swap is happening
    /// @param amountSpecified The amount of tokens to swap. Negative is an exact-input swap
    /// @param zeroForOne Whether the swap is token0 -> token1 or token1 -> token0
    /// @param hookData Any data to be passed to the pool's hook
    function swap(PoolKey memory key, int256 amountSpecified, bool zeroForOne, bytes memory hookData) internal {
        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: zeroForOne,
            amountSpecified: amountSpecified,
            sqrtPriceLimitX96: zeroForOne ? MIN_PRICE_LIMIT : MAX_PRICE_LIMIT
        });

        PoolSwapTest.TestSettings memory testSettings = PoolSwapTest.TestSettings({
            takeClaims: false,
            settleUsingBurn: false
        });

        swapRouter.swap(key, params, testSettings, hookData);
    }
}
