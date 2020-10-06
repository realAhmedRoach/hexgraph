import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
// site views
import Site from '@/views/site/Site'
import HowItWorks from '@/views/site/HowItWorks'
import Emerald from '@/views/site/Emerald'
import Auth from '@/views/site/Auth'
// user views
import Home from '@/views/user/Home'
import Progress from '@/views/user/Progress'
import Experiments from '@/views/user/Experiments'
import Class from '@/views/user/Class'
import Settings from '@/views/user/Settings'
import SignUp from '@/views/user/SignUp'
// student views
import StudentInput from '@/views/student/StudentInput'
import StudentSuccess from '@/views/student/StudentSuccess'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'site',
      component: Site,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/how-it-works',
      name: 'how-it-works',
      component: HowItWorks,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/emerald',
      name: 'emerald',
      component: Emerald,
      props: (route) => ({ referrer: route.query.ref }),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/app/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/app/progress',
      name: 'progress',
      component: Progress,
      meta: {
        requiresAuth: true,
        requiresEmerald: true
      }
    },
    {
      path: '/app/experiments',
      name: 'experiments',
      component: Experiments,
      meta: {
        requiresAuth: true,
        requiresEmerald: true
      }
    },
    {
      path: '/app/settings',
      name: 'settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/app/login',
      name: 'auth',
      component: Auth,
      props: (route) => ({ user: route.query.u }),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/app/signup',
      name: 'signUp',
      component: SignUp,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/app/class/:classCode',
      name: 'clss',
      component: Class,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/student/:classCode',
      name: 'student-input',
      component: StudentInput,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/student-sucess',
      name: 'student-sucess',
      component: StudentSuccess,
      meta: {
        requiresAuth: false
      }
    }
  ]
})
