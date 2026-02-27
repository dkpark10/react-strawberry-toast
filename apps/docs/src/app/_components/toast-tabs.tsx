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
  TailwindCSS: () => toast.custom(({ icons, close }) =>
    <div className="font-mono rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200
      text-gray-800 flex p-3 px-4 items-center gap-3 shadow-xl"
    >
      <img src="/tailwindcss.png" className="w-5" />
      <span className="font-medium">Tailwind CSS Toast</span>
      <button
        type="button"
        onClick={close}
        className="ml-auto bg-gray-200/50 hover:bg-gray-200 rounded-md p-1 transition-colors"
      >
        {icons.close}
      </button>
    </div>
  ),
  Emotion: () => toast.custom(({ icons, close }) =>
    <div css={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '12px 16px',
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
      fontWeight: 500,
    }}>
      <span>💅 Emotion Toast</span>
      <button
        type="button"
        onClick={close}
        css={{
          background: 'rgba(21, 19, 19, 0.2)',
          border: 'none',
          borderRadius: 6,
          padding: 4,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          transition: 'background 0.2s',
          '&:hover': {
            background: 'rgba(20, 15, 15, 0.64)',
          },
        }}
      >
        {icons.close}
      </button>
    </div>
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
