'use strict'
var Te = Object.create
var j = Object.defineProperty
var Ae = Object.getOwnPropertyDescriptor
var _e = Object.getOwnPropertyNames,
  ce = Object.getOwnPropertySymbols,
  Ve = Object.getPrototypeOf,
  pe = Object.prototype.hasOwnProperty,
  We = Object.prototype.propertyIsEnumerable
var le = (n, e, a) =>
    e in n
      ? j(n, e, { enumerable: !0, configurable: !0, writable: !0, value: a })
      : (n[e] = a),
  I = (n, e) => {
    for (var a in e || (e = {})) pe.call(e, a) && le(n, a, e[a])
    if (ce) for (var a of ce(e)) We.call(e, a) && le(n, a, e[a])
    return n
  }
var Ue = (n, e) => {
    for (var a in e) j(n, a, { get: e[a], enumerable: !0 })
  },
  ge = (n, e, a, t) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let s of _e(e))
        !pe.call(n, s) &&
          s !== a &&
          j(n, s, {
            get: () => e[s],
            enumerable: !(t = Ae(e, s)) || t.enumerable,
          })
    return n
  }
var m = (n, e, a) => (
    (a = n != null ? Te(Ve(n)) : {}),
    ge(
      e || !n || !n.__esModule
        ? j(a, 'default', { value: n, enumerable: !0 })
        : a,
      n
    )
  ),
  He = (n) => ge(j({}, '__esModule', { value: !0 }), n)
var d = (n, e, a) =>
  new Promise((t, s) => {
    var k = (p) => {
        try {
          v(a.next(p))
        } catch (x) {
          s(x)
        }
      },
      g = (p) => {
        try {
          v(a.throw(p))
        } catch (x) {
          s(x)
        }
      },
      v = (p) => (p.done ? t(p.value) : Promise.resolve(p.value).then(k, g))
    v((a = a.apply(n, e)).next())
  })
var pn = {}
Ue(pn, { addPackages: () => ne })
module.exports = He(pn)
var Ne = require('child_process'),
  l = m(require('fs-extra'), 1),
  D = require('path')
var re = m(require('fs-extra'), 1),
  Me = require('os'),
  N = require('path')
var fe = m(require('crypto'), 1),
  me = m(require('fs-extra'), 1),
  Ye = m(require('ignore'), 1),
  Ke = m(require('npm-packlist'), 1)
var G = (n, e = '') =>
  new Promise((a, t) =>
    d(void 0, null, function* () {
      let s = me.default.createReadStream(n),
        k = fe.default.createHash('md5')
      k.update(e.replace(/\\/g, '/')),
        s.on('data', (g) => k.update(g)),
        s.on('error', t).on('close', () => {
          a(k.digest('hex'))
        })
    })
  )
var W = m(require('fs-extra'), 1),
  Z = m(require('path'), 1)
var E = m(require('fs-extra'), 1),
  X = require('path')
var ze = (n) => (n.version == 'v1' && n.packages ? 'v1' : 'v0'),
  Be = { v0: (n) => ({ version: 'v1', packages: n }), v1: (n) => n },
  Ge = (n) => {
    let e = ze(n)
    return Be[e](n)
  }
var V = (n) => {
    let e = (0, X.join)(n.workingDir, h.lockfileName),
      a = { version: 'v1', packages: {} }
    try {
      a = Ge(E.readJSONSync(e))
    } catch (t) {
      return a
    }
    return a
  },
  de = (n, e) => {
    let a = (0, X.join)(e.workingDir, h.lockfileName),
      t = JSON.stringify(n, null, 2)
    E.writeFileSync(a, t)
  },
  ke = (n, e) => {
    let a = V(e)
    n.forEach(
      ({
        name: t,
        version: s,
        file: k,
        link: g,
        replaced: v,
        signature: p,
        pure: x,
        workspace: C,
      }) => {
        let o = a.packages[t] || {}
        ;(a.packages[t] = {}),
          s && (a.packages[t].version = s),
          p && (a.packages[t].signature = p),
          k && (a.packages[t].file = !0),
          g && (a.packages[t].link = !0),
          x && (a.packages[t].pure = !0),
          C && (a.packages[t].workspace = !0),
          (v || o.replaced) && (a.packages[t].replaced = v || o.replaced)
      }
    ),
      de(a, e)
  }
