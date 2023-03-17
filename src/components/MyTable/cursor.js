export const changeCursorToResize = direction => {
  document.documentElement.style.cursor = `${direction}-resize`
  document.documentElement.style.userSelect = 'none'
}

export const restCursor = () => {
  document.documentElement.style.cursor = ''
  document.documentElement.style.userSelect = 'unset'
}
