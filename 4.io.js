const fp = require('lodash/fp')

class IO {
  constructor(fn) {
    this._value = fn
  }

  static of(value) {
    return new IO(function () {
      return value
    })
  }

  map(fn) {
    return new IO(fp.flowRight(fn, this._value))
  }
}

IO.of(process)
  .map(p => p.execPath)