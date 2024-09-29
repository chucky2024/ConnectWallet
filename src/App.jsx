import React, { useState } from 'react';
import useETHWallet from './walletConnect';
import { ethers } from 'ethers';

const App = () => {
  const { account, balance, connectWallet } = useETHWallet();
  const [inputAddress, setInputAddress] = useState('');
  const [inputBalance, setInputBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInputAddress(e.target.value);
  };

  const checkBalance = async () => {
    setLoading(true);
    setError(''); 
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(inputAddress);
      setInputBalance(ethers.formatEther(balance));
    } catch (err) {
      setError('Error fetching balance. Please check the address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Wallet To Be Connected</h1>
      {!account ? (
        <button style={styles.button} onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <div>
          <p>Connected Account: <strong>{account}</strong></p>
          {/* <p>Your Balance: <strong>{balance} ETH</strong></p> */}
        </div>
      )}
      <input
        type="text"
        value={inputAddress}
        onChange={handleInputChange}
        placeholder="Enter Address"
        style={styles.input}
      />
      <button style={styles.button} onClick={checkBalance} disabled={loading}>
        {loading ? 'Checking...' : 'Get Balance'}
      </button>
      {error && <p style={styles.error}>{error}</p>}
      {inputBalance !== null && !loading && (
        <p>Balance of {inputAddress}: <strong>{inputBalance} ETH</strong></p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    maxWidth: '400px',
    padding: '20px',
  },
  button: {
    padding: '10px 15px',
    margin: '10px 0',
    border: '1px solid #4CAF50',
    borderRadius: '4px',
    backgroundColor: '#fff',
    color: '#4CAF50',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  input: {
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    fontSize: '12px',
  },
};

export default App;
