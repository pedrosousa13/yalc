'use strict'
var k = Object.create
var i = Object.defineProperty,
  y = Object.defineProperties,
  b = Object.getOwnPropertyDescriptor,
  m = Object.getOwnPropertyDescriptors,
  w = Object.getOwnPropertyNames,
  l = Object.getOwnPropertySymbols,
  x = Object.getPrototypeOf,
  d = Object.prototype.hasOwnProperty,
  F = Object.prototype.propertyIsEnumerable
var u = (e, n, r) =>
    n in e
      ? i(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (e[n] = r),
  a = (e, n) => {
    for (var r in n || (n = {})) d.call(n, r) && u(e, r, n[r])
    if (l) for (var r of l(n)) F.call(n, r) && u(e, r, n[r])
    return e
  },
  f = (e, n) => y(e, m(n))
var O = (e, n) => {
    for (var r in n) i(e, r, { get: n[r], enumerable: !0 })
  },
  p = (e, n, r, s) => {
    if ((n && typeof n == 'object') || typeof n == 'function')
      for (let t of w(n))
        !d.call(e, t) &&
          t !== r &&
          i(e, t, {
            get: () => n[t],
            enumerable: !(s = b(n, t)) || s.enumerable,
          })
    return e
  }
var R = (e, n, r) => (
    (r = e != null ? k(x(e)) : {}),
    p(
      n || !e || !e.__esModule
        ? i(r, 'default', { value: e, enumerable: !0 })
        : r,
      e
    )
  ),
  j = (e) => p(i({}, '__esModule', { value: !0 }), e)
var $ = {}
O($, { readRcConfig: () => S })
module.exports = j($)
var o = R(require('fs'), 1)
var q = require('ini'),
  g = ['sig', 'workspace-resolve', 'dev-mod', 'scripts', 'quiet', 'files'],
  c = '.yalcrc',
  v = () =>
    o.default.existsSync(c)
      ? q.parse(o.default.readFileSync(c, 'utf-8'))
      : null,
  S = () => {
    let e = v()
    if (!e) return {}
    let n = Object.keys(e).filter((r) => !g.includes(r))
    return (
      n.length &&
        (console.warn(`Unknown option in ${c}: ${n[0]}`), process.exit()),
      Object.keys(e).reduce(
        (r, s) => (g.includes(s) ? f(a({}, r), { [s]: e[s] }) : r),
        {}
      )
    )
  }
0 && (module.exports = { readRcConfig })
