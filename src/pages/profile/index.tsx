import { Avatar, Button, Input, Upload } from "antd";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaAddressBook } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import MemberCard from "@/components/MemberCard";
import { useGetProfile, useUpdateProfile } from "@/apis/customerApi";
import { Customer } from "@/@types/customer";
import RenderIf from "@/components/common/RenderIf";
import { uploadImage } from "@/services/image";
import { ProfilePage } from "@/interfaces/profile.interface";
import ChangePassword from "@/components/ChangePassword";
import store, { useAppSelector } from "@/configs/redux";
import { updateProfile } from "@/reducers/profile";
import ProfileInfo from "@/components/ProfileInfo";

dayjs.extend(weekday);
dayjs.extend(localeData);



const Profile = () => {
  const profileData = useAppSelector(state => state.profile);
  const router = useRouter();
  const pathname = router.pathname;
  const { data: customerData } = useGetProfile();
  const [currentPage, setCurrentPage] = useState(ProfilePage.VIEW);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (customerData !== undefined) {
      updateProfileStore(customerData as Customer)
    }
  }, [customerData]);
  useEffect(() => {
    if (avatarUrl !== "") {
      updateProfileStore({ ...profileData.data, avatar: avatarUrl } as Customer)
    }
  }, [avatarUrl]);
  
  useEffect(() => {
    setCurrentPage(router.query.page as ProfilePage);
  }, [router.query])

  const updateProfileStore = (profile: Customer) => {
    store.dispatch(updateProfile(profile))
  }

  const handleUploadAvatar = (e: any) => {
    uploadImage(e.file.name, e.file, setAvatarUrl);
  };

  const handleEditProfile = async () => {
    router.push(`${pathname}?page=${ProfilePage.EDIT}`);
  };

  const handleDirectShippingAddresses = () => {
    router.push("/profile/shipping-addresses");
  };

  const handleChangePasswordPage = () => {
    router.push(`${pathname}?page=${ProfilePage.CHANGE_PASSWORD}`)
  };

  return (
    <div className="mt-[80px]" id="profile">
      <div className="wrap flex flex-col items-center justify-start lg:flex-row lg:items-start lg:justify-center">
        <div className="flex flex-col gap-[20px] text-center">
          <Upload showUploadList={false} customRequest={handleUploadAvatar}>
            <Avatar
              size={{
                xs: 150,
                sm: 150,
                md: 150,
                lg: 150,
                xl: 150,
                xxl: 150,
              }}
              src={
                avatarUrl ||
                profileData?.data?.avatar ||
                "https://www.nicepng.com/png/detail/186-1866063_dicks-out-for-harambe-sample-avatar.png"
              }
            />
          </Upload>
          <h2 className="text-[24px] font-semibold">{`${profileData?.data?.fullname}`}</h2>
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
            <Button className="setting-btn" onClick={handleChangePasswordPage}>
              {" "}
              <MdPassword className="mr-[5px]" /> Change Password
            </Button>
          </div>
        </div>
        <div className="detail-info mt-[20px] flex w-full max-w-[450px] flex-col gap-[20px] py-[0px] px-[20px] lg:mx-[60px] lg:mt-0">
          <h2 className="text-[24px] font-semibold lg:text-[32px]">Profile</h2>
          <RenderIf isTrue={currentPage !== ProfilePage.CHANGE_PASSWORD}>
            <ProfileInfo/>
          </RenderIf>
          <RenderIf isTrue={currentPage === ProfilePage.CHANGE_PASSWORD}>
            <ChangePassword/>
          </RenderIf>
        </div>
      </div>
    </div>
  );
};

export default Profile;
