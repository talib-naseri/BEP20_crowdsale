import { Box, Grid, TextField } from '@mui/material';

const BuyInput = (props) => {
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
      >
        <Grid item xs={10}>
          <span className='fw-bold small_txt'>Buy</span>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'left' }}>
          <span className='p-2 fw-bold small_txt' id='max_btn'>
            max
          </span>
        </Grid>
        <Grid item xs={9}>
          <TextField
            id='filled-basic'
            label='Enter an Amount'
            variant='filled'
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <span className='fw-bold'>ETH</span>
        </Grid>
      </Grid>
    </Box>
  );
};

const GetInput = (props) => {
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
      >
        <Grid item xs={10}>
          <span className='fw-bold small_txt'>Get</span>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'left' }}></Grid>
        <Grid item xs={9}>
          <TextField
            id='filled-basic'
            label='Shows how much you get'
            variant='filled'
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <span className='fw-bold'>SPL</span>
        </Grid>
      </Grid>
    </Box>
  );
};

export { BuyInput, GetInput };
