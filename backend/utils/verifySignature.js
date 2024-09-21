const { ethers } = require('ethers');

const verifySignature = (walletAddress, signature, message) => {
  try {
  console.log('Ethers:', ethers.utils); // Check if ethers is defined
    console.log(message);
    console.log(signature)
    // Recover the address from the signature and the message
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);

    // Check if the recovered address matches the user's wallet address
    return recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
  } catch (err) {
    console.error('Signature verification failed:', err);
    return false;
  }
};

module.exports = verifySignature;
