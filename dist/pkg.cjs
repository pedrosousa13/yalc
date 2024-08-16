'use strict'
var d = Object.create
var a = Object.defineProperty
var m = Object.getOwnPropertyDescriptor
var f = Object.getOwnPropertyNames
var u = Object.getPrototypeOf,
  P = Object.prototype.hasOwnProperty
var b = (n, e) => {
    for (var t in e) a(n, t, { get: e[t], enumerable: !0 })
  },
  o = (n, e, t, s) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let r of f(e))
        !P.call(n, r) &&
          r !== t &&
          a(n, r, {
            get: () => e[r],
            enumerable: !(s = m(e, r)) || s.enumerable,
          })
    return n
  }
var g = (n, e, t) => (
    (t = n != null ? d(u(n)) : {}),
    o(
      e || !n || !n.__esModule
        ? a(t, 'default', { value: n, enumerable: !0 })
        : t,
      n
    )
  ),
  h = (n) => o(a({}, '__esModule', { value: !0 }), n)
var _ = {}
b(_, {
  parsePackageName: () => y,
  readPackageManifest: () => v,
  writePackageManifest: () => S,
})
module.exports = h(_)
var i = g(require('fs-extra'), 1),
  c = require('path'),
  l = g(require('detect-indent'), 1),
  y = (n) => {
    let e = n.match(/(^@[^/]+\/)?([^@]+)@?(.*)/) || []
    return e
      ? { name: (e[1] || '') + e[2], version: e[3] || '' }
      : { name: '', version: '' }
  },
  k = (n) => (0, l.default)(n).indent
function v(n) {
  let e,
    t = (0, c.join)(n, 'package.json')
  try {
    let s = i.readFileSync(t, 'utf-8')
    if (((e = JSON.parse(s)), !e.name && e.version))
      return (
        console.log('Package manifest', t, 'should contain name and version.'),
        null
      )
    let r = k(s) || '  '
    return (e.__Indent = r), e
  } catch (s) {
    return console.error('Could not read', t), null
  }
}
var p = (n) =>
  Object.keys(n)
    .sort()
    .reduce((e, t) => Object.assign(e, { [t]: n[t] }), {})
function S(n, e) {
  ;(e = Object.assign({}, e)),
    e.dependencies && (e.dependencies = p(e.dependencies)),
    e.devDependencies && (e.devDependencies = p(e.devDependencies))
  let t = e.__Indent
  delete e.__Indent
  let s = (0, c.join)(n, 'package.json')
  try {
    i.writeFileSync(
      s,
      JSON.stringify(e, null, t) +
        `
`
    )
  } catch (r) {
    console.error('Could not write ', s)
  }
}
0 &&
  (module.exports = {
    parsePackageName,
    readPackageManifest,
    writePackageManifest,
  })
