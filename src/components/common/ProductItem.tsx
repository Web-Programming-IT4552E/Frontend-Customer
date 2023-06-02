import React from "react";
import Image from "next/image";
import SampleProductImg from "@/assets/images/sample_product.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

const ProductItem = () => {
  return (
    <div
      className="group flex flex-col justify-center items-center overflow-hidden"
      id="common_product_item"
    >
      <div className="relative overflow-hidden flex justify-center items-end">
        <Image
          src={SampleProductImg}
          alt="product-item"
          loading="lazy"
          width={380}
          height={380}
        />
        <div className="filter translate-x-[-100%] group-hover:translate-x-[0%] transition-all ease-in-out duration-200"></div>
        <div className="box-hover translate-y-[100%] group-hover:translate-y-[-75%] transition-all ease-linear duration-200">
          <a className="link-item cursor-pointer">
            <FontAwesomeIcon
              icon={faCartPlus}
              style={{ fontSize: 16, color: "black" }}
            />
          </a>
          <a className="link-item cursor-pointer">
            <FontAwesomeIcon
              icon={faSearch}
              style={{ fontSize: 16, color: "black" }}
            />
          </a>
        </div>
      </div>

      <div id="wrapper_content_item" className="my-[30px] text-center w-[100%]">
        <div id="cat_product" className="text-[15px] text-[#999]">
          <a rel="tag">Make Up</a>
          {", "}
          <a rel="tag">Skin Care</a>
        </div>
        <h2
          id="product_item_title"
          className="text-[20px] font-semibold my-[20px] mx-[5px]"
        >
          Active Fleece Pants
        </h2>
        <p
          id="product_item_price"
          className="font-bold text-[25px] text-light_pink"
        >
          $10
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
