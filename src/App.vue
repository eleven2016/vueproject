<template>
  <div id="app" >
    <div class="demo-app">
      <login ></login>
    </div>

  </div>
</template>
<script>
  // 引入本页面使用到的组件
  import Login from '@/components/Login.vue'
  export default {
    // 定义本组件的名称
    name: 'app',
    // 定义本组件内使用到的组件的别名
    components: {
      'login': Login
    }
  }
</script>
<style>
  @import './style/app.css';
</style>
