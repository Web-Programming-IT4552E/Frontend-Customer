import React, { useState } from "react";
import BreadCumb from "@/components/common/BreadCumb";
import Image from "next/image";
import Slider from "react-slick";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "antd";
import ProductItem from "@/components/common/ProductItem";

const DetailProduct = () => {
  const [imageUrl, setImageUrl] = useState(
    "https://uray.physcode.com/wp-content/uploads/2019/02/product8-1024x1024.jpg"
  );
  const [quantity, setQuantity] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const increaseQuantity = () => {
    console.log("Heyy")
    setQuantity(quantity + 1);
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <div id="detail-product">
      <BreadCumb navigations={["Home", "Shop", "Page 2"]} />
      <div className="content-area container">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="product-images">
            <Image src={imageUrl} width={800} height={800} alt="main-image" />
            <Slider {...settings}>
              {[
                "https://uray.physcode.com/wp-content/uploads/2019/02/product1-1024x1024.jpg",
                "https://uray.physcode.com/wp-content/uploads/2019/02/product11-1024x1024.jpg",
                "https://uray.physcode.com/wp-content/uploads/2019/02/product7-1024x1024.jpg",
                "https://uray.physcode.com/wp-content/uploads/2019/02/product11-1024x1024.jpg",
                "https://uray.physcode.com/wp-content/uploads/2019/02/product8-1024x1024.jpg",
                "https://uray.physcode.com/wp-content/uploads/2019/02/product8-1024x1024.jpg",
              ].map((item) => {
                return (
                  <div className="">
                    <Image
                      src={item}
                      width={100}
                      height={100}
                      key={item}
                      data-url={item}
                      alt="main-image"
                      onClick={(e: any) => {
                        setImageUrl(e.target.dataset.url as string);
                      }}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="product-content  mt-[60px] md:mt-0 md:pl-[45px]">
            <div className="wrap-title-price mb-[25px]">
              <h2 className="text-[30px] text-[#333] font-semibold">
                Striped Stretchie <span className="text-[#666]">| $17</span>
              </h2>
            </div>
            <div className="product-info">
              <div className="star-rating mb-[25px]">
                {[1, 2, 3, 4, 5].map((item) => (
                  <FontAwesomeIcon
                    icon={faStar}
                    key={item}
                    className="text-light_pink"
                  />
                ))}
              </div>
              <p className="text-[#666] leading-[26px] whitespace-pre-line mb-[25px]">
                {`A great essential for naptime or nighttime!
                Made of 100% cotton in a rib knit
                Note: for child’s safety, garment should fit snugly. This garment is not flame resistant. Loose fitting garment is more likely to catch fire.`}
              </p>
              <div className="flex flex-col gap-[10px] text-[15px]">
                <p className="text-medium_gray mb-0"><span className="text-dark font-semibold">Categories:</span> Make up, Skin care</p>
                <p className="text-medium_gray mb-0"><span className="text-dark font-semibold">Tag:</span> Make up, Skin care</p>
              </div>
              <div className="actions flex gap-[20px]  mt-[37px] mb-[43px]">
                <div className="quantity-action flex items-center">
                  <Button className="w-[40px] h-[40px] rounded-none border-[#666] text-center" onClick={decreaseQuantity}>-</Button>
                  <Input className="w-[40px] h-[40px] rounded-none border-y-[#666] text-center text-black bg-white" defaultValue={0} value={quantity} disabled={true}/>
                  <Button className="w-[40px] h-[40px] rounded-none border-[#666] text-center" onClick={increaseQuantity}>+</Button>
                </div>
                <div className="add-to-cart">
                  <Button id="add-to-cart-btn">ADD TO CART</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="relate-products">
        <h2 className="special-heading">
          Related Products
        </h2>
        <div className="container">
          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1,2,3,4].map(item => {
              return <ProductItem key={item}/>
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
