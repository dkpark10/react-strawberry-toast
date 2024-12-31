import React from 'react';
import { useStrawberryToast } from '../../../src/hooks/use-strawberry-toast';
import { toast } from '../../../src/core/headless-toast';

export default function App() {
  const toasts = useStrawberryToast();

  const click = () => {
    toast('success');
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
