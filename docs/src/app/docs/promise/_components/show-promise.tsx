'use client';

import { toast } from 'react-strawberry-toast';

export default function ShowPromiseButton() {
  const onClick = () => {
    const promise = new Promise((resolve, reject) => {
      const func = Math.floor(Math.random() * 100) & 2 ? resolve : reject;
      setTimeout(func, 3_000);
    });

    toast.promise(promise, {
      loading: 'loading',
      success: 'success',
      error: 'error',
    });
  };

  return (
    <button className="p-2 bg-straw-berry text-white" type="button" onClick={onClick}>
      show promise
    </button>
  );
}
