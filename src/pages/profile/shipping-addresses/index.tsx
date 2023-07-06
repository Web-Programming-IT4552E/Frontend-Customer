import { Button, Pagination } from 'antd';
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import { useGetAllShippingAddresses, useGetShippingAddressDetail } from '@/apis/shippingAddressApi';
import ShippingAddressModal from '@/components/ShippingAddressModal';

const DEFAULT_LIMIT = 9;
const ShippingAddresses = () => {
  const [page, setPage] = useState(1);
  const { data: shippingAddressData, refetch } = useGetAllShippingAddresses({
    page,
    limit: DEFAULT_LIMIT,
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [shippingId, setShippingId] = useState('');
  const { data: shippingAddressDetail } = useGetShippingAddressDetail(
    shippingId,
    shippingId !== '',
  );

  const handleClickBtn = () => {
    setIsOpenModal(true);
  };

  const handleClose = () => {
    setShippingId('');
    setIsOpenModal(false);
  };

  const handleChangePagination = (e: any) => {
    setPage(e as number);
  };

  const handleClickShippingAddress = (id: string) => {
    setShippingId(id);
    handleClickBtn();
  };

  return (
    <>
      <ShippingAddressModal
        shippingData={shippingAddressDetail}
        open={isOpenModal}
        onCancel={handleClose}
        onSuccess={() => {
          refetch();
        }}
      />
      <div id='shipping-addresses'>
        <h2 className='mt-[60px] mb-[40px] text-[24px] font-semibold md:text-[36px]'>
          Shipping Address
        </h2>
        <div className='flex flex-wrap items-center justify-center gap-[12px] px-[20px] lg:px-[60px]'>
          {shippingAddressData?.data !== undefined &&
            shippingAddressData.data.map((item, idx) => {
              return (
                <Button
                  type='default'
                  key={idx}
                  onClick={() => {
                    handleClickShippingAddress(item._id);
                  }}
                >
                  <div className='flex flex-col gap-[5px] text-start'>
                    <p>
                      <span>Address:</span> {`${item.address_detail.address}` || ''}
                    </p>
                    <p>
                      <span>Phone:</span> {item.address_detail.receiver_phone_number}
                      {', '}
                      <span>Ward:</span> {`${item.address_detail.ward}` || ''}
                    </p>
                    <p>
                      <span>District:</span> {`${item.address_detail.district}` || ''}
                      {', '}
                      <span>City:</span> {`${item.address_detail.city}` || ''}
                    </p>
                  </div>
                </Button>
              );
            })}
          {shippingAddressData !== undefined &&
            (Math.ceil(shippingAddressData.paginationInfo.total / DEFAULT_LIMIT) ===
              shippingAddressData.paginationInfo.page ||
              shippingAddressData.paginationInfo.total === 0) && (
              <Button
                type='dashed'
                onClick={() => {
                  handleClickBtn();
                }}
              >
                <AiOutlinePlusCircle className='mr-[5px] text-[20px]' /> Add shipping address
              </Button>
            )}
        </div>
        <div className='mt-[20px] flex justify-center'>
          {shippingAddressData !== undefined && (
            <Pagination
              total={shippingAddressData.paginationInfo.total}
              onChange={handleChangePagination}
              defaultPageSize={DEFAULT_LIMIT}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ShippingAddresses;
