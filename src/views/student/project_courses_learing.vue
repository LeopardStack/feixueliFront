<template>
  <div class="project_courses_learning">
    <h1 class="title">学生学习空间</h1>

    <el-row class="select-row">
      <el-col :span="8">
        <el-select
          v-model="selectedProject"
          placeholder="选择项目"
          clearable
        >
          <el-option
            v-for="project in projects"
            :key="project.id"
            :label="project.name"
            :value="project.id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row class="course-list-row">
      <el-col :span="12">
        <h2>培训课程列表</h2>
        <ul>
          <li v-for="course in selectedProjectCourses" :key="course.id">{{ course.name }}</li>
        </ul>
      </el-col>
      <el-col :span="12">
        <h2>课程信息</h2>
        <p>课程名称: {{ selectedCourse.name }}</p>
        <p>学习时长: {{ selectedCourse.duration }}</p>
        <p>成绩: {{ selectedCourse.grade }}</p>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="showGrade">成绩查询</el-button>
      </el-col>
    </el-row>

    <el-dialog v-model="isGradeVisible" title="成绩查询" width="30%">
      <p>课程1: 成绩A</p>
      <p>课程2: 成绩B</p>
      <p>课程3: 成绩C</p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ProjectCoursesLearning',

  data () {
    return {
      selectedProject: '',
      projects: [
        { id: 1, name: '项目1' },
        { id: 2, name: '项目2' },
        { id: 3, name: '项目3' }
      ],
      courses: [
        { id: 1, name: '课程1', duration: '3小时', grade: 'A', projectId: 1 },
        { id: 2, name: '课程2', duration: '2小时', grade: 'B', projectId: 1 },
        { id: 3, name: '课程3', duration: '4小时', grade: 'C', projectId: 2 },
        { id: 4, name: '课程4', duration: '1小时', grade: 'A', projectId: 3 },
        { id: 5, name: '课程5', duration: '2小时', grade: 'B', projectId: 3 }
      ],
      isGradeVisible: false
    }
  },

  computed: {
    selectedProjectCourses () {
      return this.courses.filter((course) => course.projectId === this.selectedProject)
    },

    selectedCourse () {
      const selectedCourseId = this.selectedProjectCourses[0]?.id
      return this.courses.find((course) => course.id === selectedCourseId) || {}
    }
  },

  methods: {
    showGrade () {
      this.isGradeVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.project_courses_learning {
  padding: 20px;
}

.title {
  text-align: center;
}

.select-row {
  margin-bottom: 20px;
}

.course-list-row {
  margin-bottom: 40px;

  h2 {
    margin-bottom: 10px;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 5px;
    }
  }
}
</style>
