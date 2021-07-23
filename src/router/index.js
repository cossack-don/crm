import Vue from 'vue'
import VueRouter from 'vue-router'

// подключаем главную страницу
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/login',
    name:'login',
    // в роутере есть объект meta и мы можем передавать свои кастомные свойства - пример
    // meta:{layout:'empty'}  название лейаута empty
    // ссылка на пример как подключать layouts - https://www.youtube.com/watch?v=Pm2aASoksJU&list=PLqKQF2ojwm3njNpksFCi8o-_c-9Vva_W0&index=3
    // Смотреть файл App.vue там подключаем лейауты все !!!!
    meta:{layout:'empty'},
    component: () => import('../views/Login.vue')
  },
  {
    path:'/categories',
    name:'categories',
    meta:{layout:'main'},
    component: () => import('../views/Categories.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
