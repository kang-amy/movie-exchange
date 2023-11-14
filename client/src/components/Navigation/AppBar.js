import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/Search')}>Search</Button>
          <Button color="inherit" onClick={() => navigate('/Review')}>Reviews</Button>
          <Button color="inherit" onClick={() => navigate('/MyPage')}>Account</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
