import axios from 'axios'

const state = {
  user: null,
  posts: null,
  changePassword: null,
  token: localStorage.getItem('access_token') || null,
  province: null,
  district: null,
  subdistrict: null,
  appManUrl: 'https://ml.appman.co.th/v1/thailand-id-card/',
  resultAppMan: null,
  carBrand: null,
  carColor: null,
  carModel: null,
  carSubModel: null,
  active: null,
  card: null,
  cardStatus: null,
  saleTent: null,
  customer: null,
  addCustomer: null,
  addActive: null,
}

const getters = {
  isAuthenticated: (state) => !!state.user,
  StatePosts: (state) => state.posts,
  StateUser: (state) => state.user,
  isChangePassword: (state) => state.changePassword,
  StateProvince: (state) => state.province,
  StateDistrict: (state) => state.district,
  StateSubDistrict: (state) => state.subdistrict,
  StateResultAppMan: (state) => state.resultAppMan,
  StateCarBrand: (state) => state.carBrand,
  StateCarColor: (state) => state.carColor,
  StateCarModel: (state) => state.carModel,
  StateCarSubModel: (state) => state.carSubModel,
  StateActive: (state) => state.active,
  StateCard: (state) => state.card,
  StateCardStatus: (state) => state.cardStatus,
  StateSaleTent: (state) => state.saleTent,
  StateCustomer: (state) => state.customer,
  StateAddCustomer: (state) => state.addCustomer,
  StateAddActive: (state) => state.addActive,
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

  async GetDistrict ({ commit }, provinceId) {
    const response = await axios.get('api/province/listdistrict/' + provinceId)
    commit('setDistrict', response.data)
  },

  async GetSubDistrict ({ commit }, districtId) {
    const response = await axios.get('api/province/listsubdistrict/' + districtId)
    commit('setSubDistrict', response.data)

  },

  async CheckCardNumber ({ commit }) {
    console.log("kkkk");
    const response = await axios.get('api/cardstatus?card_number=NXT220100003', {
      headers: { 
        Accept: 'application/json', 
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
    }).catch((error) => {
      console.log(error.response.data);
    })
    // const response = await axios.get('api/listactivate', {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('access_token')}`
    //   }
    // })
    console.log(response);
    console.log(localStorage.getItem('access_token'));
    commit('setCardNumber', response.data)
  },

  async GetAllCarBrand ({ commit }) {
    const response = await axios.get('api/car/brand')
    commit('setCarBrand', response.data)
  },

  async GetAllCarColor ({ commit }) {
    const response = await axios.get('api/car/color')
    commit('setCarColor', response.data)
  },

  async GetCarModel ({ commit }, id) {
    const response = await axios.get('api/car/model/' + id)
    commit('setCarModel', response.data)
  },

  async GetCarSubModel ({ commit }) {
    const response = await axios.get('api/car/submodel/10')
    commit('setSubCarModel', response.data)
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

  async CreateCustomer ({ commit }, addcustomer) {
    const response = await axios.post('api/addcustomer', addcustomer, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    commit('setAddCustomer', response.data)
  },

  async CreateActive ({ commit }, addActive) {
    const response = await axios.post('api/activate', addActive, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    commit('setAddActive', response.data)
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
  },

  async ClearState ({ commit}) {
   commit('clearState')
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
  setDistrict (state, district) {
    state.district = district
  },
  setSubDistrict (state, subdistrict) {
    state.subdistrict = subdistrict
  },
  setResultAppMan (state, result) {
    state.resultAppMan = result
  },
  setCarBrand (state, carBrand) {
    state.carBrand = carBrand
  },
  setCarModel (state, carModel) {
    state.carModel = carModel
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
  },
  setAddCustomer (state, addCustomer) {
    state.addCustomer = addCustomer
  },
  setCardNumber (state, cardStatus) {
    state.cardStatus = cardStatus
  },
  setAddActive (state, addActive) {
    state.addActive = addActive
  },
  clearState (state) {
    state.district = null,
    state.subdistrict = null,
    state.carModel = null,
    state.active = null,
    state.addCustomer = null,
    state.addActive = null,
    state.cardStatus = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
