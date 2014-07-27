/*jshint expr: true*/

var should = require('should')
var Timer  = require('../lib/timer')

describe('The Timer function', function () {

  var foo

  before(function () {
    foo = Timer.get('foo')
  })

  describe('get static method', function () {

    it('should create a new Timer if it does not exist', function () {
      Timer.get('bar')
        .should.be.an.instanceof(Timer)
        .and.should.not.equal(foo)
      Timer.destroy('bar')
    })

    it('should return a reference to an existing named timer', function () {
      Timer.get('foo').should.equal(foo)
    })

  })

  describe('destroy static method', function () {

    it('should destroy a named timer', function () {
      Timer.destroy('foo')
      Timer.get('foo').should.not.equal(foo)
    })

    it('should return true if the timer existed', function () {
      Timer.destroy('foo').should.be.true
    })

    it('should return false if the timer did not exist', function () {
      Timer.destroy('bar').should.be.false
    })

  })

})
