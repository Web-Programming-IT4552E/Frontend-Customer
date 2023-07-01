import '@/styles/globals.scss';
import 'antd/dist/reset.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { config } from '@fortawesome/fontawesome-svg-core';
// import 'antd/dist/reset.css';
// import 'antd/dist/antd.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { useRouter } from 'next/router'

import * as authService from '@/services/authService'
import store, { persistor } from '@/configs/redux';
import LayoutDefault from '@/layouts/LayoutDefault';

// Remove auto adding css
config.autoAddCss = false;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();
  console.log(router);

  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    })
  );

  const getLayout =
    Component.getLayout ?? ((page) => <LayoutDefault>{page}</LayoutDefault>);
  
  useEffect(() => {
    const path = router.pathname;
    const isLogin = authService.getIsAuthFromLocal();

    if(isLogin && (path.includes('login') || path.includes('register') || path.includes('profile'))) {
      router.push('/');
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
