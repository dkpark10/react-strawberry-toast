import React from 'react';
import { toast } from '../../../src/core/toast';
import { ToastContainer } from '../../../src/components/toast-container';

export default function App() {
  const click = () => {
  };

  return (
    <React.Fragment>
      <div>example</div>
      <button onClick={click}>click</button>
      <ToastContainer />
    </React.Fragment>
  );
}
