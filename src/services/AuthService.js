import axios from 'axios'
import store from '@/store'

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

/*
 * Add a response interceptor
 */
authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response &&
      [401, 419].includes(error.response.status) &&
      store.getters['auth/authUser'] &&
      !store.getters['auth/guest']
    ) {
      store.dispatch('auth/logout')
    }

    return Promise.reject(error)
  }
)

export default {
  async login(payload) {
    await authClient.get('/sanctum/csrf-cookie')
    return authClient.post('/login', payload)
  },
  logout() {
    return authClient.post("/logout")
  },
  async forgotPassword(payload) {
    await authClient.get("/sanctum/csrf-cookie")
    return authClient.post("/forgot-password", payload)
  },
  getAuthUser() {
    const authUser = store.getters['auth/authUser']
    return authClient.get(`/api/users/${authUser.id}`)
  },
  async resetPassword(payload) {
    await authClient.get("/sanctum/csrf-cookie")
    return authClient.post("/reset-password", payload)
  },
  updatePassword(payload) {
    return authClient.put("/user/password", payload)
  },
  async registerUser(payload) {
    await authClient.get("/sanctum/csrf-cookie")
    return authClient.post("/register", payload)
  },
  sendVerification(payload) {
    return authClient.post("/email/verification-notification", payload)
  },
  updateUser(payload) {
    return authClient.put("/user/profile-information", payload)
  },
}
