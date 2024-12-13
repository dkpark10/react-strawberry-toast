import { css } from '@linaria/core';
import { toast as strawBerryToast } from '../core/toast';
import type { ToastState } from '@/core/types';
import { useEffect, type PropsWithChildren } from 'react';

const downAnimation = css`
  @keyframes fade-in {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  animation: fade-in 0.3s ease-out;
`;

const upAnimation = css`
  @keyframes fade-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-100%);
      opacity: 0;
    }
  }
  animation: fade-out 0.3s ease-out;
`;

interface ToasterProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  toast: ToastState;
}

export function ToastBase({ children, toast, ...rest }: ToasterProps & PropsWithChildren) {
  const animation = toast.isVisible ? downAnimation : upAnimation;

  useEffect(() => {
    strawBerryToast.disappear(toast.toastId, toast.timeOut);
  }, []);

  return (
    <div className={animation} role="alert" {...rest}>
      {children}
    </div>
  );
}
