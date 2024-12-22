import React, { type PropsWithChildren, useState, useEffect } from 'react';
import { getAnimation } from '../utils/get-animation';
import { MAX_TIMEOUT } from '../constants';
import { toast as strawBerryToast } from '../core/toast';
import { Coord, ToastState } from '../core/types';

interface ToastAbsoluteContainerProps {
  toast: ToastState;
}

export function ToastAbsolute({ children, toast }: PropsWithChildren & ToastAbsoluteContainerProps) {
  if (!toast.element) {
    throw new Error('Element does not exist.');
  }

  const animationClassName = getAnimation({ isVisible: toast.isVisible, position: toast.position });

  const [coord] = useState<Coord>(() => {
    const clientRect = toast.element!.getBoundingClientRect();
    return { y: clientRect.y, x: clientRect.x };
  });

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
      role="alert"
      className={animationClassName} 
      style={{
        position: 'absolute',
        top: `${coord.y}px`,
        left: `${coord.x}px`,
      }}
    >
      {children}
    </div>
  );
}
