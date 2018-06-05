<template>
  <div id="MainPanel">
    <el-container :span="20" class="demo-container">
      <el-header class="demo-header">
        <container-header></container-header>
      </el-header>
      <el-container>
        <el-aside width="200px" class="demo-menu">
          <navMenu></navMenu>
        </el-aside>
        <el-container>
          <el-main class="demo-main">
            <router-view></router-view>
          </el-main>
          <el-footer class="demo-footer">
            <container-footer></container-footer>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  // 引入本页面使用到的组件
  import Header from '@/components/common/Header.vue'
  import NavMenu from '@/components/common/NavMenu'
  import Footer from '@/components/common/Footer'
  export default {
    // 定义本组件的名称
    name: 'MainPanel',
    // 定义本组件内使用到的组件的别名
    components: {
      'navMenu': NavMenu,
      'container-header': Header,
      'container-footer': Footer
    }
  }
</script>
<!-- 导入自定义的css文件 -->
<style scoped>
  @import "../../style/common/MianPanel.css";
</style>
