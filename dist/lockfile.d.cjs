'use strict'
var n = Object.defineProperty
var c = Object.getOwnPropertyDescriptor
var t = Object.getOwnPropertyNames
var l = Object.prototype.hasOwnProperty
var g = (o, e, a, r) => {
  if ((e && typeof e == 'object') || typeof e == 'function')
    for (let i of t(e))
      !l.call(o, i) &&
        i !== a &&
        n(o, i, { get: () => e[i], enumerable: !(r = c(e, i)) || r.enumerable })
  return o
}
var k = (o) => g(n({}, '__esModule', { value: !0 }), o)
var s = {}
module.exports = k(s)
