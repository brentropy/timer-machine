var should = require('should')
var sinon  = require('sinon')
var Timer  = require('../lib/timer')

var getTimeMock   = require('./mocks/date-get-time')
var timerTimeMock = require('./mocks/timer-time')

describe('A Timer object', function () {

  var timer
  var start = 100
  var end   = 200

  beforeEach(function () {
    timer = new Timer()
    getTimeMock.expect(start)
  })

  afterEach(function () {
    getTimeMock.revert()
  })

  describe('constructor', function () {

    it('should initialize a new Timer object', function () {
      timer.should.be.an.instanceof(Timer)
    })

    it('should be stopped unless the first argument is true', function () {
      timer.isStopped().should.be.true
    })

    it('should be started if the first argument is true', function () {
      var autoTimer = new Timer(true)
      autoTimer.isStarted().should.be.true
    })

  })

  describe('time prototype method', function () {

    it('should return 0 if the timer has not been started', function () {
      timer.time().should.equal(0)
    })

    it('should return the time since start if only started once', function () {
      timer.start()
      getTimeMock.expect(end)
      timer.time().should.equal(end - start)
    })

    it ('should include the total of past start/stops', function () {
      timer._total = 47
      timer.start()
      getTimeMock.expect(end)
      timer.time().should.equal(end - start + timer._total)
    })

  })

  describe('emitTime prototype method', function () {

    it('should return the result of timer.time', function () {
      var expected = {}
      timerTimeMock.expect(expected)
      timer.emitTime().should.equal(expected)
      timerTimeMock.revert()
    })

  })

  describe('timeFromStart prototype method', function () {

    it('should return 0 if the timer is stopped', function () {
      timer.timeFromStart().should.equal(0)
      timer.start()
      getTimeMock.expect(end)
      timer.stop()
      timer.timeFromStart().should.equal(0)
    })

    it('should return the time since start', function () {
      timer.start()
      getTimeMock.expect(end)
      timer.timeFromStart().should.equal(end - start)
    })

    it ('should not include the total of past start/stops', function () {
      timer._total = 47
      timer.start()
      getTimeMock.expect(end)
      timer.timeFromStart().should.equal(end - start)
    })

  })

  describe('isStarted prototype method', function () {

    it('should return false when the timer is stopped', function () {
      timer.isStarted().should.be.false
      timer.start()
      timer.stop()
      timer.isStarted().should.be.false
    })

    it('should return true when the timer is started', function () {
      timer.start()
      timer.isStarted().should.be.true
    })

  })

  describe('isStopped prototype method', function () {

    it('should return true when the timer is stopped', function () {
      timer.isStopped().should.be.true
      timer.start()
      timer.stop()
      timer.isStopped().should.be.true
    })

    it('should return false when the timer is started', function () {
      timer.start()
      timer.isStopped().should.be.false
    })

  })

  describe('start prototype method', function () {

    it('should return true if currently stopped', function () {
      timer.start().should.be.true
      timer.stop()
      timer.start().should.be.true
    })

    it('should return false if currently started', function () {
      timer.start()
      timer.start().should.be.false
    })

    it('should set timer._start to the current time', function () {
      timer.start()
      timer._start.should.equal(start)
    })

  })

  describe('stop prototype method', function () {

    it('should return true if currently started', function () {
      timer.start()
      timer.stop().should.be.true
    })

    it('should return false if currently stopped', function () {
      timer.stop().should.be.false
      timer.start()
      timer.stop()
      timer.stop().should.be.false
    })

    it('should set timer._start to null', function () {
      timer.start()
      timer.stop()
      should(timer._start).equal(null)
    })

  })

  describe('stopParallel prototype method', function () {

    it('should return true if called equal to start', function () {
      timer.start()
      timer.start()
      timer.stopParallel()
      debugger
      timer.stopParallel().should.be.true
    })

    it('should return false if called less than start', function () {
      timer.start()
      timer.start()
      timer.stopParallel().should.be.false
    })

    it('should set timer._start to null if called equal to start', function () {
      timer.start()
      timer.start()
      timer.stopParallel()
      timer.stopParallel()
      should(timer._start).equal(null)
    })

    it('should not set timer._start to null if called less', function () {
      timer.start()
      timer.start()
      timer.stopParallel()
      should(timer._start).not.equal(null)
    })

  })

  describe('toggle prototype method', function () {

    it('should start the timer when it is stopped', function () {
      timer.toggle()
      timer.isStarted().should.be.true
    })

    it('should stop the timer when it is started', function () {
      timer.start()
      timer.toggle()
      timer.isStopped().should.be.true
    })

    it('should always return true', function () {
      timer.toggle().should.be.true
      timer.toggle().should.be.true
    })

  })

  describe('toString prototype method', function () {

    it('should return a string', function () {
      timer.toString().should.be.a.String
    })

    it('should be a whole number followed by"ms"', function () {
      timer.toString().should.match(/\d+ms/)
    })

  })

  describe('valueOf prototype method', function () {

    it('should be an alias of time()', function () {
      var expected = {}
      sinon.stub(timer, 'time').returns(expected)
      timer.valueOf().should.equal(expected)
      timer.time.restore()
    })

  })

})
