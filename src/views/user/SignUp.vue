<template>
  <div id="signUp">
    <div class="copy">
      <h3>Welcome to Hexgraph!</h3>
      <p>Finish setting up your account.</p>
    </div>
    <div class="input-field">
      <label for="name">Name</label>
      <input type="text" v-model="name" class="form-control" id="name">
    </div>
    <div class="input-field">
      <label for="referrer">How did you hear about us?</label>
      <input type="text" v-model="referrer" class="form-control" id="referrer">
    </div>

    <button type="button" class="waves-effect waves-light btn" @click="finish">Get Started</button>
  </div>
</template>
<script>
import firebase from 'firebase'

export default {
  name: 'signUp',
  data: () => ({
    name: '',
    referrer: ''
  }),
  methods: {
    finish () {
      var user = firebase.auth().currentUser

      user.updateProfile({
        displayName: this.name
      }).then(function () {
        console.log('User added successfully')
      }).catch(function (error) {
        alert(error.message)
      })

      window.Intercom('boot', {
        app_id: 'epvqmo8t',
        name: this.name, // Full name
        email: firebase.auth().currentUser.email, // Email address
        referrer: this.referrer,
        created_at: (new Date()).getTime
      })
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="scss" scoped>
.copy {
  padding-bottom: 10px;
}
</style>
