'use strict'
var Ve = Object.create
var T = Object.defineProperty,
  We = Object.defineProperties,
  Ue = Object.getOwnPropertyDescriptor,
  He = Object.getOwnPropertyDescriptors,
  Je = Object.getOwnPropertyNames,
  fe = Object.getOwnPropertySymbols,
  Ye = Object.getPrototypeOf,
  de = Object.prototype.hasOwnProperty,
  Ke = Object.prototype.propertyIsEnumerable
var me = (n, e, a) =>
    e in n
      ? T(n, e, { enumerable: !0, configurable: !0, writable: !0, value: a })
      : (n[e] = a),
  D = (n, e) => {
    for (var a in e || (e = {})) de.call(e, a) && me(n, a, e[a])
    if (fe) for (var a of fe(e)) Ke.call(e, a) && me(n, a, e[a])
    return n
  },
  R = (n, e) => We(n, He(e))
var ze = (n, e) => {
    for (var a in e) T(n, a, { get: e[a], enumerable: !0 })
  },
  ke = (n, e, a, t) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let r of Je(e))
        !de.call(n, r) &&
          r !== a &&
          T(n, r, {
            get: () => e[r],
            enumerable: !(t = Ue(e, r)) || t.enumerable,
          })
    return n
  }
var y = (n, e, a) => (
    (a = n != null ? Ve(Ye(n)) : {}),
    ke(
      e || !n || !n.__esModule
        ? T(a, 'default', { value: n, enumerable: !0 })
        : a,
      n
    )
  ),
  Be = (n) => ke(T({}, '__esModule', { value: !0 }), n)
var k = (n, e, a) =>
  new Promise((t, r) => {
    var g = (l) => {
        try {
          w(a.next(l))
        } catch (S) {
          r(S)
        }
      },
      p = (l) => {
        try {
          w(a.throw(l))
        } catch (S) {
          r(S)
        }
      },
      w = (l) => (l.done ? t(l.value) : Promise.resolve(l.value).then(g, p))
    w((a = a.apply(n, e)).next())
  })
var fn = {}
ze(fn, { updatePackages: () => se })
module.exports = Be(fn)
var le = y(require('fs-extra'), 1),
  Te = require('os'),
  E = require('path')
var ue = y(require('crypto'), 1),
  ye = y(require('fs-extra'), 1),
  Ge = y(require('ignore'), 1),
  qe = y(require('npm-packlist'), 1)
var X = (n, e = '') =>
  new Promise((a, t) =>
    k(void 0, null, function* () {
      let r = ye.default.createReadStream(n),
        g = ue.default.createHash('md5')
      g.update(e.replace(/\\/g, '/')),
        r.on('data', (p) => g.update(p)),
        r.on('error', t).on('close', () => {
          a(g.digest('hex'))
        })
    })
  )
var J = y(require('fs-extra'), 1),
  ae = y(require('path'), 1)
var A = y(require('fs-extra'), 1),
  ne = require('path')
var Qe = (n) => (n.version == 'v1' && n.packages ? 'v1' : 'v0'),
  Xe = { v0: (n) => ({ version: 'v1', packages: n }), v1: (n) => n },
  Ze = (n) => {
    let e = Qe(n)
    return Xe[e](n)
  }
var _ = (n) => {
    let e = (0, ne.join)(n.workingDir, v.lockfileName),
      a = { version: 'v1', packages: {} }
    try {
      a = Ze(A.readJSONSync(e))
    } catch (t) {
      return a
    }
    return a
  },
  Pe = (n, e) => {
    let a = (0, ne.join)(e.workingDir, v.lockfileName),
      t = JSON.stringify(n, null, 2)
    A.writeFileSync(a, t)
  },
  he = (n, e) => {
    let a = _(e)
    n.forEach(
      ({
        name: t,
        version: r,
        file: g,
        link: p,
        replaced: w,
        signature: l,
        pure: S,
        workspace: I,
      }) => {
        let i = a.packages[t] || {}
        ;(a.packages[t] = {}),
          r && (a.packages[t].version = r),
          l && (a.packages[t].signature = l),
          g && (a.packages[t].file = !0),
          p && (a.packages[t].link = !0),
          S && (a.packages[t].pure = !0),
          I && (a.packages[t].workspace = !0),
          (w || i.replaced) && (a.packages[t].replaced = w || i.replaced)
      }
    ),
      Pe(a, e)
  }
