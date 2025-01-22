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

  test(`should display a loading indicator when the first toast is displayed,
   and display success toast after 3 seconds `, async () => {
    function App() {
      const resolveClick = () => {
        const promise = new Promise<string>((resolve) => {
          setTimeout(() => resolve('resolved value'), 3_000);
        });

        toast.promise(promise, {
          loading: 'loading',
          success: (res) => <div>{res} success</div>,
          error: 'error',
        });
      };

      const rejectClick = () => {
        const promise = new Promise((_, reject) => {
          setTimeout(() => reject('rejected value'), 3_000);
        });

        toast.promise(promise, {
          loading: 'loading',
          success: 'success',
          error: (err) => <div>{err}</div>
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

    expect(queryByText(/resolved value/i)).toBeInTheDocument();

    act(() => {
      fireEvent.click(getByRole('button', { name: 'reject' }));
    });

    expect(queryByText(/loading/i)).toBeInTheDocument();

    await act(() => {
      vi.advanceTimersByTime(DISAPPEAR_TIMEOUT + 1);
    });

    expect(queryByText(/loading/i)).not.toBeInTheDocument();

    expect(queryByText(/rejected value/i)).toBeInTheDocument();
  });
});
