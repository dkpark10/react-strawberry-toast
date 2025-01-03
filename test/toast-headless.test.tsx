import React, { useEffect } from 'react';
import { afterEach, beforeEach, vi, describe, expect, test } from 'vitest';
import { act, render, fireEvent } from '@testing-library/react';
import { useStrawberryToast } from '../src/hooks/use-strawberry-toast';
import { toast as headLessToast } from '../src/core/headless-toast';
import { ToastState } from '../src/types';
import { DISAPPEAR_TIMEOUT, REMOVE_TIMEOUT } from '../src/constants';
import '@testing-library/jest-dom';

describe('mouse event test', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function Toast({ toast }: { toast: ToastState }) {
    const onMouseEnter = () => {
      headLessToast.pause(toast.toastId);
    };

    const onMouseLeave = () => {
      headLessToast.resume(toast.toastId);
    };

    const click = () => {
      headLessToast.disappear(toast.toastId, 0);
    };

    useEffect(() => {
      if (!headLessToast.isActive(toast.toastId)) {
        headLessToast.disappear(toast.toastId, DISAPPEAR_TIMEOUT);
      }
    }, [toast.toastId]);

    return (
      <div role="alert" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <button type="button" onClick={click}>close</button>
        {toast.data}
      </div>
    );
  }

  function App() {
    const toasts = useStrawberryToast();

    const click = () => {
      headLessToast('strawberry toast');
    };

    return (
      <React.Fragment>
        <button onClick={click}>click</button>
        {toasts.map((toast) => (
          <Toast key={toast.toastId} toast={toast} />
        ))}
      </React.Fragment>
    );
  }

  test('should display toast when the button is clicked and hide it after 3 seconds', async () => {
    const { getByRole, queryByText, getByText } = render(<App />);

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
});
