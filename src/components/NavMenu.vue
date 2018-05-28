<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu class="el-menu-vertical-demo nav-menu" unique-opened router>
        <el-submenu v-for="item in menus" :index="item.id" :key="item.id">
          <template slot="title">
            <span v-text="item.menuName" class="el-icon-menu"></span>
          </template>
          <el-menu-item-group class="over-hide" v-for="sub in item.subMenus" :key="sub.id">
            <el-menu-item :index="sub.id" v-text="sub.menuName" class="el-icon-arrow-right"></el-menu-item>
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
        var menusUrl = '/api/menu/generateMenus'
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
  @import '../style/navmenu.css';
</style>
