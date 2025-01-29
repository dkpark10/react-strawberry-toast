import React from 'react';
import Link from 'next/link';
import Github from '@/components/github';
import { PrismLight } from 'react-syntax-highlighter';
import { codeSyntax } from '@/constants/code-syntax';
import { CodeTheme } from '@/constants/code-theme';
import { ToastContainer } from 'react-strawberry-toast';
import HomePlayGround from '@/app/_components/playground';
import Install from '@/app/_components/install';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'react strawberry toast docs',
  description: 'react-strawberry-toast-docs',
  openGraph: {
    title: 'react strawberry toast docs',
    description: 'React strawberry toast documentation',
    images: '/strawberry.png',
    type: 'website',
    url: 'https://dkpark10.github.io/react-strawberry-toast'
  },
};

export default function Home() {
  return (
    <>
      <header className="pt-8 pb-4">
        <div className="flex justify-center flex-col gap-3">
          <h1 className="text-center text-5xl font-bold">
            React <span className="text-straw-berry">Strawberry</span> Toast
          </h1>
          <p className="text-lg text-center font-semibold">A simple and customizable React toast library</p>
        </div>
      </header>

      <main>
        <div id="btn-area" className="py-10 flex justify-center items-center gap-5">
          <Link
            className="text-primary-white bg-straw-berry text-xl py-2 px-4 shadow-xl font-bold rounded-md w-36 text-center h-11"
            href="/docs"
          >
            Read Docs
          </Link>
          <Link
            href="https://github.com/dkpark10/react-strawberry-toast"
            className="shadow-xl w-36 h-11 flex justify-center items-center rounded-md"
          >
            <div className="flex gap-1">
              <Github />
              <span className="font-bold">Github</span>
            </div>
          </Link>
        </div>

        <Install />

        <div id="code-area" className="flex justify-center py-8 text-sm">
          <PrismLight language="jsx" style={CodeTheme}>
            {codeSyntax['started']}
          </PrismLight>
        </div>

        <HomePlayGround />
      </main>
      <ToastContainer />
    </>
  );
}
