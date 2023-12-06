import React, { useState } from "react";
import QRCodeScanner from "../components/QRCodeScanner";
import "../styles/_submitreviewpage.sass";
import "../styles/_typography.sass";

const extractReviewData = (qrCodeData) => {
  const { title, description, rating } = JSON.parse(qrCodeData);
  return { title, description, rating };
};

const SubmitReviewPage = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [qrCodeData, setQRCodeData] = useState("");
  const [scanned, setScanned] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !reviewText) {
      alert("Please provide a rating and review text.");
      return;
    }

    const data = {
      title: title,
      description: reviewText,
      rating: parseInt(rating),
    };

    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Review submitted successfully!");
        setTitle("");
        setRating("");
        setReviewText("");
      } else {
        alert("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert(
        "An error occurred while submitting the review. Please try again later."
      );
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
    const mockQRCodeData =
      '{"title": "Mock Title", "description": "Mock Description", "rating": 3}';

    setQRCodeData(mockQRCodeData);
    setScanned(true);

    const {
      title: qrTitle,
      description,
      rating: qrRating,
    } = extractReviewData(mockQRCodeData);

    setTitle(qrTitle);
    setRating(qrRating);

    await handleSubmit();
  };

  return (
    <div className="container">
      <div className="bigHeader">Submit a review for Cedar Grill & Lounge</div>

      {!scanned ? (
        <form className="review-form" onSubmit={handleSubmit}>
          <div>
            <div className="submitreviewHeader">Your visit in one word:</div>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="rating-container">
            <div className="submitreviewHeader">Rating:</div>
            <div className="rating-buttons">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className={`rating-button ${num <= rating ? "active" : ""}`}
                  onClick={() => handleRatingClick(num)}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="submitreviewHeader">Tell us more:</div>
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
        <QRCodeScanner
          onScan={handleQRCodeScan}
          onSubmitReview={handleReviewSubmit}
        />
      )}
    </div>
  );
};

export default SubmitReviewPage;
