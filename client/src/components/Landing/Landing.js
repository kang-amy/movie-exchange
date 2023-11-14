import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import ReviewPagePhoto from './reviewPage.png';
import myPagePhoto from './myPage.png';
import searchPagePhoto from './searchPage.png';


const Landing = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3">Movie Exchange</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Search for movies & reviews:</Typography>
        <Typography>Head to the "Search" tab</Typography>
        <Typography>Search by movie titles, directors and/or actors to find related movies and reviews for your next watch</Typography>
        <img style={{ width: "40%" }} src={searchPagePhoto} alt="ReviewPage" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Edit your profile:</Typography>
        <Typography>Head to the "Profile" tab</Typography>
        <Typography>Update your personal info</Typography>
        <Typography>Customize your profile to tailor your recommendations and experience (coming soon!)</Typography>
        <img style={{ width: "40%" }} src={myPagePhoto} alt="ReviewPage" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Add a review:</Typography>
        <Typography>Head to the "Review" tab</Typography>
        <Typography>Add your reviews to let everyone know what you think!</Typography>
        <img style={{ width: "40%" }} src={ReviewPagePhoto} alt="ReviewPage" />
      </Grid>
    </Grid>
  );
}

export default Landing;
