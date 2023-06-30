import { Checkbox } from 'antd';
import Link from 'next/link';
import type { FormEvent, ReactElement } from 'react';
import React from 'react';

// import authBanner from '@/assets/images/auth_banner.jpg'
import authBanner from '@/assets/images/auth-banner.webp';
import Button from '@/components/common/Button';
import LayoutAuth from '@/layouts/LayoutAuth';
import type { NextPageWithLayout } from '@/pages/_app';

const Login: NextPageWithLayout = () => {
  const handleSubmitLogin = (event: FormEvent) => {
    event.preventDefault();
    console.log('hi');
  };

  return (
    <div id="auth-login" className="grid h-[100vh] xl:grid-cols-2">
      <div
        style={{
          backgroundImage: `url(${authBanner.src})`,
        }}
        className="hidden h-full bg-cover bg-center bg-no-repeat sm:block sm:pt-[46%] lg:pt-[40%] xl:pt-0"
      ></div>

      <div className="flex flex-col justify-center bg-[#f6f7fc] px-8 sm:py-10 sm:px-20 lg:px-32 xl:py-20 xl:px-40">
        <h1 className="mb-14 text-center text-[28px]">
          Welcome to{' '}
          <span className="font-bold text-primary-color">
            Uray Cosmetic & Beauty
          </span>
        </h1>

        <form className="flex flex-col gap-10" onSubmit={handleSubmitLogin}>
          <div className="flex flex-col gap-3">
            <label htmlFor="">Username</label>
            <input
              type="email"
              placeholder="Your-email@gmail.com"
              className="auth-input py-4 px-3 text-base outline-none placeholder:text-[#848484]"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Your password"
              className="auth-input py-4 px-3 text-base outline-none placeholder:text-[#848484]"
            />
          </div>
          <div className="mt-[-20px] flex items-center justify-between text-sm">
            <Checkbox>Remember me</Checkbox>
            <p className="mb-0 cursor-pointer underline hover:no-underline">
              Forgot password?
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Button primary type="submit">
              Login
            </Button>
            <Link href="/auth/register">
              <Button secondary type="button" className="w-full">
                Register
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export default Login;
