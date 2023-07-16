import 'antd/dist/reset.css';
// import 'antd/dist/antd.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/globals.scss';

import { config } from '@fortawesome/fontawesome-svg-core';
// import 'antd/dist/reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import type { ReactElement, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import store, { persistor } from '@/configs/redux';
import LayoutDefault from '@/layouts/LayoutDefault';
import { fetchCategories } from '@/reducers/category';
import * as authService from '@/services/authService';

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
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: true,
          retry: false,
        },
      },
    }),
  );

  const getLayout = Component.getLayout ?? ((page) => <LayoutDefault>{page}</LayoutDefault>);

  useEffect(() => {
    if (!router.asPath.includes("#home-header")) {
      router.push(`${router.asPath}#home-header`);
    }
  }, [router.pathname, JSON.stringify(router.query)]);

  useEffect(() => {
    const path = router.pathname;
    const isLogin = authService.getIsAuthFromLocal();

    if (isLogin && ['/auth/login', '/auth/register'].includes(path)) {
      router.push('/');
    }

    store.dispatch(fetchCategories());
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
