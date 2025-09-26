"use client";

import { ToastContainer } from '@react-strawberry-toast/src';
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ShellCode from '@/components/shell-code';

const packagesName = ['npm', 'yarn', 'pnpm'] as const;

export default function Install() {
  return (
    <div id="tab-area" className="flex justify-center">
      <Tabs>
        <TabList className="flex justify-center space-x-6 py-3">
          {packagesName.map((packageName) => (
            <Tab
              key={packageName}
              className="text-lg cursor-pointer font-bold"
              selectedClassName="text-lg text-straw-berry cursor-pointer font-bold "
            >
              {packageName}
            </Tab>
          ))}
        </TabList>

        <TabPanel>
          <ShellCode>npm i react-strawberry-toast</ShellCode>
        </TabPanel>
        <TabPanel>
          <ShellCode>yarn add react-strawberry-toast</ShellCode>
        </TabPanel>
        <TabPanel>
          <ShellCode>pnpm i react-strawberry-toast</ShellCode>
        </TabPanel>
      </Tabs>

      <ToastContainer containerId="code" />
    </div>
  );
}
