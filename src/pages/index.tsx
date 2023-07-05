import Banner from '@/components/Banner';
import DealDay from '@/components/DealDay';
import DiscountBanner from '@/components/DiscountBanner';
import GenuineCosmetics from '@/components/GenuineCosmetics';
import ProductOur from '@/components/ProductOur';
import ReviewsProduct from '@/components/ReviewsProduct';

const Index = () => {
  return (
    <div id='home'>
      <Banner />
      <GenuineCosmetics />
      <DealDay />
      <ProductOur />
      <ReviewsProduct />
      <DiscountBanner />
    </div>
  );
};

export default Index;
