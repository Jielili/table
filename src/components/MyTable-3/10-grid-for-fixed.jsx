import { defineComponent, toRefs } from 'vue'
import classes from '@/assets/grid-for-fixed.module.less'
export default defineComponent({
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    }, 
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const { columns, rows, data } = toRefs(props)
    const leftColumns = columns.value.filter(item => item.fixed === 'left')
    const mainColumns = columns.value.filter(item => !item.fixed)

    const generateHeaderItems = (cols) => {
      return cols.reduce((pre, cur) => {
        pre.push(
          'children' in cur && cur.children.length ?
            <div className={!('children' in cur) &&classes.item}>
              <div className={classes.item}>{cur.title}</div>
              <div className={classes['header-grid']}>
                {generateHeaderItems(cur.children)}
              </div>
            </div> :
            <div className={classes.item}>
              {cur.title}
            </div>
        )
        return pre
      }, [])
    }

    const leftColumnHeaderItems = generateHeaderItems(leftColumns)
    const mainColumnHeaderItems = generateHeaderItems(mainColumns)


    return () => (
      <div className={classes.container}>
        {
          leftColumns.length &&
          <div className={[classes.left, classes.table]}>
              <div className={classes['left-header']}>
                { leftColumnHeaderItems }
              </div>
              <div className={classes['left-body']}></div>
          </div>
        }
        {
          mainColumns.length && 
          <div className={[classes.main, classes.table]}>
              <div className={classes['main-header']}>
               { mainColumnHeaderItems }
              </div>
              <div className={classes['main-body']}></div>
          </div>
        }
      </div>
    )
  }
})