var ue = () => {
  let n = U(),
    e = Z.default.join(n, h.installationsFile),
    a
  try {
    W.default.accessSync(e)
    try {
      a = W.default.readJsonSync(e)
    } catch (t) {
      console.error('Error reading installations file', e, t), (a = {})
    }
  } catch (t) {
    a = {}
  }
  return a
}
var qe = (n) =>
    d(void 0, null, function* () {
      let e = U(),
        a = Z.default.join(e, h.installationsFile),
        t = JSON.stringify(n, null, 2)
      return W.default.writeFile(a, t)
    }),
  ye = (n) =>
    d(void 0, null, function* () {
      let e = ue(),
        a = !1
      n.forEach((t) => {
        let s = e[t.name] || []
        ;(e[t.name] = s),
          !!s.filter((g) => g === t.path)[0] || ((a = !0), s.push(t.path))
      }),
        a && (yield qe(e))
    })
var he = require('child_process'),
  we = m(require('fs-extra'), 1),
  ve = require('path')
var Pe = {
  pnpm: ['pnpm-lock.yaml'],
  yarn: ['yarn.lock'],
  npm: ['package-lock.json'],
}
var Qe = { pnpm: 'pnpm update', yarn: 'yarn upgrade', npm: 'npm update' },
  ee = { pnpm: 'pnpm', yarn: 'yarn', npm: 'npm run' },
  Xe = 'npm',
  H = (n) =>
    Object.keys(Pe).reduce(
      (a, t) =>
        a ||
        (Pe[t].reduce(
          (s, k) => s || (we.existsSync((0, ve.join)(n, k)) && t),
          !1
        ) &&
          t),
      !1
    ) || Xe
var Ze = (n) => Qe[H(n)]
var be = (n, e) => {
  let a = [Ze(n), ...e].join(' ')
  console.log(`Running ${a} in ${n}`), (0, he.execSync)(a, I({ cwd: n }, R))
}
var nn = m(require('fs-extra'), 1)
var ae = m(require('fs-extra'), 1)
var Y = m(require('fs-extra'), 1),
  te = require('path'),
  xe = m(require('detect-indent'), 1),
  J = (n) => {
    let e = n.match(/(^@[^/]+\/)?([^@]+)@?(.*)/) || []
    return e
      ? { name: (e[1] || '') + e[2], version: e[3] || '' }
      : { name: '', version: '' }
  },
  an = (n) => (0, xe.default)(n).indent
function $(n) {
  let e,
    a = (0, te.join)(n, 'package.json')
  try {
    let t = Y.readFileSync(a, 'utf-8')
    if (((e = JSON.parse(t)), !e.name && e.version))
      return (
        console.log('Package manifest', a, 'should contain name and version.'),
        null
      )
    let s = an(t) || '  '
    return (e.__Indent = s), e
  } catch (t) {
    return console.error('Could not read', a), null
  }
}
var Se = (n) =>
  Object.keys(n)
    .sort()
    .reduce((e, a) => Object.assign(e, { [a]: n[a] }), {})
function _(n, e) {
  ;(e = Object.assign({}, e)),
    e.dependencies && (e.dependencies = Se(e.dependencies)),
    e.devDependencies && (e.devDependencies = Se(e.devDependencies))
  let a = e.__Indent
  delete e.__Indent
  let t = (0, te.join)(n, 'package.json')
  try {
    Y.writeFileSync(
      t,
      JSON.stringify(e, null, a) +
        `
`
    )
  } catch (s) {
    console.error('Could not write ', t)
  }
}
var tn = (0, Me.homedir)(),
  h = {
    myNameIs: 'yalc',
    ignoreFileName: '.yalcignore',
    myNameIsCapitalized: 'Yalc',
    lockfileName: 'yalc.lock',
    yalcPackagesFolder: '.yalc',
    prescript: 'preyalc',
    postscript: 'postyalc',
    installationsFile: 'installations.json',
  },
  Fe = global
function U() {
  return Fe.yalcStoreMainDir
    ? Fe.yalcStoreMainDir
    : process.platform === 'win32' && process.env.LOCALAPPDATA
    ? (0, N.join)(process.env.LOCALAPPDATA, h.myNameIsCapitalized)
    : (0, N.join)(tn, '.' + h.myNameIs)
}
function q() {
  return (0, N.join)(U(), 'packages')
}
var K = (n, e = '') => (0, N.join)(q(), n, e),
  R = { stdio: 'inherit' },
  rn = 'yalc.sig',
  Q = (n) => {
    let e = (0, N.join)(n, rn)
    try {
      return re.readFileSync(e, 'utf-8')
    } catch (a) {
      return ''
    }
  }
