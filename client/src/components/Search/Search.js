import { Button, Divider, Grid, InputLabel, List, ListItem, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';

const serverURL = "";

const Search = () => {
  const [movieTitle, setMovieTitle] = useState('')
  const [actorName, setActorName] = useState('')
  const [directorName, setDirectorName] = useState('')
  const [moviesList, setMoviesList] = useState([])

  const onMovieTitleChange = (e) => {
    setMovieTitle(e.target.value);
  }
  const onActorNameChange = (e) => {
    setActorName(e.target.value);
  }
  const onDirectorNameChange = (e) => {
    setDirectorName(e.target.value);
  }
  const onSearchClick = () => {
    const searchParams = {
      movieTitle: movieTitle,
      actorName: actorName,
      directorName: directorName
    }
    callApiSearch(searchParams)
    .then(res => {
      console.log("callApiSearch response: ", res);
      setMoviesList([])
      const newList = [];
      // filter duplicates
      // check if same as previous entry
      res.forEach(movie => {
        // if not a duplicate movie, add to list
        if (newList.length == 0 || newList[newList.length - 1].movie_name !== movie.movie_name) {
          // change review content into an array & review score into an array
          const newArr = [];
          const newScore = [];
          if (movie.reviewContent != null) {
            newArr.push(movie.reviewContent)
          }
          if (movie.reviewScore != null) {
            newScore.push(movie.reviewScore)
          }
          movie.reviewContent = newArr;
          movie.reviewScore = newScore;
          newList.push(movie);
        }
        // if same as previous entry, add review to array and calculate avg score
        else {
          // add new review into previous movie
          if (movie.reviewContent != null) {
            newList[newList.length - 1].reviewContent.push(movie.reviewContent)
          }
          // add new review score into previous movie
          if (movie.reviewScore != null) {
            newList[newList.length - 1].reviewScore.push(movie.reviewScore)
          }
        }
      })
      setMoviesList(newList)
    })
    .catch(error => {
      console.error("Error searching params:", error.message);
      // Handle any error that occurred during the review submission
    });
  }
  
  const callApiSearch = async (searchParams) => {
    const url = serverURL + "/api/search";
    console.log("Sending search params to:", url);
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchParams),
    });
    
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // filter movies for duplicates
    // put all reviews in an array for each movie
    // set movieList state (?)
    return body;
  };

  const calculateRating = (movie) => {
    let sum = 0;
    const length = movie.reviewScore.length;
    movie.reviewScore.forEach(
      score => sum += score/length
    )
    return sum.toFixed(1);
  }

  const displayMovies = moviesList.map((movie) => {
    return (
      <Grid item xs={12}>
      <Typography variant="h6">Movie Title:</Typography> {movie.movie_name}
      <br></br>
      <Typography variant="h6">Director:</Typography> {movie.director_name}
      <br></br>
      <Typography variant="h6">Average User Ratings:</Typography>{calculateRating(movie) > 0 ? calculateRating(movie) : <Typography>None</Typography>}
      <Typography variant="h6">Reviews:</Typography> {movie.reviewContent.length > 0 ? <List>
      {movie.reviewContent.map(
        review => {
          return <ListItem>{review}</ListItem>
        })}
      </List> : <Typography>None</Typography>}
      <Divider></Divider>
      </Grid>
    )
  })
  
  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3">Search for a Movie</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Search by movie title"
          value={movieTitle}
          onChange={onMovieTitleChange}
          fullWidth
          />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Search by actor name"
          value={actorName}
          onChange={onActorNameChange}
          fullWidth
          />
      </Grid>
      <Grid item xs={12}>
      <TextField
        label="Search by director name"
        value={directorName}
        onChange={onDirectorNameChange}
        fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSearchClick}>Search</Button>
      </Grid>
    </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>{moviesList.length > 0 && <Typography variant="h5">Search Results</Typography>}</Grid>
        {moviesList.length > 0 && displayMovies}
      </Grid>
    </>
  );
}

export default Search;