var te = () => {
  let n = K(),
    e = ae.default.join(n, v.installationsFile),
    a
  try {
    J.default.accessSync(e)
    try {
      a = J.default.readJsonSync(e)
    } catch (t) {
      console.error('Error reading installations file', e, t), (a = {})
    }
  } catch (t) {
    a = {}
  }
  return a
}
var we = (n) =>
    k(void 0, null, function* () {
      let e = K(),
        a = ae.default.join(e, v.installationsFile),
        t = JSON.stringify(n, null, 2)
      return J.default.writeFile(a, t)
    }),
  ve = (n) =>
    k(void 0, null, function* () {
      let e = te(),
        a = !1
      n.forEach((t) => {
        let r = e[t.name] || []
        ;(e[t.name] = r),
          !!r.filter((p) => p === t.path)[0] || ((a = !0), r.push(t.path))
      }),
        a && (yield we(e))
    }),
  Y = (n) =>
    k(void 0, null, function* () {
      let e = te(),
        a = !1
      n.forEach((t) => {
        let r = e[t.name] || []
        console.log(`Removing installation of ${t.name} in ${t.path}`)
        let g = r.indexOf(t.path)
        g >= 0 && (r.splice(g, 1), (a = !0)), r.length || delete e[t.name]
      }),
        a && (yield we(e))
    })
var De = require('child_process'),
  Se = y(require('fs-extra'), 1),
  xe = require('path')
var be = {
  pnpm: ['pnpm-lock.yaml'],
  yarn: ['yarn.lock'],
  npm: ['package-lock.json'],
}
var en = { pnpm: 'pnpm update', yarn: 'yarn upgrade', npm: 'npm update' },
  re = { pnpm: 'pnpm', yarn: 'yarn', npm: 'npm run' },
  nn = 'npm',
  z = (n) =>
    Object.keys(be).reduce(
      (a, t) =>
        a ||
        (be[t].reduce(
          (r, g) => r || (Se.existsSync((0, xe.join)(n, g)) && t),
          !1
        ) &&
          t),
      !1
    ) || nn
var an = (n) => en[z(n)]
var Fe = (n, e) => {
  let a = [an(n), ...e].join(' ')
  console.log(`Running ${a} in ${n}`), (0, De.execSync)(a, D({ cwd: n }, j))
}
var tn = y(require('fs-extra'), 1)
var oe = y(require('fs-extra'), 1)
var Re = require('child_process'),
  d = y(require('fs-extra'), 1),
  F = require('path')
var Ce = y(require('glob'), 1),
  Le = y(require('util'), 1),
  C = require('path'),
  L = y(require('fs-extra'), 1)
var Me = parseInt(process.versions.node.split('.').shift(), 10)
Me >= 8 &&
  Me < 10 &&
  (Symbol.asyncIterator =
    Symbol.asyncIterator || Symbol('Symbol.asyncIterator'))
