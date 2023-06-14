import React, { useState } from "react";
import { Avatar, Button, DatePicker, Input, Upload } from "antd";
import { AiFillEdit } from "react-icons/ai";
import { FaAddressBook } from "react-icons/fa"
import MemberCard from "@/components/MemberCard";
import { RankEnum } from "@/@types/rank";
import dayjs from 'dayjs'
import weekday from "dayjs/plugin/weekday"
import localeData from "dayjs/plugin/localeData"

dayjs.extend(weekday)
dayjs.extend(localeData)

const Profile = () => {
  const [isEdit, setIsEdit] = useState(true);
  const [profileData, setProfileData] = useState({
    username: "Alexander Kelvin",
    birthday: new Date().toLocaleDateString(),
    email: "longdieu12x@gmail.com"
  })

  const handleUploadAvatar = (e: any) => {
    console.log(e);
  };

  const handleEditProfile = () => {
    setIsEdit(!isEdit);
  }

  console.log(dayjs(profileData.birthday, "MM/DD/YYYY"))

  return (
    <div className="mt-[80px]" id="profile">
      <div className="flex flex-col justify-start wrap items-center lg:flex-row lg:justify-center lg:items-start">
        <div className="text-center flex flex-col gap-[20px]">
          <Upload showUploadList={false} customRequest={handleUploadAvatar}>
            <Avatar
              className="w-full h-full max-w-[150px] max-h-[150px]"
              src="https://www.nicepng.com/png/detail/186-1866063_dicks-out-for-harambe-sample-avatar.png"
            />
          </Upload>
          <h2 className="text-[24px] font-semibold">Alexander Kelvin</h2>
          <div className="setting-options flex flex-col gap-[10px]">
            <Button className="setting-btn" onClick={handleEditProfile}>
              {" "}
              <AiFillEdit className="mr-[5px]"  /> Edit Profile
            </Button>
            <Button className="setting-btn">
              {" "}
              <FaAddressBook className="mr-[5px]" /> Shipping Addresses
            </Button>
          </div>
        </div>
        <div className="detail-info py-[0px] px-[20px] mt-[20px] flex flex-col gap-[20px] w-full max-w-[450px] lg:mx-[60px] lg:mt-0">
          <h2 className="text-[24px] font-semibold lg:text-[32px]">Profile</h2>
          <div className="info-section flex flex-col gap-[16px]">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Username: </h4>
              {isEdit ? <Input className="w-full max-w-[300px]" placeholder="Please input username!" defaultValue={profileData.username} onChange={(e: any) => {
                setProfileData({
                  ...profileData,
                  username: e.target.value
                })
              }}/> : <p>{profileData.username}</p>}
            </div>
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Birthday: </h4>
              {isEdit ? <DatePicker className="w-full max-w-[300px]" defaultValue={dayjs(profileData.birthday, "MM/DD/YYYY")} format={"MM/DD/YYYY"} onChange={(e: any) => {
                console.log(e)
              }} /> : <p>{profileData.birthday}</p>}
            </div>
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Email: </h4>
              {isEdit ? <Input className="w-full max-w-[300px]" placeholder="Please input email!" defaultValue={profileData.email} onChange={(e: any) => {
                setProfileData({
                  ...profileData,
                  email: e.target.value
                })
              }} /> : <p>{profileData.email}</p>}
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
