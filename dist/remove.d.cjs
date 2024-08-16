'use strict'
var s = Object.defineProperty
var i = Object.getOwnPropertyDescriptor
var n = Object.getOwnPropertyNames
var c = Object.prototype.hasOwnProperty
var g = (o, e, t, r) => {
  if ((e && typeof e == 'object') || typeof e == 'function')
    for (let a of n(e))
      !c.call(o, a) &&
        a !== t &&
        s(o, a, { get: () => e[a], enumerable: !(r = i(e, a)) || r.enumerable })
  return o
}
var p = (o) => g(s({}, '__esModule', { value: !0 }), o)
var k = {}
module.exports = p(k)
