'use strict'
var t = Object.defineProperty
var s = Object.getOwnPropertyDescriptor
var a = Object.getOwnPropertyNames
var c = Object.prototype.hasOwnProperty
var n = (e, o, r, l) => {
  if ((o && typeof o == 'object') || typeof o == 'function')
    for (let d of a(o))
      !c.call(e, d) &&
        d !== r &&
        t(e, d, { get: () => o[d], enumerable: !(l = s(o, d)) || l.enumerable })
  return e
}
var i = (e) => n(t({}, '__esModule', { value: !0 }), e)
var p = {}
module.exports = i(p)
