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
