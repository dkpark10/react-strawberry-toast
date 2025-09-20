'use client';

import { toast } from 'react-strawberry-toast';
import PlayGroundButton from '@/components/playground-button';

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

  return <PlayGroundButton onClick={onClick}>show promise</PlayGroundButton>;
}
