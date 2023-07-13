<template>
<div class="role">
    <div class="filter-bar">
        <el-button type="success" @click="openCreateRoleDialog">增加新的角色</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="roleID" label="角色ID" width="100"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="120"></el-table-column>
        <el-table-column prop="roleDescription" label="角色描述" width="300"></el-table-column>
        <el-table-column label="权限" width="300" header-align="center">
            <template slot-scope="scope">
              <el-tree
  :data="scope.row.permissionsTree"
  show-checkbox
  node-key="id"
  :default-checked-keys="scope.row.defaultCheckedKeys"
  :props="{children: 'children', label: 'label'}">
</el-tree>

            </template>
        </el-table-column>
        <el-table-column label="操作" width="200" header-align="center">
            <template slot-scope="scope">
                <el-button round size="small" @click="handleClick(scope.row, scope)" style="width: 80px;background-color: paleturquoise;">修改</el-button>
                <el-button round size="small" style="width: 80px;background-color: palevioletred;" @click="handleDelete(scope.row, scope)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog title="修改学生数据" :visible.sync="dialogFormVisible">
        <el-form :model="form">

            <el-form-item>
                <el-tag type="success">角色名称</el-tag>
                <el-input v-model="form.roleName" autocomplete="off" style="width: 300px; margin-left: 20px;"></el-input>

            </el-form-item>

            <el-form-item>
                <el-tag type="success">角色描述</el-tag>
                <el-input v-model="form.roleDescription" autocomplete="off" style="width: 300px; margin-left: 20px;"></el-input>
            </el-form-item>

            <el-form-item>
    <el-tag type="success">角色权限</el-tag>
    <el-tree
      ref="rolePermissionsTree"
      :data="form.permissionsTree"
      show-checkbox
      node-key="id"
      :default-checked-keys="form.defaultCheckedKeys"
      :props="{children: 'children', label: 'label'}">
    </el-tree>
  </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
    <!-- 在提交表单时，包含修改后的权限 -->
    <el-button @click="dialogFormVisible = false">取消修改</el-button>
    <el-button type="primary" @click="updateRoleChanges">确定修改</el-button>
  </div>
    </el-dialog>

    <el-dialog title="创建新的角色" :visible.sync="createRoleDialogVisible">
      <el-form :model="newRoleForm" :rules="rules" ref="addNewRoleForm">
        <el-form-item prop="roleName">
      <el-tag type="success" style="width: 120px;">角色名称</el-tag>
      <el-input v-model="newRoleForm.roleName" autocomplete="off"  style="width: 300px; margin-left: 20px;"></el-input>

    </el-form-item>

    <el-form-item prop="roleDescription">
      <el-tag type="success" style="width: 120px;">角色描述</el-tag>
      <el-input v-model="newRoleForm.roleDescription" autocomplete="off"  style="width: 300px; margin-left: 20px;"></el-input>
    </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createRoleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createNewRole">创建</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
import {
  getRolesInfo, createRole
} from '@/services/roles'
import { getPermissionsInfoForRole, updateRoleResources } from '@/services/permission'
import {
  Message
} from 'element-ui'

