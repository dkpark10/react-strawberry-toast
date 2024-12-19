import React, { type PropsWithChildren } from 'react';
import { Coord } from '../core/types';

export function ToastAbsoluteContainer({ children, y, x }: PropsWithChildren & Coord) {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      {children}
    </div>
  );
}
