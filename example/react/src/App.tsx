import React from 'react';
import { useStrawberryToast } from '../../../src/hooks/use-strawberry-toast';

export default function App() {
  const {
    toasts,
    handlers: { toast },
  } = useStrawberryToast();

  const click = () => {
    console.log('123');
    toast('success', {
      timeOut: Infinity,
    });
    toast('success 1231231231231', {
      timeOut: Infinity,
    });
  };

  return (
    <React.Fragment>
      <div>example</div>
      <button onClick={click}>click</button>
      {toasts.map((toast) => (
        <div key={toast.toastId}>{toast.data}</div>
      ))}
    </React.Fragment>
  );
}
