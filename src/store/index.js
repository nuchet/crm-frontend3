import Vue from 'vue'
import Vuex from 'vuex'
import service from '@/store/modules/service'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// Create store
export default new Vuex.Store({
  modules: {
    service
  },
  plugins: [createPersistedState()]
})
