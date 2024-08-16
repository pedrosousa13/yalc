'use strict'
var c = Object.defineProperty
var a = Object.getOwnPropertyDescriptor
var d = Object.getOwnPropertyNames
var g = Object.prototype.hasOwnProperty
var i = (o, e, t, n) => {
  if ((e && typeof e == 'object') || typeof e == 'function')
    for (let r of d(e))
      !g.call(o, r) &&
        r !== t &&
        c(o, r, { get: () => e[r], enumerable: !(n = a(e, r)) || n.enumerable })
  return o
}
var s = (o) => i(c({}, '__esModule', { value: !0 }), o)
var l = {}
module.exports = s(l)
