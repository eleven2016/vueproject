<template>
  <div>
    <div>
      <el-row>
        <el-col :span="6">
          <el-input v-model="name" placeholder="请输入权限名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" class="handle-button" @click = "query(1)">搜索</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-edit" class="handle-button" @click="handleEdit(0)">新增</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table  :data="tableData"  :stripe="true" class="menu-table">
            <el-table-column   label="ID" prop="id"  ></el-table-column>
            <el-table-column   label="权限名称" prop="name" ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row.id)" icon="el-icon-edit">编辑</el-button>
                <el-button size="mini" @click="handleEdit(scope.row.id)" icon="el-icon-edit">关联菜单</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col>
          <el-pagination  layout="pager, total" @current-change="query" :total="total"> </el-pagination>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-dialog title="编辑权限" :visible.sync="editDialogVisible"  center close="cancelSubmit">
        <el-form :model="model" >
          <el-form-item label="权限名称：" >
            <el-input v-model="model.name" auto-complete="off" class="el-form-item-input"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit">确 定</el-button>
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
          name: ''
        }
      }
    },
    created () {
      this.query(1)
    },
    methods: {
      // 分页查询菜单
      query: function (currentPage) {
        var url = '/api/permission/queryByPage?pageNum=' + currentPage + '&pageSize=10'
        var condition = {
          'name': this.name
        }
        this.$http.post(url, condition).then(function (result) {
          this.tableData = result.data.data
          this.total = result.data.total
        }, function (error) {
          console.log(error)
        })
      },
      // 编辑菜单
      handleEdit: function (id) {
        if (id > 0) {
          var url = '/api/permission/queryById?id=' + id
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
        var url = '/api/permission/add'
        this.$http.post(url, this.model).then(function (result) {
          if (result.data.success) {
            this.$message({
              message: '编辑权限成功',
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
      initModel: function () {
        this.model = {
          id: 0,
          name: ''
        }
      }
    }
  }
</script>
<style scoped>
  @import '../../style/basic/permission.css';
</style>
