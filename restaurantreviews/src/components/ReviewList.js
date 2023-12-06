import React from 'react';
import '../styles/_reviewlist.sass';
import '../styles/_typography.sass';

const ReviewList = ({ reviews, averageRating }) => {
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

  return (
    <div>
      <div>
        <p className="reviewText">Average Rating: {renderRatingDots(parseFloat(averageRating))}</p>
        <p className="reviewText">Total Reviews: {reviews.length}</p>
      </div>
      <ul className="review-list">
        {reviews.length === 0 ? (
          <li>No reviews available</li>
        ) : (
          reviews.map((review, index) => (
            <li key={index} className="review-item">
              <div className="review-rectangle">
                <p className="reviewText">
                  {review.title}{' '}
                  <span style={{ marginLeft: '15px' }}>{renderRatingDots(review.rating)}</span>
                </p>
                <p className="reviewText">{review.reviewText}</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ReviewList;
