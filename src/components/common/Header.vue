<template>
  <div>
    <el-row>
      <el-col :span="12">
        <span>管理平台</span>
      </el-col>
      <el-col :span="12" align="right">
        <el-dropdown trigger="click">
      <span style="font-size: 20px;color: white">
        {{user.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item ><a @click = "onExit">退&nbsp;&nbsp;出</a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import ElCol from 'element-ui/packages/col/src/col'
  import ElRow from 'element-ui/packages/row/src/row'

  export default {
    components: {ElCol, ElRow},
    data () {
      return {
        user: {}
      }
    },
    created () {
      this.getUser()
    },
    methods: {
      // 查询登录用户
      getUser: function () {
        var token = this.$store.getters.getToken
        var url = '/api/login/getUserByToken?token=' + token
        this.$http.get(url).then(function (result) {
          if (result.data.success) {
            this.user = result.data.data
          }
        }, function (error) {
          console.log(error)
        })
      },
      onExit: function () {
        console.log('退出')
        this.$store.commit('setToken', '')
        this.$router.push('/')
      }
    }
  }
</script>