export default {
  name: 'RoleIndex',

  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      currentRole: null,
      form: {
        roleDescription: '',
        roleName: '',
        permissionsTree: [],
        defaultCheckedKeys: []
      },

      createRoleDialogVisible: false,
      newRoleForm: {
        roleName: '',
        roleDescription: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDescription: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },

      permissionsTree: [], // New: The root of the permissions tree.
      defaultCheckedKey: []
      // 其他属性
    }
  },

  mounted () {
    this.loadRolesData()
  },

  methods: {

    // New: Convert a flat list of permissions into a nested tree.
    buildPermissionsTree (permissionsList, disabled) {
      const tree = []

      permissionsList.forEach((permission, index) => {
        const parts = permission.split('.')
        let currentNode = tree
        let currentPath = ''
        parts.forEach(part => {
          currentPath += (currentPath ? '.' : '') + part
          const existingNode = currentNode.find(node => node.label === part)
          if (existingNode) {
            currentNode = existingNode.children
          } else {
            const newNode = {
              id: currentPath,
              label: part,
              children: [],
              disabled: disabled // 根据参数决定是否禁用节点
            }

            currentNode.push(newNode)
            currentNode = newNode.children
          }
        })
      })

      return tree
    },

    // New: Mark the given permissions in the tree.
    markPermissionsInTree (tree, permissionsList) {
      tree.forEach(node => {
        if (permissionsList.includes(node.id)) {
          this.defaultCheckedKeys.push(node.id)
        }

        this.markPermissionsInTree(node.children, permissionsList)
      })
    },

    async loadRolesData () {
      try {
        const dataResources = await getPermissionsInfoForRole()
        console.log('dataResources', dataResources)
        this.permissions = dataResources.data.resources

        // New: Build the permissions tree.
        this.permissionsTree = this.buildPermissionsTree(this.permissions, true)

        const { data } = await getRolesInfo()

        this.tableData = data.roles.map(role => {
          const roleTree = JSON.parse(JSON.stringify(this.permissionsTree)) // clone the tree
          this.defaultCheckedKeys = [] // reset the defaultCheckedKeys array
          this.markPermissionsInTree(roleTree, role.permissions)

          // console.log('permissionsTree', this.permissionsTree)
          // console.log('defaultCheckedKeys', this.defaultCheckedKeys)
          return {
            ...role,
            permissionsTree: roleTree,
            defaultCheckedKeys: [...this.defaultCheckedKeys] // clone the defaultCheckedKeys array
          }
        })
      } catch (error) {
        console.log(error)
        Message.error('角色信息请求失败')
      }
    },

    handleDelete (row, scope) {
      console.log(row)
      const columnValue = row.roleName
      Message.error('点击了第 ' + (scope.$index + 1) + ' 行 ' + columnValue) // 注意这里我们使用了 scope.$index + 1，因为索引是从0开始的
    },
    handleClick (row, scope) {
      this.dialogFormVisible = true
      this.currentRole = row
      this.form.roleDescription = row.roleDescription
      this.form.roleName = row.roleName
      // 构建新的权限树，不包含 disabled 属性
      this.form.permissionsTree = this.buildPermissionsTree(this.permissions, false)
      this.form.defaultCheckedKeys = [...row.defaultCheckedKeys]
    },

    openCreateRoleDialog () {
      this.createRoleDialogVisible = true
    },
    async createNewRole () {
      this.$refs.addNewRoleForm.validate(async (valid) => {
        // `validate` 方法的回调函数会接收一个参数，表示验证是否通过。
        // 如果验证没有通过，你应该停止表单提交，并向用户显示一些提示信息。
        if (!valid) {
          return
        }

        try {
          const { data } = await createRole(this.newRoleForm)

          // After the permission is created, we add it to the table.
          if (data.code === 200) {
            this.tableData.push(data.role)
            console.log('添加新的角色', data)
            this.createRoleDialogVisible = false

            // Clear the form.
            this.newRoleForm = {
              roleName: '',
              roleDescription: ''
            }
            Message.success('成功添加新的角色')
          } else {
            Message.error(data.msg)
          }
        } catch (error) {
          console.log(error)
          Message.error('创建角色失败')
        }
      })
    },
    // 在提交表单时，包含修改后的权限
    async updateRoleChanges () {
      // First, we get the IDs of the checked and half-checked nodes from the tree.
      const checkedKeys = this.$refs.rolePermissionsTree.getCheckedKeys()
      const halfCheckedKeys = this.$refs.rolePermissionsTree.getHalfCheckedKeys()

      const allCheckedKeys = [...checkedKeys, ...halfCheckedKeys]

      try {
        // Then we call our service to update the role with the new permissions.
        const { data } = await updateRoleResources({
          roleID: this.currentRole.roleID,
          roleName: this.form.roleName,
          roleDescription: this.form.roleDescription,
          permissions: allCheckedKeys
        })

        if (data.code === 200) {
          // On success, we update the table data.
          const roleIndex = this.tableData.findIndex(role => role.roleID === this.currentRole.roleID)
          console.log('找到了更新的角色', roleIndex)
          if (roleIndex !== -1) {
            this.tableData[roleIndex] = {
              ...this.tableData[roleIndex],
              ...this.form,
              permissionsTree: this.form.permissionsTree,
              defaultCheckedKeys: [...allCheckedKeys] // clone the array
            }
          }
          console.log(this.tableData)

          this.dialogFormVisible = false
          Message.success('角色信息已更新')
        } else {
          Message.error(data.msg)
        }
      } catch (error) {
        console.log(error)
        Message.error('更新角色信息失败')
      }
    }

    // 其他方法
  }
}
</script>

<style lang="scss">
.filter-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{
  background-color: #131313;
}

// .el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner::before{
//   background-color: palevioletred;
// }

.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner{
  background-color: #131313;
}

.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{
  border-color: red;
}
</style>
