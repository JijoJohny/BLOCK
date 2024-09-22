"use client";
import { useState } from "react";
import LoginCard from "../components/LoginCard";
import Navbar from "../components/Navbar";
import Timeline from "../components/TimeLine";
import StakingCard from "../components/StakingCard";
import LoginButton from "../components/LoginButton";


const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);

  const handleConnectWallet = () => {
    setShowLoginCard(true);
  };

  const handleCloseLoginCard = () => {
    setShowLoginCard(false);
    setIsLoggedIn(true); // Set logged in after successful login/register
  };
  return (
    <div >
      
      <nav className="navbar">
      <Navbar />
      <div className="navbar-buttons">
      {/* <button 
          onClick={handleConnectWallet}
          className="connect-wallet"
        >
          {isLoggedIn ? 'Wallet Connected' : 'Connect Wallet'}
        </button> */}
        <LoginButton/>
        <button className="buy">Buy</button>
      </div>
    </nav>
      <main className="bg-[#0c0a09]">
        {/* <Sidebar/> */}
        <div className="timeline-container">
      <div className='left'>
        <Timeline in={2}/>
        </div>
        <div className='right'>
        
        <StakingCard/>

        </div></div>
        {/* Main content of the page */}
        {showLoginCard && <LoginCard onClose={handleCloseLoginCard} />}
      </main>
    </div>
  );
};

export default Home;