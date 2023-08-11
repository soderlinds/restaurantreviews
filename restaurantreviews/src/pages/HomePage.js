import React, { useEffect, useState } from 'react';
import './HomePage.css'; // Import the CSS file
import food1 from './food1.jpg';
import food2 from './food2.jpg';
import food3 from './food3.jpg';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReviewList from '../components/ReviewList';

const HomePage = () => {
  const pictures = [food1, food2, food3];

  const contactInfo = {
    address: '123 Main St, City, Country',
    phone: '123-456-7890',
    email: 'info@example.com',
  };

  const foodInfo = {
    cuisine: 'Grill and Lounge',
    openingHours: 'Mon-Sat: 10am-10pm',
    // Add more information about food
  };

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews()
      .then((fetchedReviews) => setReviews(fetchedReviews))
      .catch((error) => console.log(error));
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reviews');
      const data = await response.json();
      const formattedReviews = Object.values(data.reviews).map((review) => {
        return {
          title: review[0],
          rating: review[2],
          reviewText: review[1],
        };
      });
      console.log(formattedReviews);
      return formattedReviews;
    } catch (error) {
      throw new Error('Failed to fetch reviews');
    }
  };

  return (
    <>
      <div className="header">
        <h1>Rankify</h1>
      </div>
      <div className="container">
        <h1 className="title">Cedar Grill & Lounge</h1>
        <div className="restaurant-info">
          <div className="pictures">
            <div className="restaurant-pictures">
              <Carousel showThumbs={false}>
                {pictures.map((picture, index) => (
                  <div key={index}>
                    <img src={picture} alt={`Food ${index + 1}`} />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className="info-reviews">
            <div className="info">
              <div className="contact-info">
                <h2>Contact</h2>
                <p>{contactInfo.address}</p>
                <p>{contactInfo.phone}</p>
                <p>{contactInfo.email}</p>
              </div>
              
              <div className="food-info">
                <h2>Info</h2>
                <p>{foodInfo.cuisine}</p>
                <p>{foodInfo.openingHours}</p>
                {/* Add more information about food */}
              </div>
             
            </div>
            <div className="reviews">
              <ReviewList reviews={reviews} />
            </div>
          </div>
        </div>
      </div>
   
    </>
  );
};

export default HomePage;
