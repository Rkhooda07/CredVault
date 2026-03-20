import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import './Login.css';
import logo from '@/assets/logo.png';
import { Link2 } from 'lucide-react';

const StudentLogin = () => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    // Load saved wallet address on component mount
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  const handleConnect = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it to continue.");
        return;
      }

      // Use ethers.js provider (optional, for further usage)
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Trigger MetaMask popup for account selection
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];

      setWalletAddress(address);
      localStorage.setItem("walletAddress", address);

      navigate("/student-dashboard");
    } catch (error) {
      console.error("MetaMask connection error:", error);
      alert("Failed to connect MetaMask. Please try again.");
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = x / rect.width;
    const yPercent = y / rect.height;
    
    const tiltX = (yPercent - 0.5) * 16;
    const tiltY = (xPercent - 0.5) * -16;
    
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div className="login-container">
      <div 
        className="login-box"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <h1 className="portal-title">Student Portal</h1>
        
        <div className="logo-connection">
          <div className="logo-wrapper">
            <img src={logo} alt="CredVault Logo" className="credvault-logo" />
            <span className="logo-label">CredVault</span>
          </div>
          
          <div className="connection-icon">
            <Link2 className="chain-icon" />
          </div>
          
          <div className="logo-wrapper">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
              alt="MetaMask Logo" 
              className="metamask-logo" 
            />
            <span className="logo-label">MetaMask</span>
          </div>
        </div>
        
        <button onClick={handleConnect} className="connect-btn">
          {walletAddress ? "Connected: " + walletAddress.slice(0,6) + "..." + walletAddress.slice(-4) : "Connect to your MetaMask wallet"}
        </button>
      </div>
    </div>
  );
};

export default StudentLogin;