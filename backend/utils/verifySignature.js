const { ethers } = require('ethers');

const verifySignature = (walletAddress, signature, message) => {
  try {
  //console.log('Ethers:', ethers); // Check if ethers is defined

    //console.log(signature)
    // Recover the address from the signature and the message
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);
    console.log(recoveredAddress, walletAddress);
    return recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
  } catch (err) {
    console.error('Signature verification failed:', err);
    return false;
  }
};

module.exports = verifySignature;
