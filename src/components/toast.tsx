import React, { useEffect } from 'react';
import { Condition, If, Else } from './condition';
import { getAnimation } from '../utils/get-animation';
import { toast } from '../core/toast';
import { DISAPPEAR_TIMEOUT, MAX_TIMEOUT } from '../constants';
import { DefaultToast, ToastTypeIcons } from './toast-default';
import type { NonHeadlessToastState as ToastState } from '../types';
import '../styles/style.scss';

interface ToasterProps {
  toastProps: ToastState;
  style: React.CSSProperties;
}

export function Toast({ toastProps, ...rest }: ToasterProps) {
  const animationClassName = getAnimation({
    isVisible: toastProps.isVisible,
    position: toastProps.position!,
  });

  const content =
    typeof toastProps.data === 'function'
      ? toastProps.data({
          close: () => toast.disappear(toastProps.toastId, 0),
          immediatelyClose: () => {
            toast.disappear(toastProps.toastId, 0);
            toast.remove(toastProps.toastId, 0);
          },
          icons: {
            success: <ToastTypeIcons.success />,
            error: <ToastTypeIcons.error />,
            warn: <ToastTypeIcons.warn />,
            loading: <ToastTypeIcons.loading />,
          },
          isVisible: toastProps.isVisible,
        })
      : toastProps.data;

  const onMouseEnter = () => {
    if (toastProps.pauseOnHover) {
      toast.pause(toastProps.toastId);
    }
  };

  const onMouseLeave = () => {
    if (toastProps.pauseOnHover) {
      toast.resume(toastProps.toastId);
    }
  };

  /** @description disappear after mount */
  useEffect(() => {
    if (!toast.isActive(toastProps.toastId)) {
      toast.setActive(toastProps.toastId);
      toast.disappear(toastProps.toastId, toastProps.timeOut);
    }
  }, [toastProps.toastId]);

  /** @description promise toast */
  useEffect(() => {
    if (toastProps.updated !== undefined) {
      const newTimeOut = toastProps.timeOut >= MAX_TIMEOUT ? DISAPPEAR_TIMEOUT : toastProps.timeOut;
      toast.disappear(toastProps.toastId, newTimeOut);
    }
  }, [toastProps.updated]);

  return (
    <div
      role="alert"
      data-testid={`container-${toastProps.containerId}`}
      className={toastProps.toastType === 'custom' ? '' : animationClassName}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      <Condition condition={toastProps.toastType !== 'custom'}>
        <If>
          <DefaultToast status={toastProps.toastType}>{content}</DefaultToast>
        </If>
        <Else>{content}</Else>
      </Condition>
    </div>
  );
}
