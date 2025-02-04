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
    toast.allClear();
    vi.useRealTimers();
  });

  test('should pause the toast when the mouseenter event occurs, and resume the toast timer when the mouseleave event occurs', async (context) => {
    function App() {
      const click = () => {
        toast(<div>{context.task.id}</div>);
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

    const regExp = new RegExp(context.task.id, 'i');
    expect(queryByText(regExp)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1_000);
    });

    fireEvent.mouseEnter(getByText(regExp));

    act(() => {
      vi.advanceTimersByTime(60_000);
    });

    expect(queryByText(regExp)).toBeInTheDocument();

    fireEvent.mouseLeave(getByText(regExp));

    expect(queryByText(regExp)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2_000 + REMOVE_TIMEOUT);
    });

    expect(queryByText(regExp)).not.toBeInTheDocument();
  });

  test(`should pause the toast when the mouseenter event occurs, and resume the toast timer 
    when the mouseleave event occurs in multiple container`, async (context) => {
    function App() {
      const click = () => {
        toast(<div>{context.task.id} strawberry toast1</div>);
        toast(<div>{context.task.id} strawberry toast2</div>, {
          containerId: '1',
        });
        toast(<div>{context.task.id} strawberry toast3</div>, {
          containerId: '2',
        });
        toast(<div>{context.task.id} strawberry toast4</div>, {
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

    const { getByRole, getByText, getAllByTestId, queryByText } = render(<App />);

    fireEvent.click(getByRole('button', { name: 'click' }));

    expect(getAllByTestId('container-default')).toHaveLength(1);
    expect(getAllByTestId('container-1')).toHaveLength(1);
    expect(getAllByTestId('container-2')).toHaveLength(1);
    expect(getAllByTestId('container-3')).toHaveLength(1);

    fireEvent.mouseEnter(getByText(`${context.task.id} strawberry toast2`));

    act(() => {
      vi.advanceTimersByTime(DISAPPEAR_TIMEOUT + REMOVE_TIMEOUT);
    });

    expect(queryByText(`${context.task.id} strawberry toast1`)).not.toBeInTheDocument();
    expect(queryByText(`${context.task.id} strawberry toast3`)).not.toBeInTheDocument();
    expect(queryByText(`${context.task.id} strawberry toast4`)).not.toBeInTheDocument();

    expect(queryByText(`${context.task.id} strawberry toast2`)).toBeInTheDocument();
  });

  test('should not display toast when the mouseenter event occurs if pauseOnHover option is set', async (context) => {
    function App() {
      const click = () => {
        toast(<div>{context.task.id}</div>, {
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

    const regExp = new RegExp(context.task.id, 'i');
    fireEvent.mouseEnter(getByText(regExp));

    expect(queryByText(regExp)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(DISAPPEAR_TIMEOUT + REMOVE_TIMEOUT);
    });
    
    expect(queryByText(regExp)).not.toBeInTheDocument();
  });
});
