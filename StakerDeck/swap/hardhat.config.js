require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");


const { ALCHEMY_SEPOLIA_URL, WALLET_PRIVATE_KEY } = process.env;

if (!ALCHEMY_SEPOLIA_URL || !WALLET_PRIVATE_KEY) {
  console.error("Please set your ALCHEMY_SEPOLIA_URL and WALLET_PRIVATE_KEY in a .env file");
  process.exit(1);
}

console.log('Using ALCHEMY_SEPOLIA_URL:', ALCHEMY_SEPOLIA_URL);
console.log('Using WALLET_PRIVATE_KEY:', WALLET_PRIVATE_KEY.slice(0, 4) + '...'); // Show only part of the key for security

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    localhost: {
        url: "http://127.0.0.1:8545"
      },
    sepolia: {
      url: ALCHEMY_SEPOLIA_URL,
      accounts: [`0x${WALLET_PRIVATE_KEY}`], // Ensure the private key has the '0x' prefix
    },
  },
};
