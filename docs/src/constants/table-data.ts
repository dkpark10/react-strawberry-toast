import type { ArrayWithLength } from '@/types';

type TableData<N extends number> = {
  header: ArrayWithLength<N>;
  body: Array<ArrayWithLength<N>>;
};

export const customToastPropsTableData: TableData<3> = {
  header: ['option', 'description', 'type'],
  body: [
    ['close', 'closing function', 'Function'],
    ['immediatelyClose', 'immediatelyClosing function', 'Function'],
    ['icons', 'Toast A collection of icons in all states', 'ReactNode'],
    ['isVisible', 'Toast exposure status value', 'Boolean'],
  ],
};

export const useToastsReturnValue: TableData<3> = {
  header: ['option', 'description', 'type'],
  body: [
    ['toastId', "Toast's unique Id", 'String'],
    ['timeOut', 'Time for toast to disappear', 'Number'],
    ['removeTimeOut', 'Time for toast to remove In List', 'Number'],
    ['data', 'Data to be shown on toast', 'ReactNode'],
    ['isVisible', 'Toast exposure status value', 'Boolean'],
    ['createdAt', 'Time the toast was create', 'Number'],
    ['pausedAt', 'Time the toast paused before it disappeared', 'Number'],
    ['updated', 'Time to update data on toast already created', 'Number'],
  ],
};

export const toastContainerApi: TableData<4> = {
  header: ['option', 'description', 'type', 'required'],
  body: [
    [
      'position',
      "Global toast's Position",
      `'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'`,
      'false',
    ],
    ['containerId', "ToastContainer's unique id", 'String', 'false'],
    ['reverse', 'Direction when toast appear', 'Boolean', 'false'],
    ['gap', 'Gap Between toasts', 'Boolean', 'false'],
  ],
};

export const toastApi: TableData<4> = {
  header: ['option', 'description', 'type', 'required'],
  body: [
    ['toastId', "Toast's unique Id", 'String', 'false'],
    [
      'position',
      'Position per toast',
      `'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'`,
      'false',
    ],
    ['containerId', "ID shown in the Toast Container Unique ID", 'String', 'false'],
    ['pauseOnHover', "The Option that sets the timer to stop or not when a hover event occurs", 'String', 'false'],
    ['toastType', "Toast Type", `'default' | 'custom' | 'success' | 'error' | 'loading' | 'warn'`, 'false'],
    ['timeOut', 'Time for toast to disappear', 'Number', 'false'],
    ['removeTimeOut', 'Time for toast to remove In List', 'Number', 'false'],
  ],
};

export const promiseTableData: TableData<3> = {
  header: ['option', 'description', 'type'],
  body: [
    ['promise', 'promise variable', 'Promise'],
    ['options.loading', 'Data to show when promise is pending', 'ReactNode'],
    ['options.success', 'Data to show when promise is resolve', 'ReactNode'],
    ['options.error', 'Data to show when promise is reject', 'ReactNode'],
  ],
};
