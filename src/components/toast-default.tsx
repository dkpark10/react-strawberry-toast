import React, { type PropsWithChildren } from 'react';
import { STYLE_NAMESPACE } from '../constants';
import SuccessSvg from '../../public/assets/success.svg?react';
import ErrorSvg from '../../public/assets/error.svg?react';
import WarnSvg from '../../public/assets/warn.svg?react';
import type { ToastStatus } from '../core/types';

export const ToastStatusIcons: Record<ToastStatus, any> = {
  success: SuccessSvg,
  error: ErrorSvg,
  loading: () => <div className={`${STYLE_NAMESPACE}__loading`} />,
  warn: WarnSvg,
};

interface DefaultToastProps {
  status: ToastStatus;
}

export function DefaultToast({ status, children }: DefaultToastProps & PropsWithChildren) {
  const Icon = ToastStatusIcons[status];

  return (
    <div
      style={{
        boxSizing: 'border-box',
        backgroundColor: 'white',
        padding: '12px 12px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 8,
        boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.1)',
        height: 44,
      }}
    >
      <Icon />
      <div
        style={{
          margin: '0px 5px',
        }}
      >
        {children}
      </div>
    </div>
  );
}
