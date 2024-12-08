import { useStrawberryToast } from '../core/store';
import { Position } from '../core/types';

const OFFSET = 16;

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

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 9999,
        top: OFFSET,
        left: OFFSET,
        right: OFFSET,
        bottom: OFFSET,
        pointerEvents: 'none',
      }}
    >
      {toastList.map((toast) => {
        const pos = toast.position || 'top-center';
        const style = positionStyle[pos];

        const close = () => toast.close(toast.id);

        const content =
          typeof toast.data === 'function' ? toast.data({ close }) : toast.data;
        return (
          <div
            role='alert'
            data-testid={`toast-${toast.position}`}
            key={toast.id}
            onMouseEnter={() => {
              toast.pause(toast.id);
            }}
            onMouseLeave={() => {
              toast.resume(toast.id);
            }}
            style={{
              pointerEvents: 'auto',
              position: 'fixed',
              width: 160,
              ...style,
            }}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
