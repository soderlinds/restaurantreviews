import React, { useEffect, useState } from "react";
import "../styles/_cedargrill.sass";
import "../styles/_typography.sass";
import grill from "../images/grill.jpg";
import grill2 from "../images/grill2.jpg";
import grill4 from "../images/grill4.jpg";
import grill5 from "../images/grill4.jpg";
import grill6 from "../images/grill2.jpg";
import grill7 from "../images/grill.jpg";
import grill8 from "../images/grill2.jpg";
import Header from "../components/Header";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReviewList from "../components/ReviewList";
import Map from "../components/Map";

const CedarGrill = () => {
  const pictures = [grill, grill2, grill4, grill5, grill6, grill7, grill8];

  const [currentImage, setCurrentImage] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/reviews");
      const data = await response.json();
      const formattedReviews = Object.values(data.reviews).map((review) => {
        return {
          title: review[0],
          rating: review[2],
          reviewText: review[1],
        };
      });
      setReviews(formattedReviews);
      calculateAverageRating(formattedReviews);
    } catch (error) {
      console.log("Failed to fetch reviews:", error);
    }
  };

  const calculateAverageRating = (fetchedReviews) => {
    if (fetchedReviews.length === 0) {
      setAverageRating(0);
      return;
    }

    const totalRating = fetchedReviews.reduce(
      (sum, review) => sum + parseInt(review.rating),
      0
    );
    const calculatedAverageRating = totalRating / fetchedReviews.length;
    setAverageRating(calculatedAverageRating.toFixed(2));
  };

  return (
    <>
      <Header showSearchBar={false} showBackArrow={true} />
      <div className="container">
        <div className="title">Cedar Grill & Lounge</div>
        <div className="info-wrapper2">
          <div className="image-carousel" style={{ flex: "1" }}>
            <Carousel
              showThumbs={false}
              selectedItem={currentImage}
              onChange={(index) => setCurrentImage(index)}
              renderThumbs={() => null}
            >
              {pictures.map((picture, index) => (
                <div key={index} className="carousel-item">
                  {pictures.slice(index, index + 1).map((image, i) => (
                    <img
                      key={i}
                      src={image}
                      alt={`Food ${index + i + 1}`}
                      className="carousel-image"
                    />
                  ))}
                </div>
              ))}
            </Carousel>
          </div>
          <div style={{ flex: "1" }}>
            <div>
              <Map
                restaurants={[
                  {
                    coordinates: { lat: 57.7, lng: 11.95 },
                    name: "Cedar Grill & Lounge",
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="info-wrapper">
          <div className="info">
            <div className="smallHeader">Ratings and reviews</div>
            <p className="infoText">{`${averageRating}  ${reviews.length} omdömen`}</p>
            {/* <p className="infoText">Nr 237 av 1 246 Restauranger i Göteborg</p> */}
          </div>
          <div className="info">
            <div className="smallHeader">Information</div>
            <div>
              <div className="infoHeader">KITCHEN</div>
              <p className="infoText">American</p>
              <div className="infoHeader">SPECIAL DIET</div>
              <p className="infoText">Good for vegetarians, Vegan options</p>
              <div className="infoHeader">MEALS</div>
              <p className="infoText">Lunch, Dinner</p>
            </div>
          </div>
        </div>
        <div className="reviews">
          <div className="smallHeader">Customer Reviews</div>
          <ReviewList reviews={reviews} averageRating={averageRating} />
        </div>
      </div>
    </>
  );
};

export default CedarGrill;
