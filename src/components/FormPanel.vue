<template>
  <div>
    <div class="block">
      <span class="demonstration">日期选择框</span>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期时间">
      </el-date-picker>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value1: new Date()
      }
    }
  }
</script>
