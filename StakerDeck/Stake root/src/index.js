const { stakeStablecoins } = require('./staking');

const main = async () => {
    const contractAddress = process.env.APTOLIZE_CONTRACT_ADDRESS; // Your deployed Aptolize contract
    const amount = ethers.utils.parseUnits("50.0", 18); // Example amount to stake

    await stakeStablecoins(contractAddress, amount);
};

main()
    .then(() => console.log('Done!'))
    .catch((error) => console.error(error));
