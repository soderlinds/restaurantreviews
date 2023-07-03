const express = require('express');
const router = express.Router();

module.exports = function(contractInstance) {
  // POST request to submit a review
  router.post('/reviews', async (req, res) => {
    const { title, description, rating } = req.body;

    try {
      // Call the smart contract function to submit the review
      await contractInstance.methods.submitReview(title, description, rating)
  .send({ from: '0x7ffc599109DaFA8eEf098b3733f39d5FA56c9C2B' });


      res.status(201).json({ success: true, message: 'Review submitted successfully' });
    } catch (error) {
      console.error('Error submitting review:', error);
      res.status(500).json({ success: false, message: 'Failed to submit review' });
    }
  });

  // GET request to retrieve all reviews
  router.get('/reviews', async (req, res) => {
    try {
      // Call the smart contract function to get the total review count
      const reviewCount = await contractInstance.methods.getReviewCount().call();

      // Retrieve each review by its ID
      const reviews = await Promise.all(
        Array.from({ length: reviewCount }, (_, i) => contractInstance.methods.getReviewById(i).call())
      );

      res.status(200).json({ success: true, reviews });
    } catch (error) {
      console.error('Error retrieving reviews:', error);
      res.status(500).json({ success: false, message: 'Failed to retrieve reviews' });
    }
  });

  return router;
};
