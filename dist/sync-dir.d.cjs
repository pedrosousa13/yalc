'use strict'
var t = Object.defineProperty
var s = Object.getOwnPropertyDescriptor
var c = Object.getOwnPropertyNames
var a = Object.prototype.hasOwnProperty
var d = (e, r, n, i) => {
  if ((r && typeof r == 'object') || typeof r == 'function')
    for (let o of c(r))
      !a.call(e, o) &&
        o !== n &&
        t(e, o, { get: () => r[o], enumerable: !(i = s(r, o)) || i.enumerable })
  return e
}
var p = (e) => d(t({}, '__esModule', { value: !0 }), e)
var D = {}
module.exports = p(D)
