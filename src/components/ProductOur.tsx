import React from "react";
import ProductItem from "./common/ProductItem";

const ProductOur = () => {
  return (
    <div id="product-our" className="container py-[60px]">
      <h2 className="special-heading">Product Our</h2>
      <div className="grid gap-[15px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item: number) => {
          return <ProductItem key={item} />;
        })}
      </div>
    </div>
  );
};

export default ProductOur;
