import { Children, type PropsWithChildren } from 'react';

interface IfProps {
  condition: boolean;
}

export function If({ condition, children }: IfProps & PropsWithChildren) {
  const childrenArray = Children.toArray(children);
  if (childrenArray.length > 2) {
    throw new Error('The number of children exceeds two.');
  }

  return (childrenArray as any[]).find((child) => {
    if (condition) {
      return child.key === '.0';
    }
    return child.key === '.1';
  });
}

export function Then({ children }: PropsWithChildren) {
  return children;
}

export function Else({ children }: PropsWithChildren) {
  return children;
}
