import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = { title, description, rating };
    
    try {
      await axios.post('/api/reviews', reviewData);
      console.log('Review submitted successfully');
      // Reset form fields
      setTitle('');
      setDescription('');
      setRating('');
    } catch (error) {
      console.log('Error submitting review:', error);
    }
  };

  return (
    <div>
      <h2>Submit Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Rating:
          <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;
