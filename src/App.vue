<template>
  <div id="app" >
    <div class="demo-app">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    // 定义本组件的名称
    name: 'app'
  }
</script>
<style>
  @import './style/app.css';
</style>
