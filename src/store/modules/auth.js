import AuthService from '@/services/AuthService'
import { getError } from '@/utils/helpers'


export default {
  namespaced: true,
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_MESSAGE(state, message) {
      state.message = message
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    logout({ commit }) {
      return AuthService.logout()
        .then(() => {
          commit('SET_USER', null)
          this.$router.push({ name: 'login' })
        })
        .catch((error) => commit('SET_ERROR', getError(error)))
    },
    getAuthUser({ commit }) {
      commit('SET_LOADING', true)
      return AuthService.getAuthUser()
        .then(response => {
          commit('SET_USER', response.data.data)
          commit('SET_LOADING', false)
        })
        .catch(error => {
          commit('SET_LOADING', false)
          commit('SET_USER', null)
          commit('SET_ERROR', getError(error))
        })
    }
  },
  getters: {
    authUser (state) {
      return state.user
    },
    isAdmin (state) {
      return state.user.isAdmin
    },
    error (state) {
      return state.error
    },
    loading (state) {
      return state.loading
    },
    loggedIn (state) {
      return !!state.user
    }
  },
}
