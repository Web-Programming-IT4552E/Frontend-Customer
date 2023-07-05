import { Button, Input } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import type { Customer } from '@/@types/customer';
import { useUpdateProfile } from '@/apis/customerApi';
import store, { useAppSelector } from '@/configs/redux';
import { useDebounce } from '@/hooks/useDebounce';
import { ProfilePage } from '@/interfaces/profile.interface';
import { cancelProfile, confirmProfile, updateProfile } from '@/reducers/profile';

import RenderIf from './common/RenderIf';
import MemberCard from './MemberCard';

const ProfileInfo = () => {
  const profileData = useAppSelector((state) => state.profile);
  const router = useRouter();
  const { pathname } = router;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(ProfilePage.VIEW);
  const { mutateAsync } = useUpdateProfile(profileData?.data as Customer);
  const [updatedValue, setUpdatedValue] = useState({
    fullname: profileData.data?.fullname,
    phone: profileData.data?.phone,
  });
  const updatedValueDebounce = useDebounce(updatedValue);

  const updateProfileStore = (profile: Customer) => {
    store.dispatch(updateProfile(profile));
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    await mutateAsync();
    store.dispatch(confirmProfile());
    router.push(`${pathname}?page=${ProfilePage.VIEW}`);
    setLoading(false);
  };

  const handleCancelProfile = () => {
    store.dispatch(cancelProfile());
    router.push(`${pathname}?page=${ProfilePage.VIEW}`);
  };

  useEffect(() => {
    setCurrentPage(router.query.page as ProfilePage);
  }, [router.query]);

  useEffect(() => {
    updateProfileStore({
      ...profileData.data,
      ...updatedValue,
    } as Customer);
  }, [updatedValueDebounce]);

  return (
    <>
      <div className='info-section flex flex-col gap-[16px]'>
        <div className='flex items-center justify-between'>
          <h4 className='font-medium'>Fullname: </h4>
          {currentPage === ProfilePage.EDIT ? (
            <Input
              className='w-full max-w-[300px]'
              placeholder='Please input username!'
              defaultValue={profileData?.data?.fullname}
              onChange={(e: any) => {
                setUpdatedValue({
                  ...updatedValue,
                  fullname: e.target.value as string,
                });
              }}
            />
          ) : (
            <p>{profileData?.data?.fullname}</p>
          )}
        </div>
        <div className='flex items-center justify-between'>
          <h4 className='font-medium'>Email: </h4>
          <p>{profileData?.data?.email}</p>
        </div>
        <div className='flex items-center justify-between'>
          <h4 className='font-medium'>Phone: </h4>
          {currentPage === ProfilePage.EDIT ? (
            <Input
              className='w-full max-w-[300px]'
              placeholder='Please input username!'
              defaultValue={profileData?.data?.phone}
              onChange={(e: any) => {
                setUpdatedValue({
                  ...updatedValue,
                  phone: e.target.value as string,
                });
              }}
            />
          ) : (
            <p>{profileData?.data?.phone}</p>
          )}
        </div>
      </div>

      <MemberCard
        rank={profileData?.data?.rank || 0}
        point={profileData?.data?.point || 0}
        rank_point={profileData?.data?.rank_point || 0}
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
