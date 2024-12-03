import { useToast } from '../core/store';

export function ToastContainer() {
  const toastList = useToast();

  return (
    <div>
      {toastList.map((toast) => {
        const close = () => toast.close(toast.timerId);
        const content =
          typeof toast.data === 'function' ? toast.data({ close }) : toast.data;
        return <div key={toast.id}>{content}</div>;
      })}
    </div>
  );
}
