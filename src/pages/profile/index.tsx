import { Avatar, Button, DatePicker, Input, Upload } from 'antd';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FaAddressBook } from 'react-icons/fa';

import { RankEnum } from '@/@types/rank';
import MemberCard from '@/components/MemberCard';

dayjs.extend(weekday);
dayjs.extend(localeData);

const Profile = () => {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(true);
  const [profileData, setProfileData] = useState({
    username: 'Alexander Kelvin',
    birthday: new Date().toLocaleDateString(),
    email: 'longdieu12x@gmail.com',
  });

  const handleUploadAvatar = (e: any) => {
    console.log(e);
  };

  const handleEditProfile = () => {
    setIsEdit(!isEdit);
  };

  const handleDirectShippingAddresses = () => {
    router.push('/profile/shipping-addresses');
  };

  return (
    <div className="mt-[80px]" id="profile">
      <div className="wrap flex flex-col items-center justify-start lg:flex-row lg:items-start lg:justify-center">
        <div className="flex flex-col gap-[20px] text-center">
          <Upload showUploadList={false} customRequest={handleUploadAvatar}>
            <Avatar
              className="h-full max-h-[150px] w-full max-w-[150px]"
              src="https://www.nicepng.com/png/detail/186-1866063_dicks-out-for-harambe-sample-avatar.png"
            />
          </Upload>
          <h2 className="text-[24px] font-semibold">Alexander Kelvin</h2>
          <div className="setting-options flex flex-col gap-[10px]">
            <Button className="setting-btn" onClick={handleEditProfile}>
              {' '}
              <AiFillEdit className="mr-[5px]" /> Edit Profile
            </Button>
            <Button
              className="setting-btn"
              onClick={handleDirectShippingAddresses}
            >
              {' '}
              <FaAddressBook className="mr-[5px]" /> Shipping Addresses
            </Button>
          </div>
        </div>
        <div className="detail-info mt-[20px] flex w-full max-w-[450px] flex-col gap-[20px] py-[0px] px-[20px] lg:mx-[60px] lg:mt-0">
          <h2 className="text-[24px] font-semibold lg:text-[32px]">Profile</h2>
          <div className="info-section flex flex-col gap-[16px]">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Username: </h4>
              {isEdit ? (
                <Input
                  className="w-full max-w-[300px]"
                  placeholder="Please input username!"
                  defaultValue={profileData.username}
                  onChange={(e: any) => {
                    setProfileData({
                      ...profileData,
                      username: e.target.value,
                    });
                  }}
                />
              ) : (
                <p>{profileData.username}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Birthday: </h4>
              {isEdit ? (
                <DatePicker
                  className="w-full max-w-[300px]"
                  defaultValue={dayjs(profileData.birthday, 'DD/MM/YYYY')}
                  format={'DD/MM/YYYY'}
                  onChange={(e: any) => {
                    console.log(e);
                  }}
                />
              ) : (
                <p>{profileData.birthday}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Email: </h4>
              {isEdit ? (
                <Input
                  className="w-full max-w-[300px]"
                  placeholder="Please input email!"
                  defaultValue={profileData.email}
                  onChange={(e: any) => {
                    setProfileData({
                      ...profileData,
                      email: e.target.value,
                    });
                  }}
                />
              ) : (
                <p>{profileData.email}</p>
              )}
            </div>
          </div>
          <MemberCard rank={RankEnum.SILVER} point={60} rank_point={50} />
          <div className="actions-btn">
            <Button className="confirm-btn">Confirm</Button>
            <Button className="cancel-btn">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
