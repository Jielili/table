import { defineComponent, toRefs } from 'vue'
import classes from '@/assets/styles/my-table.module.less'
export default defineComponent({
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const { columns, data } = toRefs(props)
    const generateDataItems = (cols) => {
      const items = []
      cols.forEach((col, i) => {
        if (col.children && col.children.length) {
          items.push(...generateDataItems(col.children))
        } else {
          data.value.forEach((item, dataIndex) => {
            (!col.rowSpan || col.rowSpan(item)) && items.push(
              <div key={`${item.krId}-${col.dataIndex}`} className={classes.item} bottomIndex={item.krId} style={ col.rowSpan && col.rowSpan(item) && { 'grid-row-end': `span ${col.rowSpan(item)}` }}>
                <div className={ classes.content }>
                  {(col.dataIndex.split(':')).reduce((pre, cur) => pre[cur] || '-', item)}
                </div>
                {col.dataIndex === 'krContent' && <div className={classes.bottom} ></div>}
              </div>
            )
          })
        }
      })
      return items
    }
    return () => generateDataItems(columns.value)
  }
})
