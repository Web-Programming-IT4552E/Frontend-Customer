import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import * as authService from '@/services/authService';

const VerifyActiveToken = () => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAccount = async (id: string) => {
      setIsLoading(true);

      const response = await authService.verifyRegister(id);
      console.log(response);

      if (response.status === 200 || response.data === 201) {
        setIsSuccess(true);
      }

      setIsLoading(false);
    };

    if (router.isReady) {
      const { id } = router.query;
      verifyAccount(id as string);
    }
  }, [router]);

  return (
    <div
      id='verify-register'
      className='flex items-center justify-center py-6 sm:px-20 sm:py-12 lg:px-40 lg:py-20'
    >
      <div className='flex w-[80%] flex-col items-center justify-center gap-6 bg-primary-color p-6 lg:w-[60%]'>
        {isLoading ? (
          <LoadingOutlined />
        ) : (
          <>
            <h1 className='mb-0 text-center text-[32px] font-bold'>
              You are registed {isSuccess ? 'successfully' : 'failed'}!
            </h1>
            <Link href={isSuccess ? '/auth/login' : '/'} className='bg-black p-4 font-semibold text-white hover:opacity-80'>
              Return to {isSuccess ? 'login' : 'home'}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyActiveToken;
