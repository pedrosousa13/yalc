'use strict'
var a = Object.defineProperty
var t = Object.getOwnPropertyDescriptor
var g = Object.getOwnPropertyNames
var p = Object.prototype.hasOwnProperty
var c = (n, e, s, r) => {
  if ((e && typeof e == 'object') || typeof e == 'function')
    for (let i of g(e))
      !p.call(n, i) &&
        i !== s &&
        a(n, i, { get: () => e[i], enumerable: !(r = t(e, i)) || r.enumerable })
  return n
}
var l = (n) => c(a({}, '__esModule', { value: !0 }), n)
var o = {}
module.exports = l(o)
