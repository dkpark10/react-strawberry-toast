import React from 'react';
import { afterEach, beforeEach, vi, describe, expect, test } from 'vitest';
import { act, render, fireEvent } from '@testing-library/react';
import { ToastContainer } from '../src/components/toast-container';
import { toast } from '../src/core/toast';
import { REMOVE_TIMEOUT, DISAPPEAR_TIMEOUT } from '../src/constants';
import '@testing-library/jest-dom';

describe('mouse enter mouse leave', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('basic', async () => {
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

  test('multiple container.', async () => {
    function App() {
      const click = () => {
        toast(<div>strawberry toast</div>);
        toast(<div>strawberry toast1</div>, {
          containerId: '1',
        });
        toast(<div>strawberry toast2</div>, {
          containerId: '2',
        });
        toast(<div>strawberry toast3</div>, {
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

    const { getByRole, getByText, queryAllByText, queryByText } = render(<App />);

    fireEvent.click(getByRole('button', { name: 'click' }));

    expect(queryAllByText(/strawberry toast/i)).toHaveLength(4);

    fireEvent.mouseEnter(getByText('strawberry toast1'));

    act(() => {
      vi.advanceTimersByTime(DISAPPEAR_TIMEOUT + REMOVE_TIMEOUT);
    });

    expect(queryByText('strawberry toast')).not.toBeInTheDocument();
    expect(queryByText('strawberry toast2')).not.toBeInTheDocument();
    expect(queryByText('strawberry toast3')).not.toBeInTheDocument();

    expect(queryByText('strawberry toast1')).toBeInTheDocument();
  });

  test('off pause on hover.', async () => {
    function App() {
      const click = () => {
        toast(<div>strawberry toast</div>, {
          pauseOnHover: false,
        });
      };

      return (
        <React.Fragment>
          <ToastContainer />
          <button onClick={click}>click</button>
        </React.Fragment>
      );
    }

    const { getByRole, getByText, queryByText } = render(<App />);

    fireEvent.click(getByRole('button', { name: 'click' }));

    fireEvent.mouseEnter(getByText(/strawberry toast/i));

    expect(queryByText(/strawberry toast/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(DISAPPEAR_TIMEOUT + REMOVE_TIMEOUT);
    });
    
    expect(queryByText(/strawberry toast/i)).not.toBeInTheDocument();
  });
});
