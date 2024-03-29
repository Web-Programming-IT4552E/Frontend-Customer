import 'react-toastify/dist/ReactToastify.css';

import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import * as authService from '@/services/authService';

const VerifyActiveToken = () => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUpdatePassWord, setIsUpdatePassWord] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeToken, setActiveToken] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handleUpdatePassword = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== rePassword) {
      toast.error('Password not the same!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        pauseOnHover: false,
      });
    } else {
      const response = await authService.updatePassword({
        active_token: activeToken,
        new_password: password,
        confirm_new_password: rePassword,
      });
      console.log(response);

      switch (response.status) {
        case 200:
        case 201:
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
            pauseOnHover: false,
            onClose: () => setIsUpdatePassWord(true),
          });
          break;
        default:
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
            pauseOnHover: false,
          });
          break;
      }
    }
  };

  useEffect(() => {
    const verifyPassword = async (id: string) => {
      setIsLoading(true);
      setActiveToken(id);

      const response = await authService.verifyForgotPassword(id);
      console.log(response);

      if (response.status === 200 || response.data === 201) {
        setIsSuccess(true);
      }

      setIsLoading(false);
    };

    if (router.isReady) {
      const { id } = router.query;
      verifyPassword(id as string);
    }
  }, [router]);

  useEffect(() => {
    let timerId: any;
    if (isUpdatePassWord) {
      timerId = setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isUpdatePassWord]);

  return (
    <>
      <div
        id='verify-forgot-password'
        className='flex flex-col items-center justify-center gap-10 py-6 sm:px-20 sm:py-12 lg:px-40 lg:py-20'
      >
        <div className='flex w-[80%] flex-col items-center justify-center gap-6 bg-primary-color p-6 xl:w-[60%]'>
          {isLoading ? (
            <LoadingOutlined />
          ) : (
            <>
              <h1 className='mb-0 text-center text-[32px] font-bold'>
                Verify forgot password {isSuccess ? 'successfully' : 'failed'}!
              </h1>
              {isSuccess ? (
                <p className='mb-0 text-[20px]'>Please change your password</p>
              ) : (
                <Link href='/' className='bg-black p-4 font-semibold text-white hover:opacity-80'>
                  Return to home
                </Link>
              )}
            </>
          )}
        </div>
        {isSuccess && (
          <form
            className='flex w-[80%] flex-col items-center justify-center gap-6 xl:w-[60%]'
            onSubmit={handleUpdatePassword}
          >
            <div className='flex w-full flex-wrap items-center gap-3'>
              <label className='text-base font-semibold sm:w-[40%]'>New password:</label>
              <input
                value={password}
                type='password'
                placeholder='Your password...'
                className='auth-input flex-1 border border-solid border-[#ccc] p-3 text-base outline-none placeholder:text-[#848484]'
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className='flex w-full flex-wrap items-center gap-3'>
              <label className='text-base font-semibold sm:w-[40%]'>Confirm new password: </label>
              <input
                value={rePassword}
                type='password'
                placeholder='Re-enter your password...'
                className='auth-input flex-1 border border-solid border-[#ccc] p-3 text-base outline-none placeholder:text-[#848484]'
                onChange={(event) => setRePassword(event.target.value)}
              />
            </div>
            <button
              type='submit'
              className='bg-black py-[14px] px-8 text-base font-semibold text-white hover:opacity-70'
            >
              Submit
            </button>
          </form>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default VerifyActiveToken;
