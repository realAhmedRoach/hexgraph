<template>
  <div id="app">
    <Navigation v-if="routeName == 'site'"></Navigation>
    <AppNav v-else-if="showAppNav" :title="navTitle"></AppNav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import firebase from 'firebase'
import Navigation from '@/components/Navigation'
import AppNav from '@/components/AppNav'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState(['user']),
    ...mapGetters(['classByCode']),
    name: function () {
      return firebase.auth().currentUser.displayName
    },
    uid: function () {
      return firebase.auth().currentUser.uid
    },
    text: function () {
      return 'You have reffered ' + this.user.referrals + ' friends!'
    },
    showAppNav: function () {
      return this.$route.meta.requiresAuth
    },
    routeName: function () {
      return this.$route.name
    },
    navTitle: function () {
      if (this.routeName === 'home') {
        return 'Your Classes'
      } else if (this.routeName === 'clss') {
        return this.classByCode(this.$route.params.classCode).name
      } else {
        return this.routeName.charAt(0).toUpperCase() + this.routeName.slice(1).toLowerCase()
      }
    }
  },
  methods: {
    logOut () {
      firebase.auth().signOut()
      this.$router.push({ name: 'site' })
    },
    onCopy () {
      this.text = 'Referral link copied!'
    }
  },
  components: {
    Navigation,
    AppNav
  }
}
</script>

<style lang="scss">
.emerald-text {
  color: #26ffc4;
}

.accent {
  background-color: #ff2651;
}

h1 {
  @extend .emerald-text;
}

.btn-large, .btn {
  background-color: #26ffc4;
  color: rgba(0,0,0,0.87);
}

body {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 2;
}

// Custom wave effect with app color
.waves-effect.waves-emerald .waves-ripple {
  background-color: rgba(38, 255, 196, 0.65);
}

.btn-flat {
  font-weight: 700;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
}
</style>
