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
}
```

## API

### &lt;ToastContainer /&gt;

| Option | Description | Type | Default |
|:-----------|:-----------|:-----------|:-----------|
| position      | Global toast's Position  |  top-left, top-center, top-right, bottom-left, bottom-center, bottom-right | top-center |
| containerId      | ToastContainer's unique id  |  String |  |
| reverse      | Direction when toast appear  |  Boolean | false |
| className      | Class of ToastContainer  |  String |  |
| style      | Style of ToastContainer  |  Object | |
| gap      | Gap Between toasts  |  Number | 9 |
| pauseOnActivate      | Pause Toast timer when blur events occurs  |  Boolean | true |
| limit      | Limit the number of toast to be displayed |  Number | |


### toast

| Option | Description | Type | Default |
|:-----------|:-----------|:-----------|:-----------|
| toastId      | Toast's unique Id  |  String | |
| position      | Position per toast  | top-left, top-center, top-right, bottom-left, bottom-center, bottom-right | top-center |
| containerId      | ID shown in the Toast Container Unique ID  |  String | |
| pauseOnHover      | Option that sets the timer to stop or not when a hover event occurs  |  Boolean | true |
| icon      | The icon to be displayed in the toast  |  ReactNode | |
| timeOut      | Time for toast to disappear  |  Number | 3000 |
| removeTimeOut      | Time for toast to remove In Toast List  |  Number | 200 |
| className      | Class of toast  |  String |  |
| style      | Style of toast  |  Object | |
| target      | Target element where toast will be located  |  Object | |


## License

MIT
