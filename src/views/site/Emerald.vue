<template>
  <div id="emerald" class="container">
    <p>
      <router-link :to="{ name: 'site' }">Back to Home</router-link>
    </p>
    <span id="hexgraph">Hexgraph</span>
    <span id="title">Emerald</span>
    <u>The new Hexgraph is almost here.</u>

    <div class="row">
      <div class="icon col m4 s12">
        <i class="material-icons">{{ features[0].icon }}</i>
      </div>
      <div class="col m8 s12">
        <h4>{{ features[0].title }}</h4>
        <p v-html="features[0].explanation"></p>
      </div>
    </div>

    <div class="row">
      <div class="col m8 s12">
        <h4>{{ features[1].title }}</h4>
        <p v-html="features[1].explanation"></p>
      </div>
      <div class="icon col m4 s12">
        <i class="material-icons">{{ features[1].icon }}</i>
      </div>
    </div>

    <div class="row">
      <div class="icon col m4 s12">
        <i class="material-icons">{{ features[2].icon }}</i>
      </div>
      <div class="col m8 s12">
        <h4>{{ features[2].title }}</h4>
        <p v-html="features[2].explanation"></p>
      </div>
    </div>

    <div id="referral" v-if="!user.isEmerald">
      <p id="cta">Get early access:</p>
      <div class="row">
        <div class="col m8 s12 input-field">
          <input type="email" name="email" v-model="email">
          <label for="email">Email Address</label>
        </div>
        <div class="col m4 s12">
          <button @click="register" type="button" class="waves-effect waves-light btn pulse">Register</button>
        </div>
      </div>
      <div class="green-text">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  name: 'emerald',
  props: ['referrer'],
  data: () => ({
    email: '',
    message: '',
    cta: 'Sign Up',

    features: [
      {
        icon: 'visibility',
        title: 'Gain deeper insights',
        explanation: 'Emerald\'s AI allows you to dig deeper into what your students are thinking, so you can <mark>improve with precision</mark>.'
      },
      {
        icon: 'trending_up',
        title: 'Visualize your improvement',
        explanation: 'Powerful graphs allow you to <mark>see how your metrics are changing</mark>, so you know how you need to change.'
      },
      {
        icon: 'tune',
        title: 'Tune your teaching',
        explanation: 'Emerald\'s powerful experiments feature will allow you to <mark>try out different tactics</mark> so you can tell what is making the most impact.'
      }
    ]
  }),
  computed: mapState(['user']),
  methods: {
    /* eslint-disable no-undef */
    register () {
      if (this.email === '') {
        return
      }

      var db = firebase.database()
      var ref = db.ref('/emerald/').push()
      ref.set(this.email)
      ga('send', 'event', 'Sign Up', 'Waitlist')
      this.message = 'Thank you! You\'ll be one of the first to try out Hexgraph Emerald!'
      if (this.referrer) {
        var referrerRef = db.ref('/teachers/' + this.referrer + '/referrals')
        referrerRef.transaction(function (referrals) {
          if (referrals) {
            referrals++
          }
          return (referrals || 0) + 1
        })
      }
      if (firebase.auth().currentUser) {
        var waitlistRef = db.ref('/teachers/' + firebase.auth().currentUser.uid + '/waitlist')
        waitlistRef.set(true)
      } else {
        this.$router.push({ name: 'auth', query: { u: 'new', emerald: true } })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#emerald {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#hexgraph {
  font-size: 2rem;
}

#title {
  font-size: 6rem;
  color: #26ffc4;
}

#cta {
  font-size: 1.7rem;
  text-align: center;
}

#referral {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 50px;
}

h1 {
  text-align: center;
}

i.material-icons {
  font-size: 8rem;
}

.icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.row {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-large {
  margin-bottom: 10px;
}

.message {
  text-align: center;
}
</style>
