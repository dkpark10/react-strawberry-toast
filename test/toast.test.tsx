import React from 'react';
import { afterEach, beforeEach, vi, describe, expect, test } from 'vitest';
import { act, render, fireEvent } from '@testing-library/react';
import { ToastContainer } from '../src/components/toast-container';
import { toast } from '../src/core/toast';
import { DISAPPEAR_TIMEOUT, MAX_TIMEOUT, REMOVE_TIMEOUT } from '../src/constants';
import '@testing-library/jest-dom';

describe('toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('show and disappear', async () => {
    function App() {
      const click = () => {
        toast(() => <div>strawberry toast</div>);
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

    act(() => {
      vi.advanceTimersByTime(1_000);
    });

    expect(queryByText(/strawberry toast/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2_000 + REMOVE_TIMEOUT);
    });

    expect(queryByText(/strawberry toast/i)).not.toBeInTheDocument();
  });

  test('infinity', async () => {
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

    act(() => {
      vi.advanceTimersByTime(MAX_TIMEOUT - 1);
    });

    expect(queryByText(/strawberry toast/i)).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: 'close' }));

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(queryByText(/strawberry toast/i)).not.toBeInTheDocument();
  });

  test('toast count', async () => {
    function App() {
      const click = () => {
        toast(<div>strawberry toast1</div>);
        toast(<div>strawberry toast2</div>, {
          position: 'bottom-left'
        });
        toast(<div>strawberry toast3</div>, {
          position: 'bottom-center'
        });
        toast(<div>strawberry toast4</div>, {
          position: 'bottom-right'
        });
      };

      return (
        <React.Fragment>
          <ToastContainer />
          <button onClick={click}>click</button>
        </React.Fragment>
      );
    }

    const { getByRole, queryAllByText } = render(<App />);

    fireEvent.click(getByRole('button', { name: 'click' }));

    expect(queryAllByText(/strawberry toast/i)).toHaveLength(4);
  });
});
