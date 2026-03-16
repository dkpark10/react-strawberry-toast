# React-Strawberry-Toast

A simple and customizable React toast library

<video src="./promotion1.mp4" autoplay loop muted playsinline width="500"></video>
<video src="./promotion2.mp4" autoplay loop muted playsinline width="300"></video>
<video src="./promotion3.mp4" autoplay loop muted playsinline width="300"></video>

## Features

- **Lightweight** - Less than 11kb bundle size
- **3 Built-in Themes** - Ready-to-use style presets (more coming soon)
- **Promise Support** - Handle async operations with loading, success, and error states
- **Headless Mode** - Full control over rendering with `useToasts` hook
- **Easy Customization** - Style with CSS, Tailwind, Emotion, or inline styles
- **Stack Mode** - Overlay toasts in a compact stacked view
- **Flexible Positioning** - Place toasts anywhere, even relative to target elements like tooltips
- **More Options Coming Soon** - Actively maintained and evolving

## Documentation

For more detailed information, please refer to the official [Documentation](https://react-strawberry-toast.com/)

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
| stack      | Allow toast overlap  |  Boolean | false |


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
| closeButton      | Option to show or hide the close button  | Boolean | false |


## License

MIT
