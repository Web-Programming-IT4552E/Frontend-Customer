import { Button, Input } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import type { Customer } from '@/@types/customer';
import { RankEnum } from '@/@types/rank';
import { useGetProfile, useUpdateProfile } from '@/apis/customerApi';
import { useDebounce } from '@/hooks/useDebounce';
import { ProfilePage } from '@/interfaces/profile.interface';

import RenderIf from './common/RenderIf';
import MemberCard from './MemberCard';

const ProfileInfo: React.FC<{ avatarUrl: string }> = ({ avatarUrl }) => {
  const {
    data: customerData = {
      fullname: '',
      phone: '',
      avatar: '',
      email: '',
      rank: RankEnum.BRONZE,
      point: 0,
      rank_point: 0,
    },
  } = useGetProfile();
  const router = useRouter();
  const { pathname } = router;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(ProfilePage.VIEW);
  const [updatedValue, setUpdatedValue] = useState({
    fullname: customerData.fullname,
    phone: customerData.phone,
    avatar: avatarUrl,
  });
  const updatedValueDebounce = useDebounce(updatedValue);
  const { mutateAsync } = useUpdateProfile({
    ...customerData,
    ...updatedValueDebounce,
  } as Customer);

  const handleUpdateProfile = async () => {
    setLoading(true);
    await mutateAsync();
    router.push(`${pathname}?page=${ProfilePage.VIEW}`);
    setLoading(false);
  };

  const handleCancelProfile = () => {
    router.push(`${pathname}?page=${ProfilePage.VIEW}`);
  };

  useEffect(() => {
    setCurrentPage(router.query.page as ProfilePage);
  }, [router.query]);

  useEffect(() => {
    setUpdatedValue({
      fullname: customerData.fullname,
      phone: customerData.phone,
      avatar: avatarUrl,
    });
  }, [customerData, avatarUrl]);

  return (
    <>
      <div className='info-section flex flex-col gap-[16px]'>
        <div className='flex items-center justify-between'>
          <h4 className='font-medium'>Fullname: </h4>
          {currentPage === ProfilePage.EDIT ? (
            <Input
              className='w-full max-w-[300px]'
              placeholder='Please input username!'
              defaultValue={customerData?.fullname}
              onChange={(e: any) => {
                setUpdatedValue({
                  ...updatedValue,
                  fullname: e.target.value as string,
                });
              }}
            />
          ) : (
            <p>{customerData?.fullname}</p>
          )}
        </div>
        <div className='flex items-center justify-between'>
          <h4 className='font-medium'>Email: </h4>
          <p>{customerData?.email}</p>
        </div>
        <div className='flex items-center justify-between'>
          <h4 className='font-medium'>Phone: </h4>
          {currentPage === ProfilePage.EDIT ? (
            <Input
              className='w-full max-w-[300px]'
              placeholder='Please input username!'
              defaultValue={customerData?.phone}
              onChange={(e: any) => {
                setUpdatedValue({
                  ...updatedValue,
                  phone: e.target.value as string,
                });
              }}
            />
          ) : (
            <p>{customerData?.phone}</p>
          )}
        </div>
      </div>

      <MemberCard
        rank={customerData?.rank}
        point={customerData?.point}
        rank_point={customerData?.rank_point}
      />
      <RenderIf isTrue={currentPage === ProfilePage.EDIT}>
        <div className='actions-btn'>
          <Button className='confirm-btn' onClick={handleUpdateProfile} loading={loading}>
            Confirm
          </Button>
          <Button className='cancel-btn' onClick={handleCancelProfile}>
            Cancel
          </Button>
        </div>
      </RenderIf>
    </>
  );
};

export default ProfileInfo;