var Le = m(require('glob'), 1),
  $e = m(require('util'), 1),
  O = require('path'),
  L = m(require('fs-extra'), 1)
var Ie = parseInt(process.versions.node.split('.').shift(), 10)
Ie >= 8 &&
  Ie < 10 &&
  (Symbol.asyncIterator =
    Symbol.asyncIterator || Symbol('Symbol.asyncIterator'))
var Oe = $e.default.promisify(Le.default),
  T = {},
  Ce = (n) => n.reduce((e, a) => ((e[a] = !0), e), {}),
  sn = (n, e) => n.mtime.getTime() === e.mtime.getTime() && n.size === e.size,
  se = (n, e, a = !0) =>
    d(void 0, null, function* () {
      let t = '**/node_modules/**',
        g = T[n]
          ? T[n].glob
          : yield Oe('**', { cwd: n, ignore: t, dot: !0, nodir: !1 }),
        v = yield Oe('**', { cwd: e, ignore: t, dot: !0, nodir: !1 }),
        p = Ce(g),
        x = Ce(v),
        C = g.filter((r) => !x[r]),
        o = v.filter((r) => !p[r]),
        P = g.filter((r) => x[r])
      T[n] = T[n] || { files: {}, glob: g }
      let F = [],
        u = T[n].files,
        i = {},
        z = (yield Promise.all(
          P.map((r) =>
            d(void 0, null, function* () {
              var b
              let c = (0, O.resolve)(n, r),
                y = (0, O.resolve)(e, r),
                f =
                  ((b = u[r]) == null ? void 0 : b.stat) ||
                  (yield L.default.stat(c))
              u[r] = u[r] || { stat: f, hash: '' }
              let S = yield L.default.stat(y)
              return {
                file: r,
                srcFileStat: f,
                destFileStat: S,
                srcFilePath: c,
                destFilePath: y,
              }
            })
          )
        )).map((b) =>
          d(void 0, [b], function* ({
            file: r,
            srcFileStat: c,
            destFileStat: y,
            srcFilePath: f,
            destFilePath: S,
          }) {
            let A = c.isDirectory() && y.isDirectory()
            i[r] = y.isDirectory()
            let B = c.isDirectory() && !y.isDirectory(),
              oe = !c.isDirectory() && y.isDirectory()
            ;(oe || B) && o.push(r)
            let je = () =>
              d(void 0, null, function* () {
                let ie = u[r].hash || (yield G(f, ''))
                u[r].hash = ie
                let Ee = yield G(S, '')
                return ie === Ee
              })
            ;(oe || (!A && !sn(c, y) && (!a || !(yield je())))) && F.push(r)
          })
        )
      yield Promise.all(z),
        yield Promise.all(
          o
            .filter((r) => !i[r])
            .map((r) => L.default.remove((0, O.resolve)(e, r)))
        ),
        yield Promise.all(
          o
            .filter((r) => i[r])
            .map((r) => L.default.remove((0, O.resolve)(e, r)))
        )
      let w = yield Promise.all(
        C.map((r) =>
          L.default.stat((0, O.resolve)(n, r)).then((c) => c.isDirectory())
        )
      )
      yield Promise.all(
        C.filter((r, c) => !w[c])
          .concat(F)
          .map((r) =>
            L.default.copy((0, O.resolve)(n, r), (0, O.resolve)(e, r))
          )
      )
    })
