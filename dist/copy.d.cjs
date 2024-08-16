'use strict'
var i = Object.defineProperty
var a = Object.getOwnPropertyDescriptor
var s = Object.getOwnPropertyNames
var d = Object.prototype.hasOwnProperty
var l = (n, e, t, r) => {
  if ((e && typeof e == 'object') || typeof e == 'function')
    for (let o of s(e))
      !d.call(n, o) &&
        o !== t &&
        i(n, o, { get: () => e[o], enumerable: !(r = a(e, o)) || r.enumerable })
  return n
}
var c = (n) => l(i({}, '__esModule', { value: !0 }), n)
var g = {}
module.exports = c(g)
