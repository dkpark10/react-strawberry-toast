import { Children, type PropsWithChildren } from 'react';

interface ConditionProps {
  condition: boolean;
}

export function Condition({ condition, children }: ConditionProps & PropsWithChildren) {
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

export function If({ children }: PropsWithChildren) {
  return children;
}

export function Else({ children }: PropsWithChildren) {
  return children;
}