var Ie = Le.default.promisify(Ce.default),
  W = {},
  Oe = (n) => n.reduce((e, a) => ((e[a] = !0), e), {}),
  rn = (n, e) => n.mtime.getTime() === e.mtime.getTime() && n.size === e.size,
  ie = (n, e, a = !0) =>
    k(void 0, null, function* () {
      let t = '**/node_modules/**',
        p = W[n]
          ? W[n].glob
          : yield Ie('**', { cwd: n, ignore: t, dot: !0, nodir: !1 }),
        w = yield Ie('**', { cwd: e, ignore: t, dot: !0, nodir: !1 }),
        l = Oe(p),
        S = Oe(w),
        I = p.filter((o) => !S[o]),
        i = w.filter((o) => !l[o]),
        P = p.filter((o) => S[o])
      W[n] = W[n] || { files: {}, glob: p }
      let s = [],
        f = W[n].files,
        c = {},
        q = (yield Promise.all(
          P.map((o) =>
            k(void 0, null, function* () {
              var x
              let m = (0, C.resolve)(n, o),
                h = (0, C.resolve)(e, o),
                u =
                  ((x = f[o]) == null ? void 0 : x.stat) ||
                  (yield L.default.stat(m))
              f[o] = f[o] || { stat: u, hash: '' }
              let M = yield L.default.stat(h)
              return {
                file: o,
                srcFileStat: u,
                destFileStat: M,
                srcFilePath: m,
                destFilePath: h,
              }
            })
          )
        )).map((x) =>
          k(void 0, [x], function* ({
            file: o,
            srcFileStat: m,
            destFileStat: h,
            srcFilePath: u,
            destFilePath: M,
          }) {
            let U = m.isDirectory() && h.isDirectory()
            c[o] = h.isDirectory()
            let Q = m.isDirectory() && !h.isDirectory(),
              pe = !m.isDirectory() && h.isDirectory()
            ;(pe || Q) && i.push(o)
            let Ae = () =>
              k(void 0, null, function* () {
                let ge = f[o].hash || (yield X(u, ''))
                f[o].hash = ge
                let _e = yield X(M, '')
                return ge === _e
              })
            ;(pe || (!U && !rn(m, h) && (!a || !(yield Ae())))) && s.push(o)
          })
        )
      yield Promise.all(q),
        yield Promise.all(
          i
            .filter((o) => !c[o])
            .map((o) => L.default.remove((0, C.resolve)(e, o)))
        ),
        yield Promise.all(
          i
            .filter((o) => c[o])
            .map((o) => L.default.remove((0, C.resolve)(e, o)))
        )
      let b = yield Promise.all(
        I.map((o) =>
          L.default.stat((0, C.resolve)(n, o)).then((m) => m.isDirectory())
        )
      )
      yield Promise.all(
        I.filter((o, m) => !b[m])
          .concat(s)
          .map((o) =>
            L.default.copy((0, C.resolve)(n, o), (0, C.resolve)(e, o))
          )
      )
    })
