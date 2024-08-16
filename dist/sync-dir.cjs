'use strict'
var oe = Object.create
var b = Object.defineProperty
var ie = Object.getOwnPropertyDescriptor
var ce = Object.getOwnPropertyNames
var le = Object.getPrototypeOf,
  pe = Object.prototype.hasOwnProperty
var ge = (e, a) => {
    for (var t in a) b(e, t, { get: a[t], enumerable: !0 })
  },
  T = (e, a, t, c) => {
    if ((a && typeof a == 'object') || typeof a == 'function')
      for (let s of ce(a))
        !pe.call(e, s) &&
          s !== t &&
          b(e, s, {
            get: () => a[s],
            enumerable: !(c = ie(a, s)) || c.enumerable,
          })
    return e
  }
var r = (e, a, t) => (
    (t = e != null ? oe(le(e)) : {}),
    T(
      a || !e || !e.__esModule
        ? b(t, 'default', { value: e, enumerable: !0 })
        : t,
      e
    )
  ),
  fe = (e) => T(b({}, '__esModule', { value: !0 }), e)
var o = (e, a, t) =>
  new Promise((c, s) => {
    var k = (l) => {
        try {
          u(t.next(l))
        } catch (y) {
          s(y)
        }
      },
      p = (l) => {
        try {
          u(t.throw(l))
        } catch (y) {
          s(y)
        }
      },
      u = (l) => (l.done ? c(l.value) : Promise.resolve(l.value).then(k, p))
    u((t = t.apply(e, a)).next())
  })
var Me = {}
ge(Me, { copyDirSafe: () => U })
module.exports = fe(Me)
var Q = r(require('glob'), 1),
  X = r(require('util'), 1),
  m = require('path'),
  d = r(require('fs-extra'), 1)
var K = r(require('crypto'), 1),
  z = r(require('fs-extra'), 1),
  Se = r(require('ignore'), 1),
  xe = r(require('npm-packlist'), 1)
var J = r(require('fs-extra'), 1),
  Y = require('os')
var me = r(require('fs-extra'), 1)
var M = r(require('fs-extra'), 1)
var de = r(require('fs-extra'), 1)
var ve = r(require('fs-extra'), 1)
var C = r(require('fs-extra'), 1)
var f = r(require('fs-extra'), 1)
var H = r(require('fs-extra'), 1)
var De = r(require('detect-indent'), 1)
var Nn = (0, Y.homedir)()
var jn = global
var L = (e, a = '') =>
  new Promise((t, c) =>
    o(void 0, null, function* () {
      let s = z.default.createReadStream(e),
        k = K.default.createHash('md5')
      k.update(a.replace(/\\/g, '/')),
        s.on('data', (p) => k.update(p)),
        s.on('error', c).on('close', () => {
          t(k.digest('hex'))
        })
    })
  )
var B = parseInt(process.versions.node.split('.').shift(), 10)
B >= 8 &&
  B < 10 &&
  (Symbol.asyncIterator =
    Symbol.asyncIterator || Symbol('Symbol.asyncIterator'))
var G = X.default.promisify(Q.default),
  w = {},
  q = (e) => e.reduce((a, t) => ((a[t] = !0), a), {}),
  Fe = (e, a) => e.mtime.getTime() === a.mtime.getTime() && e.size === a.size,
  U = (e, a, t = !0) =>
    o(void 0, null, function* () {
      let c = '**/node_modules/**',
        p = w[e]
          ? w[e].glob
          : yield G('**', { cwd: e, ignore: c, dot: !0, nodir: !1 }),
        u = yield G('**', { cwd: a, ignore: c, dot: !0, nodir: !1 }),
        l = q(p),
        y = q(u),
        $ = p.filter((n) => !y[n]),
        S = u.filter((n) => !l[n]),
        Z = p.filter((n) => y[n])
      w[e] = w[e] || { files: {}, glob: p }
      let R = [],
        P = w[e].files,
        x = {},
        ee = (yield Promise.all(
          Z.map((n) =>
            o(void 0, null, function* () {
              var N
              let i = (0, m.resolve)(e, n),
                g = (0, m.resolve)(a, n),
                v =
                  ((N = P[n]) == null ? void 0 : N.stat) ||
                  (yield d.default.stat(i))
              P[n] = P[n] || { stat: v, hash: '' }
              let F = yield d.default.stat(g)
              return {
                file: n,
                srcFileStat: v,
                destFileStat: F,
                srcFilePath: i,
                destFilePath: g,
              }
            })
          )
        )).map((N) =>
          o(void 0, [N], function* ({
            file: n,
            srcFileStat: i,
            destFileStat: g,
            srcFilePath: v,
            destFilePath: F,
          }) {
            let ae = i.isDirectory() && g.isDirectory()
            x[n] = g.isDirectory()
            let te = i.isDirectory() && !g.isDirectory(),
              j = !i.isDirectory() && g.isDirectory()
            ;(j || te) && S.push(n)
            let re = () =>
              o(void 0, null, function* () {
                let E = P[n].hash || (yield L(v, ''))
                P[n].hash = E
                let se = yield L(F, '')
                return E === se
              })
            ;(j || (!ae && !Fe(i, g) && (!t || !(yield re())))) && R.push(n)
          })
        )
      yield Promise.all(ee),
        yield Promise.all(
          S.filter((n) => !x[n]).map((n) =>
            d.default.remove((0, m.resolve)(a, n))
          )
        ),
        yield Promise.all(
          S.filter((n) => x[n]).map((n) =>
            d.default.remove((0, m.resolve)(a, n))
          )
        )
      let ne = yield Promise.all(
        $.map((n) =>
          d.default.stat((0, m.resolve)(e, n)).then((i) => i.isDirectory())
        )
      )
      yield Promise.all(
        $.filter((n, i) => !ne[i])
          .concat(R)
          .map((n) =>
            d.default.copy((0, m.resolve)(e, n), (0, m.resolve)(a, n))
          )
      )
    })
0 && (module.exports = { copyDirSafe })
