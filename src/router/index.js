import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入 store
import store from '@/store'

// 引入路由中需要使用的组件功能
// import Login from '@/views/login/index'
// import Layout from '@/views/layout/index'
// 采用懒加载组件来优化路由

Vue.use(VueRouter)

// 路由规则（添加需要认证的 requiresAuth 信息）
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index')
  },
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: 'index1' */'@/views/index/index'),
    redirect: '/index',
    children: [
      {
        path: 'index',
        alias: '/index',
        name: 'index',
        component: () => import(/* webpackChunkName: 'index2' */'@/views/index/index_info'),
        meta: { breadcrumb: '门户网站首页' }
      },
      {
        path: 'project_index_info',
        name: 'project_index_info',
        component: () => import(/* webpackChunkName: 'project_index_info' */'@/views/index/project_index_info'),
        meta: { breadcrumb: '培训项目公开信息' }
      },
      {
        path: 'teachers_info',
        name: 'teachers_info',
        component: () => import(/* webpackChunkName: 'teachers_info' */'@/views/index/teachers_info'),
        meta: { breadcrumb: '培训师资库信息' }
      },
      {
        path: 'project_assignment',
        name: 'project_assignment',
        component: () => import(/* webpackChunkName: 'project_assignment' */'@/views/index/project_assignment'),
        meta: { breadcrumb: '培训公告信息' }
      }
    ]
  },
  {
    path: '/back_up',
    component: () => import(/* webpackChunkName: 'backup' */'@/views/back_up/index'),
    meta: {
      // 这个也可以直接给某个子路由进行设置，这时内部的子路由都需要认证，包括当前路由
      // requiresAuth: true
    },
    redirect: '/back_up/home',
    children: [
      {
        path: 'home',
        alias: '/backup',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/back_up/home'),
        meta: { breadcrumb: '后台管理首页' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */'@/views/back_up/role'),
        meta: { breadcrumb: '权限管理 / 角色管理' }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/back_up/user/index'),
        meta: { breadcrumb: '权限管理 / 用户管理' }
      },
      {
        path: 'permission',
        name: 'permission',
        component: () => import(/* webpackChunkName: 'permission' */'@/views/back_up/permission'),
        meta: { breadcrumb: '权限管理 / 权限管理' }
      },
      {
        path: 'permission_assign',
        name: 'permission_assign',
        component: () => import(/* webpackChunkName: 'permission_assign' */'@/views/back_up/permission_assign'),
        meta: { breadcrumb: '权限管理 / 权限分配' }
      },
      {
        path: 'project_create',
        name: 'project_create',
        component: () => import(/* webpackChunkName: 'project_create' */'@/views/back_up/project_create'),
        meta: { breadcrumb: '项目管理' }
      },
      {
        path: 'training_brief',
        name: 'training_brief',
        component: () => import(/* webpackChunkName: 'training_brief' */'@/views/back_up/project-manage/brief')
      },
      {
        path: 'project_record',
        name: 'project_record',
        component: () => import(/* webpackChunkName: 'project_record' */'@/views/back_up/project-manage/record')
      },
      {
        path: 'display_area',
        name: 'display_area',
        component: () => import(/* webpackChunkName: 'display_area' */'@/views/back_up/project-manage/display_area')
      },
      {
        path: 'file_export',
        name: 'file_export',
        component: () => import(/* webpackChunkName: 'file_export' */'@/views/back_up/project-manage/file_export')
      },
      {
        path: 'forum',
        name: 'forum',
        component: () => import(/* webpackChunkName: 'forum' */'@/views/back_up/project-manage/forum')
      },
      {
        path: 'live_broadcast',
        name: 'live_broadcast',
        component: () => import(/* webpackChunkName: 'live_broadcast' */'@/views/back_up/project-manage/live_broadcast')
      },
      {
        path: 'train_staff',
        name: 'train_staff',
        component: () => import(/* webpackChunkName: 'train_staff' */'@/views/back_up/project-manage/train_staff')
      },
      {
        path: 'trainer',
        name: 'trainer',
        component: () => import(/* webpackChunkName: 'message' */'@/views/back_up/project-manage/trainer')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import(/* webpackChunkName: 'video' */'@/views/back_up/project-manage/video')
      },
      {
        path: 'message',
        name: 'message',
        component: () => import(/* webpackChunkName: 'message' */'@/views/back_up/project-manage/message')
      },
      {
        path: 'teacher_resources',
        name: 'teacher_resources',
        component: () => import(/* webpackChunkName: 'teacher_resources' */'@/views/back_up/user/teacher_resources')
      },
      {
        path: 'user_manage',
        name: 'user_manage',
        component: () => import(/* webpackChunkName: 'user_manage' */'@/views/back_up/user/user_manage')
      },
      {
        path: 'log',
        name: 'log',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/back_up/platform_log')
      },
      {
        path: 'analysis',
        name: 'analysis',
        component: () => import(/* webpackChunkName: 'advert_space' */'@/views/back_up/platform_analysis')
      },
      {
        path: 'platform_message',
        name: 'platform_message',
        component: () => import(/* webpackChunkName: 'platform_message' */'@/views/back_up/platform_message')
      }
    ]
  },
  {
    path: '/student',
    name: 'student',
    component: () => import(/* webpackChunkName: 'student_layout' */'@/views/student/index'),
    redirect: '/student/index',
    children: [
      {
        path: 'index',
        name: 'student_index',
        component: () => import(/* webpackChunkName: 'student_index' */'@/views/student/student_index')
      },
      {
        path: 'project_forum',
        name: 'student_project_forum',
        component: () => import(/* webpackChunkName: 'student_project_forum' */'@/views/student/project_forum')
      },
      {
        path: 'project_courses_learing',
        name: 'student_project_courses_learing',
        component: () => import(/* webpackChunkName: 'student_project_courses_learing' */'@/views/student/project_courses_learing')
      },
      {
        path: 'project_result_display',
        name: 'student_project_result_display',
        component: () => import(/* webpackChunkName: 'student_project_result_display' */'@/views/student/project_result_display')
      }
    ]
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import(/* webpackChunkName: 'teacher' */'@/views/teacher/index'),
    redirect: '/teacher/index',
    children: [
      {
        path: 'index',
        name: 'teacher_index',
        component: () => import(/* webpackChunkName: 'teacher_index' */'@/views/teacher/teacher_index')
      },
      {
        path: 'project_forum',
        name: 'teacher_project_forum',
        component: () => import(/* webpackChunkName: 'teacher_project_forum' */'@/views/teacher/project_forum')
      },
      {
        path: 'courses_teaching',
        name: 'teacher_courses_teaching',
        component: () => import(/* webpackChunkName: 'teacher_courses_teaching' */'@/views/teacher/courses_teaching')
      },
      {
        path: 'project_result_display',
        name: 'teacher_project_result_display',
        component: () => import(/* webpackChunkName: 'teacher_project_result_display' */'@/views/teacher/project_result_display')
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

// 使用导航守卫来检测路由是否能继续跳转
router.beforeEach((to, from, next) => {
  // 验证 to 路由是否需要进行身份认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not redirect to login page
    // 验证 Vuex 的 store 中的登录用户信息是否存储
    // console.log(store.state.user)
    console.log('权限通过')
    if (!store.state.user) {
      // 未登录，跳转到登录页
      return next({
        name: 'login',
        query: {
          // 将本次路由的 fullPath 传递给 login 页面
          redirect: to.fullPath
        }
      })
    }
    // 已经登录允许通过
    next()
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
