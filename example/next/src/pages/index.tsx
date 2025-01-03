import Head from 'next/head';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import clsx from 'clsx';
import Code from '@/components/code';
import Github from '@/components/github';
import {
  ToastContainer,
  toast,
  type Position,
  type NonHeadlessToastState as ToastState,
} from 'react-strawberry-toast';
// import { ToastContainer, toast, type Position, type ToastState } from '../../../../src';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeTheme } from '@/constants/code-theme';
import 'react-strawberry-toast/dist/index.css';

const packagesName = ['npm', 'yarn', 'pnpm'] as const;

const containerIds = Array.from({ length: 6 }, (_, i) => String(i + 1));

export default function Home() {
  const [option, setOption] = useState<Position | '1' | '2' | '3' | '4' | '5' | '6'>('top-center');

  const [toastCode, setToastCode] = useState(
    `


                   toast.success('success');                 


                `
  );

  const pos =
    /top/i.test(option) || /bottom/i.test(option)
      ? ({ position: option } as ToastState)
      : ({ containerId: option } as ToastState);

  const examples = [
    {
      type: 'success',
      click: () => {
        setToastCode(`


                   toast.success('success');                 


                `);
        toast.success('success', pos,);
      },
    },
    {
      type: 'error',
      click: () => {
        setToastCode(`


                    toast.error('error');                    


                `);
        toast.error('error', pos);
      },
    },
    {
      type: 'warn',
      click: () => {
        setToastCode(`


                    toast.warn('warn');                      


                `);
        toast.warn('warn', pos);
      },
    },
    {
      type: 'promise',
      click: () => {
        setToastCode(`
                  toast.promise(promise, {
                    loading: 'loading',                      
                    success: 'success',
                    error: 'error',
                  });                     
                `);

        const promise = new Promise((resolve, reject) => {
          const func = Math.floor(Math.random() * 100) & 2 ? resolve : reject;
          setTimeout(func, 3_000);
        });

        toast.promise(
          promise,
          {
            loading: 'loading',
            success: 'success',
            error: 'error',
          },
          pos
        );
      },
    },
    {
      type: 'custom',
      click: () => {
        setToastCode(`
toast(
  ({ close, isVisible }) => (
    <div
      className={${'`'}
        ${"${isVisible ? 'react-strawberry-toast__fade-in' : 'react-strawberry-toast__fade-out'}"}
        bg-white p-4 flex justify-between gap-2 rounded-sm shadow-xl
      ${'`'}}
    >
      <span>custom toast</span>
      <button type="button" className="bg-straw-berry text-white w-6 h-6 rounded-sm" onClick={close}>
        X
      </button>
    </div>
  )
);
        `);

        toast(
          ({ close, isVisible }) => (
            <div
              className={`${
                isVisible
                  ? 'react-strawberry-toast__fade-in'
                  : 'react-strawberry-toast__fade-out'
              } bg-white p-4 flex justify-between gap-2 rounded-sm shadow-xl`}
            >
              <span>custom toast</span>
              <button type="button" className="bg-straw-berry text-white w-6 h-6 rounded-sm" onClick={close}>
                X
              </button>
            </div>
          ),
          pos,
        );
      },
    },
  ];

  const optionButtonClassName = (bool: boolean) =>
    `${clsx(
      bool && 'bg-straw-berry text-white'
    )} active:bg-straw-berry active:text-white rounded w-36 h-10 shadow-md text-sm font-medium
   py-2 px-2 flex items-center justify-center hover:bg-straw-berry hover:text-white`;

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
          {`   import { ToastContainer, toast } from 'react-strawberry-toast';    
   import 'react-strawberry-toast/dist/style.css';

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

      <h3 className="font-bold text-2xl text-center py-5">container</h3>

      <div className="flex justify-center pb-8">
        <div id="container-area" className="grid gap-x-24 gap-y-4 grid-cols-3">
          {containerIds.map((id) => (
            <div key={id}>
              <ToastContainer containerId={id} />
              <span className="text-white font-semibold flex items-center justify-center w-52 h-8 bg-straw-berry shadow-lg">
                {id}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="gap-12 py-10 flex justify-center">
        <div id="toast-example-btn-area" className="flex flex-col justify-between">
          {examples.map((example) => (
            <div key={example.type}>
              <button
                type="button"
                className="rounded w-40 h-11 shadow-md text-sm font-semibold py-2 px-2 flex items-center"
                onClick={example.click}
              >
                <Image
                  className="mr-3"
                  src={`/${example.type}.svg`}
                  alt={`${example.type} svg icon`}
                  width={18}
                  height={18}
                />
                {example.type}
              </button>
            </div>
          ))}
        </div>

        <div id="option-area">
          <h5 className="font-semibold text-center text-md pb-4">position</h5>
          <div className="grid gap-4 grid-cols-3">
            {['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'].map(
              (p) => (
                <button
                  key={p}
                  type="button"
                  className={optionButtonClassName(option === p)}
                  onClick={() => setOption(p as Position)}
                >
                  {p}
                </button>
              )
            )}
          </div>

          <h5 className="font-semibold text-center text-md p-7">container ID</h5>
          <div className="grid gap-4 grid-cols-3">
            {containerIds.map((p) => (
              <button
                key={p}
                type="button"
                className={optionButtonClassName(option === p)}
                onClick={() => setOption(p as Position)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div id="code-area" className="flex justify-center py-8 text-sm">
        <SyntaxHighlighter language="jsx" style={CodeTheme}>
          {toastCode}
        </SyntaxHighlighter>
      </div>

      <ToastContainer />
    </>
  );
}
