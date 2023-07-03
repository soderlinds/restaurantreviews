import React, { useState } from 'react';
import './SubmitReviewPage.css';
import QRCodeScanner from '../components/QRCodeScanner';

const extractReviewData = (qrCodeData) => {
  // Parse the QR code data and extract the review details
  const { title, description, rating } = JSON.parse(qrCodeData);
  return { title, description, rating };
};

const SubmitReviewPage = () => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [qrCodeData, setQRCodeData] = useState('');
  const [scanned, setScanned] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation on the rating and reviewText values
    if (!rating || !reviewText) {
      alert('Please provide a rating and review text.');
      return;
    }

    // Prepare the data to be sent to the server
    const data = {
      title: title,
      description: reviewText,
      rating: parseInt(rating),
    };

    try {
      // Make the API request to submit the review
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        // Reset the form
        setTitle('');
        setRating('');
        setReviewText('');
      } else {
        alert('Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while submitting the review. Please try again later.');
    }
  };


  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleQRCodeScan = async (data) => {
    setQRCodeData(data);
    setScanned(true);
  };

  const handleReviewSubmit = async () => {
    // Mock data for testing
    const mockQRCodeData = '{"title": "Mock Title", "description": "Mock Description", "rating": 3}';
  
    // Update the qrCodeData state with the mock data
    setQRCodeData(mockQRCodeData);
    setScanned(true);
  
    // Extract the necessary review data from the QR code data
    const { title: qrTitle, description, rating: qrRating } = extractReviewData(mockQRCodeData);
  
    // Update the form fields with the extracted data
    setTitle(qrTitle);
    setRating(qrRating);
  
    // Submit the review
    await handleSubmit();
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Submit a review for Cedar Grill & Lounge</h2>

      {!scanned ? (
        <form className="review-form" onSubmit={handleSubmit}>
          <div>
            <h3>Your visit in one word:</h3>
            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="rating-container">
            <h3>Rating:</h3>
            <div className="rating-buttons">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className={`rating-button ${num <= rating ? 'active' : ''}`}
                  onClick={() => handleRatingClick(num)}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3>Tell us more:</h3>
            <textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit Review</button>
        </form>
      ) : (
        <QRCodeScanner onScan={handleQRCodeScan} onSubmitReview={handleReviewSubmit} />
      )}
    </div>
  );
};

export default SubmitReviewPage;
