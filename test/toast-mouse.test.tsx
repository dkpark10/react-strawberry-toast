import React from 'react';
import { afterEach, beforeEach, vi, describe, expect, test } from 'vitest';
import { act, render, fireEvent } from '@testing-library/react';
import { ToastContainer } from '../src/components/toast-container';
import { toast } from '../src/core/toast';
import { REMOVE_TIMEOUT } from '../src/constants';
import '@testing-library/jest-dom';

describe('toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
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
});
