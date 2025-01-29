import React from 'react';
import { toast } from '../../src/core/toast';
import { ToastContainer } from '../../src/components/toast-container';

export default function App() {
  const click = () => {
    toast.success('asdads', { timeOut: Infinity });
    toast.success('asdads', { timeOut: Infinity });
  };

  const clear = () => {
    toast.allClear();
  };

  return (
    <React.Fragment>
      <div>example</div>
      <button onClick={click}>click</button>
      <button onClick={clear}>click2</button>
      <ToastContainer />
    </React.Fragment>
  );
}
