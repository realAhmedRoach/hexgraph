export const weekmillis = 604800000
export const daymillis = 86400000

export const timestamp = function (key) {
  var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'
  key = key.substring(0, 8)
  var timestamp = 0
  for (var i = 0; i < key.length; i++) {
    var c = key.charAt(i)
    timestamp = timestamp * 64 + PUSH_CHARS.indexOf(c)
  }
  return timestamp
}

export const weeksAndDays = function (duration) {
  var weeks = Math.floor(duration / weekmillis)
  var days = Math.round((duration % weekmillis) / daymillis)

  if (weeks > 0) {
    return weeks + ((weeks > 1) ? ' weeks ' : ' week ') + ((days > 0) ? days : '') + ' days'
  } else {
    return days + ' days'
  }
}

export const withinWeek = function (start, end) {
  var diff = Math.abs(start.getTime() - start.getTime())
  return diff <= weekmillis
}
