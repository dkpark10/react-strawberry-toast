/** @jsxImportSource @emotion/react */
'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { ToastContainer, toast, type Position } from '@react-strawberry-toast/src';
import AssetImage from '@/components/asset-image';
import { PrismLight } from 'react-syntax-highlighter';
import { codeSyntax } from '@/constants/code-syntax';
import { CodeTheme } from '@/constants/code-theme';
import { primaryBlack } from '@/constants/style-variable';
import SuccessSvg from '/public/success.svg';
import ErrorSvg from '/public/error.svg';
import WarnSvg from '/public/warn.svg';
import InfoSvg from '/public/info.svg';
import PromiseSvg from '/public/promise.svg';
import EmotionProvider from '@/components/providers/emotion-provider';

type ExampleToastType = 'Success' | 'Warn' | 'Error' | 'Promise' | 'TailwindCSS' | 'Emotion' | 'Dark Theme' | 'Info';

export default function HomePlayGround() {
  const [position, setPosition] = useState<Position>('top-center');

  const [toastCode, setToastCode] = useState(codeSyntax.success);

  const [reverse, setReverse] = useState(false);

  const [gap, setGap] = useState(9);

  const examples: Array<{ type: ExampleToastType; icon: any | string; click: () => void }> = [
    {
      type: 'Success',
      icon: <SuccessSvg />,
      click: () => {
        setToastCode(codeSyntax.success);
        toast.success('success', {
          position,
        });
      },
    },
    {
      type: 'Error',
      icon: <ErrorSvg />,
      click: () => {
        setToastCode(codeSyntax.error);
        toast.error('error', {
          position,
        });
      },
    },
    {
      type: 'Warn',
      icon: <WarnSvg />,
      click: () => {
        setToastCode(codeSyntax.warn);
        toast.warn('warn', {
          position,
        });
      },
    },
    {
      type: 'Info',
      icon: <InfoSvg />,
      click: () => {
        setToastCode(codeSyntax.info);
        toast.info('info', {
          position,
        });
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
          {
            position,
          }
        );
      },
    },
    {
      type: 'Dark Theme',
      icon: '/dark-theme.png',
      click: () => {
        setToastCode(codeSyntax.darkTheme);

        toast('Dark Theme', {
          position,
          style: {
            color: 'white',
            backgroundColor: primaryBlack,
            border: '1px solid white'
          },
        });
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
          {
            position,
          }
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
          {
            position,
          }
        );
      },
    },
  ];

  const optionButtonClassName = (bool: boolean) =>
    `${clsx(
      bool && 'bg-straw-berry text-white'
    )} max-sm:text-xs rounded w-full max-sm:w-full h-10 shadow-md text-sm font-medium
   py-2 px-2 flex items-center justify-center hover:bg-straw-berry hover:text-white`;

  return (
    <EmotionProvider>
      <h3 className="font-bold text-2xl text-center sm:py-5">Example</h3>

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

        <div id="option-area" >
          <div className="grid gap-4 grid-cols-3 w-full">
            {['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'].map(
              (p) => (
                <button
                  key={p}
                  type="button"
                  className={optionButtonClassName(position === p)}
                  onClick={() => setPosition(p as Position)}
                >
                  {p}
                </button>
              )
            )}
          </div>

          <div id="reverse-gap" className="pt-4 flex gap-5">
            <button
              type="button"
              className={optionButtonClassName(reverse)}
              onClick={() => setReverse((prev) => !prev)}
            >
              reverse
            </button>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm">gap</span>
              <input
                value={gap}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) return;
                  setGap(Number(e.target.value));
                }}
                className="w-full border-2 border-gray-300 h-full rounded-md pl-1"
                type="text"
              />
            </div>
          </div>

          <div className="pt-5 sm:pt-10 sm:w-[480px]">
            <PrismLight language="jsx" style={CodeTheme}>
              {`
  <ToastContainer reverse={${reverse}} gap={${gap}} />  
              `}
            </PrismLight>
          </div>
        </div>
      </div>

      <div id="code-area" className="flex justify-center py-8 text-sm">
        <PrismLight language="jsx" style={CodeTheme}>
          {toastCode}
        </PrismLight>
      </div>

      <ToastContainer reverse={reverse} gap={gap} />
    </EmotionProvider>
  );
}
