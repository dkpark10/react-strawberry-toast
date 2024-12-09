import React from 'react';
import { ToastContainer, toast } from '../../src';
import { Position } from '../../src/core/types';

export default function App() {
  const click = () => {
    ['top-center'].forEach((pos) => {
      toast(
        ({ close }) => (
          <div style={{ border: '1px solid red' }}>
            <button onClick={close}>close</button>
            toast component
          </div>
        ),
        {
          timeOut: 1_000,
          position: pos as Position,
        },
      );
    });
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div>example</div>
      <button onClick={click}>click</button>
    </React.Fragment>
  );
}
