import { toast } from '../../../../src';
import type { PropsWithChildren } from 'react';

export default function Code({ children }: PropsWithChildren) {
  const click = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    const text = e.currentTarget.textContent ?? '';
    window.navigator.clipboard
      .writeText(text)
      .then(() => {
        toast('Copied');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <code onClick={click} className="px-4 py-3 bg-primary-black text-[#c3c6c1] rounded-md cursor-pointer">
      {children}
    </code>
  );
}