'use strict'
var n = Object.defineProperty
var r = Object.getOwnPropertyDescriptor
var i = Object.getOwnPropertyNames
var l = Object.prototype.hasOwnProperty
var p = (e, a, s, t) => {
  if ((a && typeof a == 'object') || typeof a == 'function')
    for (let o of i(a))
      !l.call(e, o) &&
        o !== s &&
        n(e, o, { get: () => a[o], enumerable: !(t = r(a, o)) || t.enumerable })
  return e
}
var c = (e) => p(n({}, '__esModule', { value: !0 }), e)
var g = {}
module.exports = c(g)
