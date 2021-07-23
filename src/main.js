import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// нативные компоненты
// компонент dateFilter - для часов в header
import dateFilter from '@/filters/date.filters.js'

// javascript из materialize
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false

// регистрируем наш собственный фильтер
Vue.filter('date', dateFilter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
