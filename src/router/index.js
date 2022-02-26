import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import LoginView from '@/views/LoginView'
import Profile from '@/views/ProfileView'
import MemberShip from '@/views/MemberShip'
import IdentificationView from '@/views/IdentificationView'
import BookService from '@/views/BookService'
import ChangePassword from '@/views/ChangePassword'
import DealerWarranty from '@/views/DealerWarranty'
import VehicleRegistration from '@/views/VehicleRegistration'
import PolicyDetails from '@/views/PolicyDetails'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/change',
    name: 'changePassword',
    component: ChangePassword
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/membership',
    name: 'membership',
    component: MemberShip
  },
  {
    path: '/identification',
    name: 'identification',
    component: IdentificationView
  },
  {
    path: '/vehicleRegis',
    name: 'vehicleRegis',
    component: VehicleRegistration
  },
  {
    path: '/dealerWarranty',
    name: 'dealerWarranty',
    component: DealerWarranty
  },
  {
    path: '/bookService',
    name: 'bookService',
    component: BookService
  },
  {
    path: '/policyDetails',
    name: 'policyDetails',
    component: PolicyDetails
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router
