# Timer Machine

[![npm](http://img.shields.io/npm/v/timer-machine.svg?style=flat)](https://www.npmjs.org/package/timer-machine)
[![Travis](http://img.shields.io/travis/brentburgoyne/timer-machine.svg?style=flat)](https://travis-ci.org/brentburgoyne/timer-machine)
[![Code Climate](http://img.shields.io/codeclimate/github/brentburgoyne/timer-machine.svg?style=flat)](https://codeclimate.com/github/brentburgoyne/timer-machine)
[![Code Climate Coverage](http://img.shields.io/codeclimate/coverage/github/brentburgoyne/timer-machine.svg?style=flat)](https://codeclimate.com/github/brentburgoyne/timer-machine)
[![Gemnasium](http://img.shields.io/gemnasium/brentburgoyne/timer-machine.svg?style=flat)](https://gemnasium.com/brentburgoyne/timer-machine)

A simple, flexible timer for JavaScript.

## Installation

```bash
$ npm install timer-machine --save
```

## Basic Usage

```js
var Timer = require('timer-machine')
var myTimer = new Timer()

myTimer.start()
myTimer.stop()
myTimer.time() // -> time in ms
```

## Named Timers

Timer Machine can maintain references to named timers. When the static method
`get('name')` is called, it constructs a new instance if the name did not
already exist, and returns the instance of `Timer`. This makes it easy to share a
timer across multiple modules.

```js
Timer.get('my').start()
Timer.get('my').time()
```

Alternatively, use it on the require if you only need a single named instance.

```js
var myTimer = require('timer-machine').get('my')
```

Timer Machine allows for deleting named timers by calling the `destroy('name')`
static method.

```js
Timer.destroy('my')
```

## Timer Controls

### `start()`

By default, a new `Timer` object is stopped, unless the first argument of the
constructor is `true`, and is started by calling the `start()` method. The
`start()` method returns a `Boolean` indicating whether or not the timer was
started.

```js
var timer1 = new Timer()
timer1.start() // -> true - the timer started

var timer2 = new Timer(true)
timer2.start() // -> false - the timer is already started
```

### `stop()`

To stop or pause a timer, call the `stop()` method. Similar to the `start()`
method, `stop()` returns a `Boolean` indicating whether or not the timer was
stopped.

```js
var timer = new Timer()
timer.stop() // -> false - the timer is already stopped
timer.start()
timer.stop() // -> true - the timer stopped
```

A stopped `Timer` can be started again. The timer will only track the total
length of time the timer has been started.

```js
var timer = new Timer()
timer.start()
timer.stop()
timer.start()
```

### `toggle()`

The `toggle()` method will call `start()` if the `Timer` is stopped or `stop()`
if the timer is started.

```js
var timer = new Tiemr()
timer.isStarted() // -> false
timer.toggle()
timer.isStarted() // -> true
timer.toggle()
timer.isStarted() // -> false
```

## Time

### `time()`

To get the length of time that a timer has run, the `time()` method can be used
to a `Number` of the current time in milliseconds.

```js
var timer = new Timer()
timer.start()
setTimeout(function () {
  timer.time() // -> ~100
}, 100)
```

### `emitTime()`

The `emitTime()` method is the same as the `time()` method, except it emits a
`'time'` event with the current time in milliseconds. See [Events](#Events)
below.

### `valueOf()`

On `Timer` objects, `valueOf()` is an alias for `time()` and is used internally
by JavaScript when a timer object is converted to a primitive value. This is
useful for, among other things, adding and subtracting timers.

```js
//...
timer1.time() // -> 50
timer2.time() // -> 30
timer1 + timer2 // -> 80
timer1 - timer2 // -> 20
timer + 0 // -> 50
```

### `toString()`

To string is used by JavaScript to convert an object in to a string. The `Timer`
`toString()` method returns the `time()` prepended with "ms".

```js
console.log("Current time: " + timer1) // -> "Current time: 50ms"
```

### `timeFromStart()`

While the `time()` returns the total number of milliseconds for the `Timer`,
`timeFromStart()` returns only the time since the most recent `start()`.

```js
var timer = new Timer()
timer.start()
timer.timeFromStart() === timer.time() // -> true
//...
timer.stop()
timer.start()
timer.timeFromStart() === timer.time() // -> false
```

## Timer State

### `isStarted()`

A `Timer` object has an `isStarted()` method. It returns a `true` if the timer
is started and `false` if it is stopped.

```js
var timer = new Timer
timer.isStarted() // -> false
timer.start()
timer.isStarted() // -> true
```

### `isStopped()`

A `Timer` object has an `isStopped()` method, which is the inverse of the
`isStarted()` method.

```js
var timer = new Timer
timer.isStopped() // -> true
timer.start()
timer.isStopped() // -> false
```

## Events

A `Timer` object inherits from [`EventEmitter`][1] allowing event listeners to
added an removed. A `Timer` emits three events.

### Event: `'start'`

The `'start'` event is emitted every time a `Timer` is started, whether it be
by the `start()` method or `toggle()` method.

```js
timer.on('start', function () {
  console.log('The timer started')
})
```

### Event: `'stop'`

The `'stop'` event is emitted every time a `Timer` is stopped, whether it be
by the `stop()` method or `toggle()` method.

```js
timer.on('stop', function () {
  console.log('The timer stopped')
})
```

### Event `'time'`

The `'time'` event is only emitted when the `emitTIme()` method is called. The
event handler callback receives the current time in milliseconds as the first
argument.

```js
var timer = new Timer()
timer.on('time', function (time) {
  console.log('Current time: ' + time + 'ms')
})
timer.start()
setInterval(timer.emitTime.bind(timer), 1000)
```

## Development

Pull requests are welcome.

### Get the code

```bash
$ git clone git@github.com:brentburgoyne/timer-machine.git
```

### Install the dependencies

```bash
$ npm install
```

### Run the tests

```bash
$ npm test
```

## License

Copyright (c) 2014 Brent Burgoyne.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[1]: http://nodejs.org/api/events.html#events_class_events_eventemitter
