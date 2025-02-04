import React, { useEffect } from 'react';
import { Condition, If, Else } from './condition';
import { getAnimation } from '../utils/get-animation';
import { toast } from '../core/toast';
import { DISAPPEAR_TIMEOUT, MAX_TIMEOUT, STYLE_NAMESPACE } from '../constants';
import { ToastTypeIcons } from './toast-icons';
import type { Position, NonHeadlessToastState as ToastState } from '../types';

interface ToasterProps {
  toastProps: ToastState;
  pauseOnActivate: boolean;
}

export function Toast({ toastProps, pauseOnActivate }: ToasterProps) {
  const { toastId, isVisible, timeOut, containerId, updated, toastType, position, data, pauseOnHover } =
    toastProps;

  const animationClassName = getAnimation({
    isVisible: isVisible,
    position: position!,
  });

  const content =
    typeof data === 'function'
      ? data({
          toastId,
          close: () => toast.disappear(toastId, 0),
          immediatelyClose: () => {
            toast.disappear(toastId, 0);
            toast.remove(toastId, 0);
          },
          icons: {
            success: <ToastTypeIcons.success />,
            error: <ToastTypeIcons.error />,
            warn: <ToastTypeIcons.warn />,
            loading: <ToastTypeIcons.loading />,
          },
          isVisible: isVisible,
        })
      : data;

  const onMouseEnter = () => {
    if (pauseOnHover) {
      toast.pause(toastId);
    }
  };

  const onMouseLeave = () => {
    if (pauseOnHover) {
      toast.resume(toastId);
    }
  };

  useEffect(() => {
    if (!pauseOnActivate) return;
    const focusHandler = () => {
      toast.resume(toastId);
    };

    const blurHandler = () => {
      toast.pause(toastId);
    };

    window.addEventListener('focus', focusHandler);
    window.addEventListener('blur', blurHandler);
    return () => {
      window.removeEventListener('focus', focusHandler);
      window.removeEventListener('blur', blurHandler);
    };
  }, []);

  /** @description disappear after mount */
  useEffect(() => {
    if (!toast.isActive(toastId)) {
      toast.setActive(toastId);
      toast.disappear(toastId, timeOut);
    }
  }, [toastId]);

  /** @description promise toast */
  useEffect(() => {
    if (updated !== null) {
      const newTimeOut = timeOut >= MAX_TIMEOUT ? DISAPPEAR_TIMEOUT : timeOut;
      toast.disappear(toastId, newTimeOut);
    }
  }, [updated]);

  const Icon = toastType === 'custom' || toastType === 'default' ? null : ToastTypeIcons[toastType];

  return (
    <div
      role="alert"
      className={`${STYLE_NAMESPACE}__toast${
        /center/i.test(position as Position) && !containerId ? '-center' : ''
      } ${toastType === 'custom' ? '' : animationClassName}`}
      data-testid={`container-${containerId}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Condition condition={toastType !== 'custom'}>
        <If>
          <div className={`${STYLE_NAMESPACE}__toast-content`}>
            {Icon && (
              <span className={`${STYLE_NAMESPACE}__toast-icon`}>
                <Icon />
              </span>
            )}
            {content}
          </div>
        </If>
        <Else>{content}</Else>
      </Condition>
    </div>
  );
}
