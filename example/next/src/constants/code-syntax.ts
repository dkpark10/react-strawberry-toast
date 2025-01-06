export const codeSyntax = {
  started: `import { ToastContainer, toast } from 'react-strawberry-toast';
import 'react-strawberry-toast/dist/style.css';
  
function App() {
  const click = () => {
    toast('hello strawberry toast');
  };
      
  return (
    <>
      <ToastContainer />
      <button type='button' onClick={click}>click</button>
    </>
  );
}`,
  success: `

      toast.success('success');     


`,
  error: `

      toast.error('error');     


`,
  warn: `

      toast.warn('warn');     


`,
  promise: `
         toast.promise(promise, {
           loading: 'loading',           
           success: 'success',
           error: 'error',
         });                     
         
`,
  custom: 
`toast(
  ({ close, isVisible }) => (
    <div
      className={${'`'}
        ${"${isVisible ? 'react-strawberry-toast__fade-in' : 'react-strawberry-toast__fade-out'}"}
        bg-white p-4 flex justify-between gap-2 rounded-sm
      ${'`'}}
    >
      <span>custom toast</span>
      <button type="button" onClick={close} className="bg-straw-berry text-white w-6 h-6 rounded-sm">
        X
      </button>
    </div>
  )
);`
    
};
