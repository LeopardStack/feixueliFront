<template>
    <div class="project_create">
      <!-- Project Creation Button -->
      <el-button type="primary" @click="openCreateDialog" style="margin-bottom: 20px;">项目创建</el-button>

      <!-- Training Projects Table -->
      <el-table ref="projectTable" :data="projects" border style="width: 100%" height="950">
      <el-table-column prop="name" label="项目名称"></el-table-column>
      <el-table-column prop="description" label="项目描述" width="500"></el-table-column>
      <el-table-column prop="createdAt" label="项目创建时间">
    <template slot-scope="scope">
        {{ scope.row.createdAt | formatDate }}
    </template>
  </el-table-column>
  <el-table-column prop="deadline" label="项目截止时间">
    <template slot-scope="scope">
        {{ scope.row.deadline | formatDate }}
    </template>
  </el-table-column>

      <el-table-column prop="creditHours" label="学时" width="100"></el-table-column>

      <el-table-column label="权限" width="320" header-align="center">
  <template slot-scope="{ row }">
    <el-tree
      :data="toTreeData(row.resources)"
      show-checkbox
      :default-checked-keys="getDefaultCheckedKeys(row.resources)"
      node-key="label"
      :render-content="renderNodeContent">
    </el-tree>
  </template>
</el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" class="editButtonProjectCreate"  @click="openEditDialog(scope.row, scope)"></el-button>
          <el-button type="text" icon="el-icon-delete" class="deleteButtonProjectCreate" @click="openDeleteDialog(scope.row, scope)"></el-button>
        </template>
      </el-table-column>
    </el-table>

      <!-- Project Creation Dialog -->
      <el-dialog
        title="创建项目"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <el-form>
          <!-- Project information fields -->
          <el-form-item label="项目名称">
            <el-input v-model="newProject.name"></el-input>
          </el-form-item>
          <el-form-item label="项目描述">
            <el-input v-model="newProject.description"></el-input>
          </el-form-item>
          <el-form-item label="项目创建时间">
            <el-date-picker v-model="newProject.createdAt" type="date"></el-date-picker>
          </el-form-item>
          <el-form-item label="项目截止时间">
            <el-date-picker v-model="newProject.deadline" type="date"></el-date-picker>
          </el-form-item>
          <el-form-item label="学时">
            <el-input v-model="newProject.creditHours"></el-input>
          </el-form-item>
          <!-- Additional project information fields -->
          <el-form-item label="讨论区是否关闭">
            <el-switch v-model="newProject.discussionClosed"></el-switch>
          </el-form-item>
          <el-form-item label="成果区点赞">
            <el-switch v-model="newProject.likesEnabled"></el-switch>
          </el-form-item>
          <el-form-item label="评论是否关闭">
            <el-switch v-model="newProject.commentsClosed"></el-switch>
          </el-form-item>
          <el-form-item label="成果区是否关闭">
            <el-switch v-model="newProject.achievementsClosed"></el-switch>
          </el-form-item>
          <el-form-item label="直播权限是否关闭">
            <el-switch v-model="newProject.livePermissionsClosed"></el-switch>
          </el-form-item>
          <el-form-item label="点播权限是否关闭">
            <el-switch v-model="newProject.vodPermissionsClosed"></el-switch>
          </el-form-item>
        </el-form>

        <!-- Dialog buttons -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="createProject">确定</el-button>
        </span>
      </el-dialog>

      <!-- Project Edit Dialog -->
  <el-dialog
    title="编辑项目"
    :visible.sync="editDialogVisible"
    width="30%"
    center
    v-if="editProject"
  >
    <el-form>
      <!-- Project information fields -->
      <el-form-item label="项目名称">
        <el-input v-model="editProject.name"></el-input>
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input v-model="editProject.description"></el-input>
      </el-form-item>
      <el-form-item label="项目创建时间">
        <el-date-picker v-model="editProject.createdAt" type="date"></el-date-picker>
      </el-form-item>
      <el-form-item label="项目截止时间">
        <el-date-picker v-model="editProject.deadline" type="date"></el-date-picker>
      </el-form-item>
      <el-form-item label="学时">
        <el-input v-model="editProject.creditHours"></el-input>
      </el-form-item>
      <!-- Additional project information fields -->
<!-- Additional project information fields -->
<el-form-item label="讨论区是否关闭">
        <el-switch v-model="editProject.discussionClosed"></el-switch>
      </el-form-item>
      <el-form-item label="成果区点赞">
        <el-switch v-model="editProject.likesEnabled"></el-switch>
      </el-form-item>
      <el-form-item label="评论是否关闭">
        <el-switch v-model="editProject.commentsClosed"></el-switch>
      </el-form-item>
      <el-form-item label="成果区是否关闭">
        <el-switch v-model="editProject.achievementsClosed"></el-switch>
      </el-form-item>
      <el-form-item label="直播权限是否关闭">
        <el-switch v-model="editProject.livePermissionsClosed"></el-switch>
      </el-form-item>
      <el-form-item label="点播权限是否关闭">
        <el-switch v-model="editProject.vodPermissionsClosed"></el-switch>
      </el-form-item>
      <!-- Note: You may want to add a UI control to allow users to modify the resources -->
    </el-form>

    <!-- Dialog buttons -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="updateProject">更新</el-button>
    </span>
  </el-dialog>
    </div>
  </template>

