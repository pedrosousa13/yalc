'use strict'
var V = Object.create
var p = Object.defineProperty
var W = Object.getOwnPropertyDescriptor
var U = Object.getOwnPropertyNames,
  h = Object.getOwnPropertySymbols,
  H = Object.getPrototypeOf,
  v = Object.prototype.hasOwnProperty,
  J = Object.prototype.propertyIsEnumerable
var w = (e, n, a) =>
    n in e
      ? p(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a })
      : (e[n] = a),
  o = (e, n) => {
    for (var a in n || (n = {})) v.call(n, a) && w(e, a, n[a])
    if (h) for (var a of h(n)) J.call(n, a) && w(e, a, n[a])
    return e
  }
var Y = (e, n) => {
    for (var a in n) p(e, a, { get: n[a], enumerable: !0 })
  },
  b = (e, n, a, c) => {
    if ((n && typeof n == 'object') || typeof n == 'function')
      for (let s of U(n))
        !v.call(e, s) &&
          s !== a &&
          p(e, s, {
            get: () => n[s],
            enumerable: !(c = W(n, s)) || c.enumerable,
          })
    return e
  }
var t = (e, n, a) => (
    (a = e != null ? V(H(e)) : {}),
    b(
      n || !e || !e.__esModule
        ? p(a, 'default', { value: e, enumerable: !0 })
        : a,
      e
    )
  ),
  K = (e) => b(p({}, '__esModule', { value: !0 }), e)
var le = {}
Y(le, {
  getPackageManager: () => i,
  getPackageManagerInstallCmd: () => ie,
  getPackageManagerUpdateCmd: () => A,
  getRunScriptCmd: () => oe,
  isYarn: () => ce,
  pmInstallCmd: () => P,
  pmMarkFiles: () => y,
  pmRunScriptCmd: () => k,
  pmUpdateCmd: () => T,
  runPmUpdate: () => C,
})
module.exports = K(le)
var N = require('child_process'),
  j = t(require('fs-extra'), 1),
  E = require('path')
var $ = t(require('fs-extra'), 1),
  R = require('os')
var B = t(require('fs-extra'), 1),
  G = t(require('ignore'), 1),
  q = t(require('npm-packlist'), 1)
var Z = t(require('fs-extra'), 1)
var d = t(require('fs-extra'), 1)
var ae = t(require('fs-extra'), 1)
var u = t(require('fs-extra'), 1)
var r = t(require('fs-extra'), 1)
var I = t(require('glob'), 1),
  O = t(require('util'), 1)
var te = t(require('fs-extra'), 1)
var M = parseInt(process.versions.node.split('.').shift(), 10)
M >= 8 &&
  M < 10 &&
  (Symbol.asyncIterator =
    Symbol.asyncIterator || Symbol('Symbol.asyncIterator'))
var rn = O.default.promisify(I.default)
var L = t(require('fs-extra'), 1)
var re = t(require('detect-indent'), 1)
var Sn = (0, R.homedir)()
var xn = global
var g = { stdio: 'inherit' }
var y = {
    pnpm: ['pnpm-lock.yaml'],
    yarn: ['yarn.lock'],
    npm: ['package-lock.json'],
  },
  P = { pnpm: 'pnpm install', yarn: 'yarn', npm: 'npm install' },
  T = { pnpm: 'pnpm update', yarn: 'yarn upgrade', npm: 'npm update' },
  k = { pnpm: 'pnpm', yarn: 'yarn', npm: 'npm run' },
  se = 'npm',
  i = (e) =>
    Object.keys(y).reduce(
      (a, c) =>
        a ||
        (y[c].reduce(
          (s, _) => s || (j.existsSync((0, E.join)(e, _)) && c),
          !1
        ) &&
          c),
      !1
    ) || se,
  oe = (e) => P[i(e)],
  ie = (e) => P[i(e)],
  A = (e) => T[i(e)],
  ce = (e) => i(e) === 'yarn',
  C = (e, n) => {
    let a = [A(e), ...n].join(' ')
    console.log(`Running ${a} in ${e}`), (0, N.execSync)(a, o({ cwd: e }, g))
  }
0 &&
  (module.exports = {
    getPackageManager,
    getPackageManagerInstallCmd,
    getPackageManagerUpdateCmd,
    getRunScriptCmd,
    isYarn,
    pmInstallCmd,
    pmMarkFiles,
    pmRunScriptCmd,
    pmUpdateCmd,
    runPmUpdate,
  })
