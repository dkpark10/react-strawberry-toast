import React, { useEffect } from 'react';
import { useToasts, toast, type ToastState } from 'react-strawberry-toast/dist/headless';

function Toast({ toastProps }: { toastProps: ToastState }) {
  const onMouseEnter = () => {
    toast.pause(toastProps.toastId);
  };

  const onMouseLeave = () => {
    toast.resume(toastProps.toastId);
  };

  const click = () => {
    toast.disappear(toastProps.toastId, 0);
    toast.remove(toastProps.toastId, 0);
  };

  useEffect(() => {
    if (!toast.isActive(toastProps.toastId)) {
      toast.disappear(toastProps.toastId, toastProps.timeOut || 3_000);
    }
  }, [toastProps.toastId]);

  return (
    <div
      className="border border-black inline-flex p-2 gap-2 bg-white"
      role="alert"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>{toastProps.data}</div>
      <button className="text-red-600" type="button" onClick={click}>
        X
      </button>
    </div>
  );
}

export default function HeadlessExample() {
  const toasts = useToasts();

  const click = () => {
    toast('strawberry toast');
  };

  return (
    <React.Fragment>
      <button className="p-2 bg-straw-berry text-white" type="button" onClick={click}>
        show toast
      </button>
      <div id="toast-container" className="top-4 left-4 right-4 bottom-4 fixed z-[9999] pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.toastId} className="pointer-events-auto">
            <Toast toastProps={toast} />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
