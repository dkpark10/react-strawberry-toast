import React, { useEffect } from 'react';
import { Condition, If, Else } from './condition';
import { getAnimation } from '../utils/get-animation';
import { toast as strawBerryToast } from '../core/toast';
import { DISAPPEAR_TIMEOUT, MAX_TIMEOUT } from '../constants';
import { DefaultToast, ToastStatusIcons } from './toast-default';
import type { ToastState } from '../core/types';
import '../styles/index.scss';

interface ToasterProps {
  toast: ToastState;
}

export function Toast({ toast }: ToasterProps) {
  const animationClassName = getAnimation({ isVisible: toast.isVisible, position: toast.position });

  const Icon = ToastStatusIcons[toast.toastStatus];

  const content =
    typeof toast.data === 'function'
      ? toast.data({
          close: () => strawBerryToast.disappear(toast.toastId, 0),
          immediatelyClose: () => {
            strawBerryToast.disappear(toast.toastId, 0);
            strawBerryToast.remove(toast.toastId, 0);
          },
          icon: <Icon />,
          isVisible: toast.isVisible,
        })
      : toast.data;

  const onMouseEnter = () => {
    if (toast.pauseOnHover) {
      strawBerryToast.pause(toast.toastId);
    }
  };

  const onMouseLeave = () => {
    if (toast.pauseOnHover) {
      strawBerryToast.resume(toast.toastId);
    }
  };

  /** @description disappear after mount */
  useEffect(() => {
    if (!strawBerryToast.isActive(toast.toastId)) {
      strawBerryToast.disappear(toast.toastId, toast.timeOut);
    }
  }, [toast.toastId]);

  /** @description promise toast */
  useEffect(() => {
    if (toast.updated !== undefined) {
      const newTimeOut = toast.timeOut >= MAX_TIMEOUT ? DISAPPEAR_TIMEOUT : toast.timeOut;
      strawBerryToast.disappear(toast.toastId, newTimeOut);
    }
  }, [toast.updated]);

  return (
    <div
      role="alert"
      data-testid={`container-${toast.containerId}`}
      className={typeof toast.data === 'function' ? '' : animationClassName}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Condition condition={typeof toast.data === 'function'}>
        {/** custom component not styling */}
        <If>{content}</If>
        <Else>
          <DefaultToast status={toast.toastStatus}>{content}</DefaultToast>
        </Else>
      </Condition>
    </div>
  );
}
