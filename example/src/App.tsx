import React from 'react';
import { ToastContainer, toast } from '../../src';

export default function App() {
  const click = () => {
    toast('message');
  }

  return (
    <React.Fragment>
      <div>example</div>
      <ToastContainer />
      <button onClick={click}>click</button>
    </React.Fragment>
  );
}
