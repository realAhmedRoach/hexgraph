<template>
  <div id="app-nav">
    <nav>
      <div class="nav-wrapper">
        <a href="#" data-activates="side" class="button-collapse"><i class="material-icons black-text">menu</i></a>
        <!-- <a href="#!" v-else @click="goBack()" class="left back"><i class="material-icons black-text">arrow_back</i></a> -->
        <ul class="side-nav" id="side">
          <li><router-link class="black-text" :to="{ name: 'home' }"><i class="material-icons black-text">home</i>Home</router-link></li>
          <li><router-link :class="emeraldClass" :to="{ name: 'progress' }"><i class="material-icons black-text">trending_up</i>Progress</router-link></li>
          <li><router-link :class="emeraldClass" :to="{ name: 'experiments' }"><i class="material-icons black-text">tune</i>Experiments</router-link></li>
          <li><router-link class="black-text" :to="{ name: 'settings' }"><i class="material-icons black-text">settings</i>Settings</router-link></li>
          <li v-if="!user.waitlist"><router-link :to="{ name: 'emerald' }" class="btn waves-light">Get Hexgraph Emerald</router-link></li>
          <li><a @click="logOut" class="red-text"><i class="material-icons left red-text">exit_to_app</i>Log Out</a></li>
        </ul>
        <a class="brand-logo center black-text">{{ title }}</a>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import firebase from 'firebase'

export default {
  name: 'app-nav',
  props: {
    'title': {
      type: String,
      default: function () {
        return this.$route.name.charAt(0).toUpperCase() + this.$route.name.slice(1).toLowerCase()
      }
    }
  },
  /* eslint-disable no-undef */
  mounted () {
    $('.button-collapse').sideNav({
      closeOnClick: true
    })
  },
  computed: {
    ...mapState(['user']),
    emeraldClass: function () {
      return 'black-text ' + this.user.isEmerald ? 'disabled' : ''
    },
    uid: function () {
      return firebase.auth().currentUser.uid
    },
    showNav () {
      return this.$route.name !== 'clss'
    }
  },
  methods: {
    logOut () {
      firebase.auth().signOut()
      this.$router.push({ name: 'site' })
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.button-collapse {
  display: block;
}
.back {
  padding-left: 10px;
}
nav {
  background-color: #26ffc4;
}
</style>
