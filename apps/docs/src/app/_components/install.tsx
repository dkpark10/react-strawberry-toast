"use client";

import { ToastContainer } from '@react-strawberry-toast/src';
import React, { useState } from 'react';
import { Tabs, Text } from '@radix-ui/themes';
import ShellCode from '@/components/shell-code';

const packagesName = ['npm', 'yarn', 'pnpm'] as const;

export default function Install() {
  const [activeTab, setActiveTab] = useState<typeof packagesName[number]>('npm');

  return (
    <>
      <Tabs.Root defaultValue="npm" onValueChange={(value) => setActiveTab(value as typeof packagesName[number])}>
        <Tabs.List justify="center" size="2" mb="2">
          {packagesName.map((packageName) => (
            <Tabs.Trigger
              value={packageName}
              key={packageName}
            >
              <Text size="4" align="center" weight="bold" color={activeTab === packageName ? "ruby" : "gray"}>{packageName}</Text>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content value="npm">
          <ShellCode>npm i react-strawberry-toast</ShellCode>
        </Tabs.Content>
        <Tabs.Content value="yarn">
          <ShellCode>yarn add react-strawberry-toast</ShellCode>
        </Tabs.Content>
        <Tabs.Content value="pnpm">
          <ShellCode>pnpm i react-strawberry-toast</ShellCode>
        </Tabs.Content>
      </Tabs.Root>

      <ToastContainer containerId="code" />
    </>
  );
}
