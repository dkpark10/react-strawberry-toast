import type { ArrayWithLength } from '@/types';

type TableData<N extends number> = {
  header: ArrayWithLength<N>;
  body: Array<ArrayWithLength<N>>;
};

export const customToastPropsTableData: TableData<3> = {
  header: ['option', 'description', 'type'],
  body: [
    ['toastId', "Toast's unique Id", 'String'],
    ['close', 'closing function', 'Function'],
    ['immediatelyClose', 'immediately Closing function', 'Function'],
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
  header: ['option', 'description', 'type', 'default'],
  body: [
    [
      'position',
      "Global toast's Position",
      `'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'`,
      'top-center',
    ],
    ['className', 'Class of <ToastContainer />', 'String', `''`],
    ['style', 'Style of <ToastContainer />', 'Object', '{}'],
    ['containerId', "ToastContainer's unique id", 'String', `''`],
    ['reverse', 'Direction when toast appear', 'Boolean', 'false'],
    ['gap', 'Gap Between toasts', 'Number', '9'],
    ['pauseOnActivate', 'Pause Toast timer when blur events occurs', 'Boolean', 'true'],
    ['limit', 'Limit the number of toast to be displayed', 'Number', ''],
  ],
};

export const toastApi: TableData<4> = {
  header: ['option', 'description', 'type', 'default'],
  body: [
    ['toastId', "Toast's unique Id", 'String', ''],
    [
      'position',
      'Position per toast',
      `'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'`,
      'top-center',
    ],
    ['containerId', "ID shown in the Toast Container Unique ID", 'String', `''`],
    ['pauseOnHover', "The Option that sets the timer to stop or not when a hover event occurs", 'Boolean', 'true'],
    ['icon', 'The icon to be displayed in the toast.', 'ReactNode', ''],
    ['timeOut', 'Time for toast to disappear', 'Number', '3000'],
    ['removeTimeOut', 'Time for toast to remove in List', 'Number', '200'],
    ['className', 'Class of per toast', 'String', `''`],
    ['style', 'Class of per style', 'Object', '{}'],
    ['align', 'Align per toast', `'left' | 'center' | 'right' | ''`, `''`],
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

export const useToastsTableData: TableData<4> = {
  header: ['option', 'description', 'type', 'default'],
  body: [
    ['toastId', "Toast's unique Id", 'String', ''],
    ['data', "Content of toast", 'ReactNode | () => ReactNode', ''],
    [
      'position',
      'Position per toast',
      `'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'`,
      'top-center',
    ],
    ['containerId', "ID shown in the Toast Container Unique ID", 'String', ''],
    ['pauseOnHover', "The Option that sets the timer to stop or not when a hover event occurs", 'Boolean', 'true'],
    ['toastType', "Toast Type", `'default' | 'custom' | 'success' | 'error' | 'loading' | 'warn'`, 'default'],
    ['createdAt', "Time that toast was created", 'Date', ''],
    ['timeOut', 'Time for toast to disappear', 'Number', '3000'],
    ['removeTimeOut', 'Time for toast to remove In List', 'Number', '200'],
    ['updated', 'Whether the content on toast has changed or not', 'Boolean | null', 'null'],
    ['pausedAt', 'Time for toast to remove In List', 'Date | null', 'null'],
    ['isVisible', 'Toast exposure status value', 'Boolean', 'true'],
  ],
};