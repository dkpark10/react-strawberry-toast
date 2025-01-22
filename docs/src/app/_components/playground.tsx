'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import {
  ToastContainer,
  toast,
  type Position,
  type NonHeadlessToastState as ToastState,
} from 'react-strawberry-toast';
import { PrismLight } from 'react-syntax-highlighter';
import { codeSyntax} from '@/constants/code-syntax';
import { CodeTheme } from '@/constants/code-theme';
import SuccessSvg from '/public/success.svg';
import ErrorSvg from '/public/error.svg';
import WarnSvg from '/public/warn.svg';
import PromiseSvg from '/public/promise.svg';
import CustomSvg from '/public/custom.svg';

const containerIds = Array.from({ length: 6 }, (_, i) => String(i + 1));

type IconType = 'success' | 'warn' | 'error' | 'promise' | 'custom';

const Icons: Record<IconType, any> = {
  success: <SuccessSvg />,
  error: <ErrorSvg />,
  warn: <WarnSvg />,
  promise: <PromiseSvg />,
  custom: <CustomSvg />,
};

export default function HomePlayGround() {
  const [option, setOption] = useState<Position | '1' | '2' | '3' | '4' | '5' | '6'>('top-center');

  const [toastCode, setToastCode] = useState(codeSyntax.success);

  const pos =
    /top/i.test(option) || /bottom/i.test(option)
      ? ({ position: option } as ToastState)
      : ({ containerId: option } as ToastState);

  const examples: Array<{ type: IconType; click: () => void }> = [
    {
      type: 'success',
      click: () => {
        setToastCode(codeSyntax.success);
        toast.success('success', pos);
      },
    },
    {
      type: 'error',
      click: () => {
        setToastCode(codeSyntax.error);
        toast.error('error', pos);
      },
    },
    {
      type: 'warn',
      click: () => {
        setToastCode(codeSyntax.warn);
        toast.warn('warn', pos);
      },
    },
    {
      type: 'promise',
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
      type: 'custom',
      click: () => {
        setToastCode(codeSyntax.custom);

        toast(
          ({ close, isVisible }) => (
            <div
              className={`${
                isVisible ? 'react-strawberry-toast__fade-in' : 'react-strawberry-toast__fade-out'
              } bg-white p-2 flex justify-between gap-2 rounded-sm`}
            >
              <span>custom toast</span>
              <button type="button" className="bg-straw-berry text-white w-6 h-6 rounded-sm" onClick={close}>
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
    )} active:bg-straw-berry active:text-white max-sm:text-xs rounded w-36 max-sm:w-28 h-10 shadow-md text-sm font-medium
   py-2 px-2 flex items-center justify-center hover:bg-straw-berry hover:text-white`;

  return (
    <>
      <h3 className="font-bold text-2xl text-center sm:py-5">example</h3>

      <div className="flex justify-center pb-8 max-sm:hidden">
        <div id="container-area" className="grid gap-x-16 gap-y-4 grid-cols-3">
          {containerIds.map((id) => (
            <div key={id}>
              <ToastContainer containerId={id} />
              <span className="font-semibold flex items-center justify-center w-52 h-8 shadow-md">{id}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="gap-12 py-10 justify-center sm:flex">
        <div id="toast-example-btn-area" className="flex flex-col justify-between max-sm:pb-6 max-sm:grid max-sm:grid-cols-2">
          {examples.map((example) => (
            <div key={example.type}>
              <button
                type="button"
                className="rounded w-40 h-11 shadow-md text-sm font-semibold py-2 px-2 gap-2 items-center flex max-sm:w-36"
                onClick={example.click}
              >
                {Icons[example.type]}
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

          <h5 className="font-semibold text-center text-md p-7 max-sm:hidden">container ID</h5>
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
    </>
  );
}
