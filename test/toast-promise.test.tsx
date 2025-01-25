import React from 'react';
import { afterEach, beforeEach, vi, describe, expect, test } from 'vitest';
import { act, render, fireEvent } from '@testing-library/react';
import { ToastContainer } from '../src/components/toast-container';
import { toast } from '../src/core/toast';
import { REMOVE_TIMEOUT } from '../src/constants';
import '@testing-library/jest-dom';

const fulfilledTimeout = 5_000;

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
          setTimeout(() => resolve('resolved value'), fulfilledTimeout);
        });

        toast.promise(
          promise,
          {
            loading: 'loading',
            success: (res) => <div>{res} success</div>,
            error: 'error',
          },
          {
            timeOut: 10_000,
          }
        );
      };

      const rejectClick = () => {
        const promise = new Promise((_, reject) => {
          setTimeout(() => reject('rejected value'), 3_000);
        });

        toast.promise(
          promise,
          {
            loading: 'loading',
            success: 'success',
            error: (err) => <div>{err}</div>,
          },
          {
            timeOut: 20_000,
          }
        );
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

    await act(() => {
      vi.advanceTimersByTime(fulfilledTimeout);
    });

    expect(queryByText(/loading/i)).not.toBeInTheDocument();

    expect(queryByText(/resolved value/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(10_000 + REMOVE_TIMEOUT);
    });

    expect(queryByText(/resolved value/i)).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(getByRole('button', { name: 'reject' }));
    });

    await act(() => {
      vi.advanceTimersByTime(fulfilledTimeout );
    });

    expect(queryByText(/loading/i)).not.toBeInTheDocument();

    expect(queryByText(/rejected value/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(20_000 + REMOVE_TIMEOUT);
    });

    expect(queryByText(/rejected value/i)).not.toBeInTheDocument();
  });
});
