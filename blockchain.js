// blockchain.js

import Web3 from 'web3';

// Initialize Web3 with your Ethereum node provider
const web3 = new Web3('YOUR_ETHEREUM_NODE_PROVIDER_URL');

// Import the ABI and contract address of your smart contract
import { contractAbi } from './contractAbi'; // Import your contract's ABI
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

// Create a contract instance
const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Function to get the user's portfolio from the blockchain
export async function getPortfolio() {
  const accounts = await web3.eth.getAccounts();
  const userAccount = accounts[0]; // Assuming the first account is the user's account

  const result = await contract.methods.getPortfolio().call({ from: userAccount });

  return result;
}

// Function to add an asset to the portfolio on the blockchain
export async function addAsset(assetName, amount) {
  const accounts = await web3.eth.getAccounts();
  const userAccount = accounts[0]; // Assuming the first account is the user's account

  await contract.methods.addAsset(assetName, amount).send({ from: userAccount });

  // Handle transaction confirmation and error handling as needed
}
