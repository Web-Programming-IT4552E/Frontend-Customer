import { Input, Pagination, Select, Slider } from 'antd';
import React, { useEffect, useState } from 'react';

import { useGetAllProducts } from '@/apis/productApi';
import BreadCumb from '@/components/common/BreadCumb';
import ProductItem from '@/components/common/ProductItem';
import { DEFAULT_LIMIT } from '@/utils/pagination';
import RenderIf from '@/components/common/RenderIf';
import { GetAllProductsResponse, ProductItemData } from '../../../@types/product';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/configs/redux';
import { ProductFilter } from '@/interfaces/product.interface';

const ProductList = () => {
  const categoryStore = useAppSelector((state) => state.category);
  const router = useRouter();
  const breadcump = router.query?.category as string || "Shop";
  const [filter, setFilter] = useState<ProductFilter>({
    page: 1,
    limit: DEFAULT_LIMIT,
    category: undefined
  })
  const { data: response } = useGetAllProducts(filter);
  const [data, setData] = useState<GetAllProductsResponse | undefined>(undefined);

  useEffect(() => {
    if (response !== undefined) {
      setData(response);
    }
  }, [response])

  useEffect(() => {
    const category = categoryStore.data.length == 0 ? undefined : categoryStore.data.filter(item => item!.name == breadcump.toLocaleUpperCase()).map(item => item!._id).join(",");

    setFilter({
      ...filter,
      page: 1,
      category
    })
  }, [breadcump])

  const handleChangePagination = (e: any) => {
    setFilter({...filter, page: e as number})
  }

  return (
    <div id="product-list">
      <BreadCumb navigations={['Home', breadcump , `Page ${filter.page}`]} />
      <div className="content-area">
        <div className="container">
          <RenderIf isTrue={data === undefined}>
            <p className="text-center">Loading...</p>
          </RenderIf>
          <RenderIf  isTrue={data !== undefined}>
          <div className="grid grid-cols-3 lg:grid-cols-4">
            <div className="col-span-3 lg:px-[15px]">
              <div
                className="mb-[30px] flex items-center justify-between"
                id="wrapper-result-count"
              >
                <p className="mb-0">Showing {data !== undefined && `${(data!.paginationInfo.page - 1)  * (data!.paginationInfo.limit) + 1}-${(data!.paginationInfo.page) * (data!.paginationInfo.limit) > data.paginationInfo.total ? data.paginationInfo.total : (data!.paginationInfo.page) * (data!.paginationInfo.limit)} of ${data!.paginationInfo.total} results`}</p>
                <Select placeholder="Default sorting" className="w-[200px]">
                  <Select.Option>Sort By Value</Select.Option>
                </Select>
              </div>
              <div className="grid grid-cols-1 gap-[15px] sm:grid-cols-2 lg:grid-cols-3">
                {data !== undefined && data.data.map((product: ProductItemData, idx) => {
                  return <ProductItem key={idx} product={product}/>;
                })}
              </div>
              <div className="mt-[20px] flex justify-center">
                {data !== undefined && <Pagination total={data.paginationInfo.total} onChange={handleChangePagination} defaultPageSize={DEFAULT_LIMIT} />}
              </div>
            </div>
            <div className="col-span-3 pt-[30px] lg:col-span-1 lg:px-[15px] lg:pt-[0px]">
              <aside className="mb-[50px]">
                <Input.Search placeholder="Search products..." enterButton />
              </aside>
              <aside className="mb-[50px]">
                <h3 className="widget-title">Filter By Price</h3>
                <Slider
                  range={{ draggableTrack: true }}
                  defaultValue={[0, 100]}
                />
                <div className="price-slider mt-[30px]">
                  <p className="text-[14px] text-[#666]">Price: 0$ - 100$</p>
                </div>
              </aside>
              <aside className="mb-[50px]">
                <h3 className="widget-title">Categories</h3>

                <div className="product-categories">
                  {categoryStore.data.map((category, idx) => {
                    return (
                      <div className="flex justify-between py-[12px]" key={idx}>
                      <span className="text-[15px] text-[#666]">{category?.name}</span>
                      <span className="text-[15px] text-[#666]">{`(${category?.slug})`}</span>
                    </div>
                    )
                  })}
                </div>
              </aside>
            </div>
          </div>
          </RenderIf>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
