import { PropsWithChildren } from "react";

export default function SyntaxHighlight({ children }: PropsWithChildren) {
  return <span className="bg-straw-berry bg-opacity-40 font-bold p-[2px] rounded">{children}</span>;
}
