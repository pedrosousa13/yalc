'use strict'
var q = Object.create
var b = Object.defineProperty
var Q = Object.getOwnPropertyDescriptor
var X = Object.getOwnPropertyNames
var Z = Object.getPrototypeOf,
  ee = Object.prototype.hasOwnProperty
var ne = (n, e) => {
    for (var a in e) b(n, a, { get: e[a], enumerable: !0 })
  },
  j = (n, e, a, t) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let s of X(e))
        !ee.call(n, s) &&
          s !== a &&
          b(n, s, {
            get: () => e[s],
            enumerable: !(t = Q(e, s)) || t.enumerable,
          })
    return n
  }
var o = (n, e, a) => (
    (a = n != null ? q(Z(n)) : {}),
    j(
      e || !n || !n.__esModule
        ? b(a, 'default', { value: n, enumerable: !0 })
        : a,
      n
    )
  ),
  ae = (n) => j(b({}, '__esModule', { value: !0 }), n)
var l = (n, e, a) =>
  new Promise((t, s) => {
    var c = (p) => {
        try {
          u(a.next(p))
        } catch (m) {
          s(m)
        }
      },
      v = (p) => {
        try {
          u(a.throw(p))
        } catch (m) {
          s(m)
        }
      },
      u = (p) => (p.done ? t(p.value) : Promise.resolve(p.value).then(c, v))
    u((a = a.apply(n, e)).next())
  })
var De = {}
ne(De, { removePackages: () => z })
module.exports = ae(De)
var k = o(require('fs-extra'), 1),
  w = require('path')
var O = o(require('fs-extra'), 1),
  N = o(require('path'), 1)
var Y = o(require('fs-extra'), 1),
  K = require('os'),
  $ = require('path')
var re = o(require('fs-extra'), 1),
  se = o(require('ignore'), 1),
  oe = o(require('npm-packlist'), 1)
var le = o(require('fs-extra'), 1)
var y = o(require('fs-extra'), 1),
  x = require('path')
var me = (n) => (n.version == 'v1' && n.packages ? 'v1' : 'v0'),
  de = { v0: (n) => ({ version: 'v1', packages: n }), v1: (n) => n },
  ke = (n) => {
    let e = me(n)
    return de[e](n)
  },
  T = (n) => {
    let e = (0, x.join)(n.workingDir, i.lockfileName)
    y.removeSync(e)
  },
  F = (n) => {
    let e = (0, x.join)(n.workingDir, i.lockfileName),
      a = { version: 'v1', packages: {} }
    try {
      a = ke(y.readJSONSync(e))
    } catch (t) {
      return a
    }
    return a
  },
  A = (n, e) => {
    let a = (0, x.join)(e.workingDir, i.lockfileName),
      t = JSON.stringify(n, null, 2)
    y.writeFileSync(a, t)
  }
var ye = o(require('fs-extra'), 1)
var d = o(require('fs-extra'), 1)
var V = o(require('glob'), 1),
  W = o(require('util'), 1)
var Pe = o(require('fs-extra'), 1)
var _ = parseInt(process.versions.node.split('.').shift(), 10)
_ >= 8 &&
  _ < 10 &&
  (Symbol.asyncIterator =
    Symbol.asyncIterator || Symbol('Symbol.asyncIterator'))
var cn = W.default.promisify(V.default)
var I = o(require('fs-extra'), 1),
  L = require('path'),
  H = o(require('detect-indent'), 1),
  M = (n) => {
    let e = n.match(/(^@[^/]+\/)?([^@]+)@?(.*)/) || []
    return e
      ? { name: (e[1] || '') + e[2], version: e[3] || '' }
      : { name: '', version: '' }
  },
  he = (n) => (0, H.default)(n).indent
function h(n) {
  let e,
    a = (0, L.join)(n, 'package.json')
  try {
    let t = I.readFileSync(a, 'utf-8')
    if (((e = JSON.parse(t)), !e.name && e.version))
      return (
        console.log('Package manifest', a, 'should contain name and version.'),
        null
      )
    let s = he(t) || '  '
    return (e.__Indent = s), e
  } catch (t) {
    return console.error('Could not read', a), null
  }
}
var U = (n) =>
  Object.keys(n)
    .sort()
    .reduce((e, a) => Object.assign(e, { [a]: n[a] }), {})
