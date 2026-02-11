import { useEffect, useRef } from 'react';
import { Condition, If, Else } from './condition';
import { getAnimation } from '../utils/get-animation';
import { toast } from '../core/toast';
import { STYLE_NAMESPACE } from '../constants';
import { useEventListener } from '../hooks/use-event-listener';
import { ToastTypeIcons, CloseSvg } from './toast-icons';
import type { NonHeadlessToastState as ToastState } from '../types';

export interface OtherProps {
  gap: number;
  order: number;
  samePositionLists: Array<ToastState>;
  pauseOnActivate: boolean;
}

interface ToasterProps {
  toastProps: ToastState & OtherProps;
}

const heights = new Map<ToastState['toastId'], number>;

export function Toast({ toastProps }: ToasterProps) {
  const elementRef = useRef<HTMLOutputElement>(null);

  const {
    toastId,
    isVisible,
    timeOut,
    containerId,
    className,
    style: toastStyle,
    icon,
    pauseOnActivate,
    updated,
    toastType,
    position,
    data,
    pauseOnHover,
    closeButton,
    samePositionLists,
    gap,
    order,
    target,
  } = toastProps;

  const animationClassName = getAnimation({
    isVisible: isVisible,
    position,
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
          info: ToastTypeIcons.info,
        },
        isVisible,
      })
      : data;

  const focusHandler = () => {
    if (!pauseOnActivate) return;
    toast.resume(toastId);
  };

  const blurHandler = () => {
    if (!pauseOnActivate) return;
    toast.pause(toastId);
  };

  const resizeHandler = () => {
    if (target) {
      requestAnimationFrame(() => {
        if (elementRef.current) {
          const rect = target.element.getBoundingClientRect();
          const [x, y] = target.offset || [0, 0];
          elementRef.current!.style.top = `${rect.y + y + window.scrollY}px`;
          elementRef.current!.style.left = `${rect.x + x + window.scrollX}px`;
        }

      });
    }
  };

  useEventListener('focus', focusHandler);
  useEventListener('blur', blurHandler);
  useEventListener('resize', resizeHandler);

  useEffect(() => {
    /** @description disappear after mount */
    if (!toast.isActive(toastId)) {
      toast.setActive(toastId);
      toast.disappear(toastId, timeOut);
    }

    resizeHandler();
  }, [toastId]);

  /** @description calculate the position when the order of toasts changes */
  useEffect(() => {
    if (elementRef.current && !target) {
      const height = heights.get(toastId) || elementRef.current.getBoundingClientRect().height;
      heights.set(toastId, height);

      const x = /left/.test(position!) ? 50 : /center/.test(position!) ? 0 : -50;

      const limitIdx = /bottom/.test(position!) ? 0 : 1;

      const top = samePositionLists
        .filter((_, idx) => idx <= order - limitIdx)
        .reduce((acc, t) => {
          return /bottom/.test(position!)
            ? (acc -= gap + (heights.get(t.toastId) || 0))
            : (acc += gap + (heights.get(t.toastId) || 0));
        }, 0);

      elementRef.current.style.transition = 'transform 0.2s cubic-bezier(0.43, 0.14, 0.2, 1.05)';
      elementRef.current.style.transform = `translate(${x}%, ${top}px)`;
    }

    return () => {
      heights.delete(toastId);
    }
  }, [order]);

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

  return (
    <output
      role="status"
      ref={elementRef}
      className={`${STYLE_NAMESPACE}__toast-content-container`}
      data-testid={`container-${containerId || 'default'}`}
      aria-live={toastType === 'error' ? 'assertive' : 'polite'}
      tabIndex={0}
      onMouseEnter={() => {
        if (pauseOnHover) {
          toast.pause(toastId);
        }
      }}
      onMouseLeave={() => {
        if (pauseOnHover) {
          toast.resume(toastId);
        }
      }}
    >
      <Condition condition={toastType !== 'custom'}>
        <If>
          <div
            className={
              className ??
              `${STYLE_NAMESPACE}__toast-content ${STYLE_NAMESPACE}__toast-${toastType} ${!toast.isActive(toastId) ? animationClassName : ''
              }`
            }
            style={toastStyle}
          >
            {renderIcon && <span className={`${STYLE_NAMESPACE}__toast-icon`}>{renderIcon}</span>}
            {content}
            {closeButton && (
              <button
                aria-label='Close Toast Button'
                data-testid={`${toastId}__close-button`}
                className={`${STYLE_NAMESPACE}__close-button`}
                onClick={() => {
                  toast.disappear(toastId, 0);
                }}
                type="button"
              >
                <CloseSvg />
              </button>
            )}
          </div>
        </If>
        <Else>
          <div className={className ?? `${!toast.isActive(toastId) ? animationClassName : ''}`}>
            {content}
          </div>
        </Else>
      </Condition>
    </output>
  );
}
