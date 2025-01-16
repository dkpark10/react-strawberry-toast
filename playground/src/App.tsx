import React from 'react';
import { toast } from '../../src/core/toast';
import { ToastContainer } from '../../src/components/toast-container';

export default function App() {
  const click = () => {
    toast.custom(<div>123123</div>);
    toast(<div>123123</div>);
    toast('123123');
    toast(123123);
    toast.success('asdsaddsa');
    toast((props) => (
      <div>
        {props.icons.success}
        asdads
      </div>
    ));
    toast.custom((props) => (
      <div>
        {props.icons.success}
        asdads
      </div>
    ));
  };

  return (
    <React.Fragment>
      <div>example</div>
      <button onClick={click}>click</button>
      <ToastContainer />
    </React.Fragment>
  );
}
