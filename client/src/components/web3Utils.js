import { CROWD_SALE_ADDRESS, TOKEN_ADDRESS } from './addresses';
const crowdSaleABI = require('./ABIs/crowdSaleContract.json');
const munziABI = require('./ABIs/MunziContractABI.json');

// Constants
const BSC_TESTNET_EXPLORER_URL = 'https://testnet.bscscan.com/';

// Functions
const getCrowdSaleContract = (web3) => {
  return web3 ? new web3.eth.Contract(crowdSaleABI, CROWD_SALE_ADDRESS) : null;
};

const getMunziContract = (web3) => {
  return web3 ? new web3.eth.Contract(munziABI, TOKEN_ADDRESS) : null;
};

const getAddress = async (web3) => {
  if (!web3) return;

  const accountAddresses = await web3.eth.getAccounts();
  const address = accountAddresses[0];
  return address;
};

const getBalance = async (web3, address = null) => {
  if (!web3) return null;
  const accountAddress = address ? address : await getAddress(web3);
  const balance = await web3.eth.getBalance(accountAddress);
  return web3.utils.fromWei(balance, 'ether');
};

const buyToken = async (web3, value) => {
  if (!web3) return;
  const info = {
    severity: 'success',
    title: 'Success',
    message: 'Transaction is done successfully',
  };

  let txHash = null;

  // Get tx info
  const contract = getCrowdSaleContract(web3);
  const account = await getAddress(web3);
  const amount = web3.utils.toWei(value, 'ether');

  // Call function
  await contract.methods
    .buyTokens(account)
    .send({ from: account, value: amount })
    .once('sending', (payload) => {
      console.log('SENDING:', payload);
    })
    .once('sent', (payload) => {
      console.log('SENT: ', payload);
    })
    .once('transactionHash', (hash) => {
      console.log('TRANSACTION_HASH: ', hash);
      txHash = hash;
    })
    .once('receipt', (receipt) => {
      console.log('RECEIPT: ', receipt);
    })
    .then((receipt) => {
      console.log('SUCCESS: ', receipt);
    })
    .catch((error) => {
      console.log('ERROR: ', error);
      info.severity = 'error';
      info.title = 'Error';
      info.message = error.message;
    });

  if (info.severity === 'success') {
    info.link = BSC_TESTNET_EXPLORER_URL + 'tx/' + txHash;
  }

  return info;
};

export {
  getCrowdSaleContract,
  getMunziContract,
  getAddress,
  getBalance,
  buyToken,
  BSC_TESTNET_EXPLORER_URL,
};
