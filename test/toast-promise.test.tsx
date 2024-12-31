import React from 'react';
import { afterEach, beforeEach, vi, describe, expect, test } from 'vitest';
import { act, render, fireEvent } from '@testing-library/react';
import { ToastContainer } from '../src/components/toast-container';
import { toast } from '../src/core/toast';
import { DISAPPEAR_TIMEOUT } from '../src/constants';
import '@testing-library/jest-dom';

describe('toast promise', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('promise', async () => {
    function App() {
      const resolveClick = () => {
        const promise = new Promise((resolve) => {
          setTimeout(resolve, 3_000);
        });

        toast.promise(promise, {
          loading: 'loading',
          success: 'success',
          error: 'error',
        });
      };

      const rejectClick = () => {
        const promise = new Promise((_, reject) => {
          setTimeout(reject, 3_000);
        });

        toast.promise(promise, {
          loading: 'loading',
          success: 'success',
          error: 'error',
        });
      };

      return (
        <React.Fragment>
          <ToastContainer />
          <button onClick={resolveClick}>resolve</button>
          <button onClick={rejectClick}>reject</button>
        </React.Fragment>
      );
    }

    const { getByRole, queryByText } = render(<App />);

    act(() => {
      fireEvent.click(getByRole('button', { name: 'resolve' }));
    });

    expect(queryByText(/loading/i)).toBeInTheDocument();

    await act(() => {
      vi.advanceTimersByTime(DISAPPEAR_TIMEOUT + 1);
    });

    expect(queryByText(/loading/i)).not.toBeInTheDocument();

    expect(queryByText(/success/i)).toBeInTheDocument();

    act(() => {
      fireEvent.click(getByRole('button', { name: 'reject' }));
    });

    expect(queryByText(/loading/i)).toBeInTheDocument();

    await act(() => {
      vi.advanceTimersByTime(DISAPPEAR_TIMEOUT + 1);
    });

    expect(queryByText(/loading/i)).not.toBeInTheDocument();

    expect(queryByText(/error/i)).toBeInTheDocument();
  });
});
