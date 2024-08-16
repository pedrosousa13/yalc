'use strict'
var l = Object.defineProperty
var s = Object.getOwnPropertyDescriptor
var b = Object.getOwnPropertyNames
var t = Object.prototype.hasOwnProperty
var p = (e, o, i, n) => {
  if ((o && typeof o == 'object') || typeof o == 'function')
    for (let a of b(o))
      !t.call(e, a) &&
        a !== i &&
        l(e, a, { get: () => o[a], enumerable: !(n = s(o, a)) || n.enumerable })
  return e
}
var r = (e) => p(l({}, '__esModule', { value: !0 }), e)
var c = {}
module.exports = r(c)
