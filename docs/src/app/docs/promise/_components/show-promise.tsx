'use client';

import { toast } from 'react-strawberry-toast';

export default function ShowPromiseButton() {
  const onClick = () => {
    const promise = new Promise<number>((resolve) => {
      setTimeout(() => resolve(123), 3_000);
    });

    toast.promise(promise, {
      loading: 'loading',
      success: (res) => <div>resolved value: {res}</div>,
      error: 'error',
    });
  };

  return (
    <button className="p-2 bg-straw-berry text-white" type="button" onClick={onClick}>
      show promise
    </button>
  );
}
