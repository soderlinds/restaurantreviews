// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RestaurantReview {
    struct Review {
        uint256 id;
        string title;
        string description;
        uint256 rating;
    }

    Review[] public reviews;

    constructor() {
        // Add some hardcoded reviews during contract deployment
        reviews.push(Review(0, "Review 1", "This is the first review", 5));
        reviews.push(Review(1, "Review 2", "This is the second review", 4));
        reviews.push(Review(2, "Review 3", "This is the third review", 3));
    }

    event ReviewSubmitted(uint256 id, string title, string description, uint256 rating);

    function submitReview(string memory _title, string memory _description, uint256 _rating) public {
        uint256 reviewId = reviews.length;
        reviews.push(Review(reviewId, _title, _description, _rating));
        emit ReviewSubmitted(reviewId, _title, _description, _rating);
    }

    function getReviewCount() public view returns (uint256) {
        return reviews.length;
    }

    function getReviewById(uint256 _id) public view returns (string memory, string memory, uint256) {
        require(_id < reviews.length, "Invalid review ID");
        Review memory review = reviews[_id];
        return (review.title, review.description, review.rating);
    }
}
