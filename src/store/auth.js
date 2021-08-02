import axios from 'axios'
import router from '../router/index.js'
const API_URL = 'https://trello.backend.tests.nekidaem.ru/api/v1'

export default {
  state: {
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') || null,
  },
  mutations: {
    SET_USER(state, { username, token }) {
      state.user = username
      state.token = token
    },
    LOGOUT(state) {
      state.user = null
      state.token = null
    },
  },
  actions: {
    async login({ commit }, payload) {
      const response = await axios.post(API_URL + '/users/login/', payload)

      commit('SET_USER', {
        username: payload.username,
        token: response.data.token,
      })

      router.push('/board')

      localStorage.setItem('user', payload.username)
      localStorage.setItem('token', response.data.token)
    },

    async register({ commit }, payload) {
      const response = await axios.post(API_URL + '/users/create/', payload)

      commit('SET_USER', response.data)
      router.push('/board')

      localStorage.setItem('user', response.data.username)
      localStorage.setItem('token', response.data.token)
    },

    async logout({ commit }) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')

      commit('LOGOUT')

      router.push('/auth')
    },
  },
  getters: {
    user: (state) => state.user,
    token: (state) => state.token,
  },
}
