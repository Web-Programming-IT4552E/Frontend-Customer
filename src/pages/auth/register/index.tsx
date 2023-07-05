import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import type { FormEvent, ReactElement } from 'react';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

// import authBanner from '@/assets/images/auth_banner.jpg'
import authBanner from '@/assets/images/auth-banner.webp';
import Button from '@/components/common/Button';
import LayoutAuth from '@/layouts/LayoutAuth';
import type { NextPageWithLayout } from '@/pages/_app';
import * as authService from '@/services/authService';

const Register: NextPageWithLayout = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const router = useRouter();

  const handleSubmitRegister = async (event: FormEvent) => {
    event.preventDefault();

    if (password === rePassword) {
      const response = await authService.register({ email, password, phone, fullname });
      console.log(response);

      switch (response.status) {
        case 200:
        case 201:
          toast.success(
            `Register ${response.data.message}! Please check email to confirm account!`,
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
              pauseOnHover: false,
            },
          );
          router.push('auth/login');
          break;
        case 400:
          const messageLength = response.data.message.length;
          let message = '';
          for (let i = 0; i < messageLength; i += 1) {
            message += `${response.data.message[i]}, `;
          }

          toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
            pauseOnHover: false,
          });
          break;
        case 500:
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
            pauseOnHover: false,
          });
          break;
        default:
          break;
      }
    } else {
      toast.error('Password is not the same!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        pauseOnHover: false,
      });
    }
  };

  return (
    <>
      <div id='auth-login' className='grid h-[100vh] xl:grid-cols-2'>
        <div
          style={{
            backgroundImage: `url(${authBanner.src})`,
          }}
          className='hidden h-full bg-cover bg-center bg-no-repeat sm:block sm:pt-[46%] lg:pt-[40%] xl:pt-0'
        ></div>

        <div className='flex flex-col justify-center bg-[#f6f7fc] px-8 sm:py-10 sm:px-20 lg:px-32 xl:py-12 xl:px-40'>
          <h1 className='mb-14 text-center text-[28px]'>
            Welcome to <span className='font-bold text-primary-color'>Uray Cosmetic & Beauty</span>
          </h1>

          <form className='flex flex-col gap-10' onSubmit={handleSubmitRegister}>
            <div className='flex flex-col gap-3'>
              <label htmlFor=''>Username</label>
              <input
                type='text'
                value={fullname}
                placeholder='Your name...'
                className='auth-input py-4 px-3 text-base outline-none placeholder:text-[#848484]'
                onChange={(event) => setFullname(event.target.value)}
              />
            </div>
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
              <label htmlFor=''>Phone</label>
              <input
                value={phone}
                type='text'
                placeholder='Your phone ...'
                className='auth-input py-4 px-3 text-base outline-none placeholder:text-[#848484]'
                onChange={(event) => setPhone(event.target.value)}
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
            <div className='flex flex-col gap-3'>
              <label htmlFor=''>Re-enter password</label>
              <input
                value={rePassword}
                type='password'
                placeholder='Your password'
                className='auth-input py-4 px-3 text-base outline-none placeholder:text-[#848484]'
                onChange={(event) => setRePassword(event.target.value)}
              />
            </div>
            <div className='flex flex-col gap-4'>
              <Button primary type='submit'>
                Register
              </Button>
              <Link href='/auth/login'>
                <Button secondary type='button' className='w-full'>
                  Login
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

Register.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export default Register;
