import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import { firebaseMutations } from 'vuexfire'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

var metrics = [
  {
    label: 'Organization',
    question: 'How easy is it for you to find everything related to this class?',
    tip: 'Try making class material easier to find and easier to understand.'
  },
  {
    label: 'Participation',
    question: 'Do you regularly provide input in the class?',
    tip: 'Try inducing a friendly and fun environment to energize your students.'
  },
  {
    label: 'Work Ethic',
    question: 'How energized or ready do you feel when doing work in this class?',
    tip: 'Emphasize to students that you have high expectations of them.'
  },
  {
    label: 'Enjoyment',
    question: 'How much fun do you have in this class?',
    tip: 'Try to do more activities that engage and energize your students.'
  },
  {
    label: 'Collaboration',
    question: 'Do you enjoy working with your peers in this class?',
    tip: 'Do more group activities and allow students to interact with each other.'
  },
  {
    label: 'Mindset',
    question: 'How much do you think you can improve in this class?',
    tip: 'Show students how much they can, and have, improved.'
  }
]

export default new Vuex.Store({
  mode: 'history',
  state: {
    metrics,
    topics: ['English/Language Arts', 'Math', 'History/Social Studies', 'Foreign Language', 'Exploratory'],
    classes: [],
    classCodes: [],

    user: {
      newUser: false,
      isEmerald: false,
      waitlist: false,
      referrals: 0
    }
  },
  getters,
  mutations: {
    ...mutations,
    ...firebaseMutations
  },
  actions,
  strict: debug
})
