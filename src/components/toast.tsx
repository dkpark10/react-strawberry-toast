import React, { useEffect, type PropsWithChildren } from 'react';
import { getAnimation } from '../utils/get-animation';
import { toast as strawBerryToast } from '../core/toast';
import { MAX_TIMEOUT } from '../constants';
import type { ToastState } from '../core/types';

interface ToasterProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  toast: ToastState;
}

export function Toast({ children, toast, ...rest }: ToasterProps & PropsWithChildren) {
  const animationClassName = getAnimation({ isVisible: toast.isVisible, position: toast.position });

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
    <div className={animationClassName} role="alert" {...rest}>
      {children}
    </div>
  );
}
