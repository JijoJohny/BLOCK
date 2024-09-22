import React, { useState } from 'react';
import axios from 'axios';

const WithdrawCard = () => {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(500); // Example balance
  const [message, setMessage] = useState('');

  const handleWithdraw = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    if (amount > balance) {
      setMessage("Insufficient balance.");
      return;
    }

    try {
      const response = await axios.post('https://your-backend-url/api/withdraw', { amount });

      if (response.status === 200) {
        // Assuming the backend responds with a message or updated balance
        setMessage(response.data.message);
        setBalance(prevBalance => prevBalance - amount); // Update the balance after successful withdrawal
        setAmount(''); // Clear the input field
      }
    } catch (error) {
      setMessage("Error processing withdrawal.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-[#1f1f1f] shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Withdraw Funds</h2>

      <div className="flex flex-col space-y-2">
        <label htmlFor="withdrawAmount" className="text-gray-600">Amount to Withdraw:</label>
        <input
          type="number"
          id="withdrawAmount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter amount"
        />
      </div>

      <div className="text-sm text-gray-600">Current Balance: ${balance}</div>

      <button
        onClick={handleWithdraw}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Withdraw
      </button>

      {message && (
        <div className="text-center text-red-500 mt-4">{message}</div>
      )}
    </div>
  );
};

export default WithdrawCard;
