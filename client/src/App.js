import './App.css';
import {
  Box,
  Button,
  Container,
  Grid,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
  AlertTitle,
  Link,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LinkIcon from '@mui/icons-material/Link';
import LogoutIcon from '@mui/icons-material/Logout';
import { BuyInput, GetInput } from './components/input';
import Web3 from 'web3';
import { useState } from 'react';
import { getBalance, buyToken } from './components/web3Utils';
import { ConnectionToggleButtons } from './components/toggleButtons';

function App() {
  const [connected, setConnection] = useState(false);
  const [amount, setAmount] = useState(0);
  const [haveRef, setHaveRef] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [bothConnections, setBothConnections] = useState(false);
  const [alertData, setAlertData] = useState({
    severity: 'info',
    title: 'INFO',
    message: 'Info message',
  });

  //Toast functions
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const giveAToast = (severity, title, message) => {
    setAlertData({
      severity,
      title,
      message,
    });
    setOpen(true);
  };

  // Connection functions
  const connectToBscWallet = async () => {
    try {
      if (!window.BinanceChain) throw new Error('No Binance Wallet found');
      await window.BinanceChain.request({
        method: 'eth_accounts',
      });
      window.web3 = new Web3(window.BinanceChain);
      const chainId = await window.web3.eth.getChainId();
      if (chainId !== 97)
        throw new Error('Only Binance Smart Chain Testnet Allowed to Connect');

      giveAToast(
        'success',
        'Success',
        'Connected to Binance Wallet Successfully.'
      );
      return setConnection(true);
    } catch (error) {
      return giveAToast(
        'error',
        'ERROR_CONNECTING_BINANCE_WALLET',
        error.message ? error.message : 'Something Went Wrong.'
      );
    }
  };

  const connectToEthWallet = async () => {
    try {
      if (!window.ethereum) throw new Error('No MetaMask Wallet found');
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      window.web3 = new Web3(window.ethereum);
      const chainId = await window.web3.eth.getChainId();
      if (chainId !== 97)
        throw new Error('Only Binance Smart Chain Testnet Allowed to Connect');

      giveAToast('success', 'Success', 'Connected to MetaMask successfully.');
      return setConnection(true);
    } catch (error) {
      return giveAToast(
        'error',
        'ERROR_CONNECTING_BINANCE_WALLET',
        error.message ? error.message : 'Something Went Wrong.'
      );
    }
  };

  const connect = async () => {
    try {
      if (window.ethereum && window.BinanceChain)
        return setBothConnections(true);

      if (window.ethereum) return connectToEthWallet();
      if (window.BinanceChain) return connectToBscWallet();

      return new Error('No Wallets Found');
    } catch (error) {
      return giveAToast(
        'error',
        'ERROR_CONNECTING',
        error.message ? error.message : 'Something went wrong.'
      );
    }
  };

  const disConnect = async () => {
    window.web3 = new Web3();
    setConnection(false);
    setBothConnections(false);
  };

  // input functions
  const handleRefChange = (event) => {
    setHaveRef(event.target.checked);
  };

  const submit = async () => {
    if (!connected) return console.log('Not Connected');
    if (!amount || amount <= 0) return;

    // check if value exceeds balance
    const balance = await getBalance(window.web3);
    if (amount > balance) return console.log('Balance Amount Exceeded');

    setSubmitted(true);

    // send transaction
    const info = await buyToken(window.web3, amount);

    // clear values
    setAmount(0);
    setSubmitted(false);
    setOpen(true);
    setAlertData({ ...info });
  };

  return (
    <Container>
      {/* Connection Buttons */}
      <div className='button_container mt'>
        {bothConnections ? (
          <ConnectionToggleButtons
            ethConnect={connectToEthWallet}
            bscConnect={connectToBscWallet}
            disConnect={disConnect}
          />
        ) : (
          <>
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
          </>
        )}

        <div className='mt-2'>
          <Link
            href='https://testnet.bscscan.com/'
            target='_blank'
            underline='none'
          >
            <LinkIcon />{' '}
            <span> Go to Binance Smart Chain Testnet Explorer</span>
          </Link>
        </div>
      </div>

      {/* App pads */}
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
              <LoadingButton
                loading={submitted}
                variant='contained'
                color='success'
                className='d-block rounded-pill'
                onClick={() => submit()}
              >
                Buy $SPL
              </LoadingButton>
            </div>
          </Box>
        </Grid>
      </Grid>

      {/* Toast messages */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={alertData.severity}
          sx={{ width: '100%' }}
          variant='filled'
        >
          <AlertTitle>{alertData.title}</AlertTitle>
          {alertData.message}
        </Alert>
      </Snackbar>

      {/* Link to binance explorer */}
    </Container>
  );
}

export default App;
