<template>
  <div>
    <div>
      <el-row>
        <el-col :span="6">
          <el-input v-model="name" placeholder="请输入定时任务名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" class="handle-button" @click = "query(1)">搜索</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-edit" class="handle-button" @click="handleEdit('')">新增</el-button>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 100px">
      <el-row>
        <el-col :span="24">
          <el-table  :data="tableData"  :stripe="true" width="100%">
            <el-table-column   label="定时任务名称" prop="jobName"  width="150px"></el-table-column>
            <el-table-column   label="执行类名称" prop="jobClassName" width="200px"></el-table-column>
            <el-table-column   label="定时任务组" prop="jobGroup" width="150px"></el-table-column>
            <el-table-column   label="cron表达式" prop="cron" width="150px"></el-table-column>
            <el-table-column   label="执行间隔" prop="repeatInterval" width="50px"></el-table-column>
            <el-table-column   label="已执行次数" prop="timesTriggered" width="100px"></el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button type="primary" size="mini" @click="startJob(scope.row.jobName,scope.row.jobGroupName)" icon="el-icon-caret-right">启动</el-button>
                <el-button type="primary" size="mini" @click="pauseJob(scope.row.jobName,scope.row.jobGroupName)" icon="el-icon-time">暂停</el-button>
                <el-button type="primary" size="mini" @click="resumeJob(scope.row.jobName,scope.row.jobGroupName)" icon="el-icon-refresh">恢复</el-button>
                <el-button type="primary" size="mini" @click="deleteJob(scope.row.jobName,scope.row.jobGroupName)" icon="el-icon-error">删除</el-button>
                <el-button  type="primary" size="mini" @click="handleEdit(scope.row.jobName,scope.row.jobGroupName)" icon="el-icon-edit">编辑</el-button>
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
      <el-dialog title="编辑定时任务" :visible.sync="editDialogVisible"  center close="cancelSubmit">
        <el-form :model="model" >
          <el-form-item label="任务名称：" >
            <el-input v-model="model.jobName" auto-complete="off" :disabled="!addButtonVisible" class="el-form-item-input"></el-input>
          </el-form-item>
          <el-form-item label="任务组名称：" >
            <el-input v-model="model.jobGroup" auto-complete="off" :disabled="!addButtonVisible" class="el-form-item-input"></el-input>
          </el-form-item>
          <el-form-item label="执行类名称：" >
            <el-input v-model="model.jobClassName" auto-complete="off" :disabled="!addButtonVisible" class="el-form-item-input"></el-input>
          </el-form-item>
          <el-form-item label="CRON：" >
            <el-input v-model="model.cron" auto-complete="off" class="el-form-item-input"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" v-if="addButtonVisible" @click="onAdd">新增</el-button>
          <el-button type="primary" v-if="!addButtonVisible" @click="onUpdate">更新</el-button>
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
          jobName: '',
          jobGroup: '',
          jobClassName: '',
          cron: ''
        },
        addButtonVisible: true
      }
    },
    created () {
      this.query(1)
      console.log('初始化定时任务')
    },
    methods: {

      // 分页查询菜单
      query: function (currentPage) {
        var url = '/api/quartz/queryJobs?pageNum=' + currentPage + '&pageSize=10'
        var condition = {
          jobName: this.name
        }
        this.$http.post(url, condition).then(function (result) {
          this.tableData = result.data.data
          this.total = result.data.total
        }, function (error) {
          console.log(error)
        })
      },
      // 编辑菜单
      handleEdit: function (jobName, groupName) {
        console.log('jobname==' + jobName)
        if (jobName) {
          this.addFlag = false
          var url = '/api/quartz/queryJobs?pageNum=1&pageSize=10'
          var condition = {
            jobName: jobName,
            jobGroup: groupName
          }
          this.$http.post(url, condition).then(function (result) {
            this.model = result.data.data[0]
          }, function (error) {
            console.log(error)
          })
          this.addButtonVisible = false
        } else {
          this.addButtonVisible = true
          this.initModel()
        }
        this.editDialogVisible = true
      },
      // 新增
      onAdd: function () {
        var url = '/api/quartz/addJob'
        this.$http.post(url, this.model).then(function (result) {
          if (result.data.success) {
            this.$message({
              message: '新增任务成功',
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
      // 更新
      onUpdate: function () {
        var url = '/api/quartz/updateJob'
        this.$http.post(url, this.model).then(function (result) {
          if (result.data.success) {
            this.$message({
              message: '更新任务成功',
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
      // 初始化model
      initModel: function () {
        this.model = {
          jobName: '',
          jobGroup: '',
          jobClassName: '',
          cron: ''
        }
      },
      // 启动job
      startJob: function (jobName, jobGroupName) {
        var url = '/api/quartz/startJob'
        var condition = {
          jobName: jobName,
          jobGroup: jobGroupName
        }
        this.$http.post(url, condition).then(function (result) {
          if (result.data.success) {
            this.$message({
              message: '启动任务成功',
              type: 'success'
            })
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
      // 暂停job
      pauseJob: function (jobName, jobGroupName) {
        var url = '/api/quartz/pauseJob'
        var condition = {
          jobName: jobName,
          jobGroup: jobGroupName
        }
        this.$http.post(url, condition).then(function (result) {
          if (result.data.success) {
            this.$message({
              message: '暂停任务成功',
              type: 'success'
            })
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
      // 恢复job
      resumeJob: function (jobName, jobGroupName) {
        var url = '/api/quartz/resumeJob'
        var condition = {
          jobName: jobName,
          jobGroup: jobGroupName
        }
        this.$http.post(url, condition).then(function (result) {
          if (result.data.success) {
            this.$message({
              message: '恢复任务成功',
              type: 'success'
            })
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
      // 删除job
      deleteJob: function (jobName, jobGroupName) {
        var url = '/api/quartz/deleteJob'
        var condition = {
          jobName: jobName,
          jobGroup: jobGroupName
        }
        this.$http.post(url, condition).then(function (result) {
          if (result.data.success) {
            this.$message({
              message: '删除任务成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: result.data.errorMessage,
              type: 'warning'
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
  @import '../../style/basic/menu.css';
</style>