var Re = l.ensureSymlinkSync,
  on = (n) => {
    let e = K(n)
    return (
      l
        .readdirSync(e)
        .map((s) => ({
          version: s,
          created: l.statSync((0, D.join)(e, s)).ctime.getTime(),
        }))
        .sort((s, k) => k.created - s.created)
        .map((s) => s.version)[0] || ''
    )
  },
  cn = (n) => {
    try {
      return !!l.readlinkSync(n)
    } catch (e) {
      return !1
    }
  },
  ln = (n) => l.existsSync((0, D.join)(n, 'pnpm-workspace.yaml')),
  ne = (n, e) =>
    d(void 0, null, function* () {
      if (!n.length) return
      let a = e.workingDir,
        t = $(a),
        s = !1
      if (!t) return
      let k = H(a),
        g = (o) => {
          var F
          let P = (F = t.scripts) == null ? void 0 : F[o]
          P &&
            (console.log(`Running ${o} script: ${P}`),
            (0, Ne.execSync)(`${ee[k]} ${o}`, I({ cwd: a }, R)))
        },
        v = !1,
        p = e.pure === !1 ? !1 : e.pure || !!t.workspaces || (v = ln(a))
      g('preyalc')
      let x = n.map((o) =>
          d(void 0, null, function* () {
            g('preyalc.' + o)
            let { name: P, version: F = '' } = J(o)
            P || console.warn('Could not parse package name', o)
            let u = (0, D.join)(a, h.yalcPackagesFolder, P)
            if (e.restore) {
              if (
                (console.log(`Restoring package \`${o}\` from .yalc directory`),
                !l.existsSync(u))
              )
                return (
                  console.warn(
                    `Could not find package \`${o}\` ` + u,
                    ', skipping.'
                  ),
                  null
                )
            } else {
              let w = K(P)
              if (!l.existsSync(w))
                return (
                  console.warn(
                    `Could not find package \`${P}\` in store (${w}), skipping.`
                  ),
                  null
                )
              let r = F || on(P),
                c = K(P, r)
              if (!l.existsSync(c))
                return (
                  console.warn(
                    `Could not find package \`${o}\` ` + c,
                    ', skipping.'
                  ),
                  null
                )
              yield se(c, u, !e.replace)
            }
            let i = $(u)
            if (!i) return null
            let M = ''
            if (p) {
              if (!e.pure) {
                let w =
                  '--pure option will be used by default, to override use --no-pure.'
                t.workspaces
                  ? console.warn(
                      'Because of `workspaces` enabled in this package ' + w
                    )
                  : v &&
                    console.warn(
                      'Because of `pnpm-workspace.yaml` exists in this package ' +
                        w
                    )
              }
              console.log(
                `${i.name}@${i.version} added to ${(0, D.join)(
                  h.yalcPackagesFolder,
                  P
                )} purely`
              )
            }
            if (!p) {
              let w = (0, D.join)(a, 'node_modules', P)
              if (
                ((e.link || e.linkDep || cn(w)) && l.removeSync(w),
                e.link || e.linkDep
                  ? Re(u, w, 'junction')
                  : yield se(u, w, !e.replace),
                !e.link)
              ) {
                let c = e.linkDep ? 'link:' : 'file:',
                  y = e.workspace
                    ? 'workspace:*'
                    : c + h.yalcPackagesFolder + '/' + i.name,
                  f = t.dependencies || {},
                  S = t.devDependencies || {},
                  b = e.dev ? S : f
                e.dev
                  ? f[i.name] && ((M = f[i.name]), delete f[i.name])
                  : f[i.name] || (S[i.name] && (b = S)),
                  b[i.name] !== y &&
                    ((M = M || b[i.name]),
                    (b[i.name] = y),
                    (t.dependencies = b === f ? f : t.dependencies),
                    (t.devDependencies = b === S ? S : t.devDependencies),
                    (s = !0)),
                  (M = M == y ? '' : M)
              }
              if (i.bin && (e.link || e.linkDep)) {
                let c = (0, D.join)(a, 'node_modules', '.bin'),
                  y = (f, S) => {
                    let b = (0, D.join)(u, f),
                      A = (0, D.join)(c, S)
                    console.log(
                      'Linking bin script:',
                      (0, D.relative)(a, u),
                      '->',
                      (0, D.relative)(a, A)
                    )
                    try {
                      Re(b, A), l.chmodSync(b, 493)
                    } catch (B) {
                      console.warn('Could not create bin symlink.'),
                        console.error(B)
                    }
                  }
                if (typeof i.bin == 'string')
                  l.ensureDirSync(c), y(i.bin, i.name)
                else if (typeof i.bin == 'object') {
                  l.ensureDirSync(c)
                  for (let f in i.bin) y(i.bin[f], f)
                }
              }
              let r = e.link ? 'linked' : 'added'
              console.log(`Package ${i.name}@${i.version} ${r} ==> ${w}`)
            }
            let z = Q(u)
            return (
              g('postyalc.' + o),
              {
                signature: z,
                name: P,
                version: F,
                replaced: M,
                path: e.workingDir,
              }
            )
          })
        ),
        C = (yield Promise.all(x)).filter((o) => !!o).map((o) => o)
      s && _(a, t),
        ke(
          C.map((o) => ({
            name: o.name,
            version: o.version,
            replaced: o.replaced,
            pure: p,
            workspace: e.workspace,
            file: e.workspace ? void 0 : !e.link && !e.linkDep && !p,
            link: e.linkDep && !p,
            signature: o.signature,
          })),
          { workingDir: e.workingDir }
        ),
        g('postyalc'),
        yield ye(C),
        e.update && be(e.workingDir, n)
    })
0 && (module.exports = { addPackages })
