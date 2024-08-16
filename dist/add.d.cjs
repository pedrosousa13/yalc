'use strict'
var r = Object.defineProperty
var l = Object.getOwnPropertyDescriptor
var i = Object.getOwnPropertyNames
var p = Object.prototype.hasOwnProperty
var t = (o, e, s, n) => {
  if ((e && typeof e == 'object') || typeof e == 'function')
    for (let a of i(e))
      !p.call(o, a) &&
        a !== s &&
        r(o, a, { get: () => e[a], enumerable: !(n = l(e, a)) || n.enumerable })
  return o
}
var d = (o) => t(r({}, '__esModule', { value: !0 }), o)
var b = {}
module.exports = d(b)
