import React from 'react';
import { ToastContainer, toast } from '../../../src';

export default function App() {
  const click = () => {
    toast('success', {
      timeOut: Infinity,
    });
    toast('success 1231231231231', {
      timeOut: Infinity,
    });
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div>example</div>
      <button onClick={click}>click</button>

      <div
        style={{
          width: 100,
          height: 50,
          border: '1px solid red',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <ToastContainer containerId="1" />
      </div>
    </React.Fragment>
  );
}
