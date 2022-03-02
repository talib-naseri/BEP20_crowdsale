import './App.css';
import {
  Box,
  Button,
  Container,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { BuyInput, GetInput } from './components/input';
import Web3 from 'web3';
import { useState } from 'react';
import { getMunziContract } from './components/contracts';

function App() {
  const [connected, setConnection] = useState(false);
  const [amount, setAmount] = useState(0);
  const [haveRef, setHaveRef] = useState(false);

  const connect = async () => {
    if (window.web3) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(window.ethereum);
      const chainId = await window.web3.eth.getChainId();
      if (chainId !== 97) {
        console.log('Please choose smart chain testnet from metamask'); // create a message
        return;
      }
      return setConnection(true);
    }
    return;
  };

  const disConnect = async () => {
    window.web3 = new Web3();
    setConnection(false);
  };

  const handleRefChange = (event) => {
    setHaveRef(event.target.checked);
  };

  const submit = async () => {
    console.log('submitting: ', { amount, haveRef });
  };

  return (
    <Container>
      <div className='button_container mt'>
        {connected ? (
          <Button
            variant='contained'
            color='error'
            size='large'
            onClick={() => disConnect()}
            startIcon={<LogoutIcon />}
          >
            Disconnect
          </Button>
        ) : (
          <Button
            variant='contained'
            color='success'
            size='large'
            onClick={() => connect()}
            startIcon={<AccountBalanceWalletOutlinedIcon />}
          >
            Connect
          </Button>
        )}
      </div>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        rowSpacing={1}
        columnSpacing={5}
      >
        <Grid item md={6} xs={12}>
          <Box sx={{ borderRadius: 10 }} className='container'>
            <h1 className='secondary'>Phase 2/5 is Live</h1>
            <p>Price of 1 ETH per 3000 SPL</p>
            <p>1 phases completed</p>

            <p>a slide bar</p>
            <p>two sided components</p>
            <p>Sold</p>
            <p>Sold today</p>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{ borderRadius: 10 }} className='container'>
            <p className='text-center'>Munzi.io- ICO pad</p>
            <BuyInput
              web3={connected ? window.web3 : null}
              handleInput={(value) => setAmount(value)}
              value={amount}
            />
            <GetInput web3={connected ? window.web3 : null} value={amount} />
            <Container className='mb-2'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(haveRef)}
                    onChange={handleRefChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label='Have a referral?'
              />
            </Container>
            <div className='row'>
              <Button
                variant='contained'
                color='success'
                className='d-block rounded-pill'
                onClick={() => submit()}
              >
                Buy $SPL
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
