<template>
  <div>
    <div>
      <el-row>
        <el-col :span="6">
          <el-input v-model="menuName" placeholder="请输入菜单名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" class="menu-button" @click = "queryMenus(1)">搜索</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-edit" class="menu-button" @click="handleEdit(0)">新增</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table  :data="menus"  :stripe="true" class="menu-table">
            <el-table-column   label="ID" prop="id"  ></el-table-column>
            <el-table-column   label="菜单名称" prop="menuName" ></el-table-column>
            <el-table-column   label="URL" prop="menuUrl" ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row.id)" icon="el-icon-edit">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col>
          <el-pagination  layout="pager, total" @current-change="queryMenus" :total="total"> </el-pagination>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-dialog title="编辑菜单" :visible.sync="editDialogVisible"  center close="cancelSubmit">
        <el-form :model="menuModel" >
          <el-form-item label="菜单名称：" >
            <el-input v-model="menuModel.menuName" auto-complete="off" class="el-form-item-input"></el-input>
          </el-form-item>
          <el-form-item label="菜单URL：" :span="6" >
            <el-input v-model="menuModel.menuUrl" auto-complete="off" class="el-form-item-input"></el-input>
          </el-form-item>
          <el-form-item label="菜单层级：" >
          <el-select v-model="menuModel.level" placeholder="请选择菜单层级">
            <el-option label="顶级菜单" :value="1"></el-option>
            <el-option label="二级菜单" :value="2"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="上级菜单："  v-show="menuModel.level==2">
            <el-select v-model="menuModel.pid" placeholder="请选择上级">
              <el-option v-for="item in parentMenus" :label="item.menuName" :key="item.id" :value="item.id"></el-option>
            </el-select>
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
        menus: [],
        menuName: '',
        total: 0,
        editDialogVisible: false,
        menuModel: {
          id: 0,
          menuName: '',
          menuUrl: ''
        },
        parentMenus: []
      }
    },
    created () {
      this.queryMenus(1)
      this.queryParentMenu()
      console.log('初始化')
    },
    methods: {
      // 分页查询菜单
      queryMenus: function (currentPage) {
        var menusUrl = '/api/menu/queryByPage?pageNum=' + currentPage + '&pageSize=10'
        var condition = {
          'menuName': this.menuName
        }
        this.$http.post(menusUrl, condition).then(function (result) {
          this.menus = result.data.data
          this.total = result.data.total
        }, function (error) {
          console.log(error)
        })
      },
      // 编辑菜单
      handleEdit: function (id) {
        if (id > 0) {
          var menusUrl = '/api/menu/queryById?id=' + id
          this.$http.post(menusUrl).then(function (result) {
            this.menuModel = result.data.data
          }, function (error) {
            console.log(error)
          })
        } else {
          this.initMenuModel()
        }
        this.editDialogVisible = true
      },
      // 查询顶级菜单
      queryParentMenu: function () {
        var menusUrl = '/api/menu/queryByCondition'
        var condition = {
          'level': 1
        }
        this.$http.post(menusUrl, condition).then(function (result) {
          this.parentMenus = result.data.data
        }, function (error) {
          console.log(error)
        })
      },
      // 提交保存
      onSubmit: function () {
        var menusUrl = '/api/menu/add'
        this.$http.post(menusUrl, this.menuModel).then(function (result) {
          var thisTemplate = this
          if (result.data.success) {
            this.$message({
              message: '添加菜单成功',
              type: 'success'
            })
            this.editDialogVisible = false
            thisTemplate.initMenuModel()
            thisTemplate.queryParentMenu()
            thisTemplate.queryMenus(1)
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
        this.initMenuModel()
      },
      initMenuModel: function () {
        this.menuModel = {
          id: 0,
          menuName: '',
          menuUrl: ''
        }
      }
    }
  }
</script>
<style scoped>
  @import '../../style/basic/menu.css';
</style>
