import type { ArrayWithLength } from "@/types";

type TableData<N extends number> = {
  header: ArrayWithLength<N>;
  body: Array<ArrayWithLength<N>>;
};

export const customToastPropsTableData: TableData<3> = {
  header: ['option', 'description', 'type'],
  body: [
    ['close', 'Toast closing function', 'Function'],
    ['immediatelyClose', 'immediatelyClose function', 'Function'],
    ['icons', 'Toast A collection of icons in all states', 'ReactNode'],
    ['isVisible', 'Toast exposure status value', 'Boolean'],
  ]
};
