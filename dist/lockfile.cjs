'use strict'
var T = Object.create
var f = Object.defineProperty
var A = Object.getOwnPropertyDescriptor
var _ = Object.getOwnPropertyNames
var V = Object.getPrototypeOf,
  W = Object.prototype.hasOwnProperty
var U = (e, a) => {
    for (var n in a) f(e, n, { get: a[n], enumerable: !0 })
  },
  v = (e, a, n, t) => {
    if ((a && typeof a == 'object') || typeof a == 'function')
      for (let s of _(a))
        !W.call(e, s) &&
          s !== n &&
          f(e, s, {
            get: () => a[s],
            enumerable: !(t = A(a, s)) || t.enumerable,
          })
    return e
  }
var r = (e, a, n) => (
    (n = e != null ? T(V(e)) : {}),
    v(
      a || !e || !e.__esModule
        ? f(n, 'default', { value: e, enumerable: !0 })
        : n,
      e
    )
  ),
  H = (e) => v(f({}, '__esModule', { value: !0 }), e)
var ce = {}
U(ce, {
  addPackageToLockfile: () => O,
  readLockfile: () => g,
  removeLockfile: () => x,
  writeLockfile: () => y,
})
module.exports = H(ce)
var l = r(require('fs-extra'), 1),
  m = require('path')
var L = r(require('fs-extra'), 1),
  $ = require('os')
var Y = r(require('fs-extra'), 1),
  K = r(require('ignore'), 1),
  z = r(require('npm-packlist'), 1)
var q = r(require('fs-extra'), 1)
var Q = r(require('fs-extra'), 1)
var ae = r(require('fs-extra'), 1)
var u = r(require('fs-extra'), 1)
var i = r(require('fs-extra'), 1)
var M = r(require('glob'), 1),
  I = r(require('util'), 1)
var te = r(require('fs-extra'), 1)
var F = parseInt(process.versions.node.split('.').shift(), 10)
F >= 8 &&
  F < 10 &&
  (Symbol.asyncIterator =
    Symbol.asyncIterator || Symbol('Symbol.asyncIterator'))
var an = I.default.promisify(M.default)
var C = r(require('fs-extra'), 1)
var re = r(require('detect-indent'), 1)
var bn = (0, $.homedir)(),
  o = {
    myNameIs: 'yalc',
    ignoreFileName: '.yalcignore',
    myNameIsCapitalized: 'Yalc',
    lockfileName: 'yalc.lock',
    yalcPackagesFolder: '.yalc',
    prescript: 'preyalc',
    postscript: 'postyalc',
    installationsFile: 'installations.json',
  },
  Dn = global
var se = (e) => (e.version == 'v1' && e.packages ? 'v1' : 'v0'),
  oe = { v0: (e) => ({ version: 'v1', packages: e }), v1: (e) => e },
  ie = (e) => {
    let a = se(e)
    return oe[a](e)
  },
  x = (e) => {
    let a = (0, m.join)(e.workingDir, o.lockfileName)
    l.removeSync(a)
  },
  g = (e) => {
    let a = (0, m.join)(e.workingDir, o.lockfileName),
      n = { version: 'v1', packages: {} }
    try {
      n = ie(l.readJSONSync(a))
    } catch (t) {
      return n
    }
    return n
  },
  y = (e, a) => {
    let n = (0, m.join)(a.workingDir, o.lockfileName),
      t = JSON.stringify(e, null, 2)
    l.writeFileSync(n, t)
  },
  O = (e, a) => {
    let n = g(a)
    e.forEach(
      ({
        name: t,
        version: s,
        file: R,
        link: N,
        replaced: P,
        signature: h,
        pure: j,
        workspace: E,
      }) => {
        let w = n.packages[t] || {}
        ;(n.packages[t] = {}),
          s && (n.packages[t].version = s),
          h && (n.packages[t].signature = h),
          R && (n.packages[t].file = !0),
          N && (n.packages[t].link = !0),
          j && (n.packages[t].pure = !0),
          E && (n.packages[t].workspace = !0),
          (P || w.replaced) && (n.packages[t].replaced = P || w.replaced)
      }
    ),
      y(n, a)
  }
0 &&
  (module.exports = {
    addPackageToLockfile,
    readLockfile,
    removeLockfile,
    writeLockfile,
  })
