<template>
  <div class="project_record">
    <el-tag effect="dark" style="font-size: 15px;">年级</el-tag>
    <el-select v-model="value" placeholder="请选择年级"  style="margin-bottom: 10px;margin-left: 10px;">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>

    <el-tag effect="dark" style="font-size: 15px;margin-left: 10px;">毕业院校</el-tag>
    <el-select v-model="value" placeholder="请选择学校"  style="margin-bottom: 10px;margin-left: 10px;">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>

    <el-input v-model="grade" placeholder="请输入证件号码" style="width: 300px;margin-left: 10px;"></el-input>
  <span style="margin-left: 10px;">
    <input type="file" ref="fileInput" style="display: none;" @change="handleFileChange" />
  <el-tooltip content="上传文件不要超过1GB" placement="top">
    <el-button type="primary" @click="uploadButtonClick">点击上传</el-button>
</el-tooltip>
  </span>

    <el-table
      :data="pagedData"
      height=1000
      border
      style="width: 100%">
      <el-table-column
        v-for="(field, index) in fields"
        :key="index"
        :prop="field.key"
        :label="field.label"
        width="120">
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
  <el-form :model="form">

    <el-form-item >
      <el-tag type="success" style="margin-left: 50px;">毕业日期</el-tag>
      <el-input v-model="form.byrq" autocomplete="off"  style="width: 300px; margin-left: 20px;"></el-input>

      <el-tag type="success" style="margin-left: 100px;">毕业日期</el-tag>
      <el-input v-model="form.byrq" autocomplete="off"  style="width: 300px; margin-left: 20px;"></el-input>
    </el-form-item>

    <el-form-item >
      <el-tag type="success" style="margin-left: 50px;">毕业院校</el-tag>
      <el-input v-model="form.byxx" autocomplete="off"  style="width: 300px; margin-left: 20px;"></el-input>

      <el-tag type="success" style="margin-left: 100px;">毕业院校</el-tag>
      <el-input v-model="form.byxx" autocomplete="off"  style="width: 300px; margin-left: 20px;"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取消修改</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确定修改</el-button>
  </div>
</el-dialog>

    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[25, 50, 75, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 引入封装的接口功能组件
import { loadRecordData, uploadFileRequest } from '@/services/user'
// 引入 Element UI 中的 Message 提示
import { Message } from 'element-ui'

export default {
  name: 'ProjectRecord',

  data () {
    return {
      total: 0,
      pageSize: 100,
      currentPage: 1,
      tableData: [],
      pagedData: [],
      fields: [
        { key: 'BYRQ', label: '毕业日期' },
        { key: 'BYXX', label: '毕业学校' }
        // ... 在这里添加所有的字段
      ],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      grade: '',

      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        byrq: '',
        byxx: ''
      },
      formLabelWidth: '120px',

      fileList: []
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    handleDelete (row, scope) {
      console.log(row)
      const columnValue = row.BYXX
      Message.error('点击了第 ' + (scope.$index + 1) + ' 行 ' + columnValue) // 注意这里我们使用了 scope.$index + 1，因为索引是从0开始的
    },
    handleClick (row, scope) {
      this.dialogFormVisible = true
      this.form.byrq = row.BYRQ
      this.form.byxx = row.BYXX
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.updatePagedData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.updatePagedData()
    },
    updatePagedData () {
      // 计算当前页面的数据
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      this.pagedData = this.tableData.slice(start, end)
    },
    async loadData () {
      try {
        const { data } = await loadRecordData(2009)
        this.tableData = data
        this.total = data.length
        this.updatePagedData()
      } catch (error) {
        // 处理错误
        Message.error('请求培训记录数据失败')
      }
    },

    uploadButtonClick () {
      this.$refs.fileInput.click()
    },
    handleFileChange (event) {
      const file = event.target.files[0]
      this.uploadFile(file)
    },
    async uploadFile (file) {
      if (!file) {
        console.error('没有选择任何文件')
        return
      }

      try {
        const { data } = await uploadFileRequest(file)
        console.log('上传文件信息：', data)
        console.log(data)
        this.$notify({
          title: '成功',
          message: '上传 ' + data.fileName,
          type: 'success'
        })
      } catch (error) {
        console.error('上传文件失败', error)
        this.$notify.error({
          title: '错误',
          message: '上传文件失败'
        })
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  padding: 10px 0;
  border-top: 1px solid #ccc;
}

</style>
