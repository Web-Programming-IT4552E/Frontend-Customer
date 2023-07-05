import Head from 'next/head';
import type { ReactNode } from 'react';
import React from 'react';

type Props = {
  children: ReactNode;
  title?: string;
};

const LayoutDocument = ({ children, title = 'This is the default title' }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {/* <GeneralModal /> */}
      <div>{children}</div>
    </>
  );
};
export default LayoutDocument;
