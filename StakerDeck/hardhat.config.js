require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
// require("@nomiclabs/hardhat-waffle");

const { ALCHEMY_SEPOLIA_URL, WALLET_PRIVATE_KEY } = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
        url:  process.env.ALCHEMY_SEPOLIA_URL,
        accounts: [`0x${WALLET_PRIVATE_KEY}`],
    },
},
};
