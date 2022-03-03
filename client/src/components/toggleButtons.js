import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

export const ConnectionToggleButtons = (props) => {
  const [alignment, setAlignment] = useState();

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label='connection toggle button'
    >
      <ToggleButton
        sx={{ color: 'primary.main' }}
        color='success'
        onClick={props.ethConnect}
        value='left'
        aria-label='left aligned'
      >
        <span>
          <AccountBalanceWalletOutlinedIcon /> MetaMask
        </span>
      </ToggleButton>
      <ToggleButton
        sx={{ color: 'primary.main' }}
        color='success'
        onClick={props.bscConnect}
        value='center'
        aria-label='centered'
      >
        <span>
          <AccountBalanceWalletOutlinedIcon /> Binance
        </span>
      </ToggleButton>
      <ToggleButton
        sx={{ color: 'error.main' }}
        color='error'
        onClick={props.disConnect}
        value='right'
        aria-label='right aligned'
      >
        <span>
          Disconnect <LogoutIcon />
        </span>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
