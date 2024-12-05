import React from 'react';
import { ToastContainer, toast } from '../../src';

export default function App() {
  const click = () => {
    toast(
      ({ close }) => (
        <div style={{ border: '1px solid red' }}>
          <button onClick={close}>close</button>
          toast component
        </div>
      ),
      {
        timeOut: 10_000,
        position: 'top-center',
      }
    );
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div>example</div>
      <button onClick={click}>click</button>
    </React.Fragment>
  );
}
