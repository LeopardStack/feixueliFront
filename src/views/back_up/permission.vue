<template>
    <div class="permission">
      <div class="filter-bar">
      <el-select v-model="filterQuery" placeholder="筛选权限控制资源" @change="filterPermissions">
        <el-option
          v-for="option in filterOptions"
          :key="option"
          :label="option"
          :value="option">
        </el-option>
      </el-select>
      <el-button type="success" @click="openCreatePermissionDialog">增加新的权限</el-button>
    </div>
    <el-table
  :data="filteredData"
  border
  style="width: 100%;"
  height="950"
>
      <el-table-column
        v-for="column in tableColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
        header-align="center"
        >
        <template slot-scope="scope">
          <el-button  round size="small" @click="handleClick(scope.row, scope)"
          style="width: 80px;background-color: paleturquoise;">修改</el-button>
          <el-button round size="small" style="width: 80px;background-color: palevioletred;"
          @click="handleDelete(scope.row, scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改学生数据" :visible.sync="dialogFormVisible">
  <el-form :model="updatePermissionForm" :rules="rules" ref="updatePermissionForm">

    <el-form-item prop="permissionName">
      <el-tag type="success" style="width: 120px;">权限名称</el-tag>
      <el-input v-model="updatePermissionForm.permissionName" autocomplete="off"  style="width: 300px; margin-left: 20px;"></el-input>

    </el-form-item>

    <el-form-item prop="resource">
      <el-tag type="success" style="width: 120px;">权限所控制的资源</el-tag>
      <el-input v-model="updatePermissionForm.resource" autocomplete="off"  style="width: 300px; margin-left: 20px;"></el-input>
    </el-form-item>

    <el-form-item prop="permissionDescription">
      <el-tag type="success" style="width: 120px;">权限描述</el-tag>
      <el-input v-model="updatePermissionForm.permissionDescription" autocomplete="off"  style="width: 300px; margin-left: 20px;"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取消修改</el-button>
    <el-button type="primary" @click="updatePermission">确定修改</el-button>
  </div>
</el-dialog>

<el-dialog title="创建新的权限" :visible.sync="createPermissionDialogVisible">
      <el-form :model="newPermissionForm" :rules="rules" ref="addNewPermissionForm">
        <el-form-item prop="permissionName">
      <el-tag type="success" style="width: 120px;">权限名称</el-tag>
      <el-input v-model="newPermissionForm.permissionName" autocomplete="off"  style="width: 300px; margin-left: 20px;"></el-input>

    </el-form-item>

    <el-form-item prop="resource">
      <el-tag type="success" style="width: 120px;">权限所控制的资源</el-tag>
      <el-input v-model="newPermissionForm.resource" autocomplete="off"  style="width: 300px; margin-left: 20px;"></el-input>
    </el-form-item>

    <el-form-item prop="permissionDescription">
      <el-tag type="success" style="width: 120px;">权限描述</el-tag>
      <el-input v-model="newPermissionForm.permissionDescription" autocomplete="off"  style="width: 300px; margin-left: 20px;"></el-input>
    </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createPermissionDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createPermission">创建</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>

import { Message } from 'element-ui'
import { getPermissionsInfo } from '@/services/roles'
import { createPermission, updatePermissionService, deletePermissionService } from '@/services/permission'

