import React, { useRef } from 'react';
import { ToastContainer, toast } from '../../../src';
// import { Position } from '../../src/core/types';

export default function App() {
  const targetRef = useRef<HTMLDivElement>(null);

  const click = () => {
    toast(<div>strawberry toast1</div>);
    toast(<div>strawberry toast2</div>, {
      position: 'bottom-left',
    });
    toast(<div>strawberry toast3</div>, {
      position: 'bottom-center',
    });
    toast(<div>strawberry toast4</div>, {
      position: 'bottom-right',
    });
  };

  return (
    <React.Fragment>
      <ToastContainer reverse />
      <div>example</div>
      <button onClick={click}>click</button>
      <div
        ref={targetRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        target
      </div>
    </React.Fragment>
  );
}
