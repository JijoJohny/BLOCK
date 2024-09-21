import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

const LoginButton = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [nonce, setNonce] = useState(null);


  const connectWallet = async () => {
    try {

      if (typeof window.ethereum === 'undefined') {
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
  
      // Call backend API to generate and send nonce
      const response = await axios.post('http://localhost:5000/api/store-nonce', { walletAddress: address });
      const generatedNonce = response.data.nonce; // Get the nonce from the response
      setNonce(generatedNonce);

      const message = `Sign this message to authenticate: ${generatedNonce}`;
  
      // Sign the nonce using MetaMask
      const signature = await signer.signMessage(message);
  
      // Send the signature to the backend for verification
      const verifyResponse = await axios.post('http://localhost:5000/api/auth', {
        walletAddress: address,
        signature,
      });
  
      if (verifyResponse.data.message) {
        alert("Wallet connected and verified successfully!");
      } else {
        alert("Verification failed.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };
  

  // Check if the wallet was already connected on page reload
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  return (
    <button
  onClick={connectWallet}
  className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-800 transition-all"
>
 { "Connect Wallet"}
</button>
  );
};

export default LoginButton;
