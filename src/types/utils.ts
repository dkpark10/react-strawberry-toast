export type RequiredExcept<T, K extends keyof T> = Required<Omit<T, K>> & Pick<T, K>;

export type Unpacked<T extends any[]> = T extends (infer U)[] ? U : never;
