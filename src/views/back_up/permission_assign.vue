<template>
    <div class="permission_assign">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="userID" label="用户ID" width="180"></el-table-column>
        <el-table-column prop="userName" label="用户名" width="180"></el-table-column>
        <el-table-column prop="role" label="角色信息" width="180"></el-table-column>
        <el-table-column label="拥有的权限">
          <template slot-scope="scope">
            <el-tree
    :data="scope.row.permissions"
    show-checkbox
    node-key="id"
    :default-checked-keys="scope.row.defaultCheckedKeys"
    :render-content="renderTreeNode"
></el-tree>

          </template>
        </el-table-column>
        <el-table-column label="操作">
    <template slot-scope="scope">
      <el-button @click="showRoleDialog(scope.row)">修改角色</el-button>
    </template>
  </el-table-column>

      </el-table>

      <el-dialog
    title="修改角色"
    :visible.sync="roleDialogVisible"
    width="30%"
    @close="resetDialog"
    v-if="selectedUser">
    <el-form :model="selectedUser">
      <el-form-item label="用户角色">

        <el-select v-model="selectedUser.role" placeholder="请选择角色" @change="handleRoleChange">
          <el-option
    v-for="role in roles"
    :key="role.roleID"
    :label="role.roleName"
    :value="role.roleID">
  </el-option>
        </el-select>

      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="roleDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirmRoleChange">确定</el-button>
    </span>
  </el-dialog>

    </div>
  </template>

<script>

import { getUserPermissionsInfo, changeRole } from '@/services/permission'
import { getRolesInfo } from '@/services/roles'
import { Message } from 'element-ui'

export default {
  name: 'PermissionAssign',
  data () {
    return {
      tableData: [],
      defaultCheckedKeys: [],
      roleDialogVisible: false, // 用于控制对话框的显示
      selectedUser: null, // 当前被选中的用户
      roles: [] // 所有的角色
    }
  },
  mounted () {
    this.loadPermissionsInfo()
    this.loadRoles()
  },
  methods: {
    loadNode (node, resolve) {
      // 异步加载子节点的逻辑
      // 可以根据需要发送请求获取子节点数据
      // 将子节点数据传递给 resolve 方法回调
      // 示例代码，假设已经有子节点数据
      const children = [
        { name: '子节点1' },
        { name: '子节点2' }
      ]
      resolve(children)
    },
    handleCheckChange (data, checked) {
      // 处理勾选或取消勾选节点的逻辑
      console.log('勾选节点：', data)
      console.log('是否勾选：', checked)
    },
    renderTreeNode (h, { node }) {
      return h(
        'span',
        {
          style: node.checked ? 'color: red;' : ''
        },
        node.label
      )
    },

    // 判断两个节点是否相等，这里我们只需要比较 label 属性
    isNodeEqual (nodeA, nodeB) {
      return nodeA.label === nodeB.label
    },

    // 合并两个节点
    mergeNodes (nodeA, nodeB) {
      if (this.isNodeEqual(nodeA, nodeB)) {
        nodeA.children = this.mergeTrees(nodeA.children, nodeB.children)
      }

      return nodeA
    },

    // 合并两棵树
    mergeTrees (treeA, treeB) {
      const result = [...treeA]

      for (const nodeB of treeB) {
        const foundNodeA = treeA.find(nodeA => this.isNodeEqual(nodeA, nodeB))

        if (foundNodeA) {
          this.mergeNodes(foundNodeA, nodeB)
        } else {
          result.push(nodeB)
        }
      }

      return result
    },

    // 生成权限树并返回需要被默认勾选的节点的 key 列表
    generatePermissionTree (resources) {
      const defaultCheckedKeys = []
      const tree = []

      for (const resource of resources) {
        const path = resource.split('.')
        let currentNode = tree

        for (let i = 0; i < path.length; i++) {
          const part = path[i]
          const existingNode = currentNode.find(node => node.label === part)

          if (existingNode) {
            currentNode = existingNode.children
          } else {
            const newNode = {
              id: path.slice(0, i + 1).join('.'),
              label: part,
              disabled: true,
              children: []
            }
            currentNode.push(newNode)
            currentNode = newNode.children
          }
        }

        defaultCheckedKeys.push(resource)
      }

      return { tree, defaultCheckedKeys }
    },

    async loadPermissionsInfo () {
      try {
        const { data } = await getUserPermissionsInfo()
        const rawUserData = data.usersPermissionsInfo

        const formattedUserData = rawUserData.map(user => {
          const { tree, defaultCheckedKeys } = this.generatePermissionTree(user.resources)
          return {
            userID: user.userID,
            userName: user.userName,
            role: user.roleName,
            permissions: tree,
            defaultCheckedKeys
          }
        })

        this.tableData = formattedUserData
        console.log(this.tableData)
      } catch (error) {
        console.log('请求用户权限失败', error)
      }
    },

    // 获取所有的节点ID
    getAllIds (data) {
      // console.log('节点 data ', data)
      return data.reduce((result, node) => {
        result.push(node.id)
        if (node.children) {
          result.push(...this.getAllIds(node.children))
        }
        return result
      }, [])
    },

    // 显示角色修改对话框
    showRoleDialog (user) {
      console.log('Incoming user object: ', user)
      this.selectedUser = { ...user }
      this.roleDialogVisible = true
      console.log('Selected user: ', this.selectedUser)
      console.log('现在被选中的角色信息是 ', this.tempRole)
    },

    // 重置对话框的状态
    resetDialog () {
      // 该方法仅关闭对话框，不修改 selectedUser
      this.roleDialogVisible = false
    },

    // 确认角色修改
    async confirmRoleChange () {
      const selectedRole = this.selectedUser.role // 保存角色
      console.log('selectedRole ', selectedRole)
      console.log('现在被选中的角色信息是 ', this.tempRole)

      try {
        const changeRoleDTO = {
          userId: this.selectedUser.userID,
          newRoleId: selectedRole
        }
        await changeRole(changeRoleDTO)
        await this.loadPermissionsInfo()
      } catch (error) {
        console.log('修改用户角色失败', error)
        Message.error('修改用户角色失败')
      } finally {
        // 在这里重置 selectedUser
        this.selectedUser = null
        this.roleDialogVisible = false
      }
    },

    handleRoleChange (val) {
      console.log('Role changed: ', val)
      console.log('selectedUser.role: ', this.selectedUser.role)
    },

    // 从后端获取所有的角色
    async loadRoles () {
      // 在这里发送请求到后端，获取所有的角色
      // 将获取到的角色设置到 this.roles 中
      try {
        const { data } = await getRolesInfo()
        console.log('角色信息', data)
        this.roles = data.roles
      } catch (error) {
        console.log(error)
        Message.error('用户权限 角色信息请求失败')
        // this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

  <style lang="scss">
.el-checkbox__input.is-disabled .el-checkbox__inner{
  background-color: #131313;
}
  </style>
