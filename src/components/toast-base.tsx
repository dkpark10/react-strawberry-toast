import { styled } from '@linaria/react';
import { PropsWithChildren } from 'react';

const Toast = styled.div`
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

interface ToasterProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function ToastBase({ children, ...rest }: ToasterProps & PropsWithChildren) {
  return (
    <Toast role="alert" {...rest}>
      {children}
    </Toast>
  );
}
