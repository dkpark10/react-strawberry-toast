import React, { useRef } from 'react';
import { ToastContainer, toast } from '../../../src';
// import { Position } from '../../src/core/types';

export default function App() {
  const targetRef = useRef<HTMLDivElement>(null);

    const click = () => {
      toast(
        ({ close }) => (
          <div>
            <span>strawberry toast</span>
            <button onClick={close}>close</button>
          </div>
        ),
        {
          timeOut: Infinity,
        }
      );
    };

  return (
    <React.Fragment>
      <ToastContainer />
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
