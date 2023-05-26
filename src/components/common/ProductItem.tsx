import React from 'react'
import Image from 'next/image'
import SampleProductImg from '@/assets/images/sample_product.jpg'


const ProductItem = () => {
  return (
    <div className="flex flex-col justify-center items-center" id="common_product_item">
      <Image src={SampleProductImg} alt="product-item" loading="lazy" width={380} height={380}/>

      <div id="wrapper_content_item" className="my-[30px] text-center w-[100%]">
        <div id="cat_product" className="text-[15px] text-[#999]">
          <a rel="tag">Make Up</a>
          {", "}
          <a rel="tag">Skin Care</a>
        </div>
        <h2 id="product_item_title" className="text-[20px] font-semibold my-[20px] mx-[5px]">
          Active Fleece Pants
        </h2>
        <p id="product_item_price" className="font-bold text-[25px] text-light_pink">
          $10
        </p>
      </div>
    </div>
  )
}

export default ProductItem