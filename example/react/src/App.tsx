import React, { useRef } from 'react';
import { ToastContainer, toast } from '../../../src';
// import { Position } from '../../src/core/types';

export default function App() {
  const targetRef = useRef<HTMLDivElement>(null);

  const click = () => {
    toast.success('123123', { timeOut: 1_000 });
    toast.success('123123', {
      position: 'bottom-center',
      timeOut: 1_000,
    });
  };

  return (
    <React.Fragment>
      <ToastContainer reverse />
      <div>example</div>
      <button onClick={click}>click</button>
      <div
        ref={targetRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        target
      </div>
    </React.Fragment>
  );
}
