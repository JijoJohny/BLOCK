const { wallet } = require('./config');
const { abi: stablecoinABI } = require('../abi/stablecoinABI.json');
const { abi: kilnABI } = require('../abi/kilnABI.json');
const Aptolize = require('../artifacts/contracts/Aptolize.sol/Aptolize.json');

async function stakeStablecoins(contractAddress, amount) {
    const stablecoinAddress = process.env.STABLECOIN_ADDRESS; // Stablecoin address
    const kilnAddress = process.env.KILN_ADDRESS; // Kiln contract address

    const stablecoinContract = new ethers.Contract(stablecoinAddress, stablecoinABI, wallet);
    const aptolizeContract = new ethers.Contract(contractAddress, Aptolize.abi, wallet);

    // Approve the staking contract to spend stablecoins
    await stablecoinContract.approve(contractAddress, amount);
    console.log(`Approved ${amount} stablecoins for staking`);

    // Stake stablecoins
    const tx = await aptolizeContract.stakeStablecoins(amount);
    await tx.wait();
    console.log(`Staked ${amount} stablecoins successfully`);
}

module.exports = { stakeStablecoins };
