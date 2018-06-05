<template>
  <div>
    定时任务
  </div>
</template>
<script>
  import ElCol from 'element-ui/packages/col/src/col'
  import ElRow from 'element-ui/packages/row/src/row'

  export default {
    components: {ElCol, ElRow},
    data () {
      return {

      }
    },
    created () {
      console.log('初始化定时任务')
    },
    methods: {
    }
  }
</script>
<style scoped>
  @import '../../style/basic/menu.css';
</style>
