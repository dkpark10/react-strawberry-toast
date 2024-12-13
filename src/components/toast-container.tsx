import { useStrawberryToast } from '../core/store';
import { toast as strawBerryToast } from '../core/toast';
import { ToastBase } from './toast-base';
import { styled } from '@linaria/react';
import { ToastStatusContainer, ToastStatusIcons } from './toast-status';
import { Condition, If, Else } from './condition';
import type { Position, ToastState } from '../core/types';

const OFFSET = 16;

const ToastWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  top: 16px;
  left: 16px;
  right: 16px;
  bottom: 16px;
  pointer-events: none;
`;

const positionStyle: Record<Position, React.CSSProperties> = {
  'top-left': {
    top: OFFSET,
    left: OFFSET,
  },
  'top-center': {
    top: OFFSET,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  'top-right': {
    top: OFFSET,
    right: OFFSET,
  },
  'bottom-left': {
    bottom: OFFSET,
    left: OFFSET,
  },
  'bottom-center': {
    bottom: OFFSET,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  'bottom-right': {
    bottom: OFFSET,
    right: OFFSET,
  },
};

export function ToastContainer() {
  const toastList = useStrawberryToast();

  const toastListByPosition: Record<Position, Array<ToastState>> = toastList.reduce(
    (acc, toast) => {
      const key = toast.position;
      acc[key] = acc[key] || [];
      acc[key].push(toast);
      return acc;
    },
    {} as Record<Position, Array<ToastState>>,
  );

  return (
    <ToastWrapper>
      {Object.entries(toastListByPosition).map(([position, toastList]) => {
        const style = positionStyle[position as Position];

        return (
          <div
            key={position}
            style={{
              pointerEvents: 'auto',
              position: 'fixed',
              display: 'grid',
              gap: 9,
              ...style,
            }}
          >
            {toastList.map((toast) => {
              const close = () => strawBerryToast.disappear(toast.toastId, toast.timeOut);

              const Icon = ToastStatusIcons[toast.toastStatus];

              const content =
                typeof toast.data === 'function' ? toast.data({ close, icon: <Icon /> }) : toast.data;

              return (
                <ToastBase
                  key={toast.toastId}
                  toast={toast}
                  onMouseEnter={() => {
                    strawBerryToast.pause(toast.toastId);
                  }}
                  onMouseLeave={() => {
                    strawBerryToast.resume(toast.toastId);
                  }}
                >
                  <Condition condition={typeof toast.data === 'function'}>
                    <If>{content}</If>
                    <Else>
                      <ToastStatusContainer icon={<Icon />}>{content}</ToastStatusContainer>
                    </Else>
                  </Condition>
                </ToastBase>
              );
            })}
          </div>
        );
      })}
    </ToastWrapper>
  );
}
