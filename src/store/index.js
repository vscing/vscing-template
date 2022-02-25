import Vue from 'vue'
import Vuex from 'vuex'

// import app from './modules/app'
import user from './modules/user'
import product from './modules/product'
import files from './modules/files'
import errLog from './modules/errLog'

// default router permission control
// import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    product,
    files,
    user,
    errLog,
  },
  getters,
  strict: debug,
})
