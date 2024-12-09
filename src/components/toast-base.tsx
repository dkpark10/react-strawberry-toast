import { type PropsWithChildren } from 'react';
import { css } from '@linaria/core';

const downAnimation = css`
  @keyframes down {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  animation: down 0.2s ease-out;
`;

const upAnimation = css`
  @keyframes up {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-100%);
      opacity: 0;
    }
  }
  animation: up 0.2s ease-out;
`;

interface ToasterProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isVisible: boolean;
}

export function ToastBase({ children, isVisible, ...rest }: ToasterProps & PropsWithChildren) {
  const animation = isVisible ? downAnimation : upAnimation;

  return (
    <div className={animation} role="alert" {...rest}>
      {children}
    </div>
  );
}
