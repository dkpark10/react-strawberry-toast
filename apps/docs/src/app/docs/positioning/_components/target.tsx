'use client';

import React, { useRef } from 'react';
import { ToastContainer, toast } from 'react-strawberry-toast';

export default function TargetPlayGround() {
  const elementRef = useRef<HTMLButtonElement>(null);

  const click = () => {
    toast.success('This toast is positioned 30px away from the target in both directions.', {
      containerId: 'target',
      target: {
        element: elementRef.current!,
        offset: [30, 30],
      },
    });
  };

  return (
    <React.Fragment>
      <ToastContainer containerId='target' />
      <div className="w-full h-40 flex items-center justify-center">
        <button
          onClick={click}
          ref={elementRef}
          type="button"
          className="bg-straw-berry w-40 h-10 text-white flex items-center justify-center rounded-md"
        >
          target
        </button>
      </div>
    </React.Fragment>
  );
}
