import React from 'react';
import { toast, ToastContainer } from '../../../src/index';
import '../../../src/styles/style.scss';

export default function HomePage() {
  const onClick = () => {
    // toast.success('strawberry', {
    //   position: 'top-left',
    // });

    // toast.success('strawberry 123', {
    //   position: 'top-left',
    // });

    // toast.success('strawberry', {
    //   position: 'top-right',
    // });

    // toast.success('strawberry 123', {
    //   position: 'top-right',
    // });

    // toast.success('strawberry', {
    //   position: 'bottom-left',
    // });

    // toast.success('strawberry 123', {
    //   position: 'bottom-left',
    // });

    // toast.success('strawberry', {
    //   position: 'bottom-right',
    // });

    // toast.success('strawberry 123', {
    //   position: 'bottom-right',
    // });

    toast.success('strawberry');

    // toast.success('strawberry 123', {});

    toast.success('strawberry', {
      position: 'bottom-center',
    });

    // toast.success('strawberry 123', {
    //   position: 'bottom-center',
    // });
  };

  return (
    <React.Fragment>
      <button css={{ color: 'red' }} type="button" onClick={onClick}>
        click
      </button>
      <ToastContainer stack />
    </React.Fragment>
  );
}
