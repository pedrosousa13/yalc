#!/usr/bin/env node
'use strict'
var b = Object.defineProperty
var i = Object.getOwnPropertyDescriptor
var p = Object.getOwnPropertyNames
var s = Object.prototype.hasOwnProperty
var t = (n, e, d, r) => {
  if ((e && typeof e == 'object') || typeof e == 'function')
    for (let o of p(e))
      !s.call(n, o) &&
        o !== d &&
        b(n, o, { get: () => e[o], enumerable: !(r = i(e, o)) || r.enumerable })
  return n
}
var u = (n) => t(b({}, '__esModule', { value: !0 }), n)
var v = {}
module.exports = u(v)
