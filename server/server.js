const express = require('express');
const app = express();
const cors = require('cors');
const Web3 = require('web3');
const config = require('./config');
const reviewRoutes = require('./routes/reviewRoutes');
const qrRoutes = require('./routes/qrRoutes');
app.use(cors());
app.use(express.json());

// Connect to local Ganache node
const web3 = new Web3('http://127.0.0.1:7545');

// Contract address and ABI from config.js
const contractAddress = config.contractAddress;
const contractABI = config.contractABI;

// Contract instance
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

app.use('/api', reviewRoutes(contractInstance));

app.use('/api', reviewRoutes(contractInstance));
app.use('/api', qrRoutes(contractInstance));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
