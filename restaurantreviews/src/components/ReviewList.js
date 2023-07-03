import './ReviewList.css'; 
import React, { useEffect, useState } from 'react';

const ReviewList = ({ reviews }) => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    calculateAverageRating();
  }, [reviews]);

  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      setAverageRating(0);
      return;
    }

    const totalRating = reviews.reduce((sum, review) => sum + parseInt(review.rating), 0);
    const averageRating = totalRating / reviews.length;
    setAverageRating(averageRating.toFixed(2));
  };

  const renderRatingDots = (rating) => {
    const maxRating = 5;
    const filledDots = Math.floor(rating);
    const remainder = rating - filledDots;

    const dotStyle = {
      display: 'inline-block',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      marginRight: '5px',
    };

    const filledDotStyle = {
      ...dotStyle,
      backgroundColor: 'green',
    };

    const emptyDotStyle = {
      ...dotStyle,
      backgroundColor: 'lightgray',
    };

    const ratingDots = [];

    for (let i = 0; i < filledDots; i++) {
      ratingDots.push(<span key={i} style={filledDotStyle}></span>);
    }

    if (remainder > 0) {
      const partialDotStyle = {
        ...dotStyle,
        backgroundImage: `linear-gradient(to right, green ${remainder * 100}%, lightgray ${remainder * 100}%)`,
      };
      ratingDots.push(<span key={filledDots} style={partialDotStyle}></span>);
    }

    const emptyDots = maxRating - filledDots - (remainder > 0 ? 1 : 0);
    for (let i = 0; i < emptyDots; i++) {
      ratingDots.push(<span key={i + filledDots + (remainder > 0 ? 1 : 0)} style={emptyDotStyle}></span>);
    }

    return ratingDots;
  };

  if (reviews.length === 0) {
    return <p>No reviews available</p>;
  }

  return (
    <div>
      <h2>Reviews</h2>
      <div>
        <p>Average Rating: {renderRatingDots(averageRating)}</p>
      </div>
      <ul className="review-list">
        {reviews.map((review, index) => (
          <li key={index} className="review-item">
            <div className="review-rectangle">
              <p>
                {review.title}{' '}
                 <span style={{ marginLeft: '15px' }}>{renderRatingDots(review.rating)}</span>
                </p>
              <p>{review.reviewText}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;

