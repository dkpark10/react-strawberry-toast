import React from 'react';
import { toast, ToastContainer } from '../../../../src/index';

export default function MultiContainer() {
  const onClick = () => {
    toast.success('no container id', {
      position: 'top-left',
      timeOut: Infinity,
    });

    toast.success('no container id', {
      position: 'top-right',
      timeOut: Infinity,
    });

    toast.success('container id 1', {
      position: 'bottom-left',
      timeOut: Infinity,
      containerId: '1',
    });

    toast.success('container id 1', {
      position: 'bottom-right',
      timeOut: Infinity,
      containerId: '1',
    });

    toast.success('container id 2', {
      position: 'bottom-center',
      timeOut: Infinity,
      containerId: '2',
    });

    toast.success('container id 2', {
      timeOut: Infinity,
      containerId: '2',
    });
  };

  return (
    <React.Fragment>
      <button css={{ color: 'red' }} type="button" onClick={onClick}>
        click
      </button>
      <ToastContainer />
      <ToastContainer containerId="1" />
      <ToastContainer containerId="2" />
    </React.Fragment>
  );
}
