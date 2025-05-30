import React, { useRef } from 'react';
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

  test('should display toast when the button is clicked and hide it after 3 seconds', async (context) => {
    function App() {
      const click = () => {
        toast(context.task.id, {
          icon: '🚀',
        });
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

    const regex = new RegExp(context.task.id, 'i');
    expect(queryByText(regex)).toBeInTheDocument();
    expect(queryByText(regex)).toHaveTextContent(`🚀${context.task.id}`);

    act(() => {
      vi.advanceTimersByTime(1_000);
    });

    expect(queryByText(regex)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2_000 + REMOVE_TIMEOUT);
    });

    expect(queryByText(regex)).not.toBeInTheDocument();
  });

  test('should have exactly 4 toasts', async (context) => {
    function App() {
      const click = () => {
        toast(<div>{context.task.id}</div>);
        toast(<div>{context.task.id}</div>, {
          position: 'bottom-left',
        });
        toast(<div>{context.task.id}</div>, {
          position: 'bottom-center',
        });
        toast(<div>{context.task.id}</div>, {
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

    expect(queryAllByText(new RegExp(context.task.id, 'i'))).toHaveLength(4);
  });

  test('should display toasts in each toast container.', async (context) => {
    function App() {
      const buttonRef = useRef<HTMLButtonElement>(null);

      const click = () => {
        toast(<div>{context.task.id}</div>);
        toast(<div>{context.task.id}</div>, {
          containerId: '1',
        });
        toast(<div>{context.task.id}</div>, {
          containerId: '2',
        });
        toast(<div>{context.task.id}</div>, {
          containerId: '3',
        });
        toast(<div>{context.task.id}</div>, {
          target: {
            element: buttonRef.current!,
          },
        });
      };

      return (
        <React.Fragment>
          <ToastContainer />
          <ToastContainer containerId="1" />
          <ToastContainer containerId="2" />
          <ToastContainer containerId="3" />
          <button ref={buttonRef} onClick={click}>
            click
          </button>
        </React.Fragment>
      );
    }

    const { getByRole, queryAllByText, getAllByTestId } = render(<App />);

    fireEvent.click(getByRole('button', { name: 'click' }));

    expect(queryAllByText(new RegExp(context.task.id, 'i'))).toHaveLength(5);

    expect(getAllByTestId('container-default')).toHaveLength(2);
    expect(getAllByTestId('container-1')).toHaveLength(1);
    expect(getAllByTestId('container-2')).toHaveLength(1);
    expect(getAllByTestId('container-3')).toHaveLength(1);
  });

  test('should display toasts at the global position when global-position is set.', async (context) => {
    function App() {
      const click = () => {
        toast(<div>{context.task.id}</div>);
      };

      const click2 = () => {
        toast(<div>{context.task.id}</div>, {
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
  });

  test('should display the toast after 3200ms even if removeTimeout is greater than or equal to 1000ms', async (context) => {
    function App() {
      const click = () => {
        toast(context.task.id, { removeTimeOut: 1_000 });
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

    expect(queryByText(new RegExp(context.task.id, 'i'))).toBeInTheDocument();
  });

  test('should not display duplicated toast id', async (context) => {
    function App() {
      const click = () => {
        toast(context.task.id, {
          toastId: 'a',
        });
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

    expect(() =>
      toast(context.task.id, {
        toastId: 'a',
      })
    ).toThrowError('A duplicate custom ID is not available.');
  });

  test('Should update the toast message when isVisible state change', async () => {
    function App() {
      const click = () => {
        toast(({ isVisible }) => <div>{isVisible ? 'visible' : 'invisible'}</div>);
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

    expect(queryByText('visible')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(DISAPPEAR_TIMEOUT);
    });

    expect(queryByText('invisible')).toBeInTheDocument();
  });
});
