import Vue from 'vue'
import Vuex from 'vuex'
// modules
import auth from './auth'
import info from './info'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions:{
    // запрос по АПИ
  async fetchCurrency() {
    // получаем доступ к ключу в .env файлу
    const key = process.env.VUE_APP_FIXER
    
    // пуляю запрос на АПИ И через query параметры получаю конкретные данные какие нам нужны по валютам
    const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
    return await res.json()
  }
  },
  getters: {
    error: s => s.error
  },
  // модули
  modules: {
    auth,
    info
  }
})
