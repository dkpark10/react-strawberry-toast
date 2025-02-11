import React from 'react';
import { css } from '@emotion/react';
import { toast, ToastContainer } from '../../../../src/index';

const toastCss = css`
  background-color: red;
  display: inline-block;
`;

export default function MultiContainer() {
  const onClick = () => {
    toast.custom(<div css={toastCss}>no container id</div>, {
      timeOut: Infinity,
    });
    toast.custom(<div css={toastCss}>no container id 123123</div>, {
      timeOut: Infinity,
    });
    toast(<div css={toastCss}>no container id</div>, {
      timeOut: Infinity,
      align: 'left',
    });
    toast(<div css={toastCss}>no container id 123123</div>, {
      timeOut: Infinity,
      align: 'left',
    });
  };

  return (
    <React.Fragment>
      <button css={{ color: 'red' }} type="button" onClick={onClick}>
        click
      </button>
      <div css={{ height: 400, border: '1px solid red' }}>long article</div>
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
