import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import React, { type PropsWithChildren, type ReactNode } from 'react';
import type { ToastStatus } from '../core/types';

const ToastStatusWrapper = styled.div`
  box-sizing: border-box;
  background-color: white;
  padding: 12px 12px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  height: 44px;

  & .inner-content {
    margin: 0px 5px;
  }
`;

const downAnimation = css`
  @keyframes fade-in {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  animation: fade-in 0.3s ease-out;
`;

const upAnimation = css`
  @keyframes fade-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-100%);
      opacity: 0;
    }
  }
  animation: fade-out 0.3s ease-out;
`;

const LoadingContainer = styled.div`
  @keyframes l3 {
    to {
      transform: rotate(1turn);
    }
  }

  width: 11px;
  padding: 3px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #6b6875;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
`;

interface DefaultToastProps {
  isVisible: boolean;
  icon?: ReactNode;
}

export function DefaultToast({ icon, isVisible, children }: DefaultToastProps & PropsWithChildren) {
  const animation = isVisible ? downAnimation : upAnimation;

  return (
    <ToastStatusWrapper className={animation}>
      {icon}
      <div className="inner-content">{children}</div>
    </ToastStatusWrapper>
  );
}

function Success() {
  return (
    <svg
      stroke="none"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
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

function Error() {
  return (
    <svg
      stroke="none"
      fill="#eb2639"
      strokeWidth="2"
      viewBox="0 0 24 24"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
    </svg>
  );
}

function Loading() {
  return <LoadingContainer />;
}

export const ToastStatusIcons: Record<ToastStatus, () => ReactNode> = {
  default: () => <></>,
  success: Success,
  error: Error,
  loading: Loading,
  warn: Success,
};
