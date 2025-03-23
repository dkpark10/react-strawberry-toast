import { PropsWithChildren } from 'react';

interface PlayGroundButtonProps extends PropsWithChildren {
  onClick: () => void;
}

export default function PlayGroundButton({ children, onClick }: PlayGroundButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-white font-semibold rounded-md flex items-center justify-center w-40 h-10 shadow-md bg-straw-berry"
    >
      {children}
    </button>
  );
}
