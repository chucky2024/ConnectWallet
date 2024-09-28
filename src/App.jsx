import React, { useState } from 'react';
import useWallet from './walletConnect';
import { ethers } from 'ethers';

const App = () => {
  const { account, balance, connectWallet } = useWallet();
  
  const [inputAddress, setInputAddress] = useState('');

  const [inputBalance, setInputBalance] = useState(null);

  const handleInputChange = (e) => {
    setInputAddress(e.target.value);
  };

  const checkBalance = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const balance = await provider.getBalance(inputAddress);
    setInputBalance(ethers.formatEther(balance));''
  };

  return (
    <div>
      <h1>Wallet Connection</h1>
      {!account ? (<button onClick={connectWallet}> Connect Wallet </button>) : (<div><p>Connected Account: {account}</p> 
                                                                                <p>Your Balance: {balance} ETH</p> </div> )}
      <input type="text" value={inputAddress} onChange={handleInputChange} placeholder="Enter Address"/>
      <button onClick={checkBalance}>Get Balance</button>
      {inputBalance !== null && ( <p>Balance of {inputAddress}: {inputBalance} ETH</p> )}
    </div>
  );
};

export default App;
