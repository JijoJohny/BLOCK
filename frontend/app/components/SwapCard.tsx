"use client";
import { Theme, SwapWidget } from '@uniswap/widgets'
// import '@uniswap/widgets/dist/fonts.css'

const theme: Theme = {
  primary: '#FFF',
  secondary: '#A9A9A9',
  interactive: '#000',
  container: '#4E4E5A',
  module: '#222633',
  accent: '#71FF98',
  outline: '#CC1',
  dialog: '#000',
  fontFamily: 'Josefin Sans',
  borderRadius: 0.5,
}

import React, { useState } from 'react';

const SwapCard = () => {
  const [crypto, setCrypto] = useState('usdc'); // State to track selected currency (USDC or USDT)
  const [aptAmount, setAptAmount] = useState('');
  const [stableAmount, setStableAmount] = useState('')

  const handleCryptoChange = (event: any, newCrypto: React.SetStateAction<string> | null) => {
    if (newCrypto !== null) {
      setCrypto(newCrypto);
    }
  };

  return (
    <div className="swap-card">
      <h2>Swap</h2>
      <p>Swap ERC20 to {crypto.toUpperCase()} instantly</p>

      {/* Input for ERC20 amount */}
      <div className="input-container">
        <label>ERC20 Amount</label>
        <input 
          type="number" 
          placeholder="Enter ERC20 amount" 
          value={aptAmount}
          onChange={(e) => setAptAmount(e.target.value)}
        />
      </div>

      {/* Input for USDC/USDT amount */}
      <div className="input-container">
        <label>{crypto.toUpperCase()} Amount</label>
        <input 
          type="number" 
          placeholder={`Enter ${crypto.toUpperCase()} amount`} 
          value={stableAmount}
          onChange={(e) => setStableAmount(e.target.value)}
        />
      </div>

      {/* Toggle Button to switch between USDC and USDT */}
      <div className="toggle-container">
        {/* <ToggleButtonGroup
          value={crypto}
          exclusive
          onChange={handleCryptoChange}
          aria-label="Crypto toggle"
        >
          <ToggleButton value="usdc" aria-label="USDC">
            USDC
          </ToggleButton>
          <ToggleButton value="usdt" aria-label="USDT">
            USDT
          </ToggleButton>
        </ToggleButtonGroup> */}
      </div>

      {/* Swap Button */}
      <button className="swap-button">Swap</button>
    </div>
  );
};

export default SwapCard;