import { createStore } from 'vuex'

import auth from './modules/auth'

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
  },
})

