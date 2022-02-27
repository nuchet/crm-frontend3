import axios from 'axios'

const state = {
  user: null,
  posts: null,
  changePassword: null,
  token: localStorage.getItem('access_token') || null,
  province: null,
  appManUrl: 'https://ml.appman.co.th/v1/thailand-id-card/',
  resultAppMan: null,
  carBrand: null,
  carColor: null,
  active: null,
  card: null,
  saleTent: null,
  customer: null
}

const getters = {
  isAuthenticated: (state) => !!state.user,
  StatePosts: (state) => state.posts,
  StateUser: (state) => state.user,
  isChangePassword: (state) => state.changePassword,
  StateProvince: (state) => state.province,
  StateResultAppMan: (state) => state.resultAppMan,
  StateCarBrand: (state) => state.carBrand,
  StateCarColor: (state) => state.carColor,
  StateActive: (state) => state.active,
  StateCard: (state) => state.card,
  StateSaleTent: (state) => state.saleTent,
  StateCustomer: (state) => state.customer
}

const actions = {
  async LogIn ({ commit }, user) {
    const response = await axios.post('api/login', user)
    await commit('setUser', response.data)
  },

  async ChangePassword ({ commit }, changePassword) {
     const response = await axios.post('api/changepassword', changePassword, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    await commit('setChangePassword', response.data.status)
  },

  async CreatePost ({ dispatch }, post) {
    await axios.post('post', post)
    return await dispatch('GetPosts')
  },

  async GetPosts ({ commit }) {
    const response = await axios.get('posts')
    commit('setPosts', response.data)
  },

  async LogOut ({ commit }) {
    const response = await axios.get('api/logout', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    if (response.data.status === true) {
      const user = null
      commit('logout', user)
    }
  },

  async GetAllProvince ({ commit }) {
    const response = await axios.get('api/province/listprovince')
    commit('setProvince', response.data)
  },

  async GetAllCarBrand ({ commit }) {
    const response = await axios.get('api/car/brand')
    commit('setCarBrand', response.data)
  },

  async GetAllCarColor ({ commit }) {
    const response = await axios.get('api/car/color')
    commit('setCarColor', response.data)
  },

  async GetAllActive ({ commit }) {
    const response = await axios.get('api/listactivate', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    commit('setActive', response.data)
  },

  async GetAllCard ({ commit }) {
    const response = await axios.get('api/listcard', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    commit('setCard', response.data)
  },

  async GetAllSaleTent ({ commit }) {
    const response = await axios.get('api/listsaletent', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    commit('setSaleTent', response.data)
  },

  async GetAllCustomer ({ commit}) {
    const response = await axios.get('api/listcustomer', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    commit('setCustomer', response.data)
  },


  async CheckDataAppMan ({ commit}, file) {
    const config = {
      headers : {
        'Content-Type' : 'multipart/form-data',
        'x-api-key' : 'UuW92bONHs7hoc8uY9eGk8nhqE90B8t93jyVZu1s'
      }
    }
   const response = await axios.post(state.appManUrl + 'front', file, config)
   commit('setResultAppMan', response.data)
  }
}

const mutations = {
  setUser (state, user) {
    state.user = user
    localStorage.setItem('access_token', user.token)
  },
  setChangePassword (state, changePassword) {
    state.changePassword = changePassword
  },

  setPosts (state, posts) {
    state.posts = posts
  },
  logout (state, user) {
    state.user = user
  },
  setProvince (state, province) {
    state.province = province
  },
  setResultAppMan (state, result) {
    state.resultAppMan = result
  },
  setCarBrand (state, carBrand) {
    state.carBrand = carBrand
  },
  setCarColor (state, carColor) {
    state.carColor = carColor
  },
  setActive (state, active) {
    state.active = active
  },
  setCard (state, card) {
    state.card = card
  },
  setSaleTent (state, saleTent) {
    state.saleTent = saleTent
  }, 
  setCustomer (state, customer) {
    state.customer = customer
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
