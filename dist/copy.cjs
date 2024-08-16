'use strict'
var se = Object.create
var v = Object.defineProperty,
  oe = Object.defineProperties,
  ie = Object.getOwnPropertyDescriptor,
  ce = Object.getOwnPropertyDescriptors,
  le = Object.getOwnPropertyNames,
  j = Object.getOwnPropertySymbols,
  pe = Object.getPrototypeOf,
  T = Object.prototype.hasOwnProperty,
  ge = Object.prototype.propertyIsEnumerable
var E = (e, n, a) =>
    n in e
      ? v(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a })
      : (e[n] = a),
  l = (e, n) => {
    for (var a in n || (n = {})) T.call(n, a) && E(e, a, n[a])
    if (j) for (var a of j(n)) ge.call(n, a) && E(e, a, n[a])
    return e
  },
  P = (e, n) => oe(e, ce(n))
var fe = (e, n) => {
    for (var a in n) v(e, a, { get: n[a], enumerable: !0 })
  },
  A = (e, n, a, t) => {
    if ((n && typeof n == 'object') || typeof n == 'function')
      for (let r of le(n))
        !T.call(e, r) &&
          r !== a &&
          v(e, r, {
            get: () => n[r],
            enumerable: !(t = ie(n, r)) || t.enumerable,
          })
    return e
  }
var o = (e, n, a) => (
    (a = e != null ? se(pe(e)) : {}),
    A(
      n || !e || !e.__esModule
        ? v(a, 'default', { value: e, enumerable: !0 })
        : a,
      e
    )
  ),
  me = (e) => A(v({}, '__esModule', { value: !0 }), e)
var c = (e, n, a) =>
  new Promise((t, r) => {
    var s = (f) => {
        try {
          g(a.next(f))
        } catch (m) {
          r(m)
        }
      },
      p = (f) => {
        try {
          g(a.throw(f))
        } catch (m) {
          r(m)
        }
      },
      g = (f) => (f.done ? t(f.value) : Promise.resolve(f.value).then(s, p))
    g((a = a.apply(e, n)).next())
  })
var Le = {}
fe(Le, { copyPackageToStore: () => U, getFileHash: () => S })
module.exports = me(Le)
var R = o(require('crypto'), 1),
  F = o(require('fs-extra'), 1),
  ee = o(require('ignore'), 1),
  ne = o(require('npm-packlist'), 1),
  u = require('path')
var b = o(require('fs-extra'), 1),
  q = require('os'),
  y = require('path')
var de = o(require('fs-extra'), 1)
var M = o(require('fs-extra'), 1)
var ke = o(require('fs-extra'), 1)
var we = o(require('fs-extra'), 1)
var C = o(require('fs-extra'), 1)
var k = o(require('fs-extra'), 1)
var Y = o(require('glob'), 1),
  K = o(require('util'), 1)
var ve = o(require('fs-extra'), 1)
var J = parseInt(process.versions.node.split('.').shift(), 10)
J >= 8 &&
  J < 10 &&
  (Symbol.asyncIterator =
    Symbol.asyncIterator || Symbol('Symbol.asyncIterator'))
var vn = K.default.promisify(Y.default)
var x = o(require('fs-extra'), 1),
  $ = require('path'),
  B = o(require('detect-indent'), 1)
var be = (e) => (0, B.default)(e).indent
function h(e) {
  let n,
    a = (0, $.join)(e, 'package.json')
  try {
    let t = x.readFileSync(a, 'utf-8')
    if (((n = JSON.parse(t)), !n.name && n.version))
      return (
        console.log('Package manifest', a, 'should contain name and version.'),
        null
      )
    let r = be(t) || '  '
    return (n.__Indent = r), n
  } catch (t) {
    return console.error('Could not read', a), null
  }
}
var z = (e) =>
  Object.keys(e)
    .sort()
    .reduce((n, a) => Object.assign(n, { [a]: e[a] }), {})
function D(e, n) {
  ;(n = Object.assign({}, n)),
    n.dependencies && (n.dependencies = z(n.dependencies)),
    n.devDependencies && (n.devDependencies = z(n.devDependencies))
  let a = n.__Indent
  delete n.__Indent
  let t = (0, $.join)(e, 'package.json')
  try {
    x.writeFileSync(
      t,
      JSON.stringify(n, null, a) +
        `
`
    )
  } catch (r) {
    console.error('Could not write ', t)
  }
}
var De = (0, q.homedir)(),
  d = {
    myNameIs: 'yalc',
    ignoreFileName: '.yalcignore',
    myNameIsCapitalized: 'Yalc',
    lockfileName: 'yalc.lock',
    yalcPackagesFolder: '.yalc',
    prescript: 'preyalc',
    postscript: 'postyalc',
    installationsFile: 'installations.json',
  },
  G = global
