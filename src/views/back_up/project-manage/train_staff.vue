<template>
    <div class="train_staff">
        <!-- Training Project Select -->
    <el-select v-model="selectedProject" placeholder="请选择培训项目" class="margin-bottom">
      <el-option
        v-for="project in projects"
        :key="project.id"
        :label="project.name"
        :value="project.id"
      ></el-option>
    </el-select>

      <el-upload
        class="upload-excel"
        :action="uploadUrl"
        :before-upload="beforeUpload"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        style="display: inline;margin-left: 10px;"
      >
        <el-button type="primary" icon="el-icon-upload" size="small">批量导入</el-button>
      </el-upload>

      <el-form label-position="left" style="margin-top: 20px;">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="年级">
              <el-select v-model="filter.grade" placeholder="请选择">
                <el-option label="大一" value="大一"></el-option>
                <el-option label="大二" value="大二"></el-option>
                <el-option label="大三" value="大三"></el-option>
                <el-option label="大四" value="大四"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input v-model="filter.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="毕业院校">
              <el-input v-model="filter.university" placeholder="请输入毕业院校"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="applyFilters">筛选</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-button type="primary" icon="el-icon-download" size="small" class="export-btn" @click="exportStudents">导出学员信息</el-button>

      <el-table
        :data="students"
        border
        style="width: 100%; margin-top: 20px;"
      >
        <el-table-column prop="id" label="学员ID"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="idNumber" label="身份证号码"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号码"></el-table-column>
        <el-table-column prop="organization" label="任职单位"></el-table-column>
        <el-table-column prop="university" label="毕业院校"></el-table-column>
        <el-table-column prop="educationLevel" label="受教育程度"></el-table-column>
        <el-table-column label="照片">
          <template slot-scope="scope">
            <img :src="scope.row.photo" alt="学员照片" height="50px" width="50px">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editStudent(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteStudent(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </template>

<script>
export default {
  name: 'ProjectTrainStaff',
  data () {
    return {
      size: '',
      selectedProject: null, // Track the selected training project
      projects: [ // Array of training projects
        { id: 1, name: '培训项目1' },
        { id: 2, name: '培训项目2' },
        { id: 3, name: '培训项目3' }
      // Add more projects as needed
      ],
      uploadUrl: 'your-upload-url',
      students: [
        {
          id: 1,
          name: 'John Doe',
          gender: 'Male',
          idNumber: '1234567890',
          email: 'johndoe@example.com',
          address: '123 Main St, City',
          phoneNumber: '1234567890',
          organization: 'ABC Company',
          university: 'XYZ University',
          educationLevel: 'Bachelor',
          photo: 'student1.jpg'
        }
        // Add more student objects with the same structure
      ],
      filter: {
        grade: '',
        name: '',
        university: ''
      },

      showDialog: false, // Controls the visibility of the dialog
      editMode: false, // Tracks whether the dialog is in edit mode or not
      selectedStudent: null // Holds the selected student for editing/deletion
    }
  },
  methods: {
    beforeUpload (file) {
      const isExcel = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!isExcel) {
        this.$message.error('只能上传 Excel 文件')
      }
      return isExcel
    },
    handleUploadSuccess (response) {
      // Handle success response after file upload
      // Update the student data or show a success message
    },
    handleUploadError (error) {
      // Handle error response after file upload
      // Show an error message or take appropriate action
      console.error('File upload error:', error)
      this.$message.error('上传文件时发生错误，请重试')
    },

    editStudent (student) {
      this.$message.info('编辑 ' + student.name)
    },
    deleteStudent (index) {
      // Handle student deletion logic
      this.$message.info('删除 ' + index)
    },
    exportStudents () {
      // Handle export students logic
    },
    applyFilters () {
      // Apply filters to the student data and update the table
      // You can use this.filter.grade, this.filter.name, this.filter.university to access the filter values
    }
  }
}
</script>

  <style lang="scss" scoped>
  .upload-excel {
    margin-bottom: 20px;
  }

  .export-btn {
    margin-left: 20px;
  }
  </style>
