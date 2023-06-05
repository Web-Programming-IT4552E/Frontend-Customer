import React from "react";

import Banner from "@/components/Banner";
import ProductOur from "@/components/ProductOur";
import ReviewsProduct from "@/components/ReviewsProduct";
import DiscountBanner from "@/components/DiscountBanner";

const Home = () => {
  return (
    <div id="home">
      <Banner />
      <ProductOur />
      <ReviewsProduct />
      <DiscountBanner />
    </div>
  );
};

export default Home;
