import { ref, computed } from 'vue'
export default function useColumns (columns) {
  const columnsWidth = ref({})
  const getWidths = (cols) => {
    cols.forEach(col => {
      if ('children' in col) {
        getWidths(col.children)
      } else {
        columnsWidth.value[col.dataIndex] = col.width
      }
    })
  }

  const getGridTemplateColumns = (cols) => {
    return cols.map(col => {
      if ('children' in col) {
        return getGridTemplateColumns(col.children)
      } else {
        return columnsWidth.value[col.dataIndex] ? `${columnsWidth.value[col.dataIndex]}px` : 'max-content'
      }
    }).join(' ')
  }

  const leftColumns = computed(() => columns.value.filter(item => item.fixed === 'left'))
  const mainColumns = computed(() => columns.value.filter(item => !item.fixed))
  const leftGridTemplateColumns = computed(() => getGridTemplateColumns(leftColumns.value))
  const mainGridTemplateColumns = computed(() => getGridTemplateColumns(mainColumns.value))

  getWidths(columns.value)

  return {
    columnsWidth,
    leftColumns,
    mainColumns,
    leftGridTemplateColumns,
    mainGridTemplateColumns
  }
}