export default {
  name: 'PermissionIndex',

  data () {
    return {
      tableData: [],
      tableColumns: [
        { prop: 'permissionID', label: '权限ID', width: '100' },
        { prop: 'permissionName', label: '权限名称', width: '120' },
        { prop: 'resource', label: '权限所控制的资源', width: '300' },
        { prop: 'description', label: '权限描述', width: '300' }
      ],
      dialogFormVisible: false,
      updatePermissionForm: {
        permissionID: '',
        permissionName: '',
        resource: '',
        permissionDescription: ''
      },

      filterQuery: '',
      filteredData: [],
      filterOptions: ['all', 'permission', 'project'],
      createPermissionDialogVisible: false,
      newPermissionForm: {
        permissionName: '',
        resource: '',
        permissionDescription: ''
      },

      rules: {
        permissionName: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
          { pattern: /^[A-Za-z]+$/, message: '权限名称只能包含英文字母', trigger: 'blur' }
        ],
        resource: [
          { required: true, message: '请输入权限所控制的资源', trigger: 'change' },
          { pattern: /^[A-Za-z.]+$/, message: '资源ID只能包含英文字母和.', trigger: 'blur' }
        ],
        permissionDescription: [
          { required: true, message: '请输入权限描述', trigger: 'blur' }
        ]
      }
    }
  },

  mounted () {
    this.loadRolesData()
  },

  watch: {
    tableData (newValue) {
      this.filteredData = newValue
    }
  },

  methods: {
    async loadRolesData () {
      try {
        const { data } = await getPermissionsInfo()
        console.log('权限信息', data)
        this.tableData = data.permissions

        // 提取资源名称的开头部分并添加到 filterOptions
        let resources = this.tableData.map(item => {
          const dotIndex = item.resource.indexOf('.')
          if (dotIndex !== -1) {
            return item.resource.substring(0, dotIndex)
          } else {
            return item.resource
          }
        })
        // 添加去重操作
        resources = [...new Set(resources)]
        // 添加默认的 'all'
        this.filterOptions = ['all', ...resources]
        console.log('权限类型', this.filterOptions)
      } catch (error) {
        console.log(error)
        Message.error('权限信息请求失败')
        // this.$router.push({ name: 'login' })
      }
    },

    async handleDelete (row, scope) {
      console.log(row)
      const { data } = await deletePermissionService({ permissionID: row.permissionID })
      if (data.code === 200) {
        // 移除已经被删除的权限
        const index = this.tableData.findIndex(permission => permission.permissionID === row.permissionID)
        this.tableData.splice(index, 1)
        // 如果使用了过滤，也需要在过滤结果中移除这个元素
        if (this.filterQuery !== 'all') {
          const filterIndex = this.filteredData.findIndex(permission => permission.permissionID === row.permissionID)
          this.filteredData.splice(filterIndex, 1)
        }
        Message.success('删除成功!')
      } else {
        Message.success('删除失败 ' + data.msg)
      }
    },

    handleClick (row, scope) {
      this.dialogFormVisible = true
      this.updatePermissionForm.permissionID = row.permissionID
      this.updatePermissionForm.permissionName = row.permissionName
      this.updatePermissionForm.resource = row.resource
      this.updatePermissionForm.permissionDescription = row.description
    },

    filterPermissions () {
      if (this.filterQuery === 'all') {
        // 当选项为 'all' 时，显示所有数据
        this.filteredData = this.tableData
      } else if (this.filterQuery) {
        // 其他选项按照资源名称的开头部分进行过滤
        this.filteredData = this.tableData.filter(permission =>
          permission.resource.startsWith(this.filterQuery)
        )
      } else {
        // 如果没有选择任何选项，也显示所有数据
        this.filteredData = this.tableData
      }
    },

    openCreatePermissionDialog () {
      this.createPermissionDialogVisible = true
    },

    async createPermission () {
      console.log(this.$refs.addNewPermissionForm)
      this.$refs.addNewPermissionForm.validate(async (valid) => {
        // `validate` 方法的回调函数会接收一个参数，表示验证是否通过。
        // 如果验证没有通过，你应该停止表单提交，并向用户显示一些提示信息。
        console.log('开始验证 ', valid)
        if (!valid) {
          return
        }

        try {
          const { data } = await createPermission(this.newPermissionForm)

          // After the permission is created, we add it to the table.
          if (data.code === 200) {
            this.tableData.push(data.permission)
            console.log('添加新的权限', data)
            this.createPermissionDialogVisible = false

            // Clear the form.
            this.newPermissionForm = {
              permissionName: '',
              resource: '',
              permissionDescription: ''
            }
            Message.success('成功添加新的权限')
          } else {
            Message.error(data.msg)
          }
        } catch (error) {
          console.log(error)
          Message.error('创建权限失败')
        }
      })
    },
    // 创建 updatePermission 方法
    async updatePermission () {
      this.$refs.updatePermissionForm.validate(async (valid) => {
        if (!valid) {
          return
        }

        try {
          const { data } = await updatePermissionService(this.updatePermissionForm)

          if (data.code === 200) {
            // After the permission is updated, we update the data in the table
            const index = this.tableData.findIndex(permission => permission.permissionID === this.updatePermissionForm.permissionID)
            this.tableData.splice(index, 1, data.permission)
            console.log('更新权限信息', data)
            this.dialogFormVisible = false

            // Clear the form
            this.updatePermissionForm = {
              permissionID: '',
              permissionName: '',
              resource: '',
              permissionDescription: ''
            }
            Message.success('成功更新权限信息')

            // 重新过滤表格数据
            this.filterQuery = 'all'
            this.filterPermissions()
          } else {
            Message.error(data.msg)
          }
        } catch (error) {
          console.log(error)
          Message.error('更新权限失败')
        }
      })
    }

    // 其他方法

  }
}
</script>

<style lang="scss" scoped>
.filter-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-input {
  flex-grow: 1;
  margin-right: 20px;
}
</style>
