import BreadCumb from "@/components/common/BreadCumb";
import React from "react";
import { Select, Pagination, Input, Slider } from "antd";
import ProductItem from "@/components/common/ProductItem";

const ProductList = () => {
  return (
    <div id="product-list">
      <BreadCumb navigations={["Home", "Shop", "Page 2"]} />
      <div className="content-area">
        <div className="container">
          <div className="grid grid-cols-3 lg:grid-cols-4">
            <div className="col-span-3 lg:px-[15px]">
              <div
                className="flex items-center justify-between mb-[30px]"
                id="wrapper-result-count"
              >
                <p className="mb-0">Showing 1-9 of 18 results</p>
                <Select placeholder="Default sorting" className="w-[200px]">
                  <Select.Option>Sort By Value</Select.Option>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-[7px] lg:grid-cols-3 gap-[15px]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, idx) => {
                  return <ProductItem key={idx} />;
                })}
              </div>
              <div className="mt-[20px] flex justify-center">
                <Pagination total={50} />
              </div>
            </div>
            <div className="pt-[30px] col-span-3 lg:col-span-1 lg:px-[15px] lg:pt-[0px]">
              <aside className="mb-[50px]">
                <Input.Search placeholder="Search products..." enterButton />
              </aside>
              <aside className="mb-[50px]">
                <h3 className="widget-title">Filter By Price</h3>
                <Slider range={{ draggableTrack: true }} defaultValue={[0, 100]}/>
                <div className="price-slider mt-[30px]">
                  <p className="text-[#666] text-[14px]">Price: 0$ - 30$</p>
                </div>
              </aside>
              <aside className="mb-[50px]">
                <h3 className="widget-title">Categories</h3>
                <div className="product-categories">
                  <div className="flex justify-between py-[12px]">
                    <span className="text-[#666] text-[15px]">
                      BB Creams
                    </span>
                    <span className="text-[#666] text-[15px]">
                      (8)
                    </span>
                  </div>
                  <div className="flex justify-between py-[12px]">
                    <span className="text-[#666] text-[15px]">
                      BB Creams
                    </span>
                    <span className="text-[#666] text-[15px]">
                      (8)
                    </span>
                  </div>
                  <div className="flex justify-between py-[12px]">
                    <span className="text-[#666] text-[15px]">
                      BB Creams
                    </span>
                    <span className="text-[#666] text-[15px]">
                      (8)
                    </span>
                  </div>
                </div>
              </aside>
              <aside className="mb-[50px]">
                <h3 className="widget-title">Product tags</h3>
                <div className="grid gap-[5px] lg:grid-cols-3" id="tags">
                  <a className="border-[1px] border-[#e6e6e6] border-solid text-[15px] py-[10px] text-center">
                    Fresh
                  </a>
                  <a className="border-[1px] border-[#e6e6e6] border-solid text-[15px] py-[10px] text-center">
                    Fresh
                  </a>
                  <a className="border-[1px] border-[#e6e6e6] border-solid text-[15px] py-[10px] text-center">
                    Fresh
                  </a>
                  <a className="border-[1px] border-[#e6e6e6] border-solid text-[15px] py-[10px] text-center">
                    Fresh
                  </a>
                  <a className="border-[1px] border-[#e6e6e6] border-solid text-[15px] py-[10px] text-center">
                    Fresh
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
