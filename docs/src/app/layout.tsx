import React, { type PropsWithChildren } from 'react';
import GlobalProvider from '@/app/global-provider';
import '@/styles/global.css';
import 'react-strawberry-toast/dist/style.css';
import { PrismLight } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import type { Metadata } from 'next'

PrismLight.registerLanguage('jsx', jsx);

export const metadata: Metadata = {
  icons: '/react-strawberry-toast/favicon.ico',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>{children}</GlobalProvider>
        <footer className="h-60 flex translate-y-36 justify-center items-center bg-primary-black text-[#c3c6c1] w-full">
          @Created by dkpark10
        </footer>
      </body>
    </html>
  );
}
