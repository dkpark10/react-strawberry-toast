import React, { useEffect } from 'react';
import { afterEach, beforeEach, vi, describe, expect, test } from 'vitest';
import { act, render, fireEvent } from '@testing-library/react';
import { useToasts } from '../src/hooks/use-toasts';
import { toast } from '../src/core/headless-toast';
import { ToastState } from '../src/types';
import { DISAPPEAR_TIMEOUT, MAX_TIMEOUT, REMOVE_TIMEOUT } from '../src/constants';
import '@testing-library/jest-dom';

describe('mouse event test', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function Toast({ toastProps }: { toastProps: ToastState }) {
    const onMouseEnter = () => {
      toast.pause(toastProps.toastId);
    };

    const onMouseLeave = () => {
      toast.resume(toastProps.toastId);
    };

    const click = () => {
      toast.disappear(toastProps.toastId, 0);
    };

    useEffect(() => {
      if (!toast.isActive(toastProps.toastId)) {
        toast.setActive(toastProps.toastId);
        toast.disappear(toastProps.toastId, toastProps.timeOut || DISAPPEAR_TIMEOUT);
      }
    }, [toastProps.toastId]);

    return (
      <div role="alert" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <button type="button" onClick={click}>
          close
        </button>
        {toastProps.data}
      </div>
    );
  }

  function App() {
    const toasts = useToasts();

    const click = () => {
      toast('strawberry toast');
    };

    const infinityClick = () => {
      toast('infinite strawberry toast', { timeOut: Infinity });
    };

    const clickWithToastId = () => {
      toast('strawberry toast', {
        toastId: 'a',
      });
    };

    return (
      <React.Fragment>
        <button onClick={click}>click</button>
        <button onClick={clickWithToastId}>clickWithToastId</button>
        <button onClick={infinityClick}>infinityClick</button>
        {toasts.map((toast) => (
          <Toast key={toast.toastId} toastProps={toast} />
        ))}
      </React.Fragment>
    );
  }

  test('should display toast when the button is clicked and hide it after 3 seconds', async () => {
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

  test('should pause the toast when the mouseenter event occurs, and resume the toast timer when the mouseleave event occurs', async () => {
    const { getByRole, queryByText, getByText } = render(<App />);

    fireEvent.click(getByRole('button', { name: 'click' }));

    fireEvent.mouseEnter(getByText('strawberry toast'));

    act(() => {
      vi.advanceTimersByTime(100_000);
    });

    expect(queryByText(/strawberry toast/i)).toBeInTheDocument();

    fireEvent.mouseLeave(getByText('strawberry toast'));

    act(() => {
      vi.advanceTimersByTime(DISAPPEAR_TIMEOUT + REMOVE_TIMEOUT);
    });

    expect(queryByText(/strawberry toast/i)).not.toBeInTheDocument();
  });

  test('should not display the toast when the close button is clicked', async () => {
    const { getByRole, queryByText } = render(<App />);

    fireEvent.click(getByRole('button', { name: 'click' }));

    expect(queryByText(/strawberry toast/i)).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: 'close' }));

    act(() => {
      vi.advanceTimersByTime(REMOVE_TIMEOUT);
    });

    expect(queryByText(/strawberry toast/i)).not.toBeInTheDocument();
  });

  test('should not display duplicated toast id', async () => {
    const { getByRole, queryByText } = render(<App />);

    fireEvent.click(getByRole('button', { name: 'clickWithToastId' }));

    expect(queryByText(/strawberry toast/i)).toBeInTheDocument();

    expect(() =>
      toast('strawberry toast', {
        toastId: 'a',
      })
    ).toThrowError('A duplicate custom ID is not available.');
  });

  test('should display up to max time', async () => {
    const { getByRole, queryByText } = render(<App />);

    fireEvent.click(getByRole('button', { name: 'infinityClick' }));

    act(() => {
      vi.advanceTimersByTime(MAX_TIMEOUT);
    });

    expect(queryByText(/infinite strawberry toast/i)).toBeInTheDocument();
  });
});
