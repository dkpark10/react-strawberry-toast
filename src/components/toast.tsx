import { useEffect, forwardRef } from 'react';
import { Condition, If, Else } from './condition';
import { getAnimation } from '../utils/get-animation';
import { toast } from '../core/toast';
import { DISAPPEAR_TIMEOUT, MAX_TIMEOUT, STYLE_NAMESPACE } from '../constants';
import { useEventListener } from '../hooks/use-event-listener';
import { ToastTypeIcons } from './toast-icons';
import type { Position, NonHeadlessToastState as ToastState } from '../types';

interface ToasterProps {
  toastProps: ToastState;
  pauseOnActivate: boolean;
}

export const Toast = forwardRef<HTMLDivElement, ToasterProps>(function Toast(
  { toastProps, pauseOnActivate },
  elementRef
) {
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
    data: content,
    pauseOnHover,
    align,
  } = toastProps;

  const animationClassName = getAnimation({
    isVisible: isVisible,
    position: position!,
  });

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

  const focusHandler = () => {
    if (!pauseOnActivate) return;
    toast.resume(toastId);
  };

  const blurHandler = () => {
    if (!pauseOnActivate) return;
    toast.pause(toastId);
  };

  useEventListener('focus', focusHandler);
  useEventListener('blur', blurHandler);

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
      ref={elementRef}
      className={`${STYLE_NAMESPACE}__toast-content-container`}
      data-testid={`container-${containerId || 'default'}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={toastClassName}>
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
    </div>
  );
});
