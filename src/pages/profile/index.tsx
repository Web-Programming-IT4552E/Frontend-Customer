import { Avatar, Button, Input, Upload } from "antd";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaAddressBook } from "react-icons/fa";

import MemberCard from "@/components/MemberCard";
import { useGetProfile, useUpdateProfile } from "@/apis/customerApi";
import { Customer } from "@/@types/customer";
import RenderIf from "@/components/common/RenderIf";

dayjs.extend(weekday);
dayjs.extend(localeData);

const Profile = () => {
  const router = useRouter();
  const { data: customerData } = useGetProfile();
  const [isEdit, setIsEdit] = useState(false);
  const [profileData, setProfileData] = useState<Customer | undefined>(
    undefined
  );
  const { mutateAsync } = useUpdateProfile(profileData as Customer);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProfileData(customerData);
  }, [customerData]);

  const handleUploadAvatar = (e: any) => {
  };

  const handleEditProfile = async () => {
    setIsEdit(!isEdit);
  };

  const handleDirectShippingAddresses = () => {
    router.push("/profile/shipping-addresses");
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    await mutateAsync();
    setIsEdit(!isEdit);
    setLoading(false);
  };

  const handleCancelProfile = () => {
    setIsEdit(false);
  }

  return (
    <div className="mt-[80px]" id="profile">
      <div className="wrap flex flex-col items-center justify-start lg:flex-row lg:items-start lg:justify-center">
        <div className="flex flex-col gap-[20px] text-center">
          <Upload showUploadList={false} customRequest={handleUploadAvatar}>
            <Avatar
              className="h-full max-h-[150px] w-full max-w-[150px]"
              src={
                profileData?.avatar ||
                "https://www.nicepng.com/png/detail/186-1866063_dicks-out-for-harambe-sample-avatar.png"
              }
            />
          </Upload>
          <h2 className="text-[24px] font-semibold">{`${profileData?.fullname}`}</h2>
          <div className="setting-options flex flex-col gap-[10px]">
            <Button className="setting-btn" onClick={handleEditProfile}>
              {" "}
              <AiFillEdit className="mr-[5px]" /> Edit Profile
            </Button>
            <Button
              className="setting-btn"
              onClick={handleDirectShippingAddresses}
            >
              {" "}
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
                  defaultValue={profileData?.fullname}
                  onChange={(e: any) => {
                    setProfileData({
                      ...profileData,
                      fullname: e.target.value as string,
                    } as Customer);
                  }}
                />
              ) : (
                <p>{profileData?.fullname}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Email: </h4>
              <p>{profileData?.email}</p>
            </div>
          </div>
          <MemberCard
            rank={profileData?.rank || 0}
            point={profileData?.point || 0}
            rank_point={customerData?.rank_point || 0}
          />
          <RenderIf isTrue={isEdit}>
            <div className="actions-btn">
              <Button className="confirm-btn" onClick={handleUpdateProfile} loading={loading}>
                Confirm
              </Button>
              <Button className="cancel-btn" onClick={handleCancelProfile}>Cancel</Button>
            </div>
          </RenderIf>
        </div>
      </div>
    </div>
  );
};

export default Profile;