var $e = d.ensureSymlinkSync,
  sn = (n) => {
    let e = B(n)
    return (
      d
        .readdirSync(e)
        .map((r) => ({
          version: r,
          created: d.statSync((0, F.join)(e, r)).ctime.getTime(),
        }))
        .sort((r, g) => g.created - r.created)
        .map((r) => r.version)[0] || ''
    )
  },
  on = (n) => {
    try {
      return !!d.readlinkSync(n)
    } catch (e) {
      return !1
    }
  },
  cn = (n) => d.existsSync((0, F.join)(n, 'pnpm-workspace.yaml')),
  $ = (n, e) =>
    k(void 0, null, function* () {
      if (!n.length) return
      let a = e.workingDir,
        t = N(a),
        r = !1
      if (!t) return
      let g = z(a),
        p = (i) => {
          var s
          let P = (s = t.scripts) == null ? void 0 : s[i]
          P &&
            (console.log(`Running ${i} script: ${P}`),
            (0, Re.execSync)(`${re[g]} ${i}`, D({ cwd: a }, j)))
        },
        w = !1,
        l = e.pure === !1 ? !1 : e.pure || !!t.workspaces || (w = cn(a))
      p('preyalc')
      let S = n.map((i) =>
          k(void 0, null, function* () {
            p('preyalc.' + i)
            let { name: P, version: s = '' } = V(i)
            P || console.warn('Could not parse package name', i)
            let f = (0, F.join)(a, v.yalcPackagesFolder, P)
            if (e.restore) {
              if (
                (console.log(`Restoring package \`${i}\` from .yalc directory`),
                !d.existsSync(f))
              )
                return (
                  console.warn(
                    `Could not find package \`${i}\` ` + f,
                    ', skipping.'
                  ),
                  null
                )
            } else {
              let b = B(P)
              if (!d.existsSync(b))
                return (
                  console.warn(
                    `Could not find package \`${P}\` in store (${b}), skipping.`
                  ),
                  null
                )
              let o = s || sn(P),
                m = B(P, o)
              if (!d.existsSync(m))
                return (
                  console.warn(
                    `Could not find package \`${i}\` ` + m,
                    ', skipping.'
                  ),
                  null
                )
              yield ie(m, f, !e.replace)
            }
            let c = N(f)
            if (!c) return null
            let O = ''
            if (l) {
              if (!e.pure) {
                let b =
                  '--pure option will be used by default, to override use --no-pure.'
                t.workspaces
                  ? console.warn(
                      'Because of `workspaces` enabled in this package ' + b
                    )
                  : w &&
                    console.warn(
                      'Because of `pnpm-workspace.yaml` exists in this package ' +
                        b
                    )
              }
              console.log(
                `${c.name}@${c.version} added to ${(0, F.join)(
                  v.yalcPackagesFolder,
                  P
                )} purely`
              )
            }
            if (!l) {
              let b = (0, F.join)(a, 'node_modules', P)
              if (
                ((e.link || e.linkDep || on(b)) && d.removeSync(b),
                e.link || e.linkDep
                  ? $e(f, b, 'junction')
                  : yield ie(f, b, !e.replace),
                !e.link)
              ) {
                let m = e.linkDep ? 'link:' : 'file:',
                  h = e.workspace
                    ? 'workspace:*'
                    : m + v.yalcPackagesFolder + '/' + c.name,
                  u = t.dependencies || {},
                  M = t.devDependencies || {},
                  x = e.dev ? M : u
                e.dev
                  ? u[c.name] && ((O = u[c.name]), delete u[c.name])
                  : u[c.name] || (M[c.name] && (x = M)),
                  x[c.name] !== h &&
                    ((O = O || x[c.name]),
                    (x[c.name] = h),
                    (t.dependencies = x === u ? u : t.dependencies),
                    (t.devDependencies = x === M ? M : t.devDependencies),
                    (r = !0)),
                  (O = O == h ? '' : O)
              }
              if (c.bin && (e.link || e.linkDep)) {
                let m = (0, F.join)(a, 'node_modules', '.bin'),
                  h = (u, M) => {
                    let x = (0, F.join)(f, u),
                      U = (0, F.join)(m, M)
                    console.log(
                      'Linking bin script:',
                      (0, F.relative)(a, f),
                      '->',
                      (0, F.relative)(a, U)
                    )
                    try {
                      $e(x, U), d.chmodSync(x, 493)
                    } catch (Q) {
                      console.warn('Could not create bin symlink.'),
                        console.error(Q)
                    }
                  }
                if (typeof c.bin == 'string')
                  d.ensureDirSync(m), h(c.bin, c.name)
                else if (typeof c.bin == 'object') {
                  d.ensureDirSync(m)
                  for (let u in c.bin) h(c.bin[u], u)
                }
              }
              let o = e.link ? 'linked' : 'added'
              console.log(`Package ${c.name}@${c.version} ${o} ==> ${b}`)
            }
            let q = ee(f)
            return (
              p('postyalc.' + i),
              {
                signature: q,
                name: P,
                version: s,
                replaced: O,
                path: e.workingDir,
              }
            )
          })
        ),
        I = (yield Promise.all(S)).filter((i) => !!i).map((i) => i)
      r && H(a, t),
        he(
          I.map((i) => ({
            name: i.name,
            version: i.version,
            replaced: i.replaced,
            pure: l,
            workspace: e.workspace,
            file: e.workspace ? void 0 : !e.link && !e.linkDep && !l,
            link: e.linkDep && !l,
            signature: i.signature,
          })),
          { workingDir: e.workingDir }
        ),
        p('postyalc'),
        yield ve(I),
        e.update && Fe(e.workingDir, n)
    })
var G = y(require('fs-extra'), 1),
  ce = require('path'),
  je = y(require('detect-indent'), 1),
  V = (n) => {
    let e = n.match(/(^@[^/]+\/)?([^@]+)@?(.*)/) || []
    return e
      ? { name: (e[1] || '') + e[2], version: e[3] || '' }
      : { name: '', version: '' }
  },
  ln = (n) => (0, je.default)(n).indent
