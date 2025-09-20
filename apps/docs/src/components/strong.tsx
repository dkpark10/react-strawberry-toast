import { PropsWithChildren } from "react";

export default function Strong({ children }: PropsWithChildren) {
  return <strong className="bg-straw-berry bg-opacity-40 font-bold p-[2px] rounded">{children}</strong>;
}
