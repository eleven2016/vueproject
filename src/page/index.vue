<template>
  <div>
    <el-container>
      <el-header style="height: 60px;background-color: rgb(238, 241, 246);border-bottom-width: 2px">
        <span style="padding-top: 20px"> VUE+Element</span>
      </el-header>
      <el-container>
        <el-aside style="height: 840px;width: 200px">
          导航栏
        </el-aside>
        <el-container>
          <el-main>
            <router-view name="main"></router-view>
          </el-main>
          <el-footer>
            @copy right long
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
