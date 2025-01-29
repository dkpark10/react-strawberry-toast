import React from 'react';
import { toast } from '../../src/core/toast';
import { ToastContainer } from '../../src/components/toast-container';

export default function App() {
  const click = () => {
    toast.success('asdads', { timeOut: Infinity });
    toast.success('brbbrbrb', { timeOut: Infinity, position: 'bottom-left' });
  };

  return (
    <React.Fragment>
      <div>example</div>
      <button onClick={click}>click</button>
      <ToastContainer position='bottom-center' />
    </React.Fragment>
  );
}
