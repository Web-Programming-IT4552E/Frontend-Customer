import React from "react";
import Slider from "react-slick";
import ReviewAvt from "@/assets/images/review_avt.jpg";
import Image from "next/dist/client/image";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReviewsProduct = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
  };

  return (
    <div id="reviews-product">
      <Slider {...sliderSettings}>
        {[1, 2, 3].map((item) => {
          return (
            <div
              key={item}
              className="cover pt-[60px] px-[66px] bg-reviews_product bg-no-repeat bg-cover flex justify-content items-end lg:pt-[150px]"
            >
              <div className="container inner px-[15px] w-full">
                <div className="reviews px-[15px] pt-[35px] mt-[80px] bg-white">
                  <div className="avatar-author">
                    <Image
                      className=" rounded-[100%]"
                      src={ReviewAvt}
                      alt="product-item"
                      loading="lazy"
                      width={380}
                      height={380}
                    ></Image>
                  </div>
                  <div className="entry-content">
                    <h2 className="author-name">Dang Minh Khoi</h2>
                    <div className="item-rating">
                      <div className="star-rating">
                        {[1, 2].map((item) => (
                          <FontAwesomeIcon
                            icon={faStar}
                            key={item}
                            className="text-light_pink"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="description">
                      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text, please visit the Comments screen in the dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ReviewsProduct;
