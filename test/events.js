/*jshint expr: true*/

var should       = require('should')
var Timer        = require('../lib/timer')
var EventEmitter = require('events').EventEmitter
var sinon        = require('sinon')

describe('The Timer/EventEmitter object', function () {

  var foo
  var spy

  beforeEach(function () {
    foo = new Timer()
    spy = sinon.spy()
  })

  it('should be an instance of EventEmitter', function () {
    foo.should.be.instanceof(EventEmitter)
  })

  it('should emit start event when started', function () {
    foo.on('start', spy)
    foo.start()
    spy.called.should.be.true
  })

  it('should emit stop event when stopped', function () {
    foo.on('stop', spy)
    foo.start()
    spy.called.should.be.false
    foo.stop()
    spy.called.should.be.true
  })

  it('should emit time event when emitTime is called', function () {
    var expected = 47
    foo._total   = expected
    foo.on('time', spy)
    foo.emitTime()
    spy.called.should.be.true
    sinon.assert.calledWith(spy, expected)
  })

})
