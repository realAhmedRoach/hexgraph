import firebase from 'firebase'
import { firebaseAction } from 'vuexfire'

var db = null

export const addToStudentInput = ({ state }, { classCode, newInput }) => {
  if (!db) {
    db = firebase.database()
  }
  var ref = db.ref('/classes/' + classCode + '/studentInput').push()
  ref.set({
    ...newInput
  })
}

export const addToData = ({ state }, { input, output, topic }) => {
  if (!db) {
    db = firebase.database()
  }
  var formattedInput = []
  input.forEach(element => formattedInput.push(element / 100))
  var data = [...formattedInput, output, topic]
  var ref = db.ref('/data').push()
  ref.set({
    ...data
  })
}

export const addClass = ({ state }, { className, classCode, classTopic }) => {
  if (!db) {
    db = firebase.database()
  }

  if (!classCode || !className || !classTopic) {
    alert('All fields have to be filled!')
    return
  }

  db.ref('/classes/').once('value', function (snapshot) {
    if (snapshot.hasChild(classCode)) {
      alert('A class with this code already exists! Try another code!')
    } else {
      var ref = db.ref('/classes/' + classCode)

      var data = {
        code: classCode,
        name: className,
        topic: classTopic,
        studentInput: []
      }

      ref.set(data)

      db.ref('/teachers/' + firebase.auth().currentUser.uid + '/classes/').push(classCode)
    }
  })
}

export const getUserData = ({ commit }) => {
  if (!db) {
    db = firebase.database()
  }
  if (!firebase.auth().currentUser) {
    return
  }

  var ref =  db.ref('/teachers/' + firebase.auth().currentUser.uid + '/classes')

  ref.on('value', function (snapshot) {
    commit('clearClasses')

    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val()
      db.ref('/classes/' + childData).on('value', function (snapshot) {
        commit('pushClass', snapshot.val())
      })
    })
  })

  firebase.database().ref('/teachers/' + firebase.auth().currentUser.uid + '/emerald').on('value', function (snapshot) {
    commit('isEmerald', snapshot.val())
  })

  firebase.database().ref('/teachers/' + firebase.auth().currentUser.uid + '/waitlist').on('value', function (snapshot) {
    commit('waitlist', snapshot.val())
  })
}
