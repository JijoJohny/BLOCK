import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import Anon from "../components/Anon";

const WalletButtons = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [nonce, setNonce] = useState(null);

  // Function to generate a nonce value (simple example with random number)
  const generateNonce = () => Math.floor(Math.random() * 1000000).toString();

  // Function to connect wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it to use this feature.");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      // Set wallet address and store in localStorage
      localStorage.setItem('walletAddress', address);
      setWalletAddress(address);

      // Generate and store nonce
      const nonce = generateNonce();
      setNonce(nonce);

      // Call backend API to send nonce (replace with your API URL)
      await axios.post('https://your-backend-url/api/nonce', { address, nonce });

      // Sign the nonce using MetaMask (or other wallet)
      const signature = await signer.signMessage(`Nonce: ${nonce}`);

      // Send the signature to backend for verification
      const response = await axios.post('https://your-backend-url/api/verify', {
        address,
        signature,
      });

      if (response.data.success) {
        alert("Wallet connected and verified successfully!");
      } else {
        alert("Verification failed.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  // Function to log out (clear localStorage and reset state)
  const logout = () => {
    localStorage.removeItem('walletAddress');
    setWalletAddress(null);
  };

  // Check if the wallet was already connected on page reload
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  return (
    <>
   
      {/* Connect Wallet Button */}
      <button
        onClick={connectWallet}
        className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-800 transition-all"
      >
        {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
      </button>

      {/* Logout Button */}
      {walletAddress && (
  <>
    <button
      onClick={logout}
      className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-800 transition-all"
    >
      Logout
    </button>
    
    {/* Render the Anon component here */}
    <Anon />
  </>
)}

    </>
  );
};

export default WalletButtons;
