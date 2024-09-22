

---

# StakeDeck
## Web3 dApp with Wallet Connection, Nonce Generation, and Withdrawal Functionality

StakeDeck is a decentralized finance (DeFi) platform built on an EVM-compatible blockchain. It offers users high-yield savings options combined with a gamified lottery system, providing an accessible alternative to traditional financial products. The platform enables users to deposit APT tokens, convert them to stablecoins, stake them for rewards, and participate in daily lotteries.

## Features

- **Fiat Onramping**: Users can convert their fiat into APT tokens, which are used to interact with the platform.
- **Stablecoin Staking**: ERC-20 tokens are converted into stablecoins (USDT/USDC) and staked for rewards.
- **Lottery System**: 5% of staking rewards fund a daily lottery, incentivizing long-term deposits.
- **Daily Reward Management**: Staking rewards are managed and distributed every 24 hours.
- **Currency Hedging**: Users hold value in stablecoins to protect against currency depreciation.
- **Flexible Withdrawals**: Users can withdraw their funds, rewards, and lottery winnings anytime.


## Technologies Used

- **React.js**
- **Next.js**
- **Blockchain**
- **Smart Contracts**
- **Backend**
- **Database**
- **TailwindCSS**
  
## Setup and Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (Database)
- **MetaMask** (for Ethereum wallet connection)
- **npm** or **yarn** installed globally
- **Solidity Compiler** (for smart contract deployment)

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Jjiojohny/BlockHack-Ethereum
   cd BlockHack-Ethereum
   ```

## Frontend Setup

### 1. **Install dependencies:**

   Run the following command to install the required dependencies for the frontend.

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### 2. **Open your browser**:

   Visit http://localhost:3000 in your browser to view the dApp.

## Backend Setup

### 1. **Install dependencies:**

   Run the following command to install the required dependencies for the frontend.

   ```bash
   cd backend
   npm install
   node server.js
   ```

### 2. **Open your browser**:

   Visit http://localhost:5000 in your browser to view the dApp.


## Contributing

Feel free to contribute to this project by submitting issues or pull requests to improve the functionality or add new features.

---

This README provides a detailed explanation of the Web3 dApp and includes code examples for core features such as wallet connection, nonce generation, balance withdrawal, and state persistence. The backend part is assumed to be set up for handling authentication and withdrawals, using appropriate endpoints.
