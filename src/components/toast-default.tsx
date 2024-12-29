import React, { type PropsWithChildren } from 'react';
import { STYLE_NAMESPACE } from '../constants';
// import SuccessSvg from '../../public/assets/success.svg?react';
// import ErrorSvg from '../../public/assets/error.svg?react';
// import WarnSvg from '../../public/assets/warn.svg?react';
import type { ToastType } from '../core/types';

/** @todo svg component after deploy */
function SuccessSvg() {
  return (
    <svg
      stroke="none"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 22 22"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path
        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
        strokeWidth="0"
        fill="#1ab173"
      />
    </svg>
  );
}

function ErrorSvg() {
  return (
    <svg
      stroke="none"
      fill="#eb2639"
      strokeWidth="2"
      viewBox="0 0 22 22"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
    </svg>
  );
}

function WarnSvg() {
  return (
    <svg
      stroke="none"
      fill="#fcba03"
      strokeWidth="0"
      viewBox="0 0 1024 1024"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path>
    </svg>
  );
}

export const ToastTypeIcons: Record<ToastType, any> = {
  success: SuccessSvg,
  error: ErrorSvg,
  loading: () => <div className={`${STYLE_NAMESPACE}__loading`} />,
  warn: WarnSvg,
};

interface DefaultToastProps {
  status: ToastType;
}

export function DefaultToast({ status, children }: DefaultToastProps & PropsWithChildren) {
  const Icon = ToastTypeIcons[status];

  return (
    <div
      style={{
        boxSizing: 'border-box',
        backgroundColor: 'white',
        padding: '12px 14px 12px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        borderRadius: 8,
        boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.1)',
        height: 44,
      }}
    >
      <Icon />
      {children}
    </div>
  );
}
