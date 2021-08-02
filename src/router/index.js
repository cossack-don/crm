import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app';

Vue.use(VueRouter)

const routes = [
  
// layout EMPTY (registr + login)
  {
    path:'/login',
    name:'login',
    // cm README описание, как работают лейауты
    meta:{layout:'empty'},
    component: () => import('../views/Login.vue')
  },
  {
    path:'/register',
    name:'register',
    // cm README описание, как работают лейауты
    meta:{layout:'empty'},
    component: () => import('../views/Register.vue')
  },

// ______________________________________
// layout Main , all pages
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main', auth:true},
    component: () => import('../views/Home.vue')
  },
  {
    path:'/categories',
    name:'categories',
    meta:{layout:'main', auth:true},
    component: () => import('../views/Categories.vue')
  },
  {
    // динамические роуты по id
    path:'/detail/:id',
    name:'detail',
    meta:{layout:'main', auth:true},
    component: () => import('../views/Detail.vue')
  },
  {
    path:'/history',
    name:'history',
    meta:{layout:'main', auth:true},
    component: () => import('../views/History.vue')
  },
  {
    path:'/planning',
    name:'planning',
    meta:{layout:'main', auth:true},
    component: () => import('../views/Planning.vue')
  },
  {
    path:'/profile',
    name:'profile',
    meta:{layout:'main', auth:true},
    component: () => import('../views/Profile.vue')
  },
  {
    path:'/record',
    name:'record',
    meta:{layout:'main', auth:true},
    component: () => import('../views/Record.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// гварды для успешного входа с стр auth
// смотрим поле в meta - auth  true/false
router.beforeEach((to, from, next) => {
  // проверяем есть ли такой пользователь в firebase
const currentUser = firebase.auth().currentUser
const requireAuth = to.matched.some(record => record.meta.auth)

// если нет такой страницы, перекидываем на главную
if(requireAuth && !currentUser) {
next('/login?message=login')
} else {
  next()
}

})
export default router
