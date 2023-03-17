import { onMounted, ref, unref } from 'vue'
import { restCursor, changeCursorToResize } from './cursor'
export default function useResizeColumnsWidth (tableRef, columns, resizeLineVerticalRef, resizeLineVerticalBolderRef) {
  const originClientX = ref(0)
  let offestYToTable = 0
  onMounted(() => {
    const table = unref(tableRef)
    const tableView = table.getBoundingClientRect()
    table.addEventListener('mousedown', e => {
      const { target } = e
      if (target.className.indexOf('right') >= 0) {
        changeCursorToResize('col')
        originClientX.value = e.clientX
        //
        const targetView = target.getBoundingClientRect()
        offestYToTable = targetView.left - tableView.left
        resizeLineVerticalRef.value.style.display = 'block'
        resizeLineVerticalRef.value.style.left = `${offestYToTable + 2}px`
        resizeLineVerticalBolderRef.value.style.display = 'block'
        resizeLineVerticalBolderRef.value.style.left = `${offestYToTable}px`
        resizeLineVerticalBolderRef.value.style.height = `${targetView.height}px`
        //
        const fn = mousemoveHandlerForCol(target.parentNode)
        table.addEventListener('mousemove', fn)
        document.addEventListener('mouseup', () => {
          table.removeEventListener('mousemove', fn)
          resizeLineVerticalRef.value.style.display = 'none'
          resizeLineVerticalBolderRef.value.style.display = 'none'
          restCursor()
        }, { once: true })
        document.addEventListener('mouseleave', () => {
          table.removeEventListener('mousemove', fn)
          resizeLineVerticalRef.value.style.display = 'none'
          resizeLineVerticalBolderRef.value.style.display = 'none'
          restCursor()
        }, { once: true })
      }
    })
  })

  const mousemoveHandlerForCol = el => {
    return e => {
      const clientX = e.clientX
      const moveDistance = clientX - originClientX.value
      const index = el.attributes.index.value
      columns.value[index] = el.offsetWidth + moveDistance
      offestYToTable += moveDistance
      resizeLineVerticalRef.value.style.left = `${offestYToTable + 2}px`
      resizeLineVerticalBolderRef.value.style.left = `${offestYToTable}px`
      originClientX.value = clientX
    }
  }
}
