import { CROWD_SALE_ADDRESS, TOKEN_ADDRESS } from './addresses';
const crowdSaleABI = require('./ABIs/crowdSaleContract.json');
const munziABI = require('./ABIs/MunziContractABI.json');

const getCrowdSaleContract = (web3) => {
  return web3 ? new web3.eth.Contract(crowdSaleABI, CROWD_SALE_ADDRESS) : null;
};

const getMunziContract = (web3) => {
  return web3 ? new web3.eth.Contract(munziABI, TOKEN_ADDRESS) : null;
};

export { getCrowdSaleContract, getMunziContract };
