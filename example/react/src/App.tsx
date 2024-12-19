import React, { useRef } from 'react';
import { ToastContainer, toast } from '../../../src';

export default function App() {
  const targetRef = useRef<HTMLDivElement>(null);

  const click = () => {
    // toast(<div>strawberry toast1</div>, {
    //   element: targetRef.current!,
    // });
    toast(<div>strawberry toast1</div>);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div>example</div>
      <button onClick={click}>click</button>
      <div
        ref={targetRef}
        style={{
          width: 100,
          height: 50,
          border: '1px solid red',
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
