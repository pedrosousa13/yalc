'use strict'
var l = Object.defineProperty
var o = Object.getOwnPropertyDescriptor
var i = Object.getOwnPropertyNames
var r = Object.prototype.hasOwnProperty
var c = (e, a, n, s) => {
  if ((a && typeof a == 'object') || typeof a == 'function')
    for (let t of i(a))
      !r.call(e, t) &&
        t !== n &&
        l(e, t, { get: () => a[t], enumerable: !(s = o(a, t)) || s.enumerable })
  return e
}
var d = (e) => c(l({}, '__esModule', { value: !0 }), e)
var p = {}
module.exports = d(p)
