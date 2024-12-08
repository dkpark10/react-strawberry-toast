import React from 'react';
import { ToastContainer, toast } from '../../src';
import { Position } from '../../src/core/types';

export default function App() {
  const click = () => {
    [
      'bottom-left',
      'bottom-center',
      'bottom-right',
      'top-left',
      'top-center',
      'top-right',
    ].forEach((pos) => {
      toast(
        ({ close }) => (
          <div style={{ border: '1px solid red' }}>
            <button onClick={close}>close</button>
            toast component
          </div>
        ),
        {
          timeOut: Infinity,
          position: pos as Position,
        }
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
