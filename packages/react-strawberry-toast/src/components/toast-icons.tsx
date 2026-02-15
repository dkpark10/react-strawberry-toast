import { type ReactNode } from 'react';
import { STYLE_NAMESPACE } from '../constants';
import type { ToastType } from '../types';

function SuccessSvg() {
  return (
    <svg
      stroke="none"
      fill="none"
      strokeWidth="2"
      viewBox="2 2 20 20"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path
        className="react-strawberry-toast-path"
        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
        strokeWidth="0"
        fill="var(--toast-color-success)"
      />
    </svg>
  );
}

function InfoSvg({ fill }: { fill: string }) {
  return (
    <svg
      stroke="none"
      fill={fill}
      strokeWidth="2"
      viewBox="2 2 20 20"
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="react-strawberry-toast-path"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
      ></path>
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
      <path
        className="react-strawberry-toast-path"
        d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"
      ></path>
    </svg>
  );
}

export function CloseSvg() {
  return (
    <svg
      fill="#8b8b8b"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="14"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="react-strawberry-toast-path"
        d="M400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"
      ></path>
    </svg>
  );
}

export const ToastTypeIcons: Record<Exclude<ToastType, 'custom' | 'default'>, ReactNode> = {
  success: <SuccessSvg />,
  error: <InfoSvg fill='var(--toast-color-error)' />,
  loading: <div className={`${STYLE_NAMESPACE}__loading`} />,
  warn: <WarnSvg />,
  info: <InfoSvg fill='var(--toast-color-info)' />,
};
