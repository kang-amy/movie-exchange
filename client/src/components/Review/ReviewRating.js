import React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';

function ReviewRating({ selectedRating, handleRatingChange }) {
  return (
    <FormControl component="fieldset">
      <RadioGroup value={selectedRating} onChange={handleRatingChange} row>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
    </FormControl>
  );
}

export default ReviewRating;
