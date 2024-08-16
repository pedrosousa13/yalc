'use strict'
var V = Object.create
var g = Object.defineProperty
var W = Object.getOwnPropertyDescriptor
var U = Object.getOwnPropertyNames,
  h = Object.getOwnPropertySymbols,
  H = Object.getPrototypeOf,
  v = Object.prototype.hasOwnProperty,
  J = Object.prototype.propertyIsEnumerable
var w = (e, n, a) =>
    n in e
      ? g(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a })
      : (e[n] = a),
  r = (e, n) => {
    for (var a in n || (n = {})) v.call(n, a) && w(e, a, n[a])
    if (h) for (var a of h(n)) J.call(n, a) && w(e, a, n[a])
    return e
  }
var Y = (e, n) => {
    for (var a in n) g(e, a, { get: n[a], enumerable: !0 })
  },
  b = (e, n, a, p) => {
    if ((n && typeof n == 'object') || typeof n == 'function')
      for (let o of U(n))
        !v.call(e, o) &&
          o !== a &&
          g(e, o, {
            get: () => n[o],
            enumerable: !(p = W(n, o)) || p.enumerable,
          })
    return e
  }
var t = (e, n, a) => (
    (a = e != null ? V(H(e)) : {}),
    b(
      n || !e || !e.__esModule
        ? g(a, 'default', { value: e, enumerable: !0 })
        : a,
      e
    )
  ),
  K = (e) => b(g({}, '__esModule', { value: !0 }), e)
var ce = {}
Y(ce, { checkManifest: () => R })
module.exports = K(ce)
var j = t(require('fs-extra'), 1),
  k = require('child_process'),
  E = t(require('path'), 1),
  T = require('path')
var L = t(require('fs-extra'), 1),
  $ = require('os')
var B = t(require('fs-extra'), 1),
  G = t(require('ignore'), 1),
  q = t(require('npm-packlist'), 1)
var Z = t(require('fs-extra'), 1)
var m = t(require('fs-extra'), 1)
var ee = t(require('fs-extra'), 1)
var d = t(require('fs-extra'), 1)
var s = t(require('fs-extra'), 1)
var I = t(require('glob'), 1),
  O = t(require('util'), 1)
var se = t(require('fs-extra'), 1)
var M = parseInt(process.versions.node.split('.').shift(), 10)
M >= 8 &&
  M < 10 &&
  (Symbol.asyncIterator =
    Symbol.asyncIterator || Symbol('Symbol.asyncIterator'))
var tn = O.default.promisify(I.default)
var C = t(require('fs-extra'), 1)
var oe = t(require('detect-indent'), 1)
var Dn = (0, $.homedir)(),
  c = {
    myNameIs: 'yalc',
    ignoreFileName: '.yalcignore',
    myNameIsCapitalized: 'Yalc',
    lockfileName: 'yalc.lock',
    yalcPackagesFolder: '.yalc',
    prescript: 'preyalc',
    postscript: 'postyalc',
    installationsFile: 'installations.json',
  },
  Sn = global
var l = { stdio: 'inherit' }
var N = 'git diff --cached --name-only',
  ie = (e) => E.basename(e) === 'package.json'
function R(e) {
  let n = (o) => {
    let u = j.readJSONSync(o),
      A = new RegExp(`^(file|link):(.\\/)?\\${c.yalcPackagesFolder}\\/`),
      y = (P) => Object.keys(P).filter((_) => P[_].match(A))
    return y(u.dependencies || {}).concat(y(u.devDependencies || {}))
  }
  e.commit &&
    ((0, k.execSync)(N, r({ cwd: e.workingDir }, l))
      .toString()
      .trim(),
    (0, k.execSync)(N, r({ cwd: e.workingDir }, l))
      .toString()
      .trim()
      .split(
        `
`
      )
      .filter(ie))
  let a = (0, T.join)(e.workingDir, 'package.json'),
    p = n(a)
  p.length && (console.info('Yalc dependencies found:', p), process.exit(1))
}
0 && (module.exports = { checkManifest })
