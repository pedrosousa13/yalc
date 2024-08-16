function r(r, t) {
  if (t == null || t > r.length) t = r.length
  for (var n = 0, o = new Array(t); n < t; n++) o[n] = r[n]
  return o
}
function t(t) {
  if (Array.isArray(t)) return r(t)
}
function n(r) {
  if (
    (typeof Symbol !== 'undefined' && r[Symbol.iterator] != null) ||
    r['@@iterator'] != null
  )
    return Array.from(r)
}
function o() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}
function e(r) {
  return t(r) || n(r) || a(r) || o()
}
function a(t, n) {
  if (!t) return
  if (typeof t === 'string') return r(t, n)
  var o = Object.prototype.toString.call(t).slice(8, -1)
  if (o === 'Object' && t.constructor) o = t.constructor.name
  if (o === 'Map' || o === 'Set') return Array.from(o)
  if (o === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))
    return r(t, n)
}
import i from 'chalk'
var u = function (r) {
    var t = r.output,
      n = r.methods
    var o = {}
    n.forEach(function (r) {
      var n = r
      typeof console[n] == 'function' &&
        ((o[n] = console[n]),
        (console[n] = function () {
          for (var r = arguments.length, e = new Array(r), a = 0; a < r; a++) {
            e[a] = arguments[a]
          }
          t({ method: n, args: e, oldMethods: o })
        }))
    })
  },
  f = function () {
    u({ methods: ['log', 'warn', 'info'], output: function () {} })
  },
  c = function () {
    u({
      methods: ['log', 'warn', 'error', 'info'],
      output: function (r) {
        var t = r.method,
          n = r.args,
          o = r.oldMethods
        var a
        var u =
          { warn: i.yellowBright, info: i.blueBright, error: i.redBright }[t] ||
          function (r) {
            return r
          }
        ;(a = o)[t].apply(
          a,
          e(
            n.map(function (r) {
              return typeof r == 'string' ? u(r) : r
            })
          )
        )
      },
    })
  }
export { f as a, c as b }