<script>
import { createNewProject, getProjects, deleteProject, updateProject } from '@/services/project_create'
import { Message, MessageBox } from 'element-ui'

export default {
  name: 'ProjectCreate',
  filters: {
    formatDate (value) {
      if (!value) return ''
      const date = new Date(value)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()

      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day

      return year + '年' + month + '月' + day + '日'
    }
  },

  data () {
    return {
      projects: [],
      newProject: {
        name: '',
        description: '',
        createdAt: null,
        deadline: null,
        creditHours: null,
        discussionClosed: false,
        likesEnabled: false,
        commentsClosed: false,
        achievementsClosed: false,
        livePermissionsClosed: false,
        vodPermissionsClosed: false
      },
      centerDialogVisible: false,
      editProject: null,
      editDialogVisible: false,
      rules: {

        // 为其他字段添加规则...
      }
    }
  },
  async mounted () {
    await this.loadProjectData()
  },
  methods: {
    async loadProjectData () {
      try {
        const { data } = await getProjects()
        if (data && data.allProjectInfo) {
          console.log('后端获取的所有项目信息 ', data.allProjectInfo)
          this.projects = data.allProjectInfo.map(project => {
            return {
              ...project,
              resources: JSON.parse(project.resources) // 把JSON字符串解析为对象
            }
          })
        } else {
          console.error('未能从后端获取项目数据')
        }
      } catch (error) {
        console.error('获取项目数据时发生错误:', error)
      }
    },
    openCreateDialog () {
      this.centerDialogVisible = true
    },

    async createProject () {
      try {
        console.log('新建的项目 ', this.newProject)
        const { data } = await createNewProject(this.newProject)
        if (data.code === 200) {
          // 从服务器返回的数据中获取新创建的项目的完整信息
          const newProject = data.newProject
          newProject.resources = newProject.resources ? JSON.parse(newProject.resources) : []
          this.projects.push(newProject)
          Message.success('成功创建项目!')
        } else {
          Message.error(data.msg)
        }
      } catch (error) {
        Message.error('创建项目失败')
      }
      this.centerDialogVisible = false
      // Reset the form
      this.newProject = {
        name: '',
        description: '',
        createdAt: null,
        deadline: null,
        creditHours: null,
        discussionClosed: false,
        likesEnabled: false,
        commentsClosed: false,
        achievementsClosed: false,
        livePermissionsClosed: false,
        vodPermissionsClosed: false
      }
    },

    async openDeleteDialog (project) {
      // Prompt the user to confirm the deletion
      // 显示确认弹框
      const selectedRow = project
      if (selectedRow) {
        Message.success('即将删除 ' + project.id)
        const confirmResult = await MessageBox.confirm('确定要删除该行数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        if (confirmResult === 'confirm') {
          // 发送请求给后端进行删除操作，可以使用你的后端接口进行实现
          // 示例代码，假设你的删除接口为 deleteProject，接收一个项目 ID 进行删除
          try {
            console.log('project_id', project.id)
            const { data } = await deleteProject({ project_id: project.id })
            console.log(data)
            Message.success('删除成功')
          } catch (error) {
            console.log(error)
            Message.error('删除消息失败')
          }
        }
      } else {
        Message.info('并未选中数据 ')
      }
    },
    toTreeData (permissions) {
      return Object.entries(permissions).map(([key, value]) => {
        return { label: `${key}: ${value}`, disabled: true }
      })
    },
    getDefaultCheckedKeys (resources) {
      return Object.entries(resources)
        .filter(([key, value]) => value) // 只选择值为true的节点
        .map(([key, value]) => `${key}: ${value}`)
    },

    renderNodeContent (h, { node }) {
      return h(
        'span',
        {
          style: {
            backgroundColor: node.checked ? 'red' : 'transparent',
            color: '#131313'
          }
        },
        node.label
      )
    },
    openEditDialog (project, scope) {
      this.editProject = Object.assign({}, project) // Create a copy of the project to edit
      this.editDialogVisible = true
    },

    async updateProject () {
      try {
        // Replace this with the actual API call to update the project
        const { data } = await updateProject(this.editProject)
        if (data.code === 200) {
          // Find the index of the project in the projects array
          const index = this.projects.findIndex(project => project.id === this.editProject.id)
          // Replace the project in the projects array with the updated project
          this.projects.splice(index, 1, this.editProject)
          Message.success('项目已成功更新!')
        } else {
          Message.error(data.msg)
        }
      } catch (error) {
        Message.error('更新项目失败')
      }
      this.editDialogVisible = false
    }
    // 其他方法
  }
}
</script>

  <style lang="scss" scoped>
  .project-create {
    padding: 20px;
  }

  .editButtonProjectCreate{
    font-size: 30px;
    margin-left: 10px;
    margin-right: 20px;
  }

  .deleteButtonProjectCreate{
    font-size: 30px;
    margin-left: 10px;
    margin-right: 20px;
  }
  </style>
