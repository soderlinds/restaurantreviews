import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Map from "../components/Map";
import "../styles/_homepage.sass";
import pasta from "../images/pasta.jpg";
import pizza from "../images/pizza.jpg";
import pizza2 from "../images/pizza2.jpg";
import burger from "../images/burger.jpg";
import sushi from "../images/sushi.jpg";
import grill from "../images/grill.jpg";
import highscale from "../images/highscale.jpg";
import cafe from "../images/cafe.jpg";
import indian from "../images/indian.jpg";

const HomePage = () => {
  const [restaurants] = useState([
    {
      id: 1,
      name: "Cedar Grill & Lounge",
      address: "Olof Palmes plats 8, Göteborg",
      cuisine: "American",
      type: "Lounge",
      openingHours: "Mon-Sat: 10am-10pm",
      coordinates: { lat: 57.700, lng: 11.9527 },
      image: grill,
      rating: 4.2,
    },
    {
      id: 2,
      name: "Pasta Palace",
      address: "Andra Långgatan 8, Göteborg",
      cuisine: "Italian",
      type: "Romantic",
      openingHours: "Mon-Sat: 16pm-12pm",
      coordinates: { lat: 57.6992, lng: 11.9501 },
      image: pasta,
      rating: 4.1,
    },
    {
      id: 3,
      name: "Sushi Haven",
      address: "Linnégatan 22, Göteborg",
      cuisine: "Japanese",
      type: "Romantic",
      openingHours: "Mon-Sun: 12pm-9pm",
      coordinates: { lat: 57.6975, lng: 11.9513 },
      image: sushi,
      rating: 3.2,
    },
    {
      id: 4,
      name: "Burger Bistro",
      address: "Magasinsgatan 5, Göteborg",
      cuisine: "Burgers",
      type: "Street Food",
      openingHours: "Mon-Fri: 11am-9pm, Sat-Sun: 12pm-10pm",
      coordinates: { lat: 57.7043, lng: 11.9619 },
      image: burger,
      rating: 4.6,
    },
    {
      id: 5,
      name: "Mama Mia Pizzeria",
      address: "Östra Hamngatan 28, Göteborg",
      cuisine: "Pizza",
      type: "Outdoor seating",
      openingHours: "Mon-Sun: 11am-11pm",
      coordinates: { lat: 57.7077, lng: 11.9678 },
      image: pizza,
      rating: 3.8,
    },
    {
      id: 6,
      name: "Bombay",
      address: "Redbergsplatsen 7, Göteborg",
      cuisine: "Indian",
      type: "Outdoor seating",
      openingHours: "Tis-Sun: 11am-11pm",
      coordinates: { lat: 57.7163, lng: 12.0047 },
      image: indian,
      rating: 4.3,
    },
    {
      id: 7,
      name: "Odin Pizzeria",
      address: "Odinsgatan 8, Göteborg",
      cuisine: "Pizza",
      type: "Outdoor seating",
      openingHours: "Mon-Sun: 11am-11pm",
      coordinates: { lat: 57.7090, lng: 11.9809 },
      image: pizza2,
      rating: 3.6,
    },
    {
      id: 8,
      name: "Evolushion",
      address: "Lilla Kyrkogatan 3, Göteborg",
      cuisine: "International",
      type: "Romantic",
      openingHours: "Mon-Sat: 16pm-12pm",
      coordinates: { lat: 57.7048, lng: 11.9651 },
      image: highscale,
      rating: 4.8,
    },
    {
      id: 9,
      name: "Coffee House",
      address: "Linneégatan 3, Göteborg",
      cuisine: "Café",
      type: "Outdoor seating",
      openingHours: "Mon-Sun: 11am-11pm",
      coordinates: { lat: 57.6989, lng: 11.9517 },
      image: cafe,
      rating: 3.9,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header searchTerm={searchTerm} handleSearch={handleSearch} showSearchBar={true} showBackArrow={false} />
      <div className="homepage-wrapper">
        <div className="homepage-content">
          <div className="homepage-grid">
            <div className="map-container">
              <Map restaurants={filteredRestaurants} />
            </div>
            <div className="restaurant-list">
              {filteredRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="restaurant-item-link">
                  <div className="restaurant-item">
                    {restaurant.name === 'Cedar Grill & Lounge' ? (
                      <Link to="/cedar-grill" className="restaurant-link">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="restaurant-image"
                        />
                        <div className="restaurant-details">
                          <div className="restaurant-info">
                            <div className="restaurant-category">
                              {restaurant.cuisine} ● {restaurant.type}
                            </div>
                            <div>
                              <div>{restaurant.name}</div>
                              <p className="restaurant-address">
                                {restaurant.address}
                              </p>
                            </div>
                            <div className="restaurant-score">
                              {restaurant.rating}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="non-redirected-restaurant">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="restaurant-image"
                        />
                        <div className="restaurant-details">
                          <div className="restaurant-info">
                            <div className="restaurant-category">
                              {restaurant.cuisine} ● {restaurant.type}
                            </div>
                            <div>
                              <div>{restaurant.name}</div>
                              <p className="restaurant-address">
                                {restaurant.address}
                              </p>
                            </div>
                            <div className="restaurant-score">
                              {restaurant.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;