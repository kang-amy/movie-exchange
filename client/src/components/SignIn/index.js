import * as React from 'react';

import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import Grid from "@mui/material/Grid";

//import BackgroundImage from "./backgroundImage.jpg"

const serverURL = "";

const opacityValue = 0.9;

const lightTheme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#ffffff"
    },
    primary: {
      main: '#ef9a9a',
      light: '#ffcccb',
      dark: '#ba6b6c',
      background: '#eeeeee'
    },
    secondary: {
      main: "#b71c1c",
      light: '#f05545',
      dark: '#7f0000'
    },
  },
});


const SignIn = () => {

  return (
    <ThemeProvider theme={lightTheme}>
      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
      >
        <Grid item>

          <Typography
            variant={"h3"}
            align="flex-start"
          >


              <React.Fragment>
                Sign In page
              </React.Fragment>

          </Typography>

        </Grid>
      </Grid>
    </ThemeProvider>
  );
}




export default SignIn;