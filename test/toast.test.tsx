import React from 'react';
import { afterEach, beforeEach, vi, describe, expect, test } from 'vitest';
import { act, render, fireEvent } from '@testing-library/react';
import { ToastContainer, toast } from '../src';
import { MAX_TIMEOUT, DEFAULT_TIMEOUT, REMOVE_TIMEOUT } from '../src/constants';
import '@testing-library/jest-dom';

declare global {
  namespace Vi {
    interface Assertion extends jest.Matchers<void> {}
    interface AsymmetricMatchers extends jest.Matchers<void> {}
  }
}

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
        toast(<div>strawberry toast</div>);
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

      const click2 = () => {
        toast(
          ({ immediatelyClose }) => (
            <div>
              <span>strawberry toast2</span>
              <button onClick={immediatelyClose}>close2</button>
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
          <button onClick={click2}>click2</button>
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

    /** @description immediatelyClose */
    fireEvent.click(getByRole('button', { name: 'click2' }));

    expect(queryByText(/strawberry toast2/i)).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: 'close2' }));

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(queryByText(/strawberry toast2/i)).not.toBeInTheDocument();
  });

  test('mouse enter mouse leave', async () => {
    function App() {
      const click = () => {
        toast(<div>strawberry toast</div>);
      };

      return (
        <React.Fragment>
          <ToastContainer />
          <button onClick={click}>click</button>
        </React.Fragment>
      );
    }

    const { getByText, getByRole, queryByText } = render(<App />);

    fireEvent.click(getByRole('button', { name: 'click' }));

    expect(queryByText(/strawberry toast/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1_000);
    });

    fireEvent.mouseEnter(getByText('strawberry toast'));

    act(() => {
      vi.advanceTimersByTime(60_000);
    });

    expect(queryByText(/strawberry toast/i)).toBeInTheDocument();

    fireEvent.mouseLeave(getByText('strawberry toast'));

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
      vi.advanceTimersByTime(DEFAULT_TIMEOUT + 1);
    });

    expect(queryByText(/loading/i)).not.toBeInTheDocument();

    expect(queryByText(/success/i)).toBeInTheDocument();

    act(() => {
      fireEvent.click(getByRole('button', { name: 'reject' }));
    });

    expect(queryByText(/loading/i)).toBeInTheDocument();

    await act(() => {
      vi.advanceTimersByTime(DEFAULT_TIMEOUT + 1);
    });

    expect(queryByText(/loading/i)).not.toBeInTheDocument();

    expect(queryByText(/error/i)).toBeInTheDocument();
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
