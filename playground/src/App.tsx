import React from 'react';
import { toast } from '../../src/core/toast';
import { ToastContainer } from '../../src/components/toast-container';

export default function App() {
  const click = () => {
    const promise = new Promise<number>((resolve) => {
      setTimeout(() => resolve(123), 3_000);
    });

    toast.promise(promise, {
      loading: 'loading',
      success: (res) => <div>{res}</div>,
      error: 'error',
    });
  };

  return (
    <React.Fragment>
      <div>example</div>
      <button onClick={click}>click</button>
      <ToastContainer />
    </React.Fragment>
  );
}
