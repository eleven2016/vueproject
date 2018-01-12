<template>
  <div>
    <el-container>
      <el-header style="height: 60px;background-color: rgb(238, 241, 246);border-bottom-width: 2px">
        <span style="padding-top: 20px"> VUE+Element</span>
      </el-header>
      <el-container>
        <el-aside style="height: 840px;width: 200px">
          <router-link to="mainBorder" tag="li">
            <a>进入主操作界面</a>
          </router-link>
        </el-aside>
        <el-container>
          <el-main>
            操作区
            <router-view name="mainContainer"></router-view>
          </el-main>
          <el-footer>
            @copy right long
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
