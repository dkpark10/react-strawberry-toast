import { useEffect, useRef, cloneElement, isValidElement } from 'react';
import { Condition, If, Else } from './condition';
import { getAnimation } from '../utils/get-animation';
import { toast } from '../core/toast';
import { STYLE_NAMESPACE } from '../constants';
import { useEventListener } from '../hooks/use-event-listener';
import { ToastTypeIcons, CloseSvg } from './toast-icons';
import type { ToasterProps, NonHeadlessToastState as ToastState } from '../types';

export const heights = new Map<ToastState['toastId'], number>();

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
    toastsBySamePosition,
    gap,
    order,
    target,
    stack,
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
          close: <CloseSvg />,
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

  useEffect(() => {
    if (!elementRef.current || target) {
      return;
    }

    const el = elementRef.current;
    const height = heights.get(toastId) || el.getBoundingClientRect().height;
    heights.set(toastId, height);

    const x = /left/.test(position!) ? 50 : /center/.test(position!) ? 0 : -50;
    const isBottom = /bottom/.test(position!);

    const getExpandedY = () => {
      const baseOffset = isBottom ? -(gap + height) : 0;
      const previousOffset = toastsBySamePosition
        .slice(0, order)
        .reduce((acc, t) => acc + gap + (heights.get(t.toastId) || 0), 0);
      return baseOffset + (isBottom ? -previousOffset : previousOffset);
    };

    if (stack) {
      const len = toastsBySamePosition.length;
      const reverseOrder = (len - 1) - order;
      const latestToast = toastsBySamePosition[len - 1];
      const latestToastHeight = heights.get(latestToast.toastId) || height;

      const scale = 1 - (reverseOrder * 0.05);
      const offset = reverseOrder * 12;

      /**
       * @description Old toast piled up on top after rising to the latest toast height
       */
      const baseOffset = isBottom ? -(latestToastHeight + gap) : 0;
      const stackOffset = isBottom ? -offset : offset;

      const applyStackStyle = () => {
        el.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
        el.style.transform = `translate(${x}%, ${baseOffset + stackOffset}px) scale(${scale})`;
        el.style.zIndex = String(order + 1);
        /**
         * @description Only 3 are exposed
         */
        if (len - 3 > order) {
          el.style.opacity = '0';
        }
      };

      const applyExpandStyle = () => {
        el.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
        el.style.transform = `translate(${x}%, ${getExpandedY()}px) scale(1)`;
        el.style.opacity = '1';
      };

      applyStackStyle();

      const container = el.parentElement;
      container?.addEventListener('mouseenter', applyExpandStyle);
      container?.addEventListener('mouseleave', applyStackStyle);

      return () => {
        container?.removeEventListener('mouseenter', applyExpandStyle);
        container?.removeEventListener('mouseleave', applyStackStyle);
      };
    }

    el.style.transition = 'transform 0.2s cubic-bezier(0.43, 0.14, 0.2, 1.05)';
    el.style.transform = `translate(${x}%, ${getExpandedY()}px)`;

    return () => {
      heights.delete(toastId);
    };
  }, [order, stack, toastsBySamePosition.length]);

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
              `${STYLE_NAMESPACE}__toast-content ${STYLE_NAMESPACE}__toast-${toastType} ${!toast.isActive(toastId) ? animationClassName : ''} ${className}`
            }
            style={toastStyle}
          >
            {renderIcon && <>{renderIcon}</>}
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
          {isValidElement(content)
            ? cloneElement(content, {
              style: { ...content.props.style, ...toastStyle },
              className: `${content.props.className || ''} ${!toast.isActive(toastId) ? animationClassName : ''} ${className}`.trim(),
            })
            : content}
        </Else>
      </Condition>
    </output>
  );
}
