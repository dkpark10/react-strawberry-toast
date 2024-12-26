import React from 'react';
import { afterEach, beforeEach, vi, describe, expect, test } from 'vitest';
import { act, render, fireEvent } from '@testing-library/react';
import { ToastContainer } from '../src/components/toast-container';
import { toast } from '../src/core/toast';
import { REMOVE_TIMEOUT } from '../src/constants';
import '@testing-library/jest-dom';

describe('toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('click close', async () => {
    function App() {
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
          <button onClick={click}>click</button>
        </React.Fragment>
      );
    }

    const { getByRole, queryByText } = render(<App />);

    fireEvent.click(getByRole('button', { name: 'click' }));

    expect(queryByText(/strawberry toast/i)).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: 'close' }));

    act(() => {
      vi.advanceTimersByTime(REMOVE_TIMEOUT);
    });

    expect(queryByText(/strawberry toast/i)).not.toBeInTheDocument();
  });

  test('click immediately close', async () => {
    function App() {
      const click = () => {
        toast(
          ({ immediatelyClose }) => (
            <div>
              <span>strawberry toast</span>
              <button onClick={immediatelyClose}>close</button>
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
          <button onClick={click}>click</button>
        </React.Fragment>
      );
    }

    const { getByRole, queryByText } = render(<App />);

    fireEvent.click(getByRole('button', { name: 'click' }));

    expect(queryByText(/strawberry toast/i)).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: 'close' }));

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(queryByText(/strawberry toast/i)).not.toBeInTheDocument();
  });
});
