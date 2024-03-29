import { Input, Pagination, Select, Slider } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { useGetAllProducts } from '@/apis/productApi';
import BreadCumb from '@/components/common/BreadCumb';
import ProductItem from '@/components/common/ProductItem';
import RenderIf from '@/components/common/RenderIf';
import { useAppSelector } from '@/configs/redux';
import type { ProductFilter } from '@/interfaces/product.interface';
import { DEFAULT_LIMIT } from '@/utils/pagination';

import type { GetAllProductsResponse, ProductItemData } from '../../../@types/product';

const ProductList = () => {
  const categoryStore = useAppSelector((state) => state.category);
  const router = useRouter();

  const { pathname } = router;
  const searchQuery = router.query?.search as string;
  console.log(router.asPath);

  const breadcump = router.query?.category as string;
  const [filter, setFilter] = useState<ProductFilter>({
    page: 1,
    search: searchQuery,
    limit: searchQuery ? 5 : DEFAULT_LIMIT,
    category: undefined,
  });
  const { data: response } = useGetAllProducts(filter);
  const [data, setData] = useState<GetAllProductsResponse | undefined>(undefined);
  const [breadCumpName, setBreadCumpName] = useState('Shop');
  const [visibleResults, setVisibleResults] = useState({
    min: 0,
    max: 0,
    total: 0,
  });

  useEffect(() => {
    if (response !== undefined) {
      setData(response);
    }
  }, [response]);

  useEffect(() => {
    if (response && response?.paginationInfo !== undefined) {
      setVisibleResults({
        min: (response.paginationInfo.page - 1) * response.paginationInfo.limit + 1,
        max:
          response!.paginationInfo.page * response!.paginationInfo.limit >
          response.paginationInfo.total
            ? response.paginationInfo.total
            : response!.paginationInfo.page * response!.paginationInfo.limit,
        total: response!.paginationInfo.total,
      });
    }
  }, [response]);

  useEffect(() => {
    const category =
      categoryStore.data.length === 0
        ? undefined
        : categoryStore.data
            .filter((item) => item!._id === breadcump)
            .map((item) => item!._id)
            .join(',');

    setBreadCumpName(
      categoryStore.data.filter((item) => item!._id === breadcump)[0]?.name || 'Shop',
    );

    setFilter({
      ...filter,
      page: 1,
      category,
    });
  }, [breadcump]);

  useEffect(() => {
    setFilter({
      ...filter,
      page: 1,
    });
  }, [router.pathname]);

  const handleChangePagination = (e: any) => {
    setFilter({ ...filter, page: e as number });
  };

  const handlePriceFilter = (e: any) => {
    setFilter({ ...filter, price_start: e[0] as number, price_end: e[1] as number });
  };

  const handleSearchFilter = (e: any) => {
    setFilter({ ...filter, search: e as string | undefined });
  };

  const handleSearchChangeFilter = (e: any) => {
    if (e.target.value === '') {
      setFilter({ ...filter, search: undefined as string | undefined });
    }
  };

  const handleSortFilter = (e: any) => {
    setFilter({ ...filter, search: e });
  };

  return (
    <div id='product-list'>
      <BreadCumb navigations={['Home', breadCumpName, `Page ${filter.page}`]} />
      <div className='content-area'>
        <div className='container'>
          <RenderIf isTrue={data === undefined}>
            <p className='text-center'>Loading...</p>
          </RenderIf>
          <RenderIf isTrue={data !== undefined}>
            <div className='grid grid-cols-3 lg:grid-cols-4'>
              <div className='col-span-3 lg:px-[15px]'>
                <div
                  className='mb-[30px] flex items-center justify-between'
                  id='wrapper-result-count'
                >
                  <p className='mb-0'>
                    Showing{' '}
                    {data !== undefined &&
                      `${visibleResults.min}-${visibleResults.max} of ${visibleResults.total} results`}
                  </p>
                  <Select
                    placeholder='Default sorting'
                    className='w-[200px]'
                    onChange={handleSortFilter}
                  >
                    <Select.Option value='esc'>Sort By Value in ESC</Select.Option>
                    <Select.Option value='desc'>Sort By Value in DESC</Select.Option>
                  </Select>
                </div>
                <div className='grid grid-cols-1 gap-[15px] sm:grid-cols-2 lg:grid-cols-3'>
                  {data !== undefined &&
                    data.data.map((product: ProductItemData, idx) => {
                      return <ProductItem key={idx} product={product} />;
                    })}
                </div>
                <div className='mt-[20px] flex justify-center'>
                  {data !== undefined && (
                    <Pagination
                      total={data.paginationInfo.total}
                      onChange={handleChangePagination}
                      defaultPageSize={DEFAULT_LIMIT}
                      current={filter.page}
                    />
                  )}
                </div>
              </div>
              <div className='col-span-3 pt-[30px] lg:col-span-1 lg:px-[15px] lg:pt-[0px]'>
                <aside className='mb-[50px]'>
                  <Input.Search
                    placeholder='Search products...'
                    enterButton
                    onSearch={handleSearchFilter}
                    onChange={handleSearchChangeFilter}
                  />
                </aside>
                <aside className='mb-[50px]'>
                  <h3 className='widget-title'>Filter By Price</h3>
                  <Slider
                    onChange={handlePriceFilter}
                    range={{ draggableTrack: true }}
                    defaultValue={[0, 100]}
                  />
                  <div className='price-slider mt-[30px]'>
                    <p className='text-[14px] text-[#666]'>Price: 0$ - 100$</p>
                  </div>
                </aside>
                <aside className='mb-[50px]'>
                  <h3 className='widget-title'>Categories</h3>

                  <div className='product-categories'>
                    {categoryStore.data.map((category, idx) => {
                      return (
                        <Link
                          href={`${pathname}?category=${category?._id}`}
                          className='flex cursor-pointer justify-between py-[12px] text-[#666]'
                          key={idx}
                        >
                          <span className='text-[15px]'>{category?.name}</span>
                          <span className='text-[15px]'>{`(${category?.slug})`}</span>
                        </Link>
                      );
                    })}
                    <Link
                      href={`${pathname}`}
                      className='flex cursor-pointer justify-between py-[12px] text-[#666]'
                    >
                      <span className='text-[15px]'>{'All'}</span>
                      <span className='text-[15px]'>{`(${'all'})`}</span>
                    </Link>
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
