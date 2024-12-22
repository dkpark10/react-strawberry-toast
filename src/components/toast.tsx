import React, { useEffect } from 'react';
import { DefaultToast, ToastStatusIcons } from './toast-default';
import { Condition, If, Else } from './condition';
import { getAnimation } from '../utils/get-animation';
import { toast as strawBerryToast } from '../core/toast';
import { MAX_TIMEOUT } from '../constants';
import type { ToastState } from '../core/types';

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

  useEffect(() => {
    if (!strawBerryToast.isActive(toast.toastId)) {
      strawBerryToast.disappear(toast.toastId, toast.timeOut);
    }
  }, [toast.toastId]);

  useEffect(() => {
    if (toast.updated !== undefined) {
      const newTimeOut = toast.timeOut >= MAX_TIMEOUT ? 2_000 : toast.timeOut;
      strawBerryToast.disappear(toast.toastId, newTimeOut);
    }
  }, [toast.updated]);

  return (
    <div
      className={animationClassName}
      role="alert"
      onMouseEnter={() => strawBerryToast.pause(toast.toastId)}
      onMouseLeave={() => strawBerryToast.resume(toast.toastId)}
    >
      <Condition condition={typeof toast.data === 'function'}>
        {/** custom component not styling */}
        <If>{content}</If>
        <Else>
          <DefaultToast icon={<Icon />}>{content}</DefaultToast>
        </Else>
      </Condition>
    </div>
  );
}
