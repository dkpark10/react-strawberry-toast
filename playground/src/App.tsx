import React from 'react';
import { toast } from '../../src/core/toast';
import { ToastContainer } from '../../src/components/toast-container';

export default function App() {
  const click = () => {
    toast.success(<div>12</div>, {
      timeOut: Infinity,
      position: 'top-center',
    });
    toast(<div>123123</div>, {
      icon: '🚀',
      timeOut: Infinity,
      position: 'bottom-center',
    });
    toast.error(<div>123123</div>, {
      timeOut: Infinity,
      position: 'bottom-right',
    });
    toast.warn(<div>deploy</div>, {
      icon: '🚀',
      timeOut: Infinity,
      position: 'bottom-left',
    });
  };

  return (
    <React.Fragment>
      <button onClick={click}>click</button>
      <ToastContainer position="bottom-center" />
    </React.Fragment>
  );
}
