import React from 'react';
import { afterEach, beforeEach, vi, describe, expect, test } from 'vitest';
import { act, render, fireEvent } from '@testing-library/react';
import { ToastContainer } from '../../src/components/toast-container';
import { toast, toastStore } from '../../src/core/toast';
import { DISAPPEAR_TIMEOUT, REMOVE_TIMEOUT } from '../../src/constants';
import '@testing-library/jest-dom';

describe('toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    toastStore.state = [];
    vi.useRealTimers();
  });

  test('should display the toast even after the default timeout if the toast is reactivated while inactive', async (context) => {
    function App() {
      const click = () => {
        toast(context.task.id);
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

    const PASSED_TIME = 1_000;
    act(() => {
      vi.advanceTimersByTime(PASSED_TIME);
    });

    act(() => {
      fireEvent.blur(window);
    });

    act(() => {
      vi.advanceTimersByTime(100_000);
    });

    act(() => {
      fireEvent.focus(window);
    });

    expect(queryByText(new RegExp(context.task.id, 'i'))).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(DISAPPEAR_TIMEOUT - 1_000 + REMOVE_TIMEOUT);
    });

    expect(queryByText(new RegExp(context.task.id, 'i'))).not.toBeInTheDocument();
  });

  test('Should not display the toast after a timeout passed regardless of activation status when the pauseOnActivate is false.', async (context) => {
    function App() {
      const click = () => {
        toast(context.task.id);
      };

      return (
        <React.Fragment>
          <ToastContainer pauseOnActivate={false} />
          <button onClick={click}>click</button>
        </React.Fragment>
      );
    }

    const { getByRole, queryByText } = render(<App />);

    fireEvent.click(getByRole('button', { name: 'click' }));

    act(() => {
      fireEvent.blur(window);
    });

    act(() => {
      vi.advanceTimersByTime(DISAPPEAR_TIMEOUT + REMOVE_TIMEOUT);
    });

    act(() => {
      fireEvent.focus(window);
    });

    expect(queryByText(new RegExp(context.task.id, 'i'))).not.toBeInTheDocument();
  });
});
