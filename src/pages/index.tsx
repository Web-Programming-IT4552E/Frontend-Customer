import Banner from "@/components/Banner";
import DiscountBanner from "@/components/DiscountBanner";
import ProductOur from "@/components/ProductOur";
import ReviewsProduct from "@/components/ReviewsProduct";

const Index = () => {
  return (
    <div id="home">
      <Banner />
      <ProductOur />
      <ReviewsProduct />
      <DiscountBanner />
    </div>
  );
};

export default Index;
