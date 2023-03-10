import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: String,
      defalut: ''
    }
  },
  setup(props) {
    return  () => <span>{ props.value }</span>
  }
})