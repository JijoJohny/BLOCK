"use client";
import { useState } from "react";
import DepositCard from "./components/DepositCard";
import LoginCard from "./components/LoginCard";
import Navbar from "./components/Navbar";
import Timeline from "./components/TimeLine";
import React from "react";
import ConnectWallet from "./components/ConnectWallet";


const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);

  // const handleConnectWallet = () => {
  //   setShowLoginCard(true);
  // };

  // const handleCloseLoginCard = () => {
  //   setShowLoginCard(false);
  //   setIsLoggedIn(true); // Set logged in after successful login/register
  // };
  return (
    <div >
      
      <nav className="navbar">
      <Navbar />
      <div className="navbar-buttons">
      <ConnectWallet/>
      {/* <button 
          onClick={handleConnectWallet}
          className="connect-wallet"
        >
          {isLoggedIn ? 'Wallet Connected' : 'Connect Wallet'}
        </button> */}
        <button className="buy">Buy</button>
      </div>
    </nav>
      <main className="bg-[#0c0a09]">
        {/* <Sidebar/> */}
        <div className="timeline-container">
            
        <section className="hero">
        <div className="hero-content">
          <h1>Decentralized Finance, Simplified</h1>
          <p>Swap, Stake, and Earn seamlessly with Aptolize.</p>
          {/* <button onClick={handleConnectWallet} className="cta-btn">
            {isLoggedIn ? 'Start Swapping' : 'Connect Wallet to Begin'} */}
          {/* </button> */}
        </div>
      </section>
      </div>
   
      </main>
    </div>
  );
};

export default Home;