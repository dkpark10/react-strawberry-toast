import React from 'react';
import { toast, ToastContainer } from '../../../src/index';

export default function HomePage() {
  const onClick = () => {
    toast.success('strawberry', {
      position: 'top-left',
      timeOut: Infinity,
    });

    toast.success('strawberry 123', {
      position: 'top-left',
      timeOut: Infinity,
    });

    toast.success('strawberry', {
      position: 'top-right',
      timeOut: Infinity,
    });

    toast.success('strawberry 123', {
      position: 'top-right',
      timeOut: Infinity,
    });

    toast.success('strawberry', {
      position: 'bottom-left',
      timeOut: Infinity,
    });

    toast.success('strawberry 123', {
      position: 'bottom-left',
      timeOut: Infinity,
    });

    toast.success('strawberry', {
      position: 'bottom-right',
      timeOut: Infinity,
    });

    toast.success('strawberry 123', {
      position: 'bottom-right',
      timeOut: Infinity,
    });

    toast.success('strawberry', {
      timeOut: Infinity,
    });

    toast.success('strawberry 123', {
      timeOut: Infinity,
    });

    toast.success('strawberry', {
      position: 'bottom-center',
      timeOut: Infinity,
    });

    toast.success('strawberry 123', {
      position: 'bottom-center',
      timeOut: Infinity,
    });
  };

  return (
    <React.Fragment>
      <button css={{ color: 'red' }} type="button" onClick={onClick}>
        click
      </button>
      <ToastContainer />
    </React.Fragment>
  );
}
