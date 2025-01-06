import React from 'react';
import { toast } from '../../../src/core/toast';
import { ToastContainer } from '../../../src/components/toast-container';

export default function App() {
  const click = () => {
    toast(<div>123123</div>);
    toast('123123');
    toast((props) => (
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