function N(n) {
  let e,
    a = (0, ce.join)(n, 'package.json')
  try {
    let t = G.readFileSync(a, 'utf-8')
    if (((e = JSON.parse(t)), !e.name && e.version))
      return (
        console.log('Package manifest', a, 'should contain name and version.'),
        null
      )
    let r = ln(t) || '  '
    return (e.__Indent = r), e
  } catch (t) {
    return console.error('Could not read', a), null
  }
}
var Ne = (n) =>
  Object.keys(n)
    .sort()
    .reduce((e, a) => Object.assign(e, { [a]: n[a] }), {})
function H(n, e) {
  ;(e = Object.assign({}, e)),
    e.dependencies && (e.dependencies = Ne(e.dependencies)),
    e.devDependencies && (e.devDependencies = Ne(e.devDependencies))
  let a = e.__Indent
  delete e.__Indent
  let t = (0, ce.join)(n, 'package.json')
  try {
    G.writeFileSync(
      t,
      JSON.stringify(e, null, a) +
        `
`
    )
  } catch (r) {
    console.error('Could not write ', t)
  }
}
var pn = (0, Te.homedir)(),
  v = {
    myNameIs: 'yalc',
    ignoreFileName: '.yalcignore',
    myNameIsCapitalized: 'Yalc',
    lockfileName: 'yalc.lock',
    yalcPackagesFolder: '.yalc',
    prescript: 'preyalc',
    postscript: 'postyalc',
    installationsFile: 'installations.json',
  },
  Ee = global
function K() {
  return Ee.yalcStoreMainDir
    ? Ee.yalcStoreMainDir
    : process.platform === 'win32' && process.env.LOCALAPPDATA
    ? (0, E.join)(process.env.LOCALAPPDATA, v.myNameIsCapitalized)
    : (0, E.join)(pn, '.' + v.myNameIs)
}
function Z() {
  return (0, E.join)(K(), 'packages')
}
var B = (n, e = '') => (0, E.join)(Z(), n, e),
  j = { stdio: 'inherit' },
  gn = 'yalc.sig',
  ee = (n) => {
    let e = (0, E.join)(n, gn)
    try {
      return le.readFileSync(e, 'utf-8')
    } catch (a) {
      return ''
    }
  }
var se = (n, e) =>
  k(void 0, null, function* () {
    let { workingDir: a } = e,
      t = _({ workingDir: a }),
      r = [],
      g = []
    n.length
      ? n.forEach((s) => {
          let { name: f, version: c } = V(s)
          t.packages[f]
            ? (c && (t.packages[f].version = c), r.push(f))
            : (g.push({ name: f, path: e.workingDir }),
              console.warn(
                `Did not find package ${f} in lockfile, please use 'add' command to add it explicitly.`
              ))
        })
      : (r = Object.keys(t.packages))
    let p = r.map((s) => ({
        name: t.packages[s].version ? s + '@' + t.packages[s].version : s,
        file: t.packages[s].file,
        link: t.packages[s].link,
        pure: t.packages[s].pure,
        workspace: t.packages[s].workspace,
      })),
      w = p.filter((s) => s.file).map((s) => s.name),
      l = {
        workingDir: e.workingDir,
        replace: e.replace,
        update: e.update,
        restore: e.restore,
      }
    yield $(w, D({}, l))
    let S = p
      .filter((s) => !s.file && !s.link && !s.pure && !s.workspace)
      .map((s) => s.name)
    yield $(S, R(D({}, l), { link: !0, pure: !1 }))
    let I = p.filter((s) => s.workspace).map((s) => s.name)
    yield $(I, R(D({}, l), { workspace: !0, pure: !1 }))
    let i = p.filter((s) => s.link).map((s) => s.name)
    yield $(i, R(D({}, l), { linkDep: !0, pure: !1 }))
    let P = p.filter((s) => s.pure).map((s) => s.name)
    return (
      yield $(P, R(D({}, l), { pure: !0 })),
      e.noInstallationsRemove || (yield Y(g)),
      g
    )
  })
0 && (module.exports = { updatePackages })
