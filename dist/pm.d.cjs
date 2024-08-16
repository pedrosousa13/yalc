'use strict'
var t = Object.defineProperty
var g = Object.getOwnPropertyDescriptor
var s = Object.getOwnPropertyNames
var d = Object.prototype.hasOwnProperty
var i = (a, e, c, n) => {
  if ((e && typeof e == 'object') || typeof e == 'function')
    for (let r of s(e))
      !d.call(a, r) &&
        r !== c &&
        t(a, r, { get: () => e[r], enumerable: !(n = g(e, r)) || n.enumerable })
  return a
}
var o = (a) => i(t({}, '__esModule', { value: !0 }), a)
var p = {}
module.exports = o(p)
