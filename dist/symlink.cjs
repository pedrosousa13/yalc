'use strict'
var k = Object.create
var s = Object.defineProperty
var l = Object.getOwnPropertyDescriptor
var u = Object.getOwnPropertyNames
var v = Object.getPrototypeOf,
  x = Object.prototype.hasOwnProperty
var C = (n, r) => {
    for (var t in r) s(n, t, { get: r[t], enumerable: !0 })
  },
  p = (n, r, t, m) => {
    if ((r && typeof r == 'object') || typeof r == 'function')
      for (let o of u(r))
        !x.call(n, o) &&
          o !== t &&
          s(n, o, {
            get: () => r[o],
            enumerable: !(m = l(r, o)) || m.enumerable,
          })
    return n
  }
var S = (n, r, t) => (
    (t = n != null ? k(v(n)) : {}),
    p(
      r || !n || !n.__esModule
        ? s(t, 'default', { value: n, enumerable: !0 })
        : t,
      n
    )
  ),
  b = (n) => p(s({}, '__esModule', { value: !0 }), n)
var a = (n, r, t) =>
  new Promise((m, o) => {
    var f = (e) => {
        try {
          c(t.next(e))
        } catch (i) {
          o(i)
        }
      },
      g = (e) => {
        try {
          c(t.throw(e))
        } catch (i) {
          o(i)
        }
      },
      c = (e) => (e.done ? m(e.value) : Promise.resolve(e.value).then(f, g))
    c((t = t.apply(n, r)).next())
  })
var j = {}
C(j, { symlink: () => h })
module.exports = b(j)
var y = S(require('fs-extra'), 1)
var h = (n, r, t = !0) =>
  a(void 0, null, function* () {
    return y.default.removeSync(r), y.default.symlink(n, r)
  })
0 && (module.exports = { symlink })
