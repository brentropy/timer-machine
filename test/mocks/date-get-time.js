/*jshint freeze: false*/

var originalGetTime = Date.prototype.getTime

exports.expect = function (time) {
  Date.prototype.getTime = function () {
    return time
  }
}

exports.revert = function () {
  Date.prototype.getTime = originalGetTime
}
