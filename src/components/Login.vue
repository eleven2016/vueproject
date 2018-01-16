<template>
  <div id="login" class="demo-login">
    <el-form :model="form" labelWidth="100px" labelPosition="right" size="small" class="demo-login-form">

      <el-row :span="8">
        <el-col :span="3" class="demo-login-form-label">
          用户名:
        </el-col>
        <el-col :span="5">
          <el-input v-model="form.loginName" class="demo-login-form-input"></el-input>
        </el-col>
      </el-row>
      <el-row :span="8">
        <el-col :span="3" class="demo-login-form-label demo-login-form-label-margin-top">
          <label >密码:</label>
        </el-col>
        <el-col :span="5" class="demo-login-form-label-margin-top">
          <el-input v-model="form.password" class="demo-login-form-input"></el-input>
        </el-col>
      </el-row>
      <el-row :span="4">
        <el-col class="demo-login-form-label-margin-top demo-login-form-button-margin-left" :span="2">
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'

  export default {
    components: {
      ElCol,
      ElRow},
    data () {
      return {
        form: {
          loginName: 'admin',
          password: 'admin'
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>
<style>
  @import "../style/login.css";
</style>
