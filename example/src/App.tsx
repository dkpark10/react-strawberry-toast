import React from 'react';
import { ToastContainer, toast } from '../../src';
// import { Position } from '../../src/core/types';

export default function App() {
  const click = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(resolve, 3_000);
      }),
      {
        loading: 'loading',
        success: 'success',
        error: 'error',
      },
    );
    // toast.promise(fakeFetchReject(), {
    //   loading: 'loading',
    //   success: 'success',
    //   error: 'error',
    // });
    // toast.success('strawberry 123123 check');
    // toast.error('strawberry');
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div>example</div>
      <button onClick={click}>click</button>
    </React.Fragment>
  );
}
