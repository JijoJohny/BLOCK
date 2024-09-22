import React, { useState } from 'react';
import axios from 'axios';


const StakingCard = () => {
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [rewards, setRewards] = useState(null);
  const [balance, setBalance] = useState(1000); // Simulated user's balance

  const handleSelect = (duration) => {
    setSelectedDuration(duration);

    // Post request to backend to calculate rewards based on selected duration
    axios.post('/api/stake', { stakingDuration: duration })
      .then((res) => {
        if (res.status === 200) {
          setRewards(res.data.rewards); // Display the rewards from the backend
        }
      })
      .catch((err) => {
        console.error("Error calculating rewards:", err);
      });
  };

  return (
    <div className="staking-card">
      <h2>Stake Your APT</h2>
      <p>Choose a staking duration and earn rewards!</p>

      {/* Staking Options */}
      <div className="options">
        <button 
          className={`option-btn ${selectedDuration === 15 ? 'active' : ''}`}
          onClick={() => handleSelect(15)}
        >
          15 Days
        </button>
        <button 
          className={`option-btn ${selectedDuration === 30 ? 'active' : ''}`}
          onClick={() => handleSelect(30)}
        >
          30 Days
        </button>
        <button 
          className={`option-btn ${selectedDuration === 45 ? 'active' : ''}`}
          onClick={() => handleSelect(45)}
        >
          45 Days
        </button>
        <button 
          className={`option-btn ${selectedDuration === 90 ? 'active' : ''}`}
          onClick={() => handleSelect(90)}
        >
          90 Days
        </button>
      </div>

      {/* Display rewards and user balance */}
      {rewards !== null && (
        <div className="result">
          <h3>Rewards Calculated</h3>
          <p>Your rewards: {rewards} APT</p>
          <p>Your current balance: {balance} APT</p>
        </div>
      )}
    </div>
  );
};

export default StakingCard;
