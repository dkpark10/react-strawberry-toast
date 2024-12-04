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
        timeOut: Infinity,
      }
    );
  };

  return (
    <React.Fragment>
      <div>example</div>
      <ToastContainer />
      <button onClick={click}>click</button>
    </React.Fragment>
  );
}
