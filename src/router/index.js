import Vue from 'vue'
import VueRouter from 'vue-router'


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
    meta: {layout: 'main'},
    component: () => import('../views/Home.vue')
  },
  {
    path:'/categories',
    name:'categories',
    meta:{layout:'main'},
    component: () => import('../views/Categories.vue')
  },
  {
    // динамические роуты по id
    path:'/detail/:id',
    name:'detail',
    meta:{layout:'main'},
    component: () => import('../views/Detail.vue')
  },
  {
    path:'/history',
    name:'history',
    meta:{layout:'main'},
    component: () => import('../views/History.vue')
  },
  {
    path:'/planning',
    name:'planning',
    meta:{layout:'main'},
    component: () => import('../views/Planning.vue')
  },
  {
    path:'/profile',
    name:'profile',
    meta:{layout:'main'},
    component: () => import('../views/Profile.vue')
  },
  {
    path:'/record',
    name:'record',
    meta:{layout:'main'},
    component: () => import('../views/Record.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
