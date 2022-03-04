import { Box, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCrowdSaleContract } from './web3Utils';

const BuyInput = (props) => {
  const web3 = props.web3;
  const [balance, setBalance] = useState(null);
  const [exceedBalance, setExceedBalance] = useState(false);

  // get balance
  useEffect(() => {
    web3 && getBalance(web3);
  });

  const getBalance = async () => {
    const accountAddress = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accountAddress[0]);
    setBalance(web3.utils.fromWei(balance, 'ether'));
  };

  // max function
  const setMaxAmount = () => {
    props.handleInput(balance);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (value > balance) setExceedBalance(true);
    else setExceedBalance(false);
    props.handleInput(value);
  };

  return (
    <Box
      className='mb-2'
      border={1}
      borderRadius={5}
      borderColor='white'
      sx={{ p: '6%' }}
    >
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={1}
        rowSpacing={2}
      >
        <Grid item xs={2}>
          <span className='fw-bold small_txt'>Buy</span>
        </Grid>
        <Grid item xs={8}>
          <div className='text-center'>
            <span className='small_text font-monospace text-muted fst-italic'>
              {balance ? balance : 0} BNB
            </span>
          </div>
        </Grid>
        <Grid item xs={2}>
          <button
            onClick={setMaxAmount}
            className='p-2 d-inline fw-bold small_txt'
            id='max_btn'
          >
            max
          </button>
        </Grid>
        <Grid item xs={9}>
          <TextField
            error={exceedBalance}
            id='id="fullWidth'
            label='Enter an Amount'
            variant='outlined'
            size='small'
            type='number'
            helperText={exceedBalance && 'Exceeded your balance'}
            value={props.value}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <span className='fw-bold'>BNB</span>
        </Grid>
      </Grid>
    </Box>
  );
};

const GetInput = (props) => {
  const [rate, setRate] = useState(0);

  // get crowd sale contract
  const contract = getCrowdSaleContract(props.web3);

  // get rate
  useEffect(() => {
    contract && getRate();
  });

  const getRate = async () => {
    const rate = await contract.methods.rate.call().call();
    setRate(rate);
  };

  return (
    <Box
      className='mb-2'
      border={1}
      borderRadius={5}
      borderColor='white'
      sx={{ p: '6%' }}
    >
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={1}
        rowSpacing={2}
      >
        <Grid item xs={2}>
          <span className='fw-bold small_txt'>Get</span>
        </Grid>
        <Grid item xs={8}>
          <div className='text-center'>
            <span className='small_text font-monospace text-muted fst-italic'>
              {rate ? rate : 0} MUN/BNB
            </span>
          </div>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'left' }}></Grid>
        <Grid item xs={9}>
          <TextField
            id='filled-basic'
            label='Shows how much you get'
            variant='outlined'
            size='small'
            value={props.value ? Number(props.value) * rate : 0}
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <span className='fw-bold'>MUN</span>
        </Grid>
      </Grid>
    </Box>
  );
};

export { BuyInput, GetInput };
