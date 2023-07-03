const express = require('express');
const router = express.Router();

module.exports = function (contractInstance) {
  // POST request to scan a QR code and submit a review
  router.post('/scan-qr', async (req, res) => {
    const { qrData } = req.body;

    try {
      // Validate the QR code data and perform necessary checks
      // Retrieve the review details from the QR code data

      // Call the smart contract function to submit the review
      await contractInstance.methods
        .submitReview(review.title, review.description, review.rating)
        .send({ from: '0x7ffc599109DaFA8eEf098b3733f39d5FA56c9C2B' });

      // Mark the QR code as invalid in the database

      res.status(201).json({ success: true, message: 'Review submitted successfully' });
    } catch (error) {
      console.error('Error submitting review:', error);
      res.status(500).json({ success: false, message: 'Failed to submit review' });
    }
  });

  return router;
};
