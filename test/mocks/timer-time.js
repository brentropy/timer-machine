var Timer        = require('../../lib/timer')
var originalTime = Timer.prototype.time

exports.expect = function (val) {
  Timer.prototype.time = function () {
    return val
  }
}

exports.revert = function () {
  Timer.prototype.time = originalTime
}
