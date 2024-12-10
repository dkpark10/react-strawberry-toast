import { styled } from "@linaria/react";
import type { PropsWithChildren, ReactNode } from "react";
import type { ToastStatus } from "@/core/types";

const ToastStatusWrapper = styled.div`
  background-color: white;
  padding: 12px 12px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  justify-content: space-around;

  & .inner-content {
    margin-left: 5px;
  }
`;

function Success({ children }: PropsWithChildren) {
  return (
    <ToastStatusWrapper>
      <svg
        stroke="none"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        height="20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke="none" d="M0 0h24v24H0z"></path>
        <path
          d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
          stroke-width="0"
          fill="#1ab173"
        />
      </svg>
      <div className="inner-content">
        {children}
      </div>
    </ToastStatusWrapper>
  );
}

export const ToastComponents: Record<ToastStatus, (props: PropsWithChildren) => ReactNode> = {
  default: (props: PropsWithChildren) => <>{props.children}</>,
  success: Success,
  error: Success,
  loading: Success,
  warn: Success,
};
