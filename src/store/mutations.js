export const newUser = function (state) {
  state.user.newUser = true
}

export const isEmerald = function (state, isEmerald) {
  state.user.isEmerald = isEmerald
}

export const waitlist = function (state, waitlist) {
  state.user.waitlist = waitlist
}

export const pushClass = function (state, clss) {
  var index = state.classes.findIndex(element => element.code === clss.code)
  if (index > -1) {
    state.classes.splice(index, 1)
  }
  state.classes.splice(index, 0, clss)
}

export const clearClasses = function (state) {
  state.classes = []
}
