'use client';

import { toast } from '@react-strawberry-toast/src';
import { Code } from '@radix-ui/themes';
import type { PropsWithChildren } from 'react';

export default function ShellCode({ children }: PropsWithChildren) {
  const click = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    const text = e.currentTarget.textContent ?? '';
    window.navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('Copied', {
          containerId: 'code',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Code onClick={click} size="3" color="gray" variant="solid" highContrast 
      style={{
        cursor: 'var(--cursor-button)',
        padding: 'var(--space-3)'
      }}
    >
      {children}
    </Code>
  );
}
