import { defineComponent, toRefs } from 'vue'
import classes from '@/assets/styles/my-table.module.less'

export default defineComponent({
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    columnsWidth: {
      type: Object,
      default: () => { }
    }
  },
  setup (props) {
    const { columns, columnsWidth } = toRefs(props)
    const generateHeaderItems = (cols) => {
      return cols.reduce((pre, cur) => {
        pre.push(
          'children' in cur && cur.children.length
            ? <div>
                <div className={classes.item}>
                  <div className={classes.content}>
                    {cur.title}
                  </div>
                </div>
                <div className={classes['header-grid']}>
                  {generateHeaderItems(cur.children)}
               </div>
              </div>
            : <div className={classes.item} index={ cur.dataIndex }>
                <div className={classes.content} style={ { width: `${columnsWidth.value[cur.dataIndex] - 1}px` }}>
                  {cur.title}
                </div>
                <div className={classes.right}></div>
              </div>
        )
        return pre
      }, [])
    }
    return () => generateHeaderItems(columns.value)
  }
})
