export const changeCursorToResize = (direction) => {
  document.documentElement.style.cursor = `${direction}-resize`;
};

export const restCursor = () => {
  document.documentElement.style.cursor = "";
};