'use strict'
var t = Object.defineProperty
var r = Object.getOwnPropertyDescriptor
var a = Object.getOwnPropertyNames
var l = Object.prototype.hasOwnProperty
var p = (e, o, c, n) => {
  if ((o && typeof o == 'object') || typeof o == 'function')
    for (let i of a(o))
      !l.call(e, i) &&
        i !== c &&
        t(e, i, { get: () => o[i], enumerable: !(n = r(o, i)) || n.enumerable })
  return e
}
var s = (e) => p(t({}, '__esModule', { value: !0 }), e)
var k = {}
module.exports = s(k)
