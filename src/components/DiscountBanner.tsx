import React from 'react';

const DiscountBanner = () => {
  return (
    <div className="container">
      <div id="discount-banner">
        <div className="info">
          <h3 className="mb-[15px] text-[40px] uppercase leading-none">
            ONE DAY
          </h3>
          <h4 className="mb-[50px] text-[53px] uppercase leading-none">
            10% DISCOUNT
          </h4>
          <button className="info-btn">05/09 - 20/10/2019</button>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;
