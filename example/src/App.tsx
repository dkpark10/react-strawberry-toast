import React from 'react';
import { ToastContainer, toast } from '../../src';
// import { Position } from '../../src/core/types';

const fakeFetchResolve = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 3_000);
  });

const fakeFetchReject = () =>
  new Promise((_, reject) => {
    setTimeout(reject, 3_000);
  });

export default function App() {
  const click = () => {
    toast.promise(fakeFetchResolve(), {
      loading: 'loading',
      success: 'success',
      error: 'error',
    });
    toast.promise(fakeFetchReject(), {
      loading: 'loading',
      success: 'success',
      error: 'error',
    });
    // toast.success('strawberry', {
    //   timeOut: Infinity,
    // });
    // toast.error('strawberry', {
    //   timeOut: Infinity,
    // });
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div>example</div>
      <button onClick={click}>click</button>
    </React.Fragment>
  );
}
