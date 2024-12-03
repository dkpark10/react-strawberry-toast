import { useToast } from '../core/store';

export function ToastContainer() {
  const toastList = useToast();

  return (
    <div>
      {toastList.map((toast) => (
        <div key={toast.id} style={{ border: '1px solid red' }}>
          {toast.data}
        </div>
      ))}
    </div>
  );
}
