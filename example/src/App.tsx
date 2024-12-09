import React from 'react';
import { ToastContainer, toast } from '../../src';
import { Position } from '../../src/core/types';

export default function App() {
  const click = () => {
    ['top-center', 'top-right'].forEach((pos) => {
      toast(
        ({ close }) => (
          <div style={{ border: '1px solid red' }}>
            <button onClick={close}>close</button>
            toast component
          </div>
        ),
        {
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
      <div
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          position: 'absolute',
        }}
      >
        <button type="button" onClick={() => console.log(123)}>
          button
        </button>
      </div>
    </React.Fragment>
  );
}
