export type ArrayWithLength<L extends number> = 
  L extends L ? number extends L ? any[] : _ArrayWithLength<L, []> : never;

export type _ArrayWithLength<L extends number, R extends any[]> = 
  R['length'] extends L ? R : _ArrayWithLength<L, [any, ...R]>;
