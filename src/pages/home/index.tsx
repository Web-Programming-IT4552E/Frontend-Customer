import React from "react";

import Banner from "@/components/Banner";
import ProductOur from "@/components/ProductOur";
import ReviewsProduct from "@/components/ReviewsProduct";
import DiscountBanner from "@/components/DiscountBanner";
import GenuineCosmetics from "@/components/GenuineCosmetics";
import DealDay from "@/components/DealDay";


const Home = () => {
  return (
    <div id="home">
      <Banner />
      <GenuineCosmetics />
      <DealDay />
      <ProductOur />
      <ReviewsProduct />
      <DiscountBanner />
    </div>
  );
};

export default Home;
