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

  test('should display toast when the button is clicked and hide it after 3 seconds', async () => {
    function App() {
      const click = () => {
        toast('strawberry toast');
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

  test('should remain visible even after an infinite amount of time has passed for the toast', async () => {
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

  test('should have exactly 4 toasts', async () => {
    function App() {
      const click = () => {
        toast(<div>strawberry toast1</div>);
        toast(<div>strawberry toast2</div>, {
          position: 'bottom-left',
        });
        toast(<div>strawberry toast3</div>, {
          position: 'bottom-center',
        });
        toast(<div>strawberry toast4</div>, {
          position: 'bottom-right',
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

    act(() => {
      vi.advanceTimersByTime(DISAPPEAR_TIMEOUT + REMOVE_TIMEOUT);
    });
  });

  test('should have no style and no animation if data is function.', async () => {
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

    // @ts-ignore
    expect(queryByText(/strawberry toast/i)?.style._values).empty;

    act(() => {
      vi.advanceTimersByTime(DISAPPEAR_TIMEOUT + REMOVE_TIMEOUT);
    });
  });

  test('should display toasts in each toast container.', async () => {
    function App() {
      const click = () => {
        toast(<div>strawberry toast</div>);
        toast(<div>strawberry toast</div>, {
          containerId: '1',
        });
        toast(<div>strawberry toast</div>, {
          containerId: '2',
        });
        toast(<div>strawberry toast</div>, {
          containerId: '3',
        });
      };

      return (
        <React.Fragment>
          <ToastContainer />
          <ToastContainer containerId="1" />
          <ToastContainer containerId="2" />
          <ToastContainer containerId="3" />
          <button onClick={click}>click</button>
        </React.Fragment>
      );
    }

    const { getByRole, queryAllByText, getAllByTestId } = render(<App />);

    fireEvent.click(getByRole('button', { name: 'click' }));

    expect(queryAllByText(/strawberry toast/i)).toHaveLength(4);

    expect(getAllByTestId('container-1')).toHaveLength(1);
    expect(getAllByTestId('container-2')).toHaveLength(1);
    expect(getAllByTestId('container-3')).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(DISAPPEAR_TIMEOUT + REMOVE_TIMEOUT);
    });
  });

  test('should display toasts at the global position when global-position is set.', async () => {
    function App() {
      const click = () => {
        toast(<div>strawberry toast bottom left</div>);
      };

      const click2 = () => {
        toast(<div>strawberry toast</div>, {
          position: 'top-right',
        });
      };

      return (
        <React.Fragment>
          <ToastContainer position="bottom-left" />
          <button onClick={click}>click</button>
          <button onClick={click2}>click2</button>
        </React.Fragment>
      );
    }

    const { getByRole, queryByTestId } = render(<App />);

    fireEvent.click(getByRole('button', { name: 'click' }));
    fireEvent.click(getByRole('button', { name: 'click2' }));

    expect(queryByTestId('bottom-left')).toBeInTheDocument();
    expect(queryByTestId('top-right')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(DISAPPEAR_TIMEOUT + REMOVE_TIMEOUT);
    });
  });

  test('should display the toast after 3200ms even if removeTimeout is greater than or equal to 1000ms', async () => {
    function App() {
      const click = () => {
        toast('strawberry toast', { removeTimeOut: 1_000 });
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
      vi.advanceTimersByTime(DISAPPEAR_TIMEOUT + REMOVE_TIMEOUT);
    });

    expect(queryByText(/strawberry toast/i)).toBeInTheDocument();
  });
});
