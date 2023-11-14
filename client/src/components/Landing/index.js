import * as React from 'react';
import NavBar from '../Navigation/AppBar';
import { Typography } from '@mui/material';
import Landing from './Landing';

const LandingPage = () => {
  return (
    <>
    <NavBar></NavBar>
    <Landing></Landing>
    </>
  );
}

export default LandingPage;
