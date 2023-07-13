<template>
  <div class="project-result-display">
    <el-row>
        <el-col :span="24" class="title">
            <h1>成果展示区</h1>
        </el-col>
    </el-row>

    <el-input placeholder="搜索学习成果" v-model="searchQuery" class="search-box" style="width: 50%;margin-right: 20px;"></el-input>
    <el-button type="primary" round>搜索</el-button>

    <!-- Markdown 渲染的结果将显示在这里 -->
    <div class="display-area" v-html="htmlContent">
    </div>

    <el-button type="primary" @click="dialogVisible = true">编辑</el-button>

    <el-dialog title="编辑器" :visible.sync="dialogVisible">
      <mavon-editor v-model="editorContent" :toolbars="toolbars" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitContent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import MarkdownIt from 'markdown-it'
import 'mavon-editor/dist/css/index.css'
import { Button, Dialog, Input } from 'element-ui'

export default {
  name: 'ProjectResultDisplay',

  components: {
    mavonEditor,
    'el-button': Button,
    'el-dialog': Dialog,
    'el-input': Input
  },

  data () {
    return {
      markdownParser: new MarkdownIt(),
      editorContent: '', // 在编辑器中输入的内容
      content: '', // 用户提交的内容
      htmlContent: '', // 转换后的 HTML 内容
      dialogVisible: false, // 控制对话框的显示隐藏
      searchQuery: '', // 搜索查询
      toolbars: {
        bold: true, // 加粗
        italic: true, // 倾斜
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 删除线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸阅读
        htmlcode: true, // 预览HTML源码
        help: true // 帮助
      }
    }
  },

  methods: {
    updateMarkdown () {
      this.htmlContent = this.markdownParser.render(this.content)
    },

    submitContent () {
      this.content = this.editorContent
      this.updateMarkdown()
      this.dialogVisible = false
    },

    search () {
      // 这里调用搜索接口
    }
  },

  mounted () {
    this.updateMarkdown()
  }
}
</script>

<style lang="scss" scoped>
.editor-area {
  margin-bottom: 2em;
}

.search-box {
  margin-bottom: 1em;
}
</style>
