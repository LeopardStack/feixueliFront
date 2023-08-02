<template>
    <div class="trainer">
        培训教师管理
        <el-table
        :data="students"
        border
        style="width: 100%; margin-top: 20px;"
      >
        <el-table-column prop="id" label="教师ID"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="idNumber" label="身份证号码"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号码"></el-table-column>
        <el-table-column prop="organization" label="任职单位"></el-table-column>
        <el-table-column prop="researchOrientation" label="研究方向"></el-table-column>
        <el-table-column prop="professional" label="职称"></el-table-column>
        <el-table-column prop="courses" label="主讲课程"></el-table-column>
        <el-table-column label="照片">
          <template slot-scope="scope">
            <img :src="scope.row.photo" alt="教师照片" height="50px" width="50px">
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
  name: 'ProjectTrainer',

  data () {
    return {
      students: [
        {
          id: 1,
          name: 'John Doe',
          gender: 'Male',
          idNumber: '4301223335412XX',
          email: 'johndoe@example.com',
          address: '123 Main St, City',
          phoneNumber: '1234567890',
          organization: 'ABC Company',
          researchOrientation: 'XYZ University',
          professional: 'Bachelor',
          courses: '数学',
          photo: ''
        }]
    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
