const RestaurantReview = artifacts.require("RestaurantReview");

module.exports = function (deployer) {
  deployer.deploy(RestaurantReview);
};
