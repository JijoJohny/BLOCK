"use client";
import { useState } from "react";
// import {usePrivy} from "@privy-io/react-auth"
import LoginCard from "../components/LoginCard";
import Navbar from "../components/Navbar";
import SwapCard from "../components/SwapCard";
import Timeline from "../components/TimeLine";
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
  
  // const {login} = usePrivy();
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
        {/* <button className="connect-wallet" onClick={login}>login */}
        {/* </button> */}
        <LoginButton/>
       
      </div>
    </nav>
      <main className="bg-[#0c0a09]">
        {/* <Sidebar/> */}
        <div className="timeline-container">
      <div className='left'>
        <Timeline in={1}/>
        </div>
        <div className='right'>
        
        <SwapCard/>

        </div></div>
        {/* Main content of the page */}
        {showLoginCard && <LoginCard onClose={handleCloseLoginCard} />}
      </main>
    </div>
  );
};

export default Home;