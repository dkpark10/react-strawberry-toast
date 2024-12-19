import type { Coord } from '../core/types';

export const getAbsolutePosition = (element: HTMLElement): Coord => {
  const clientRect = element.getBoundingClientRect();
  return { y: clientRect.y, x: clientRect.x };
};