function D(n, e) {
  ;(e = Object.assign({}, e)),
    e.dependencies && (e.dependencies = U(e.dependencies)),
    e.devDependencies && (e.devDependencies = U(e.devDependencies))
  let a = e.__Indent
  delete e.__Indent
  let t = (0, L.join)(n, 'package.json')
  try {
    I.writeFileSync(
      t,
      JSON.stringify(e, null, a) +
        `
`
    )
  } catch (s) {
    console.error('Could not write ', t)
  }
}
var we = (0, K.homedir)(),
  i = {
    myNameIs: 'yalc',
    ignoreFileName: '.yalcignore',
    myNameIsCapitalized: 'Yalc',
    lockfileName: 'yalc.lock',
    yalcPackagesFolder: '.yalc',
    prescript: 'preyalc',
    postscript: 'postyalc',
    installationsFile: 'installations.json',
  },
  J = global
function R() {
  return J.yalcStoreMainDir
    ? J.yalcStoreMainDir
    : process.platform === 'win32' && process.env.LOCALAPPDATA
    ? (0, $.join)(process.env.LOCALAPPDATA, i.myNameIsCapitalized)
    : (0, $.join)(we, '.' + i.myNameIs)
}
var E = () => {
  let n = R(),
    e = N.default.join(n, i.installationsFile),
    a
  try {
    O.default.accessSync(e)
    try {
      a = O.default.readJsonSync(e)
    } catch (t) {
      console.error('Error reading installations file', e, t), (a = {})
    }
  } catch (t) {
    a = {}
  }
  return a
}
var ve = (n) =>
  l(void 0, null, function* () {
    let e = R(),
      a = N.default.join(e, i.installationsFile),
      t = JSON.stringify(n, null, 2)
    return O.default.writeFile(a, t)
  })
var S = (n) =>
  l(void 0, null, function* () {
    let e = E(),
      a = !1
    n.forEach((t) => {
      let s = e[t.name] || []
      console.log(`Removing installation of ${t.name} in ${t.path}`)
      let c = s.indexOf(t.path)
      c >= 0 && (s.splice(c, 1), (a = !0)), s.length || delete e[t.name]
    }),
      a && (yield ve(e))
  })
var be = (n, e) =>
    new RegExp('file|link:' + i.yalcPackagesFolder + '/' + e).test(n),
  B = (n) => {
    let e = k.existsSync(n) && !k.readdirSync(n).length
    return e && k.removeSync(n), e
  },
  z = (n, e) =>
    l(void 0, null, function* () {
      let { workingDir: a } = e,
        t = F({ workingDir: a }),
        s = h(a)
      if (!s) return
      let c = []
      n.length
        ? n.forEach((r) => {
            let { name: g, version: f } = M(r)
            t.packages[g]
              ? (!f || f === t.packages[g].version) && c.push(g)
              : (console.warn(
                  `Package ${r} not found in ${i.lockfileName}, still will try to remove.`
                ),
                c.push(g))
          })
        : e.all
        ? (c = Object.keys(t.packages))
        : console.info('Use --all option to remove all packages.')
      let v = !1,
        u = []
      c.forEach((r) => {
        let g = t.packages[r],
          f
        s.dependencies && s.dependencies[r] && (f = s.dependencies),
          s.devDependencies && s.devDependencies[r] && (f = s.devDependencies),
          f &&
            be(f[r], r) &&
            (u.push(r), g && g.replaced ? (f[r] = g.replaced) : delete f[r]),
          e.retreat
            ? console.log(`Retreating package ${r} version ==>`, g.replaced)
            : ((v = !0), delete t.packages[r])
      }),
        v && A(t, { workingDir: a }),
        u.length && D(a, s)
      let p = c.map((r) => ({ name: r, version: '', path: a })),
        m = (0, w.join)(a, i.yalcPackagesFolder)
      u.forEach((r) => {
        k.removeSync((0, w.join)(a, 'node_modules', r))
      }),
        c.forEach((r) => {
          e.retreat || k.removeSync((0, w.join)(m, r))
        })
      let G = (r) => r.startsWith('@')
      c
        .filter(G)
        .map((r) => r.split('/')[0])
        .map((r) => (0, w.join)(m, r))
        .map(B),
        !Object.keys(t.packages).length &&
          !e.retreat &&
          (T({ workingDir: a }),
          B(m) || console.warn(m, 'is not empty, not removing it.')),
        e.retreat || (yield S(p))
    })
0 && (module.exports = { removePackages })
