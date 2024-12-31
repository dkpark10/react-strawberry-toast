import { STYLE_NAMESPACE } from '../constants';
import { Position } from '../types';

export const getAnimation = ({ isVisible, position }: { isVisible: boolean; position: Position }) => {
  if (isVisible) {
    return /top/i.test(position) ? `${STYLE_NAMESPACE}__fade-in` : `${STYLE_NAMESPACE}__fade-in-reverse`;
  }

  return /bottom/i.test(position) ? `${STYLE_NAMESPACE}__fade-out-reverse` : `${STYLE_NAMESPACE}__fade-out`;
};
