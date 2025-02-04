import React from 'react';
import { toast } from '../../src/core/toast';
import { ToastContainer } from '../../src/components/toast-container';

export default function App() {
  const click = () => {
    toast.success(<div>12</div>, {
      timeOut: Infinity,
    });
    toast(<div>123123</div>, {
      timeOut: Infinity,
    });
    toast.custom(<div>asdasdasdasdsdasdas</div>, {
      timeOut: Infinity,
    });
    toast.success(<div>12</div>, {
      timeOut: Infinity,
      position: 'top-center',
    });
    toast(<div>123123</div>, {
      timeOut: Infinity,
      position: 'top-center',
    });
    toast.custom(<div>asdas</div>, {
      timeOut: Infinity,
      position: 'top-center',
      containerId: '1',
    });
  };

  return (
    <React.Fragment>
      <button onClick={click}>click</button>
      <ToastContainer position="bottom-left" />
    </React.Fragment>
  );
}
