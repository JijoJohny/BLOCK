

---

# StakeDeck
## Web3 dApp with Wallet Connection, Nonce Generation, and Withdrawal Functionality

This project demonstrates the basic Web3 features such as wallet connection using **ethers.js**, nonce generation for secure authentication, a logout button, and a withdraw card component that allows users to withdraw funds. The dApp uses **Next.js** as the frontend framework, **TailwindCSS** for styling, and **axios** for communication with a backend API.

## Features

1. **Connect Wallet**: Allows users to connect their Ethereum wallet via MetaMask.
2. **Nonce Generation**: Generates a random nonce for secure authentication during wallet connection.
3. **Wallet Logout**: Logs the user out by clearing the connected wallet from local storage.
4. **Withdraw Card**: Allows users to withdraw funds and shows the updated balance.
5. **Wallet Persistence**: Stores the connected wallet state in `localStorage` to persist between page reloads.

## Technologies Used

- **React.js**
- **Next.js**
- **ethers.js**
- **axios**
- **TailwindCSS**
  
## Setup and Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **MetaMask** (for Ethereum wallet connection)
- **npm** or **yarn** installed globally

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/web3-dapp
   cd web3-dapp
   ```

2. **Install dependencies:**

   Run the following command to install required dependencies.

   ```bash
   npm install
   ```

3. **Run the development server:**

   Start the development server using the following command.

   ```bash
   npm run dev
   ```

4. **Open your browser**:

   Visit `http://localhost:3000` in your browser to view the dApp.

## Features Walkthrough

### 1. **Connect Wallet**

The `ConnectWalletButton` allows users to connect their MetaMask wallet. When the wallet is connected, a nonce is generated and sent to the backend, and the user is required to sign it to ensure a secure login process.

#### Code Example

```jsx
import { ethers } from 'ethers';
import axios from 'axios';

const connectWallet = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  
  const nonce = Math.floor(Math.random() * 1000000).toString(); // Generate nonce
  await axios.post('https://your-backend-url/api/nonce', { address, nonce });

  const signature = await signer.signMessage(`Nonce: ${nonce}`);
  await axios.post('https://your-backend-url/api/verify', { address, signature });
};
```

### 2. **Nonce Generation**

A random nonce is generated during the wallet connection process. This nonce is used as a one-time password to prevent replay attacks. The nonce is sent to the backend to verify the user's wallet address.

#### Code Example

```javascript
const generateNonce = () => Math.floor(Math.random() * 1000000).toString();
```

### 3. **Wallet Logout**

The **Logout** button allows users to disconnect their wallet, which clears the wallet address from the frontend state and local storage.

#### Code Example

```jsx
const logout = () => {
  localStorage.removeItem('walletAddress');
  setWalletAddress(null);
};
```

### 4. **Withdraw Card**

The **WithdrawCard** component enables users to input the amount they wish to withdraw and sends the request to the backend for processing. The user's balance is displayed, and the amount is deducted from the balance upon successful withdrawal.

#### Withdraw Card Code Example

```jsx
import axios from 'axios';
import { useState } from 'react';

const WithdrawCard = () => {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(500);
  const [message, setMessage] = useState('');

  const handleWithdraw = async () => {
    if (amount > balance) {
      setMessage('Insufficient balance');
      return;
    }
    
    try {
      const response = await axios.post('https://your-backend-url/api/withdraw', { amount });
      if (response.status === 200) {
        setBalance(balance - amount);
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Error processing withdrawal');
    }
  };

  return (
    <div className="withdraw-card">
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Enter amount"
      />
      <button onClick={handleWithdraw}>Withdraw</button>
      <p>Balance: {balance}</p>
      {message && <p>{message}</p>}
    </div>
  );
};
```

### 5. **Wallet Persistence**

To ensure the wallet state persists between page reloads, we store the connected wallet address in `localStorage`. On component mount, we check if there is a saved address in `localStorage` and set the wallet address accordingly.

#### Code Example

```jsx
useEffect(() => {
  const savedAddress = localStorage.getItem('walletAddress');
  if (savedAddress) {
    setWalletAddress(savedAddress);
  }
}, []);
```

## Backend Integration

### Endpoints

- `POST /api/nonce`: Accepts the wallet address and nonce to store for verification.
- `POST /api/verify`: Accepts the wallet address and signature to verify the nonce and authenticate the user.
- `POST /api/withdraw`: Accepts the amount the user wants to withdraw and returns the updated balance and a success message.

### Backend Response

For withdrawal requests, the backend should respond with:

```json
{
  "message": "Withdrawal successful",
  "newBalance": 450
}
```

## Running the Project in Production

To build and run the project in production mode:

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Start the production server:**

   ```bash
   npm start
   ```

## Contributing

Feel free to contribute to this project by submitting issues or pull requests to improve the functionality or add new features.

---

This README provides a detailed explanation of the Web3 dApp and includes code examples for core features such as wallet connection, nonce generation, balance withdrawal, and state persistence. The backend part is assumed to be set up for handling authentication and withdrawals, using appropriate endpoints.
