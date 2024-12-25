import Head from 'next/head';
import React, { useState } from 'react';
import Link from 'next/link';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Code from '@/components/code';
import Github from '@/components/github';
import { ToastContainer, toast, type Position } from '../../../../src';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';

const packagesName = ['npm', 'yarn', 'pnpm'] as const;

export default function Home() {
  const [pos, setPos] = useState<Position>('top-center');

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

      <h3 className="font-bold text-lg text-center pb-4">playground</h3>
      <div id="playground-area" className="flex justify-center">
        <div>
          {['success', 'error', 'warn', 'promise', 'custom'].map(
            (status) => (
              <button
                key={status}
                className="text-center rounded-md bg-white w-36 h-11 shadow-md"
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
