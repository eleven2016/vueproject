<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <vheader></vheader>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <navmenu></navmenu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import Header from '@/components/Header'
  import NavMenu from '@/components/NavMenu'
  export default {
    name: 'app',
    components: {
      'navmenu': NavMenu,
      'vheader': Header
    }
  }
</script>
<style>
.header {
background-color: #409EFF;
color: #fff;
line-height: 60px;
}
</style>
