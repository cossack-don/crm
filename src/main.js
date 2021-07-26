import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'

// нативные компоненты
// компонент dateFilter - для часов в header
import dateFilter from '@/filters/date.filters.js'
import currencyFilter from '@/filters/currency.filters.js'

// плагины (свои самописные)
import messagePlagin from '@/utils/message.plagin.js'

// loader для всего приложения можно использовать
import Loader from '@/components/app/Loader'


// javascript из materialize
import 'materialize-css/dist/js/materialize.min'

// firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// 
// 
// 
Vue.config.productionTip = false

// 
// 
// плагин подключаю
Vue.use(messagePlagin)

// подключаем плагин VueValidate - https://vuelidate.js.org/#getting-started
Vue.use(Vuelidate)

// регистрируем наш собственный фильтер
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);

// регистрирую компонент глобально (Лоадер)
Vue.component('Loader',Loader)
// 
// 
// init firebase app config
firebase.initializeApp({
  apiKey: "AIzaSyCU7qEsYk_iCLPj0NZyIZWoIJD_jkLrqdM",
  authDomain: "crm-vue-2021.firebaseapp.com",
  projectId: "crm-vue-2021",
  storageBucket: "crm-vue-2021.appspot.com",
  messagingSenderId: "393694637780",
  appId: "1:393694637780:web:14e739f8d4f408ece85541"
});


let app

// авторизация через firebase
firebase.auth().onAuthStateChanged(() => {

  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})
