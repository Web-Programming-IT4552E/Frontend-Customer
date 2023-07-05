import 'react-toastify/dist/ReactToastify.css';

import { Checkbox } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FormEvent, ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import authBanner from '@/assets/images/auth-banner.webp';
import Button from '@/components/common/Button';
import LayoutAuth from '@/layouts/LayoutAuth';
import type { NextPageWithLayout } from '@/pages/_app';
import * as authService from '@/services/authService';

const Login: NextPageWithLayout = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const router = useRouter();

  const handleSubmitLogin = async (event: FormEvent) => {
    event.preventDefault();

    const response = await authService.login({ email, password });
    console.log(response);

    switch (response.status) {
      case 200:
        authService.setTokenToLocal(response.data.accessToken, response.data.refreshToken);
        authService.setIsAuthToLocal(true);

        toast.success('Login thành công!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          pauseOnHover: false,
          onClose: () => setIsLoginSuccess(true),
        });
        break;
      case 400:
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          pauseOnHover: false,
        });
        break;
      default:
        break;
    }
  };

  const handleForgotPassword = async () => {
    console.log(email);
  };

  useEffect(() => {
    if (isLoginSuccess) {
      const timerId = setTimeout(() => {
        router.push('/');
      }, 2000);

      return () => {
        clearTimeout(timerId);
      };
    }

    return undefined;
  }, [isLoginSuccess]);

  return (
    <>
      <div id='auth-login' className='grid h-[100vh] xl:grid-cols-2'>
        <div
          style={{
            backgroundImage: `url(${authBanner.src})`,
          }}
          className='hidden h-full bg-cover bg-center bg-no-repeat sm:block sm:pt-[46%] lg:pt-[40%] xl:pt-0'
        ></div>

        <div className='flex flex-col justify-center bg-[#f6f7fc] px-8 sm:py-10 sm:px-20 lg:px-32 xl:py-20 xl:px-40'>
          <h1 className='mb-14 text-center text-[28px]'>
            Welcome to <span className='font-bold text-primary-color'>Uray Cosmetic & Beauty</span>
          </h1>

          <form className='flex flex-col gap-10' onSubmit={handleSubmitLogin}>
            <div className='flex flex-col gap-3'>
              <label htmlFor=''>Email</label>
              <input
                value={email}
                type='email'
                placeholder='Your-email@gmail.com'
                className='auth-input py-4 px-3 text-base outline-none placeholder:text-[#848484]'
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className='flex flex-col gap-3'>
              <label htmlFor=''>Password</label>
              <input
                value={password}
                type='password'
                placeholder='Your password'
                className='auth-input py-4 px-3 text-base outline-none placeholder:text-[#848484]'
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className='mt-[-20px] flex items-center justify-between text-sm'>
              <Checkbox>Remember me</Checkbox>
              <p
                className='mb-0 cursor-pointer underline hover:no-underline'
                onClick={handleForgotPassword}
              >
                Forgot password?
              </p>
            </div>
            <div className='flex flex-col gap-4'>
              <Button primary type='submit'>
                Login
              </Button>
              <Link href='/auth/register'>
                <Button secondary type='button' className='w-full'>
                  Register
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export default Login;
