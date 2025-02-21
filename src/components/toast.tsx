import { useEffect } from 'react';
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
  const {
    toastId,
    isVisible,
    timeOut,
    containerId,
    className,
    style: toastStyle,
    icon,
    updated,
    toastType,
    position,
    data,
    pauseOnHover,
    align,
  } = toastProps;

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
            success: ToastTypeIcons.success,
            error: ToastTypeIcons.error,
            warn: ToastTypeIcons.warn,
            loading: ToastTypeIcons.loading,
          },
          isVisible,
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

  const renderIcon = icon
    ? icon
    : toastType === 'custom' || toastType === 'default'
    ? null
    : ToastTypeIcons[toastType];

  const toastPosition = /center/i.test(position as Position)
    ? '-center'
    : /left/i.test(position as Position)
    ? '-left'
    : '-right';

  const toastClassName =
    toastType === 'custom'
      ? ''
      : `${STYLE_NAMESPACE}__toast${align ? `-${align}` : toastPosition} ${animationClassName}`;

  return (
    <div
      role="alert"
      className={toastClassName}
      data-testid={`container-${containerId || 'default'}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Condition condition={toastType !== 'custom'}>
        <If>
          <div className={className || `${STYLE_NAMESPACE}__toast-content`} style={toastStyle}>
            {renderIcon && <span className={`${STYLE_NAMESPACE}__toast-icon`}>{renderIcon}</span>}
            {content}
          </div>
        </If>
        <Else>{content}</Else>
      </Condition>
    </div>
  );
}
