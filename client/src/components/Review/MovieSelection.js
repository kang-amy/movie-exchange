import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function MovieSelection({ movies, selectedMovie, handleMovieChange }) {

  const handleMovieSelect = (event) => {
    const selectedMovieId = event.target.value;
    const selectedMovie = movies.find((movie) => movie.id === selectedMovieId);
    handleMovieChange(selectedMovie);
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="movie-select-label">Select a movie</InputLabel>
      <Select
        value={selectedMovie ? selectedMovie.id : ''}
        onChange={handleMovieSelect}
        labelId="movie-select-label"
        id="movie-select"
      >
        {movies.map((movie, index) => (
          <MenuItem key={movie.id} value={movie.id}>
            {movie.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MovieSelection;
