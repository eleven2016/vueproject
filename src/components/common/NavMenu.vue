<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu class="el-menu-vertical-demo nav-menu" unique-opened :router="true" >
        <el-submenu v-for="item in menus" :index="item.menuName" :key="item.id">
          <template slot="title">
            <span v-text="item.menuName" class="el-icon-menu"></span>
          </template>
          <el-menu-item-group class="over-hide" v-for="subMenu in item.subMenus" :key="subMenu.id">
            <el-menu-item  :index="subMenu.menuUrl" v-text="subMenu.menuName" class="el-icon-arrow-right"></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  // var menuData = require('../assets/menu.json')
  // import Icon from '../../node_modules/vue-awesome/components/Icon.vue'
  export default {
    // components: {Icon},
    data () {
      return {
        menus: []
      }
    },
    created () {
      // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
      this.getMenus()
    },
    methods: {
      getMenus: function () {
        var menusUrl = '/api/menu/generateMenus?token=' + this.$store.getters.getToken
        this.$http.post(menusUrl).then(function (result) {
          this.menus = result.data.data
        }, function (error) {
          console.log(error)
        })
      }
    }
  }
</script>
<style scoped>
  @import '../../style/common/navmenu.css';
</style>
