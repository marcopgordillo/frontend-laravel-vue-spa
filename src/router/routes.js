const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue')
const User = () => import(/* webpackChunkName: "user" */ '@/views/auth/User.vue')
const Users = () => import(/* webpackChunkName: "users" */ '@/views/auth/Users.vue')
const Login = () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue')
const Register = () => import(/* webpackChunkName: "register" */ '@/views/auth/Register.vue')
const ResetPassword = () => import(/* webpackChunkName: "reset-password" */ '@/views/auth/ResetPassword.vue')
const ForgotPassword = () => import(/* webpackChunkName: "forgot-password" */ '@/views/auth/ForgotPassword.vue')

import store from '@/store'

export default [
  { path: '/', component: Home, name: 'home' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/reset-password', component: ResetPassword, name: 'reset-password', meta: { requiresAuth: true } },
  { path: '/forgot-password', component: ForgotPassword, name: 'forgot-password' },
  { path: '/dashboard', component: Dashboard, name: 'dashboard', meta: { requiresAuth: true } },
  { path: '/user', component: User, name: 'user', meta: { requiresAuth: true } },
  { 
    path: '/users',
    component: Users, 
    name: 'users', 
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/isAdmin']) next();
      else next(false);
    },
  },
]
