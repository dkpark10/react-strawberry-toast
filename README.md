# React-Strawberry-Toast

A simple and customizable React toast library

## Documentation

For more detailed information, please refer to the official [Documentation](https://dkpark10.github.io/react-strawberry-toast/)

## Installation

```bash
npm i --save react-strawberry-toast
```

```bash
yarn add react-strawberry-toast
```

```bash
pnpm i --save react-strawberry-toast
```

## Usage

```jsx
import { ToastContainer, toast } from 'react-strawberry-toast';
import 'react-strawberry-toast/dist/index.css';
  
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
}
```

## API

### &lt;ToastContainer /&gt;

| Option | Description | Type | Required |
|:-----------|:-----------|:-----------|:-----------|
| Position      | Global toast's Position  |  top-left, top-center, top-right, bottom-left, bottom-center, bottom-right | false |
| ContainerId      | ToastContainer's unique id  |  String | false |
| Reverse      | Direction when toast appear  |  Boolean | false |
| Gap      | Gap Between toasts  |  Boolean | false |


### toast

| Option | Description | Type | Required |
|:-----------|:-----------|:-----------|:-----------|
| toastId      | Toast's unique Id  |  String | false |
| Position      | Position per toast  | top-left, top-center, top-right, bottom-left, bottom-center, bottom-right | false |
| ContainerId      | ID shown in the Toast Container Unique ID  |  String | false |
| PauseOnHover      | he Option that sets the timer to stop or not when a hover event occurs  |  Boolean | false |
| ToastType      | Toast Type |  default, custom, success, error, laoding, warn | false |
| TimeOut      | Time for toast to disappear  |  Number | false |
| RemoveTimeOut      | Time for toast to remove In Toast List  |  Number | false |

## License

MIT
