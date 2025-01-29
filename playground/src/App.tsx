import React from 'react';
import { toast } from '../../src/core/toast';
import { ToastContainer } from '../../src/components/toast-container';

export default function App() {
  const click = () => {
    toast(<div>{123123}</div>, {
      timeOut: Infinity,
    });
  };

  const click2 = () => {
    toast(<div>{456456}</div>, {
      position: 'top-right',
      timeOut: Infinity,
    });
  };

  return (
    <React.Fragment>
      <ToastContainer position="bottom-left" />
      <button onClick={click}>click</button>
      <button onClick={click2}>click2</button>
    </React.Fragment>
  );
}
