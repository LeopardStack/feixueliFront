<template>
  <div class="course-management">
    <h1>课程管理</h1>

    <h2>课程资源管理</h2>
    <el-input placeholder="请输入搜索内容" v-model="searchText" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="searchFile"></el-button>
    </el-input>
    <el-button type="primary" @click="showAddFileDialog">添加文件</el-button>
    <el-button type="primary" @click="showAddFolderDialog">添加文件夹</el-button>
    <el-button type="primary" @click="navigateTo('')">返回主目录</el-button>

    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in path" :key="index" @click.native="navigateTo(item, index)">
        {{ item }}
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="fileData" style="width: 100%" @sort-change="sortChange" @row-click="rowClick">
      <el-table-column prop="name" label="文件名" sortable>
        <template slot-scope="scope">
          <div :class="{'folder-name': scope.row.type === '文件夹'}" @click.stop="navigateTo(scope.row)">{{ scope.row.name }}</div>
        </template>
      </el-table-column>

      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="size" label="文件大小" sortable></el-table-column>
      <el-table-column prop="modifiedTime" label="修改时间" sortable></el-table-column>
      <el-table-column prop="uploader" label="上传者"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.stop="previewFile(scope.row)" :disabled="scope.row.type === '文件夹'">预览</el-button>
          <el-button type="text" size="small" @click.stop="editFile(scope.row)" :disabled="scope.row.type === '文件夹'">修改</el-button>
          <el-button type="text" size="small" @click.stop="deleteFile(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click.stop="downloadFile(scope.row)" :disabled="scope.row.type === '文件夹'">下载</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加文件" :visible.sync="addFileDialogVisible">
      <el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-success="addFile">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始上传</el-button>
      </el-upload>
    </el-dialog>

    <el-dialog title="添加文件夹" :visible.sync="addFolderDialogVisible">
      <el-input v-model="newFolder.name" placeholder="请输入文件夹名"></el-input>
      <el-button type="primary" @click="addFolder">添加</el-button>
    </el-dialog>

    <el-dialog :visible.sync="previewDialogVisible" width="70%">
      <div v-if="previewFileData && previewFileData.type === '视频'">
  <video-player class="vjs-custom-skin" :options="playerOptions" @play="onPlayerPlay" @pause="onPlayerPause" @ended="onPlayerEnded"></video-player>
</div>

    <!-- 你可能需要为 Word、Excel 和图片文件添加其他预览组件 -->
  </el-dialog>

    <!-- 课程设计部分... -->
  </div>
</template>

<script>
import { getAllVideoResourcesByDirectory } from '@/services/video_resources'
import { Message } from 'element-ui'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

