/**
 * Expoe `Timer`.
 */
module.exports = Timer

/**
 * Stores named timers.
 */
var timers = {}

/**
 * Initialize a `Timer` object
 * @param {Boolean} start
 * @api public
 */
function Timer(start) {
  this._total = 0
  this._start = null
  if (start) {
    this.start()
  }
}

/**
 * Get a named timer, initialize a new one if it does not exist.
 * @param {String} name
 * @return {Timer}
 * @api public
 */
Timer.get = function (name) {
  if (!timers[name]) {
    timers[name] = new Timer()
  }
  return timers[name]
}

/**
 * Delete an existing named timer.
 * @param {String} name
 * @return {Boolean}
 * @api public
 */
Timer.delete = function (name) {
  if (timers[name]) {
    return delete timers[name]
  }
  return false
}

/**
 * Get the total milliseconds the timer has run.
 * @return {Number}
 * #api public
 */
Timer.prototype.time = function () {
  var total = this._total
  total += this.timeFromStart()
  return total
}

/**
 * Check to see if the timer object is currently paused.
 * @return {Boolean}
 * @api public
 */
Timer.prototype.isPaused = function () {
  return this._start === null
}

/**
 * Get the time in milliseconds since the timer was last started.
 * @return {Number}
 * @api public
 */
Timer.prototype.timeFromStart = function () {
  return this.isPaused ? 0 : now() - this._start
}

/**
 * Start the timer if it was not already started.
 * @return {Boolean}
 * @api public
 */
Timer.prototype.start = function () {
  if (this.isPaused()) {
    this._start = now()
    return true
  }
  return false
}

/**
 * Pasue the timer if it was not already paused.
 * @return {Boolean}
 * @api public
 */
Timer.prototype.pause = function () {
  if (!this.isPaused()) {
    this._total += this.timeFromStart()
    this._start = null
    return true
  }
  return false
}

/**
 * Start or pause the timer depending on current state.
 * @return {Boolean}
 * @api public
 */
Timer.prototype.toggle = function () {
  return this.start() || this.pause()
}

/**
 * Get the current time in milliseconds.
 * @return {Number}
 * @api private
 */
function now() {
  return new Date().getTime();
}
