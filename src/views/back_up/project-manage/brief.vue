<template>
  <div class="brief">
    <span label="培训项目">
      <el-select v-model="selectedProject" placeholder="请选择培训项目">
        <el-option v-for="(project, id) in trainingProject" :key="id" :label="project" :value="id"></el-option>
      </el-select>
    </span>

      <span>
        <el-input v-model="searchKeyword" placeholder="请输入文件名称关键词"></el-input>
        <el-button type="primary" @click="searchFiles">搜索</el-button>
      </span>

      <span>
      <el-button type="primary" @click="onUploadClick">文件上传</el-button>
      <input type="file" ref="fileInput" style="display: none" @change="onFileChange">
      <el-progress v-if="showProgressBar" :text-inside="true" :stroke-width="24" :percentage="uploadProgress" status="success"></el-progress>
    </span>

    <el-table :data="fileData" style="width: 100%">
      <el-table-column prop="id" label="文件ID" sortable style="width: 20px;"></el-table-column>
      <el-table-column prop="name" label="文件名称" sortable></el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable>
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column prop="size" label="文件大小" sortable></el-table-column>
      <el-table-column prop="type" label="文件类型" sortable></el-table-column>
      <el-table-column prop="creator" label="创建者" sortable></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-download" @click="downloadFile(scope.row)">下载</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteFile(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import {
  Message
} from 'element-ui'

import {
  loadAllProjectsFiles, uploadSummaryFile, loadAllProjectsFilesFilterPages,
  downloadProjectSummaryFile, deleteProjectSummaryFile
} from '@/services/project_files'

export default {
  name: 'ProjectBrief',

  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        trainingProject: ''
      },
      fileData: [
        // { id: 1, name: '文件1', createTime: '2023-06-25 10:00:00', size: '1MB', type: 'PDF', creator: '张三' },
        // { id: 2, name: '文件2', createTime: '2023-06-25 11:00:00', size: '2MB', type: 'Word', creator: '李四' },
        // { id: 3, name: '文件3', createTime: '2023-06-25 12:00:00', size: '3MB', type: 'Excel', creator: '王五' }
      ],
      searchKeyword: '',
      sortBySize: '', // 排序字段，用于文件大小排序
      sortByType: '', // 排序字段，用于文件类型排序
      sortByCreateTime: '', // 排序字段，用于文件创建时间排序
      trainingProject: [],
      selectedProject: '',
      // 控制进度条进度和隐藏
      uploadProgress: 0,
      showProgressBar: false
    }
  },
  computed: {
    filteredFiles () {
      // 根据搜索关键词过滤文件数据
      const keyword = this.searchKeyword.toLowerCase().trim()
      if (keyword) {
        return this.files.filter(file => file.name.toLowerCase().includes(keyword))
      }
      return this.files
    }
  },

  mounted () {
    this.loadProjects()
    this.loadAllProjectsFilesFilterPages()
  },

  methods: {
    // 加载目前的所有项目
    async loadProjects () {
      const { data } = await loadAllProjectsFiles()
      this.trainingProject = data.project_names
      console.log('this.trainingProject', this.trainingProject)
      if (this.trainingProject !== undefined) {
        if (Object.keys(this.trainingProject).length > 0) {
          this.selectedProject = Object.keys(this.trainingProject)[0]
        }
        this.trainingProject.All = 'All'
      } else {
        Message.warning('没有任何项目文件')
      }
    },

    async onFileChange (e) {
      const files = e.target.files
      if (files.length > 0) {
        const file = files[0]
        Message.success(file)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('metadata', JSON.stringify({ project_id: this.selectedProject }))
        const config = {
          onUploadProgress: progressEvent => {
            // 将进度条的最大值设置为98%
            this.uploadProgress = Math.round((progressEvent.loaded * 98) / progressEvent.total)
          }
        }
        this.showProgressBar = true
        const { data } = await uploadSummaryFile(formData, config)
        console.log('文件上传后的返回数据 ', data)
        console.log('文件上传后的返回码 ', data.code)
        if (data.code === 200) {
          Message.success('文件上传成功！')
          this.loadAllProjectsFilesFilterPages()
          // 当服务器返回了成功的响应，将进度条的值设置为100%
          this.uploadProgress = 100
        } else {
          Message.error('文件上传失败')
        }
        this.showProgressBar = false
        this.uploadProgress = 0
      } else {
        Message.warning('空文件！')
      }
    },

    async loadAllProjectsFilesFilterPages () {
      const { data } = await loadAllProjectsFilesFilterPages()
      console.log('后端获取的所有培训概要文件', data)
      if (data.code === 200) {
        this.fileData = data.allProjectSummaryFiles.map(file => ({
          id: file.id,
          name: file.fileName,
          createTime: file.uploadedAt,
          size: this.formatFileSize(file.fileSize),
          type: file.fileType,
          creator: file.uploaderName
        }))
      } else {
        Message.error('未能获取到所有培训概要文件')
      }
    },
    // 添加一个方法来格式化文件大小
    formatFileSize (size) {
      if (size < 1024) {
        return size + 'B'
      } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + 'KB'
      } else if (size < 1024 * 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(2) + 'MB'
      } else {
        return (size / 1024 / 1024 / 1024).toFixed(2) + 'GB'
      }
    },

    onUploadClick () {
    // 触发文件输入元素的点击事件
      this.$refs.fileInput.click()
    },
    onUpload () {
      Message.success('upload!')
    },
    async downloadFile (file) {
      console.log(file)
      Message.success('download file:' + file.name)
      try {
        const response = await downloadProjectSummaryFile(file.id)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', file.name) // 或者你可以从响应中获取文件名
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log('下载文件失败', error)
      }
    },
    async deleteFile (file) {
      const { data } = await deleteProjectSummaryFile(file.id)
      console.log('删除文件的返回值 ', data)
      if (data.code === 200) {
        Message.success('成功删除文件' + file.name)
        this.loadAllProjectsFilesFilterPages()
      } else {
        Message.error('删除文件失败')
      }
    },

    searchFiles () {
      // 触发文件搜索
      // 根据搜索关键词更新文件数据的过滤结果
      Message.success('搜索:' + this.searchKeyword)
    },

    sortFilesBySize () {
      // 按照文件大小排序
      if (this.sortBySize === 'asc') {
        this.files.sort((a, b) => a.size - b.size)
        this.sortBySize = 'desc'
      } else {
        this.files.sort((a, b) => b.size - a.size)
        this.sortBySize = 'asc'
      }
    },

    sortFilesByType () {
      // 按照文件类型排序
      if (this.sortByType === 'asc') {
        this.files.sort((a, b) => a.type.localeCompare(b.type))
        this.sortByType = 'desc'
      } else {
        this.files.sort((a, b) => b.type.localeCompare(a.type))
        this.sortByType = 'asc'
      }
    },

    sortFilesByCreateTime () {
      // 按照文件创建时间排序
      if (this.sortByCreateTime === 'asc') {
        this.files.sort((a, b) => new Date(a.createTime) - new Date(b.createTime))
        this.sortByCreateTime = 'desc'
      } else {
        this.files.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
        this.sortByCreateTime = 'asc'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
