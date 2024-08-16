'use strict'
var W = Object.create
var y = Object.defineProperty
var U = Object.getOwnPropertyDescriptor
var H = Object.getOwnPropertyNames
var J = Object.getPrototypeOf,
  Y = Object.prototype.hasOwnProperty
var K = (e, a) => {
    for (var n in a) y(e, n, { get: a[n], enumerable: !0 })
  },
  I = (e, a, n, t) => {
    if ((a && typeof a == 'object') || typeof a == 'function')
      for (let r of H(a))
        !Y.call(e, r) &&
          r !== n &&
          y(e, r, {
            get: () => a[r],
            enumerable: !(t = U(a, r)) || t.enumerable,
          })
    return e
  }
var s = (e, a, n) => (
    (n = e != null ? W(J(e)) : {}),
    I(
      a || !e || !e.__esModule
        ? y(n, 'default', { value: e, enumerable: !0 })
        : n,
      e
    )
  ),
  z = (e) => I(y({}, '__esModule', { value: !0 }), e)
var i = (e, a, n) =>
  new Promise((t, r) => {
    var o = (c) => {
        try {
          d(n.next(c))
        } catch (f) {
          r(f)
        }
      },
      g = (c) => {
        try {
          d(n.throw(c))
        } catch (f) {
          r(f)
        }
      },
      d = (c) => (c.done ? t(c.value) : Promise.resolve(c.value).then(o, g))
    d((n = n.apply(e, a)).next())
  })
var de = {}
K(de, {
  addInstallations: () => j,
  cleanInstallations: () => me,
  readInstallationsFile: () => m,
  removeInstallations: () => u,
  saveInstallationsFile: () => M,
  showInstallations: () => fe,
})
module.exports = z(de)
var w = s(require('fs-extra'), 1),
  F = s(require('path'), 1)
var A = s(require('fs-extra'), 1),
  _ = require('os'),
  S = require('path')
var G = s(require('fs-extra'), 1),
  q = s(require('ignore'), 1),
  Q = s(require('npm-packlist'), 1)
var ee = s(require('fs-extra'), 1)
var P = s(require('fs-extra'), 1),
  C = require('path')
var re = (e) => (e.version == 'v1' && e.packages ? 'v1' : 'v0'),
  se = { v0: (e) => ({ version: 'v1', packages: e }), v1: (e) => e },
  oe = (e) => {
    let a = re(e)
    return se[a](e)
  }
var h = (e) => {
  let a = (0, C.join)(e.workingDir, l.lockfileName),
    n = { version: 'v1', packages: {} }
  try {
    n = oe(P.readJSONSync(a))
  } catch (t) {
    return n
  }
  return n
}
var ce = s(require('fs-extra'), 1)
var D = s(require('fs-extra'), 1)
var p = s(require('fs-extra'), 1)
var R = s(require('glob'), 1),
  N = s(require('util'), 1)
var le = s(require('fs-extra'), 1)
var $ = parseInt(process.versions.node.split('.').shift(), 10)
$ >= 8 &&
  $ < 10 &&
  (Symbol.asyncIterator =
    Symbol.asyncIterator || Symbol('Symbol.asyncIterator'))
var cn = N.default.promisify(R.default)
var E = s(require('fs-extra'), 1)
var pe = s(require('detect-indent'), 1)
var ge = (0, _.homedir)(),
  l = {
    myNameIs: 'yalc',
    ignoreFileName: '.yalcignore',
    myNameIsCapitalized: 'Yalc',
    lockfileName: 'yalc.lock',
    yalcPackagesFolder: '.yalc',
    prescript: 'preyalc',
    postscript: 'postyalc',
    installationsFile: 'installations.json',
  },
  T = global
function x() {
  return T.yalcStoreMainDir
    ? T.yalcStoreMainDir
    : process.platform === 'win32' && process.env.LOCALAPPDATA
    ? (0, S.join)(process.env.LOCALAPPDATA, l.myNameIsCapitalized)
    : (0, S.join)(ge, '.' + l.myNameIs)
}
var m = () => {
    let e = x(),
      a = F.default.join(e, l.installationsFile),
      n
    try {
      w.default.accessSync(a)
      try {
        n = w.default.readJsonSync(a)
      } catch (t) {
        console.error('Error reading installations file', a, t), (n = {})
      }
    } catch (t) {
      n = {}
    }
    return n
  },
  fe = ({ packages: e }) => {
    let a = m()
    Object.keys(a)
      .filter((n) => (e.length ? e.indexOf(n) >= 0 : !0))
      .map((n) => ({ name: n, locations: a[n] }))
      .forEach(({ name: n, locations: t }) => {
        console.log(`Installations of package ${n}:`),
          t.forEach((r) => {
            console.log(`  ${r}`)
          })
      })
  },
  me = (n) =>
    i(void 0, [n], function* ({ packages: e, dry: a }) {
      let t = m(),
        r = Object.keys(t)
          .filter((o) => (e.length ? e.indexOf(o) >= 0 : !0))
          .map((o) => ({ name: o, locations: t[o] }))
          .reduce(
            (o, { name: g, locations: d }) =>
              d.reduce((c, f) => {
                let V = h({ workingDir: f })
                return Object.keys(V.packages).indexOf(g) < 0
                  ? c.concat([{ name: g, path: f }])
                  : c
              }, o),
            []
          )
      r.length &&
        (console.info('Installations clean up:'),
        a
          ? (r.forEach((o) => {
              console.log(`Installation to remove: ${o.name} in ${o.path}`)
            }),
            console.warn('Dry run.'))
          : yield u(r))
    }),
  M = (e) =>
    i(void 0, null, function* () {
      let a = x(),
        n = F.default.join(a, l.installationsFile),
        t = JSON.stringify(e, null, 2)
      return w.default.writeFile(n, t)
    }),
  j = (e) =>
    i(void 0, null, function* () {
      let a = m(),
        n = !1
      e.forEach((t) => {
        let r = a[t.name] || []
        ;(a[t.name] = r),
          !!r.filter((g) => g === t.path)[0] || ((n = !0), r.push(t.path))
      }),
        n && (yield M(a))
    }),
  u = (e) =>
    i(void 0, null, function* () {
      let a = m(),
        n = !1
      e.forEach((t) => {
        let r = a[t.name] || []
        console.log(`Removing installation of ${t.name} in ${t.path}`)
        let o = r.indexOf(t.path)
        o >= 0 && (r.splice(o, 1), (n = !0)), r.length || delete a[t.name]
      }),
        n && (yield M(a))
    })
0 &&
  (module.exports = {
    addInstallations,
    cleanInstallations,
    readInstallationsFile,
    removeInstallations,
    saveInstallationsFile,
    showInstallations,
  })
