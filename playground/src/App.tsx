import React from 'react';
import { toast } from '../../src/core/toast';
import { ToastContainer } from '../../src/components/toast-container';

export default function App() {
  const click = () => {
    toast.success(<div>12</div>, {
      timeOut: Infinity,
    });
    toast(<div>123123</div>, {
      icon: '🚀',
      timeOut: Infinity,
    });
    toast.error(<div>123123</div>, {
      timeOut: Infinity,
    });
    toast.warn(<div>deploy</div>, {
      icon: '🚀',
      timeOut: Infinity,
    });
  };

  return (
    <React.Fragment>
      <button onClick={click}>click</button>
      <ToastContainer position="top-right" />
    </React.Fragment>
  );
}