function V() {
  return G.yalcStoreMainDir
    ? G.yalcStoreMainDir
    : process.platform === 'win32' && process.env.LOCALAPPDATA
    ? (0, y.join)(process.env.LOCALAPPDATA, d.myNameIsCapitalized)
    : (0, y.join)(De, '.' + d.myNameIs)
}
function O() {
  return (0, y.join)(V(), 'packages')
}
var Q = 'yalc.sig',
  L = (e) => {
    let n = (0, y.join)(e, Q)
    try {
      return b.readFileSync(n, 'utf-8')
    } catch (a) {
      return ''
    }
  },
  X = (e) => {
    let n = (0, y.join)(e, d.ignoreFileName)
    try {
      return b.readFileSync(n, 'utf-8')
    } catch (a) {
      return ''
    }
  },
  Z = (e, n) => {
    let a = (0, y.join)(e, Q)
    try {
      b.writeFileSync(a, n)
    } catch (t) {
      throw (console.error('Could not write signature file'), t)
    }
  }
var Se = 8,
  S = (e, n = '') =>
    new Promise((a, t) =>
      c(void 0, null, function* () {
        let r = F.default.createReadStream(e),
          s = R.default.createHash('md5')
        s.update(n.replace(/\\/g, '/')),
          r.on('data', (p) => s.update(p)),
          r.on('error', t).on('close', () => {
            a(s.digest('hex'))
          })
      })
    ),
  xe = (e, n, a = '') =>
    c(void 0, null, function* () {
      return yield F.default.copy(e, n), S(e, a)
    }),
  Fe = (e, n) =>
    Object.keys(e).length === 0
      ? {}
      : Object.keys(e).reduce((a, t) => (e[t] && (a[t] = n(e[t], t)), a), {}),
  Me = (e, n, a) => {
    var r
    if (e !== '*' && e !== '^' && e !== '~') return e
    let t = e === '^' || e === '~' ? e : ''
    try {
      let s = require.resolve((0, u.join)(n, 'package.json'), { paths: [a] }),
        p = (r = h((0, u.dirname)(s))) == null ? void 0 : r.version
      return `${t}${p}` || '*'
    } catch (s) {
      return (
        console.warn('Could not resolve workspace package location for', n), '*'
      )
    }
  },
  Ie = (e, n) => {
    let a = (t) =>
      t &&
      Fe(t, (r, s) => {
        if (r.startsWith('workspace:')) {
          let p = r.split(':')[1],
            g = Me(p, s, n)
          return (
            console.log(`Resolving workspace package ${s} version ==> ${g}`), g
          )
        }
        return r
      })
    return P(l({}, e), {
      dependencies: a(e.dependencies),
      devDependencies: a(e.devDependencies),
      peerDependencies: a(e.peerDependencies),
    })
  },
  Oe = (e) =>
    P(l({}, e), {
      scripts: e.scripts
        ? P(l({}, e.scripts), { prepare: void 0, prepublish: void 0 })
        : void 0,
      devDependencies: void 0,
    }),
  Ce = (e) => e.replace(/^\.\//, ''),
  U = (e) =>
    c(void 0, null, function* () {
      let { workingDir: n, devMod: a = !0 } = e,
        t = h(n)
      if (!t) throw 'Error copying package to store.'
      let r = e.workingDir,
        s = (0, u.join)(O(), t.name, t.version),
        p = X(n),
        g = (0, ee.default)().add(p),
        m = (yield (yield (0, ne.default)({ path: n })).map(Ce)).filter(
          (i) => !g.ignores(i)
        )
      e.content &&
        (console.info('Files included in published content:'),
        m.sort().forEach((i) => {
          console.log(`- ${i}`)
        }),
        console.info(`Total ${m.length} files.`))
      let N = () =>
          c(void 0, null, function* () {
            return (
              yield F.default.remove(s),
              Promise.all(
                m.sort().map((i) => xe((0, u.join)(r, i), (0, u.join)(s, i), i))
              )
            )
          }),
        ae = e.changed
          ? yield Promise.all(m.sort().map((i) => S((0, u.join)(r, i), i)))
          : yield N(),
        w = R.default.createHash('md5').update(ae.join('')).digest('hex')
      if (e.changed) {
        let i = L(s)
        if (w === i) return !1
        yield N()
      }
      Z(s, w)
      let te = e.signature ? '+' + w.substr(0, Se) : '',
        re = P(
          l({}, ((i) => (e.workspaceResolve ? Ie(i, n) : i))(a ? Oe(t) : t)),
          { yalcSig: w, version: t.version + te }
        )
      return D(s, re), w
    })
0 && (module.exports = { copyPackageToStore, getFileHash })
