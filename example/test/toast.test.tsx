import React from 'react';
import { afterEach, beforeEach, vi, describe, expect, test } from 'vitest';
import { act, render, fireEvent } from '@testing-library/react';
import { ToastContainer, toast } from '../../src';
import { MAX_TIMEOUT, DEFAULT_TIMEOUT, REMOVE_TIMEOUT } from '../../src/constants';

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

    expect(queryByText('strawberry toast')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1_000);
    });

    expect(queryByText('strawberry toast')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2_000 + REMOVE_TIMEOUT);
    });

    expect(queryByText('strawberry toast')).not.toBeInTheDocument();
  });

  test('click close', async () => {
    function App() {
      const click = () => {
        toast(({ close }) => (
          <div>
            <span>strawberry toast</span>
            <button onClick={close}>close</button>
          </div>
        ));
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

    expect(queryByText('strawberry toast')).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: 'close' }));

    act(() => {
      vi.advanceTimersByTime(DEFAULT_TIMEOUT + REMOVE_TIMEOUT);
    });

    expect(queryByText('strawberry toast')).not.toBeInTheDocument();
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

    expect(queryByText('strawberry toast')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1_000);
    });

    fireEvent.mouseEnter(getByText('strawberry toast'));

    act(() => {
      vi.advanceTimersByTime(2_000);
    });

    expect(queryByText('strawberry toast')).toBeInTheDocument();

    fireEvent.mouseLeave(getByText('strawberry toast'));

    expect(queryByText('strawberry toast')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2_000 + REMOVE_TIMEOUT);
    });

    expect(queryByText('strawberry toast')).not.toBeInTheDocument();
  });

  test('infinity', async () => {
    function App() {
      const click = () => {
        toast(<div>strawberry toast</div>, { timeOut: Infinity });
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

    expect(queryByText('strawberry toast')).toBeInTheDocument();
  });
});
