function e(e, r, t) {
  if (r in e) {
    Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    e[r] = t
  }
  return e
}
function r(r) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {}
    var c = Object.keys(n)
    if (typeof Object.getOwnPropertySymbols === 'function') {
      c = c.concat(
        Object.getOwnPropertySymbols(n).filter(function (e) {
          return Object.getOwnPropertyDescriptor(n, e).enumerable
        })
      )
    }
    c.forEach(function (t) {
      e(r, t, n[t])
    })
  }
  return r
}
function t(e, r) {
  var t = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    if (r) {
      n = n.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable
      })
    }
    t.push.apply(t, n)
  }
  return t
}
function n(e, r) {
  r = r != null ? r : {}
  if (Object.getOwnPropertyDescriptors) {
    Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
  } else {
    t(Object(r)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
    })
  }
  return e
}
import { a as c } from './chunk-3SAEGOMQ.mjs'
import o from 'fs'
var i = c('ini'),
  u = ['sig', 'workspace-resolve', 'dev-mod', 'scripts', 'quiet', 'files'],
  s = '.yalcrc',
  f = function () {
    return o.existsSync(s) ? i.parse(o.readFileSync(s, 'utf-8')) : null
  },
  l = function () {
    var t = f()
    if (!t) return {}
    var c = Object.keys(t).filter(function (e) {
      return !u.includes(e)
    })
    return (
      c.length &&
        (console.warn('Unknown option in '.concat(s, ': ').concat(c[0])),
        process.exit()),
      Object.keys(t).reduce(function (c, o) {
        return u.includes(o) ? n(r({}, c), e({}, o, t[o])) : c
      }, {})
    )
  }
export { l as a }
