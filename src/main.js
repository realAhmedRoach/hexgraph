// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// Firebase imports
import firebase from 'firebase'
import { config } from './helpers/firebase'

import VueChart from 'vue-chart-js'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueChart)
Vue.use(VueClipboard)

Vue.config.productionTip = false

/* eslint-disable no-undef */
router.beforeEach((to, from, next) => {
  var requiresAuthAndNoUser = to.matched.some(record => record.meta.requiresAuth) &&
    !firebase.auth().currentUser // the page requires auth but the user isn't signed in
  var requiresEmeraldAndNotEmerald = to.matched.some(record => record.meta.requiresEmerald) &&
    !store.state.user.isEmerald // the page requires an Emerald account but the user isn't emerald
  if (requiresAuthAndNoUser) {
    ga('set', 'page', '/app/login')
    ga('send', 'pageview')
    next({
      name: 'auth',
      query: {
        redirect: to.fullPath
      }
    })
  } else if (requiresEmeraldAndNotEmerald) {
    ga('set', 'page', '/app')
    ga('send', 'pageview')
    next({ name: 'home' })
  } else {
    ga('set', 'page', to.path)
    ga('send', 'pageview')
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  created () {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push({ name: this.$store.state.user.newUser ? 'signUp' : 'home' })
      }
    })
  },
  store,
  template: '<App/>',
  components: { App }
})
