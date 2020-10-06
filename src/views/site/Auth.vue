<template lang="html">
  <div id="loginContainer" class="container">
    <div class="row">
      <div class="col s8 offset-s2">
        <p v-if="$route.query.emerald">We're adding you to the Emerald waitlist!</p>

        <h3 style="text-align: center">{{ (user == 'new') ? 'Sign Up' : 'Login' }}</h3>

        <form>
          <div class="input-field">
            <input v-model="email" type="email" id="email">
            <label for="email">Email address</label>
          </div>
          <div class="input-field">
            <input v-model="password" type="password" id="password">
            <label for="password">Password</label>
          </div>

          <div v-if="message != ''" class="red-text">{{ message }}</div>

          <button type="button" @click="login" class="waves-effect waves-emerald btn-flat">Login</button>

          <button type="button" @click="signUp" class="waves-effect waves-light btn">Sign Up</button>
        </form>
        <br>
        <div>
          <h4 style="text-align: center" :class="(user == 'student' ? 'emerald-text bold-text' : '')">I'm a student</h4>
          <form>
            <div class="input-field">
              <input type="text" id="classCode" v-model="classCode">
              <label for="classCode">Class Code</label>
            </div>

            <div v-if="studentMessage != ''" class="red-text">{{ studentMessage }}</div>

            <button type="button" @click="student" class="waves-effect waves-light btn">Go</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'auth',
  props: ['user'],
  data: () => ({
    classCode: '',
    message: '',
    studentMessage: '',
    email: '',
    password: '',
    hasErrors: false
  }),
  beforeCreate () {
    if (firebase.auth().currentUser) {
      this.$router.push({ name: 'home' })
    }
  },
  /* eslint-disable no-undef */
  methods: {
    login: function (event) {
      this.message = ''
      this.hasErrors = false

      if (this.email === '' || this.password === '') {
        this.message = 'Please provide the email and password'
        this.hasErrors = true
        return
      }

      // Sign-in the user with the email and password
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          this.email = ''
          this.password = ''
          window.Intercom('boot', {
            app_id: 'epvqmo8t',
            name: firebase.auth().currentUser.displayName, // Full name
            email: firebase.auth().currentUser.email // Email address
          })

          var waitlistRef = db.ref('/teachers/' + firebase.auth().currentUser.uid + '/waitlist')
          waitlistRef.set(true)
        }).catch(error => {
          if (error.code === 'auth/user-not-found') {
            this.message = 'We couldn\'t find a user with that email address.'
          } else if (error.code === 'auth/wrong-password') {
            this.message = 'Incorrect password! Try again.'
          } else if (error.code === 'auth/invalid-email') {
            this.message = 'That doesn\'t look like a valid email.'
          } else {
            this.message = error.message
          }
          this.hasErrors = true
        })

      this.$router.push({ name: 'home' })
    },

    signUp: function (event) {
      this.message = ''
      this.hasErrors = false

      if (this.email === '' || this.password === '') {
        this.message = 'Please provide the email and password'
        this.hasErrors = true
        return
      }

      // Create a new user in firebase
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          this.message = 'Successfully created user'
          this.email = ''
          this.password = ''
          this.$store.commit('newUser')

          var waitlistRef = db.ref('/teachers/' + firebase.auth().currentUser.uid + '/waitlist')
          waitlistRef.set(true)
        }).catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            this.message = 'This email is already in use! Did you already make an account?'
          } else if (error.code === 'auth/weak-password') {
            this.message = 'Your password has to be at least 6 characters.'
          } else if (error.code === 'auth/invalid-email') {
            this.message = 'That doesn\'t look like a valid email.'
          } else {
            this.message = error.message
          }
          this.hasErrors = true
        })

      this.$router.push({ name: 'signUp' })
    },
    student: function (event) {
      var vm = this
      var ref = firebase.database().ref('/classes/' + this.classCode)

      ref.once('value', snapshot => {
        if (snapshot.val() != null) {
          this.$router.push({ name: 'student-input', params: { classCode: vm.classCode } })
          console.log('exists!')
        } else {
          vm.studentMessage = 'We couldn\'t find a class with that code! Please try again.'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bold-text {
  font-weight: 600;
}

p {
  text-align: center;
}

i.material-icons {
  display: inline;
}

.back {
  text-align: center;
  padding: 10px;
  margin: 10px;
}
</style>
