import { Children, type PropsWithChildren } from 'react';

interface ConditionProps {
  condition: boolean;
}

export function Condition({ condition, children }: ConditionProps & PropsWithChildren) {
  const childrenArray = Children.toArray(children);
  if (childrenArray.length > 2) {
    throw new Error('children length over 2');
  }

  return (childrenArray as any[]).find((child) => {
    if (condition) {
      return child.type.name === 'If';
    }
    return child.type.name === 'Else';
  });
}

export function If({ children }: PropsWithChildren) {
  return children;
}

export function Else({ children }: PropsWithChildren) {
  return children;
}
