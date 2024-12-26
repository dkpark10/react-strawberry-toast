import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Code from '@/components/code';
import Github from '@/components/github';
import { ToastContainer, toast } from '../../../../src';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';

const packagesName = ['npm', 'yarn', 'pnpm'] as const;

export default function Home() {
  return (
    <>
      <Head>
        <title>react strawberry toast docs</title>
        <meta name="description" content="react-strawberry-toast-docs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="pt-8 pb-4">
        <div className="flex justify-center flex-col gap-3">
          <h1 className="text-center text-5xl font-bold">
            React <span className="text-straw-berry">Strawberry</span> Toast
          </h1>
          <p className="text-lg text-center font-semibold">A simple and customizable React toast library</p>
        </div>
      </header>

      <div id="btn-area" className="py-5 flex justify-center items-center gap-5">
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

      <div id="tab-area" className="flex justify-center">
        <Tabs>
          <TabList className="flex justify-center space-x-6 py-3">
            {packagesName.map((packageName) => (
              <Tab key={packageName} className="text-lg cursor-pointer font-bold">
                {packageName}
              </Tab>
            ))}
          </TabList>

          <TabPanel>
            <Code>npm i react-strawberry-toast</Code>
          </TabPanel>
          <TabPanel>
            <Code>yarn add react-strawberry-toast</Code>
          </TabPanel>
          <TabPanel>
            <Code>pnpm i react-strawberry-toast</Code>
          </TabPanel>
        </Tabs>
      </div>

      <div id="code-area" className="flex justify-center py-8 text-sm">
        <SyntaxHighlighter language="jsx" style={CodeTheme}>
          {`import { ToastContainer, toast } from 'react-strawberry-toast';

function App() {
  const click = () => {
    toast('hello strawberry toast');
  };
 
  return (
    <>
      <ToastContainer />
      <button type='button' onClick={click}>click</button>
    </>
  );
 }`}
        </SyntaxHighlighter>
      </div>

      <h3 className="font-bold text-lg text-center pb-5">playground</h3>

      <div className="flex justify-center pb-8">
        <div id="container-area" className="grid gap-4 grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => i + 1).map((id) => (
            <div
              className="font-semibold w-32 h-8 bg-straw-berry flex items-center justify-center shadow-lg"
              key={id}
            >
              <ToastContainer containerId={String(id)} />
              <span className="text-white">{id}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-2 border-red-400 gap-[166px] flex justify-center">
        <div id="toast-example-btn-area">
          <div className="py-2">
            <button
              type="button"
              className="rounded w-40 h-11 shadow-md text-sm font-semibold py-2 px-2 flex items-center"
              onClick={() => {
                toast.success('success strawberry toast');
              }}
            >
              <Image className="mr-3" src={'/success.svg'} alt="success svg" width={18} height={18} />
              success
            </button>
          </div>
          <div className="py-2">
            <button
              className="rounded w-40 h-11 shadow-md text-sm font-semibold py-2 px-2 flex items-center"
              onClick={() => {
                toast.error('error strawberry toast');
              }}
            >
              <Image className="mr-3" src={'/error.svg'} alt="error svg" width={18} height={18} />
              error
            </button>
          </div>
          <div className="py-2">
            <button
              className="rounded w-40 h-11 shadow-md text-sm font-semibold py-2 px-2 flex items-center"
              onClick={() => {
                toast.warn('warn strawberry toast');
              }}
            >
              <Image className="mr-3" src={'/warn.svg'} alt="warn svg" width={18} height={18} />
              warn
            </button>
          </div>
          <div className="py-2">
            <button
              className="rounded w-40 h-11 shadow-md text-sm font-semibold py-2 px-2 flex items-center"
              onClick={() => {
                const promise = new Promise((resolve, reject) => {
                  const func = Math.floor(Math.random() * 100) & 2 ? resolve : reject;
                  setTimeout(func, 3_000);
                });

                toast.promise(promise, {
                  loading: 'loading',
                  success: 'success',
                  error: 'error',
                });
              }}
            >
              <Image className="mr-3" src={'/promise.svg'} alt="promise svg" width={18} height={18} />
              promise
            </button>
          </div>
          <div className="py-2">
            <button
              className="rounded w-40 h-11 shadow-md text-sm font-semibold py-2 px-2 flex items-center"
              onClick={() => {
                toast.success('success strawberry toast');
              }}
            >
              <Image
                className="mr-3"
                src={'/custom.svg'}
                alt="custom toast code svg"
                width={18}
                height={18}
              />
              custom
            </button>
          </div>
        </div>

        <div id="option-area" />
      </div>

      <ToastContainer />
      <footer className="py-10" />
    </>
  );
}
