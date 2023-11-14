import React from 'react';
import { TextField } from '@mui/material';

function ReviewBody({ enteredReview, handleReviewChange }) {
  return (
    <TextField
      label="Enter your review"
      value={enteredReview}
      onChange={handleReviewChange}
      multiline
      rows={4}
      fullWidth
    />
  );
}

export default ReviewBody;
