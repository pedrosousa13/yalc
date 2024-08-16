var m = Object.defineProperty,
  n = Object.defineProperties
var o = Object.getOwnPropertyDescriptors
var h = Object.getOwnPropertySymbols
var p = Object.prototype.hasOwnProperty,
  q = Object.prototype.propertyIsEnumerable
var i = (b, a, c) =>
    a in b
      ? m(b, a, { enumerable: !0, configurable: !0, writable: !0, value: c })
      : (b[a] = c),
  r = (b, a) => {
    for (var c in a || (a = {})) p.call(a, c) && i(b, c, a[c])
    if (h) for (var c of h(a)) q.call(a, c) && i(b, c, a[c])
    return b
  },
  s = (b, a) => n(b, o(a))
var t = ((b) =>
  typeof require != 'undefined'
    ? require
    : typeof Proxy != 'undefined'
    ? new Proxy(b, {
        get: (a, c) => (typeof require != 'undefined' ? require : a)[c],
      })
    : b)(function (b) {
  if (typeof require != 'undefined') return require.apply(this, arguments)
  throw Error('Dynamic require of "' + b + '" is not supported')
})
var u = (b, a) => () => (b && (a = b((b = 0))), a)
var v = (b, a) => () => (a || b((a = { exports: {} }).exports, a), a.exports)
var w = (b, a, c) =>
  new Promise((j, g) => {
    var k = (d) => {
        try {
          e(c.next(d))
        } catch (f) {
          g(f)
        }
      },
      l = (d) => {
        try {
          e(c.throw(d))
        } catch (f) {
          g(f)
        }
      },
      e = (d) => (d.done ? j(d.value) : Promise.resolve(d.value).then(k, l))
    e((c = c.apply(b, a)).next())
  })
export { r as a, s as b, t as c, u as d, v as e, w as f }
