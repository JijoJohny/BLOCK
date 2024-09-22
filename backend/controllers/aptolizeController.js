const { ethers } = require('ethers');
const dotenv = require('dotenv');

dotenv.config();

// Set up provider and wallet
const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Token and Aptolize contract addresses
const tokenAddress = process.env.TOKEN_ADDRESS;
const aptolizeAddress = process.env.APTOLIZE_ADDRESS;

// Define ABIs for the token and Aptolize contracts
const tokenABI = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function balanceOf(address account) view returns (uint256)"
];

const aptolizeABI = [
    "function deposit(uint256 amount) external",
    "function withdraw(uint256 amount) external"
];

// Initialize contract instances
const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);
const aptolizeContract = new ethers.Contract(aptolizeAddress, aptolizeABI, wallet);

// Deposit tokens
const depositTokens = async (req, res) => {
    try {
        const { amount } = req.body;
        const parsedAmount = ethers.utils.parseUnits(amount, 6);  // USDT uses 6 decimals

        const txApprove = await tokenContract.approve(aptolizeAddress, parsedAmount);
        await txApprove.wait();

        const txDeposit = await aptolizeContract.deposit(parsedAmount);
        await txDeposit.wait();

        res.status(200).json({ message: 'Deposit successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to deposit tokens' });
    }
};

// Withdraw tokens
const withdrawTokens = async (req, res) => {
    try {
        const { amount } = req.body;
        const parsedAmount = ethers.utils.parseUnits(amount, 6);

        const txWithdraw = await aptolizeContract.withdraw(parsedAmount);
        await txWithdraw.wait();

        res.status(200).json({ message: 'Withdrawal successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to withdraw tokens' });
    }
};

// Get balance of USDT tokens
const getBalance = async (req, res) => {
    try {
        const balance = await tokenContract.balanceOf(wallet.address);
        const formattedBalance = ethers.utils.formatUnits(balance, 6);
        res.status(200).json({ balance: formattedBalance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve balance' });
    }
};

module.exports = {
    depositTokens,
    withdrawTokens,
    getBalance,
};
