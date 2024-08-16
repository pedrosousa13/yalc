'use strict'
var c = Object.create
var l = Object.defineProperty
var h = Object.getOwnPropertyDescriptor
var f = Object.getOwnPropertyNames
var p = Object.getPrototypeOf,
  u = Object.prototype.hasOwnProperty
var g = (o, n) => {
    for (var t in n) l(o, t, { get: n[t], enumerable: !0 })
  },
  a = (o, n, t, r) => {
    if ((n && typeof n == 'object') || typeof n == 'function')
      for (let e of f(n))
        !u.call(o, e) &&
          e !== t &&
          l(o, e, {
            get: () => n[e],
            enumerable: !(r = h(n, e)) || r.enumerable,
          })
    return o
  }
var y = (o, n, t) => (
    (t = o != null ? c(p(o)) : {}),
    a(
      n || !o || !o.__esModule
        ? l(t, 'default', { value: o, enumerable: !0 })
        : t,
      o
    )
  ),
  m = (o) => a(l({}, '__esModule', { value: !0 }), o)
var M = {}
g(M, { disabledConsoleOutput: () => C, makeConsoleColored: () => k })
module.exports = m(M)
var d = y(require('chalk'), 1),
  i = ({ output: o, methods: n }) => {
    let t = {}
    n.forEach((r) => {
      let e = r
      typeof console[e] == 'function' &&
        ((t[e] = console[e]),
        (console[e] = (...s) => {
          o({ method: e, args: s, oldMethods: t })
        }))
    })
  },
  C = () => {
    i({ methods: ['log', 'warn', 'info'], output: () => {} })
  },
  k = () => {
    i({
      methods: ['log', 'warn', 'error', 'info'],
      output: ({ method: o, args: n, oldMethods: t }) => {
        let e =
          {
            warn: d.default.yellowBright,
            info: d.default.blueBright,
            error: d.default.redBright,
          }[o] || ((s) => s)
        t[o](...n.map((s) => (typeof s == 'string' ? e(s) : s)))
      },
    })
  }
0 && (module.exports = { disabledConsoleOutput, makeConsoleColored })
