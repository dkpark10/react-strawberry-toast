import React from 'react';
import { afterEach, beforeEach, vi, describe, expect, test } from 'vitest';
import { act, render, fireEvent } from '@testing-library/react';
import { ToastContainer } from '../../src/components/toast-container';
import { toast, toastStore } from '../../src/core/toast';
import { REMOVE_TIMEOUT, MAX_TIMEOUT } from '../../src/constants';
import '@testing-library/jest-dom';

describe('toast close test', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    toastStore.state = [];
    vi.useRealTimers();
  });

  test('should not display the toast when the close button is clicked', async (context) => {
    function App() {
      const click = () => {
        toast(
          ({ close }) => (
            <div>
              <span>{context.task.id}</span>
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

    expect(queryByText(new RegExp(context.task.id, 'i'))).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: 'close' }));

    act(() => {
      vi.advanceTimersByTime(REMOVE_TIMEOUT);
    });

    expect(queryByText(new RegExp(context.task.id, 'i'))).not.toBeInTheDocument();
  });

  test(`should remain visible even after an infinite amount of time has passed for the toast and
        not immediately display the toast when the immediatelyClose button is clicked`, async (context) => {
    function App() {
      const click = () => {
        toast(
          ({ immediatelyClose }) => (
            <div>
              <span>{context.task.id}</span>
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

    expect(queryByText(new RegExp(context.task.id, 'i'))).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: 'close' }));

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(queryByText(new RegExp(context.task.id, 'i'))).not.toBeInTheDocument();
  });
});
