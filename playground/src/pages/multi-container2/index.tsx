import React from 'react';
import { css } from '@emotion/react';
import { toast, ToastContainer } from '../../../../src/index';

export default function MultiContainer() {
  const onClick = () => {
    toast.success('no container id', {
      timeOut: Infinity,
    });
  };

  return (
    <React.Fragment>
      <button css={{ color: 'red' }} type="button" onClick={onClick}>
        click
      </button>
      <div css={{ height: 600, border: '1px solid red' }}>long article</div>
      <div
        css={{ border: '1px solid blue', position: 'relative', top: 200, left: 200, width: 200, height: 200 }}
      >
        <ToastContainer
          className="n"
          css={css`
            position: absolute;
            display: flex;
          `}
        />
      </div>
    </React.Fragment>
  );
}
