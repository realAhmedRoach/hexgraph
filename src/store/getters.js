export const statsByCode = (state, getters) => (code) => {
  // find the right data
  var data = state.classes.find(clss => clss.code === code).studentInput

  if (!data) return null

  // this maps the object to an array
  var array = Object.keys(data).map(function (key) {
    return data[key]
  })

  var res = []
  var sum = 0
  // loop through the array to get the average
  for (var i = 0; i < array[0].length; i++) {
    sum = 0
    for (var j = 0; j < array.length; j++) {
      sum += array[j][i]
    }
    res.push(Math.round(sum / array.length))
  }
  return res
}

export const statsByInput = (state, getters) => (input) => {
  if (!input || input.length === 0) return null

  // this maps the object to an array
  var array = Object.keys(input).map(function (key) {
    return input[key]
  })

  var res = []
  var sum = 0
  // loop through the array to get the average
  for (var i = 0; i < array[0].length; i++) {
    sum = 0
    for (var j = 0; j < array.length; j++) {
      sum += array[j][i]
    }
    res.push(Math.round(sum / array.length))
  }
  return res
}

export const allStats = (state, getters) => (code) => {
  var studentInput = {}
  if (!code) {
    for (var i = 0; i < state.classes.length; i++) {
      for (var key in state.classes[i].studentInput) {
        // console.log(state.classes[i].studentInput[key])
        studentInput[key] = state.classes[i].studentInput[key]
      }
    }
  } else {
    var data = state.classes.find(clss => clss.code === code).studentInput
    studentInput = data
  }

  return studentInput
}

export const classByCode = (state) => (code) => {
  return state.classes.find(clss => clss.code === code)
}

import firebase from 'firebase'
export const isEmerald = (state) => {
  if (!firebase.auth().currentUser) return false

  var isEmerald = false
  firebase.database().ref('/teachers/' + firebase.auth().currentUser.uid + '/emerald').once('value', function (snapshot) {
    isEmerald = snapshot.val()
  })
  return isEmerald
}

export const getTopic = (state) => (code) => {
  var topic = -1
  firebase.database().ref('/classes/' + code + '/topic').once('value', function (snapshot) {
    topic = snapshot.val()
  })
  return topic
}
