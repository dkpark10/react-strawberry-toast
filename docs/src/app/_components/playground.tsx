/** @jsxImportSource @emotion/react */
'use client';

import { useState } from 'react';
import clsx from 'clsx';
import {
  ToastContainer,
  toast,
  type Position,
  type NonHeadlessToastState as ToastState,
} from 'react-strawberry-toast';
import AssetImage from '@/components/asset-image';
import { PrismLight } from 'react-syntax-highlighter';
import { codeSyntax } from '@/constants/code-syntax';
import { CodeTheme } from '@/constants/code-theme';
import SuccessSvg from '/public/success.svg';
import ErrorSvg from '/public/error.svg';
import WarnSvg from '/public/warn.svg';
import PromiseSvg from '/public/promise.svg';
import EmotionProvider from '@/components/providers/emotion-provider';

const containerIds = Array.from({ length: 6 }, (_, i) => String(i + 1));

type ExampleToastType = 'Success' | 'Warn' | 'Error' | 'Promise' | 'TailwindCSS' | 'Emotion';

export default function HomePlayGround() {
  const [option, setOption] = useState<Position | '1' | '2' | '3' | '4' | '5' | '6'>('top-center');

  const [toastCode, setToastCode] = useState(codeSyntax.success);

  const pos =
    /top/i.test(option) || /bottom/i.test(option)
      ? ({ position: option } as ToastState)
      : ({ containerId: option } as ToastState);

  const examples: Array<{ type: ExampleToastType; icon: any | string; click: () => void }> = [
    {
      type: 'Success',
      icon: <SuccessSvg />,
      click: () => {
        setToastCode(codeSyntax.success);
        toast.success('success', pos);
      },
    },
    {
      type: 'Error',
      icon: <ErrorSvg />,
      click: () => {
        setToastCode(codeSyntax.error);
        toast.error('error', pos);
      },
    },
    {
      type: 'Warn',
      icon: <WarnSvg />,
      click: () => {
        setToastCode(codeSyntax.warn);
        toast.warn('warn', pos);
      },
    },
    {
      type: 'Promise',
      icon: <PromiseSvg />,
      click: () => {
        setToastCode(codeSyntax.promise);

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
      type: 'TailwindCSS',
      icon: '/tailwindcss.png',
      click: () => {
        setToastCode(codeSyntax.tailwindCss);

        toast(
          ({ close }) => (
            <div className="bg-white p-2 flex justify-between gap-2 rounded-sm">
              <span>tailwind css toast</span>
              <button type="button" className="bg-red-500 text-white w-6 h-6 rounded-sm" onClick={close}>
                X
              </button>
            </div>
          ),
          pos
        );
      },
    },
    {
      type: 'Emotion',
      icon: '/emotion.png',
      click: () => {
        setToastCode(codeSyntax.emotion);

        toast(
          ({ close }) => (
            <div>
              <span css={{ color: 'red' }}>💅 emotion toast </span>
              <button
                type="button"
                css={{ border: '1px solid white', width: 28, height: 28 }}
                onClick={close}
              >
                X
              </button>
            </div>
          ),
          pos
        );
      },
    },
  ];

  const optionButtonClassName = (bool: boolean) =>
    `${clsx(
      bool && 'bg-straw-berry text-white'
    )} active:bg-straw-berry active:text-white max-sm:text-xs rounded w-36 max-sm:w-full h-10 shadow-md text-sm font-medium
   py-2 px-2 flex items-center justify-center hover:bg-straw-berry hover:text-white`;

  return (
    <EmotionProvider>
      <h3 className="font-bold text-2xl text-center sm:py-5">Example</h3>

      <div className="flex justify-center pb-8 max-sm:hidden">
        <div id="container-area" className="grid gap-x-16 gap-y-4 grid-cols-3">
          {containerIds.map((id) => (
            <div key={id} className="relative">
              <ToastContainer containerId={id} className="absolute flex" />
              <span className="font-semibold flex items-center justify-center w-52 h-8 shadow-md">{id}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="gap-12 py-10 justify-center sm:flex">
        <div
          id="toast-example-btn-area"
          className="flex flex-col justify-between max-sm:pb-6 gap-2 max-sm:grid max-sm:grid-cols-2"
        >
          {examples.map((example) => (
            <div key={example.type}>
              <button
                type="button"
                className="rounded w-40 h-11 shadow-md text-sm font-semibold py-2 px-2 gap-2 items-center flex max-sm:w-full"
                onClick={example.click}
              >
                {typeof example.icon === 'string' ? (
                  <AssetImage src={example.icon} width={20} height={20} alt={`${example.type} icon`} />
                ) : (
                  example.icon
                )}
                {example.type}
              </button>
            </div>
          ))}
        </div>

        <div id="option-area">
          <h5 className="font-semibold text-center text-md pb-4">Position</h5>
          <div className="grid gap-2 grid-cols-3">
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

          <h5 className="font-semibold text-center text-md p-7 max-sm:hidden">Container id</h5>
          <div className="grid gap-4 grid-cols-3 max-sm:hidden">
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
        <PrismLight language="jsx" style={CodeTheme}>
          {toastCode}
        </PrismLight>
      </div>
    </EmotionProvider>
  );
}