export default {
  components: {
    videoPlayer
  },
  name: 'CourseManagement',

  data () {
    return {
      previewDialogVisible: false,
      previewFileData: null,
      playerOptions: {
        autoplay: true,
        muted: false,
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        sources: [
          {
            type: '',
            src: ''
          }
        ],
        poster: '',
        notSupportedMessage: '此视频暂无法播放，请稍后再试'
      },
      searchText: '',
      fileData: [
      ],
      path: [''],
      addFileDialogVisible: false,
      addFolderDialogVisible: false,
      newFolder: { name: '' }
      // 更多数据...
    }
  },
  mounted () {
    this.load_init_resources()
  },

  methods: {
    // 加载培训课程资源初始目录
    async load_init_resources () {
      try {
        const { data } = await getAllVideoResourcesByDirectory('/')
        console.log('初始课程资源', data)
        if (data.code === 200) {
          this.fileData = data.videoResources.map(item => {
            const isFolder = item.fileName.endsWith('/')
            const name = isFolder ? item.fileName.slice(0, -1).split('/').pop() : item.fileName.split('/').pop()

            return {
              name: name, // 获取文件名或文件夹名
              type: isFolder ? '文件夹' : '文件', // 根据 fileName 判断类型
              size: item.size,
              modifiedTime: item.modifiedTime,
              uploader: '当前用户', // 这里只是一个示例，你可能需要根据实际情况设置上传者
              url: item.url // 保存 url，可能在预览或下载文件时需要
            }
          })
        } else {
          Message.error('获取课程资源失败', data.msg)
        }
      } catch (error) {
        Message.error('获取课程资源失败', error)
      }
    },

    searchFile () {
      // 搜索文件的逻辑
    },
    showAddFileDialog () {
      this.addFileDialogVisible = true
    },
    showAddFolderDialog () {
      this.addFolderDialogVisible = true
    },
    addFile (response, file, fileList) {
      // 添加文件的逻辑
      this.fileData.push({
        name: file.name,
        type: '文件',
        size: file.size + 'B',
        modifiedTime: new Date().toISOString().split('T')[0], // 使用当前日期作为修改时间
        uploader: '当前用户' // 这里只是一个示例，你可能需要根据实际情况设置上传者
      })
      this.addFileDialogVisible = false
    },
    submitUpload () {
      Message.info('上传文件')
    },
    addFolder () {
      // 添加文件夹的逻辑
      this.fileData.push({
        name: this.newFolder.name,
        type: '文件夹',
        size: '-',
        modifiedTime: new Date().toISOString().split('T')[0], // 使用当前日期作为修改时间
        uploader: '当前用户' // 这里只是一个示例，你可能需要根据实际情况设置上传者
      })
      this.newFolder.name = ''
      this.addFolderDialogVisible = false
    },
    editFile (file) {
      // 修改文件的逻辑
    },
    previewFile (file) {
      if (file.type === 'PDF') {
        window.open(file.url, '_blank')
      } else {
        this.previewFileData = file
        if (file.type === '视频') {
          this.playerOptions.sources[0].src = file.url
        }
        this.previewDialogVisible = true
      }
    },

    onPlayerPlay (player) {
      console.log('player play!', player)
    },
    onPlayerPause (player) {
      console.log('player pause!', player)
    },
    onPlayerEnded (player) {
      console.log('player ended!', player)
    },
    deleteFile (file) {
    // 删除文件的逻辑
      const index = this.fileData.indexOf(file)
      if (index !== -1) {
        this.fileData.splice(index, 1)
      }
    },
    downloadFile (file) {
    // 下载文件的逻辑
    },
    sortChange ({ column, prop, order }) {
    // 排序的逻辑
      this.fileData.sort((a, b) => {
        if (order === 'ascending') {
          return a[prop] > b[prop] ? 1 : -1
        } else if (order === 'descending') {
          return a[prop] < b[prop] ? 1 : -1
        } else {
          return 0
        }
      })
    },
    rowClick (row) {
      if (row.type === '文件夹') {
      // 点击文件夹的逻辑
        this.path.push(row.name)
      // 在这里，你可以调用你的后端 API 来获取文件夹的内容，并更新 fileData
      }
    },
    // 加载指定目录
    async navigateTo (item) {
      let directory
      if (typeof item === 'string') {
      // item 是面包屑导航中的一个项目
        const index = this.path.indexOf(item)
        this.path = this.path.slice(0, index + 1)
        directory = this.path.join('/') + '/'
      } else {
      // item 是表格中的一行
        if (item.type !== '文件夹') {
          return
        }
        this.path.push(item.name)
        directory = this.path.join('/') + '/'
      }
      console.log('面包屑内容 ' + this.path)

      // 获取新目录的内容
      try {
        const { data } = await getAllVideoResourcesByDirectory(directory)
        console.log('课程资源', data)
        if (data.code === 200) {
          this.fileData = data.videoResources.map(item => {
            const isFolder = item.fileName.endsWith('/')
            const name = isFolder ? item.fileName.slice(0, -1).split('/').pop() : item.fileName.split('/').pop()

            return {
              name: name, // 获取文件名或文件夹名
              type: isFolder ? '文件夹' : '文件', // 根据 fileName 判断类型
              size: item.size,
              modifiedTime: item.modifiedTime,
              uploader: '当前用户', // 这里只是一个示例，你可能需要根据实际情况设置上传者
              url: item.url // 保存 url，可能在预览或下载文件时需要
            }
          })
        } else {
          Message.error('获取课程资源失败', data.msg)
        }
      } catch (error) {
        Message.error('获取课程资源失败', error)
      }
    }
  // 其他方法
  }
}
</script>

<style scoped>
.folder-name {
  background-color: red;
}
</style>
