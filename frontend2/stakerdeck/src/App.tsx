import { usePrivy } from "@privy-io/react-auth";
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const { login } = usePrivy();
  const [walletAddress, setWalletAddress] = useState('');

  const handleLogin = async () => {
    try {
      const user = await login(); // Assuming login returns user data
      if (user && user.address) {
        setWalletAddress(user.Metamask); // Store wallet address in state

        // Print wallet address in frontend console
        console.log("Wallet Address:", user.walletAddress);
      }
      else{
      console.log("No wallet......")}
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleLogin}>Login</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        {walletAddress && <p>Wallet Address: {walletAddress}</p>}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
