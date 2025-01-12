import type { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import Footer from '@/components/footer';
import '@/styles/global.css';
import 'react-strawberry-toast/dist/index.css';
import React from 'react';
import { PrismLight } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';

PrismLight.registerLanguage('jsx', jsx);

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      {getLayout(<Component {...pageProps} />)}
      <Footer />
    </>
  );
}
