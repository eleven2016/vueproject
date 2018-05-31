<template>
  <div>
    <div>
      <el-row>
        <el-col :span="6">
          <el-input v-model="name" placeholder="请输入用户名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" class="handle-button" @click = "query(1)">搜索</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-edit" class="handle-button" @click="handleEdit(0)">新增</el-button>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 100px">
      <el-row>
        <el-col :span="24">
          <el-table  :data="tableData"  :stripe="true" >
            <el-table-column   label="ID" prop="id"  ></el-table-column>
            <el-table-column   label="用户名称" prop="userName" ></el-table-column>
            <el-table-column   label="用户账号" prop="account" ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row.id)" icon="el-icon-edit">编辑</el-button>
                <el-button size="mini" @click="openRoles(scope.row.id)" icon="el-icon-edit">关联角色</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col>
          <el-pagination  layout="pager, total" @current-change="query" :total="total"> </el-pagination>
        </el-col>
      </el-row>
    </div>
    <div >
      <el-dialog title="编辑用户" :visible.sync="editDialogVisible"  center close="cancelSubmit">
        <el-form :model="model" >
          <el-form-item label="用户名称：" >
            <el-input v-model="model.userName" auto-complete="off" class="el-form-item-input"></el-input>
          </el-form-item>
          <el-form-item label="用户账号：" >
            <el-input v-model="model.account" auto-complete="off" class="el-form-item-input"></el-input>
          </el-form-item>
          <el-form-item label="用户密码：" >
            <el-input type="password" v-model="model.password" auto-complete="off" class="el-form-item-input"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog title="编辑用户所属角色" :visible.sync="selectRoleVisible"  center >
        <div style="text-align: center">
          <el-transfer
            style="text-align: left; display: inline-block"
            v-model="selectedRoles"
            :titles="['未关联角色', '已关联角色']"
            :data="allRoles"
            :props="{key: 'id',label: 'roleName'}">
            <span slot-scope="{ option }">{{ option.label }}</span>
          </el-transfer>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitSelectedRoles">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import ElCol from 'element-ui/packages/col/src/col'
  import ElRow from 'element-ui/packages/row/src/row'

  export default {
    components: {ElCol, ElRow},
    data () {
      return {
        tableData: [],
        name: '',
        total: 0,
        editDialogVisible: false,
        model: {
          id: 0,
          userName: '',
          account: '',
          password: ''
        },
        selectRoleVisible: false,
        selectedRoles: [],
        allRoles: [],
        selectedUserId: 0
      }
    },
    created () {
      console.log('初始化')
      this.query(1)
      this.getAllRoles()
    },
    methods: {
      // 分页查询菜单
      query: function (currentPage) {
        var url = '/api/user/queryByPage?pageNum=' + currentPage + '&pageSize=10'
        var condition = {
          'userName': this.name
        }
        this.$http.post(url, condition).then(function (result) {
          this.tableData = result.data.data
          this.total = result.data.total
        }, function (error) {
          console.log(error)
        })
      },
      // 编辑用户
      handleEdit: function (id) {
        if (id > 0) {
          var url = '/api/user/queryById?id=' + id
          this.$http.post(url).then(function (result) {
            this.model = result.data.data
          }, function (error) {
            console.log(error)
          })
        } else {
          this.initModel()
        }
        this.editDialogVisible = true
      },
      // 提交保存
      onSubmit: function () {
        var url = '/api/user/add'
        this.$http.post(url, this.model).then(function (result) {
          if (result.data.success) {
            this.$message({
              message: '编辑角色成功',
              type: 'success'
            })
            this.editDialogVisible = false
            this.initModel()
            this.query(1)
          } else {
            this.$message({
              message: result.data.errorMessage,
              type: 'warning'
            })
          }
        }, function (error) {
          console.log(error)
        })
      },
      // 取消保存
      cancelSubmit: function () {
        this.editDialogVisible = false
        this.initModel()
      },
      // 初始化
      initModel: function () {
        this.model = {
          id: 0,
          userName: '',
          account: '',
          password: ''
        }
      },
      // 加载所有角色
      getAllRoles: function () {
        var url = '/api/role/queryByCondition'
        this.$http.post(url).then(function (result) {
          this.allRoles = result.data.data
        }, function (error) {
          console.log(error)
        })
      },
      // 打开角色列表
      openRoles: function (userId) {
        this.selectedUserId = userId
        var url = '/api/user/findRolesByUserId?id=' + userId
        this.$http.post(url).then(function (result) {
          this.selectedRoles = result.data.data
          this.selectRoleVisible = true
        }, function (error) {
          console.log(error)
        })
      },
      // 保存选择的权限列表
      submitSelectedRoles: function () {
        var url = '/api/user/saveRolePerMap'
        var param = {
          userId: this.selectedUserId,
          roles: this.selectedRoles
        }
        this.$http.post(url, param).then(function (result) {
          if (result.data.success) {
            this.$message({
              message: '关联角色成功',
              type: 'success'
            })
          }
        }, function (error) {
          console.log(error)
        })
      }
    }
  }
</script>
<style scoped>
  @import '../../style/basic/user.css';
</style>
