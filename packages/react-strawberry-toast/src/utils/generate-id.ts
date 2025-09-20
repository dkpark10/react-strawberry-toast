export const generateId = () => {
  let id = 0;
  return () => `react-strawberry-toast_${id++}`;
};
