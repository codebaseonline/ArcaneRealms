// Portfolio.js

import React, { useState, useEffect } from 'react';
import { getPortfolio, addAsset } from '../services/blockchain'; // Import functions for interacting with smart contracts

function Portfolio() {
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    // Fetch the user's portfolio from the blockchain
    async function fetchPortfolio() {
      const userPortfolio = await getPortfolio();
      setAssets(userPortfolio);
    }

    fetchPortfolio();
  }, []);

  const handleAddAsset = async () => {
    // Call a function to add an asset to the portfolio on the blockchain
    await addAsset(newAsset, amount);
    // Update the local state to reflect the change
    setAssets([...assets, { asset: newAsset, amount: amount }]);
    setNewAsset('');
    setAmount('');
  };

  return (
    <div>
      <h2>Portfolio</h2>
      <ul>
        {assets.map((asset, index) => (
          <li key={index}>
            {asset.asset}: {asset.amount}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Asset"
          value={newAsset}
          onChange={(e) => setNewAsset(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleAddAsset}>Add Asset</button>
      </div>
    </div>
  );
}

export default Portfolio;
