import axios from 'axios'

const state = {
  user: null,
  posts: null,
  changePassword: null,
  token: localStorage.getItem('access_token') || null
}

const getters = {
  isAuthenticated: (state) => !!state.user,
  StatePosts: (state) => state.posts,
  StateUser: (state) => state.user,
  isChangePassword: (state) => state.changePassword
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
