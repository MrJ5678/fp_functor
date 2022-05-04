const fp = require("lodash/fp")
const fs = require("fs")

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

let readFile = function (filename) {
  return new IO(function () {
    return fs.readFileSync(filename, "utf-8")
  })
}

let print = function (x) {
  return new IO(function () {
    console.log(x)
    return x
  })
}

let cat = fp.flowRight(print, readFile)
let r = cat("1.functor.js")._value._value()

console.log(r)
