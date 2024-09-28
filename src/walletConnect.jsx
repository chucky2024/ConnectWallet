// src/useWallet.js
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useWallet = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);




  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
    //   await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);

      // Get network information
      const network = await provider.getNetwork();
      setNetwork(network);
    } else {
      alert("Please install a Wallet!");
    }
  };

  const getBalance = async () => {
    if (account && provider) {
      const balance = await provider.getBalance(account);
      setBalance(ethers.formatEther(balance));
    }
  };

  
  useEffect(() => {
    if (account && provider) {
      getBalance();
    }
  }, [account, provider]);

  return {
    account,
    provider,
    balance,
    network,
    connectWallet
  };
};

 export default useWallet;

