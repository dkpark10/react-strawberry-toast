import React, { type PropsWithChildren, useState } from 'react';
import { Coord } from '../core/types';

interface ToastAbsoluteContainerProps {
  element: HTMLElement;
}

export function ToastAbsoluteContainer({
  children,
  element,
}: PropsWithChildren & ToastAbsoluteContainerProps) {
  const [coord] = useState<Coord>(() => {
    const clientRect = element.getBoundingClientRect();
    return { y: clientRect.y, x: clientRect.x };
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: `${coord.y}px`,
        left: `${coord.x}px`,
      }}
    >
      {children}
    </div>
  );
}
