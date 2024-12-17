import { Position } from '../core/types';

export const getDirection = ({
  position,
  reverse = false,
}: {
  position: Position;
  reverse: boolean;
}): 'column-reverse' | 'column' => {
  if (/top/i.test(position)) {
    return reverse ? 'column-reverse': 'column';
  }

  if (/bottom/i.test(position)) {
    return reverse ? 'column': 'column-reverse';
  }

  return 'column';
};
