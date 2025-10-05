import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '@/assets/logo.png';
import { Link2 } from 'lucide-react'; // Chain link icon - perfect for blockchain

const StudentLogin = () => {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const handleConnect = () => {
    navigate('/institution-dashboard');
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
        {/* Title */}
        <h1 className="portal-title">Institution Portal</h1>
        
        {/* Logo Connection Display */}
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
        
        {/* Description */}
        {/* <p className="portal-description">
          Click here to connect to your MetaMask wallet
        </p> */}
        
        {/* Connect Button */}
        <button onClick={handleConnect} className="connect-btn">
          Connect to your MetaMask wallet
        </button>
      </div>
    </div>
  );
};

export default StudentLogin;
