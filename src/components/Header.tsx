import 'react-toastify/dist/ReactToastify.css';

import Tippy from '@tippyjs/react/headless';
import Image from 'next/image';
import Link from 'next/link';
import type { FormEvent } from 'react';
import React, { useState } from 'react';
import { HiLogin, HiLogout, HiOutlineUser } from 'react-icons/hi';
import {
  HiBars3,
  HiMagnifyingGlass,
  HiOutlineShoppingBag,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiOutlineUserPlus,
  HiOutlineXMark,
} from 'react-icons/hi2';
import { toast, ToastContainer } from 'react-toastify';

import logoImg from '@/assets/images/logo.png';
import * as authService from '@/services/authService';

import CartList from './CartList';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');

  const isLogin = authService.getIsAuthFromLocal();

  const handleSearchCloseIcon = () => {
    const searchElement = document.querySelector('#home-header .header-search');
    const classList = searchElement?.classList;

    if (classList?.contains('top-0')) {
      classList.remove('top-0', 'xl:top-0');
      classList?.add('top-[-70px]', 'xl:top-[-110px]');
    } else {
      classList?.remove('top-[-70px]', 'xl:top-[-110px]');
      classList?.add('top-0', 'xl:top-0');
    }
  };

  const handleSubmitSearch = (event: FormEvent) => {
    event.preventDefault();
    console.log(event.target);
  };

  const handleSubMenu = () => {
    const subMenu = document.getElementById('header-sub-menu');

    if (subMenu?.classList.contains('top-[-121px]')) {
      subMenu.classList.remove('top-[-121px]');
      subMenu.classList.add('top-[70px]');
    } else {
      subMenu?.classList.remove('top-[70px]');
      subMenu?.classList.add('top-[-121px]');
    }
  };

  const handleLogout = async () => {
    const response = await authService.logout();
    switch (response.status) {
      case 200:
        toast.success('Logout thành công!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          pauseOnHover: false,
        });
        break;
      case 400:
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          pauseOnFocusLoss: false,
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="relative h-[70px] xl:h-[110px]" id="home-header">
        <div className="absolute inset-x-0 top-0 z-20 flex h-full items-center justify-between bg-white px-4 xl:px-20">
          <div className="xl:hidden" onClick={handleSubMenu}>
            <HiBars3 className="cursor-pointer p-2 text-[50px] text-[#666]" />
          </div>

          <Image
            src={logoImg}
            alt="logo"
            className="h-[50px] w-[100px] cursor-pointer xl:h-[70px] xl:w-[140px]"
          />

          <div className="hidden items-center gap-8 text-base font-semibold xl:flex">
            <Link href="/" className="header-list-item">
              HOME
            </Link>
            <Link href="/product/all" className="header-list-item">
              SHOP
            </Link>
            <Link href="/" className="header-list-item">
              BLOG
            </Link>
            <Link href="/" className="header-list-item">
              CONTACT US
            </Link>
          </div>

          <div className="flex items-center gap-8">
            {/* wrap div to remove warning */}
            <div>
              <Tippy
                placement="bottom-end"
                interactive
                delay={[0, 300]}
                render={(attrs) => (
                  <div
                    className="tippy-dropdown mt-1 w-[330px] bg-white px-2 py-3 text-center"
                    tabIndex={-1}
                    {...attrs}
                  >
                    <CartList />
                  </div>
                )}
              >
                <div>
                  <HiOutlineShoppingBag className="cursor-pointer text-[24px]" />
                </div>
              </Tippy>
            </div>
            <HiMagnifyingGlass
              className="cursor-pointer text-[26px]"
              onClick={handleSearchCloseIcon}
            />
            <div>
              <Tippy
                placement="bottom-end"
                interactive
                delay={[0, 300]}
                render={(attrs) => (
                  <div
                    className="tippy-dropdown mt-1 min-w-[150px] bg-white"
                    tabIndex={-1}
                    {...attrs}
                  >
                    <ul className="mb-0">
                      {isLogin ? (
                        <>
                          <Link
                            href="/profile"
                            className="flex cursor-pointer items-center gap-4 border-b-[1px] border-solid border-[#d3d0d0] px-4 py-[10px] transition-all duration-75 ease-linear hover:bg-[#e8e7e7] hover:text-black"
                          >
                            <span className="flex-1">Profile</span>
                            <HiOutlineUser className="text-[18px] text-[#666]" />
                          </Link>
                          <button
                            className="flex w-full cursor-pointer items-center gap-4 border-b-[1px] border-solid border-[#d3d0d0] px-4 py-[10px] transition-all duration-75 ease-linear hover:bg-[#e8e7e7] hover:text-black"
                            onClick={handleLogout}
                          >
                            <span className="flex-1 text-left">Logout</span>
                            <HiLogout className="text-[18px] text-[#666]" />
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/auth/login"
                            className="flex cursor-pointer items-center gap-4 border-b-[1px] border-solid border-[#d3d0d0] px-4 py-[10px] transition-all duration-75 ease-linear hover:bg-[#e8e7e7] hover:text-black"
                          >
                            <span className="flex-1">Login</span>
                            <HiLogin className="text-[18px] text-[#666]" />
                          </Link>
                          <Link
                            href="/auth/register"
                            className="flex cursor-pointer items-center gap-4 px-4 py-[10px] transition-all duration-75 ease-linear hover:bg-[#e8e7e7] hover:text-black"
                          >
                            <span className="flex-1">Sign up</span>
                            <HiOutlineUserPlus className="text-[18px] text-[#666]" />
                          </Link>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              >
                <div>
                  {isLogin ? (
                    <HiOutlineUserCircle className="cursor-pointer text-[27px]" />
                  ) : (
                    <HiOutlineUserGroup className="cursor-pointer text-[27px]" />
                  )}
                </div>
              </Tippy>
            </div>
          </div>
        </div>

        <div
          id="header-sub-menu"
          className="absolute inset-x-0 top-[-121px] z-10 bg-white transition-all duration-300 ease-linear"
        >
          <ul className="mb-0">
            <li className="cursor-pointer border-t-[1px] border-solid border-[#e9e9e9] px-8 py-4 text-[15px] font-semibold">
              HOME
            </li>
            <li className="cursor-pointer border-t-[1px] border-solid border-[#e9e9e9] px-8 py-4 text-[15px] font-semibold">
              SHOP
            </li>
            <li className="cursor-pointer border-t-[1px] border-solid border-[#e9e9e9] px-8 py-4 text-[15px] font-semibold">
              BLOG
            </li>
            <li className="cursor-pointer border-t-[1px] border-solid border-[#e9e9e9] px-8 py-4 text-[15px] font-semibold">
              CONTACT US
            </li>
          </ul>
        </div>

        <div className="header-search top-[-70px] xl:top-[-110px]">
          <form
            className="flex flex-1 items-center"
            onSubmit={handleSubmitSearch}
          >
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              placeholder="Search Here ..."
              className="flex-1 border-b-[1px] border-solid border-black py-[10px] pr-4 text-base outline-none placeholder:text-black"
            />
            <button type="submit" className="p-4">
              <HiMagnifyingGlass className="cursor-pointer text-[28px]" />
            </button>
          </form>
          <HiOutlineXMark
            onClick={handleSearchCloseIcon}
            className="cursor-pointer p-1 text-[38px]"
          />
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Header;
