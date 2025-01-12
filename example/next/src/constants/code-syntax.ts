export const codeSyntax = {
  started: 
`import { ToastContainer, toast } from 'react-strawberry-toast';
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
        bg-white p-2 flex justify-between gap-2 rounded-sm
      ${'`'}}
    >
      <span>custom toast</span>
      <button type="button" onClick={close} className="bg-straw-berry text-white w-6 h-6 rounded-sm">
        X
      </button>
    </div>
  )
);`,

    multiContainer: 
`import { ToastContainer, toast } from 'react-strawberry-toast';
      
function App() {
  const [msg, setMsg] = useState('');

  const onClick = () => {
    if (!msg) return;
    toast.custom(
      ({ isVisible }) => (
        <div
          role="alert"
          className={${'`'}bg-red-500 rounded-md px-2 text-white ${'${clsx('}
            isVisible ? 'animate-right-grow' : 'animate-left-shrink'
          )}${'`'}}
        >
          {msg}
        </div>
      ), 
      {
        containerId: '1',
      }
    );
    setMsg('');
  };
          
  return (
    <>
      <div id="profile" className="border border-primary-gray p-2 w-10/12">
        <div className="flex items-center gap-2">
          <Image src="/profile.svg" width={34} height={34} alt="profile icon" />
          <div>developer</div>
        </div>

        <div className="py-1" />
        <ToastContainer containerId="1" />
        <div className="py-2" />
        <div className="py-2" />

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="w-full border border-primary-gray px-1"
            placeholder="type a message"
          />
          <button type="button" onClick={onClick}>
            <Image src="/send.svg" width={24} height={24} alt="send icon" />
          </button>
        </div>
      </div>
    </>
  );
}`
};
