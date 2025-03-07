import { useEffect, forwardRef } from 'react';
import { Condition, If, Else } from './condition';
import { getAnimation } from '../utils/get-animation';
import { toast } from '../core/toast';
import { STYLE_NAMESPACE } from '../constants';
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
      toast.disappear(toastId, timeOut);
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

  const toastAlignClassName = `${STYLE_NAMESPACE}__toast${align ? `-${align}` : toastPosition}`;

  return (
    <div
      role="alert"
      ref={elementRef}
      className={`${STYLE_NAMESPACE}__toast-content-container`}
      data-testid={`container-${containerId || 'default'}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`${toastAlignClassName} ${!toast.isActive(toastId) ? animationClassName : ''}`}>
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
