import React from 'react';
import { ToastContainer, toast } from '../../src';
// import { Position } from '../../src/core/types';

export default function App() {
  const click = () => {
    toast.success('toast component');
    toast.error('toast component');
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div>example</div>
      <button onClick={click}>click</button>
    </React.Fragment>
  );
}
