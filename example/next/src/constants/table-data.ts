import type { ArrayWithLength } from "@/types";

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
  ]
};
