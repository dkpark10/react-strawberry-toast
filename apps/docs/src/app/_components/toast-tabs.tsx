/** @jsxImportSource @emotion/react */

"use client";

import { type ComponentProps, useState } from 'react';
import { Tabs } from '@radix-ui/themes';
import { toast, ToastContainer, type Position } from '@react-strawberry-toast/src';

type TabsRootProps = ComponentProps<typeof Tabs.Root>;

const toastType = ['Success', 'Warn', 'Error', 'Info', 'Promise', 'TailwindCSS', 'Emotion', 'DarkTheme'] as const;

const toastPosition = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as Position[];

type ToastType = typeof toastType[number];

const toastActions: Record<ToastType, () => void> = {
  Success: () => toast.success('Success'),
  Error: () => toast.error('Error'),
  Warn: () => toast.warn('Warning'),
  Info: () => toast.info('Info'),
  Promise: () => toast.promise(
    new Promise((resolve, reject) => setTimeout(() => {
      const noop = null;
      const func = Math.floor(Math.random() * 100) & 2 ? resolve : reject;
      func(noop);
    }, 3_000)),
    { loading: 'loading', success: 'success', error: 'error' }
  ),
  DarkTheme: () => toast('Dark Theme', {
    style: { color: 'white', backgroundColor: 'black', border: '1px solid white' },
  }),
  TailwindCSS: () => toast(
    ({ close }) => (
      <div className="bg-white p-2 flex justify-between gap-2 rounded-sm">
        <span>tailwind css toast</span>
        <button type="button" className="bg-red-500 text-white w-6 h-6 rounded-sm" onClick={close}>
          X
        </button>
      </div>
    )
  ),
  Emotion: () => toast(
    ({ close }) => (
      <div>
        <span css={{ color: 'red' }}>💅 emotion toast </span>
        <button
          type="button"
          css={{ border: '1px solid white', width: 28, height: 28 }}
          onClick={close}
        >
          X
        </button>
      </div>
    )
  ),
};

const toastPositionActions: Record<Position, () => void> = {
  'bottom-left': () => toast('bottom-left', { position: 'bottom-left' }),
  'bottom-center': () => toast('bottom-center', { position: 'bottom-center' }),
  'bottom-right': () => toast('bottom-right', { position: 'bottom-right' }),
  'top-left': () => toast('top-left', { position: 'top-left' }),
  'top-center': () => toast('top-center', { position: 'top-center' }),
  'top-right': () => toast('top-right', { position: 'top-right' }),
};

export function ToastTabs({ children, onValueChange, ...props }: TabsRootProps) {
  const [activeTab, setActiveTab] = useState<ToastType>('Success');

  const onClick = (value: ToastType) => {
    toastActions[value]?.();
  };

  return (
    <Tabs.Root {...props} onValueChange={(value) => {
      setActiveTab(value as ToastType);
    }}>
      <Tabs.List>
        {toastType.map((t) => (
          <Tabs.Trigger key={t} onClick={() => onClick(activeTab)} value={t}>{t}</Tabs.Trigger>
        ))}
      </Tabs.List>
      {children}
    </Tabs.Root>
  );
}

export function ToastPositionTabs({ children, onValueChange, ...props }: TabsRootProps) {
  const [activeTab, setActiveTab] = useState<Position>('top-center');

  const onClick = (value: Position) => {
    toastPositionActions[value]?.();
  };

  return (
    <Tabs.Root {...props} onValueChange={(value) => {
      setActiveTab(value as Position);
    }}>
      <Tabs.List>
        {toastPosition.map((t) => (
          <Tabs.Trigger key={t} onClick={() => onClick(activeTab)} value={t}>{t}</Tabs.Trigger>
        ))}
      </Tabs.List>
      {children}
    </Tabs.Root>
  );
}

type Direction = 'forward' | 'reverse';

export function ToastDirectionTabs({ children, onValueChange, ...props }: TabsRootProps) {
  const [activeTab, setActiveTab] = useState<Direction>('forward');

  const onClick = (value: Direction) => {
    toast(value, {
      containerId: 'direction',
    });
  };

  return (
    <>
      <ToastContainer reverse={activeTab === 'reverse'} containerId='direction' />
      <Tabs.Root {...props} onValueChange={(value) => {
        setActiveTab(value as Direction);
      }}>
        <Tabs.List>
          {['forward', 'reverse'].map((t) => (
            <Tabs.Trigger key={t} onClick={() => onClick(activeTab)} value={t}>{t}</Tabs.Trigger>
          ))}
        </Tabs.List>
        {children}
      </Tabs.Root>
    </>
  );
}

export function ToastGapTabs({ children, onValueChange, ...props }: TabsRootProps) {
  const [activeTab, setActiveTab] = useState(9);

  const onClick = (value: number) => {
    toast(`gap: ${value}`, { 
      containerId: 'gap',
    });
  };

  return (
    <>
      <ToastContainer gap={activeTab} containerId='gap' />
      <Tabs.Root {...props} onValueChange={(value) => {
        setActiveTab(Number(value));
      }}>
        <Tabs.List>
          {Array.from({ length: 9 }, (_, i) => i * 2 + 1)
            .map((t) => (
              <Tabs.Trigger key={t} onClick={() => onClick(activeTab)} value={String(t)}>{t}</Tabs.Trigger>
            ))}
        </Tabs.List>
        {children}
      </Tabs.Root>
    </>
  );
}

type Stack = 'default' | 'stack';

export function ToastStackTabs({ children, onValueChange, ...props }: TabsRootProps) {
  const [activeTab, setActiveTab] = useState<Stack>('default');

  const onClick = (value: Stack) => {
    toast(`gap: ${value}`, { 
      containerId: 'stack',
    });
  };

  return (
    <>
      <ToastContainer stack={activeTab === 'stack'} containerId='stack' />
      <Tabs.Root {...props} onValueChange={(value) => {
        setActiveTab(value as Stack);
      }}>
        <Tabs.List>
          {['default', 'stack']
            .map((t) => (
              <Tabs.Trigger key={t} onClick={() => onClick(activeTab)} value={String(t)}>{t}</Tabs.Trigger>
            ))}
        </Tabs.List>
        {children}
      </Tabs.Root>
    </>
  );
}
