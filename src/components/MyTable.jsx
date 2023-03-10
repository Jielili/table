import { defineComponent, unref, toRef, computed, ref, toRefs } from 'vue'
import '@/assets/table.module.less'
export default defineComponent({
  props: {
    columns: {
      type: Array,
      default: () => []
    }, 
    objectives: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const { columns, objectives } = toRefs(props)

    // const columns = unref(toRef(props.columns))
    // const objectives = unref(toRef(props.objectives))

    const tableStyle = computed(() => {
      const str = Object.values(columns.value.map((i) => i.width)).join("px ");
      return {
        "grid-template-columns": str + "px",
        "grid-template-rows": `repeat(5, 50px)`,
        // "grid-auto-rows": `max-content `,
      };
    });

    const items = ref([])
    // objectives.value.forEach((o, index) => {
    //   o.keyResults.forEach(kr => {
    //     items.value.push({
    //       objectiveContent: o.content,
    //       objectDescription: index,
    //       krContent: kr.content,
    //       indicator: 'indicator',
    //       startDay: 'startDay',
    //       endDay: 'endDay',
    //       progress: kr.progress
    //     })
    //   })
    // })
    objectives.value.forEach((o, index) => {
      items.value.push({
        value: o.content,
        style: {
          "grid-row-end": `span ${o.keyResults.length}`
        }
      }, {
        name: "objectDescription",
        value: index,
        style: {
          "grid-row-end": `span ${o.keyResults.length}`,
        },
      }
      )
      o.keyResults.forEach(kr => {
        items.value.push({
          name: 'krContent',
          value: kr.content,
        },{
          name: 'indicator',
          value: 'indicator',
        },{
          name: 'startDay',
          value: 'startDay',
        },{
          name: 'endDay',
          value: 'endDay',
        },)
      })
    })
    const headerItmes = columns.value.map(col => (
      <div className='item' index={col.right}>
        { col.name }
        <div className='right'></div>
      </div>
    ))
    return () => (
      <div className="table" style={ tableStyle.value }>
        {...headerItmes}
        {items.value.map(item => (
          <div className='item' style={ item.style }>
            { item.value }
          </div>
        ))}
      </div>
    )
  }
})