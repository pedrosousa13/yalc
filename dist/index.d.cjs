'use strict'
var pn = Object.create
var J = Object.defineProperty,
  gn = Object.defineProperties,
  fn = Object.getOwnPropertyDescriptor,
  mn = Object.getOwnPropertyDescriptors,
  dn = Object.getOwnPropertyNames,
  De = Object.getOwnPropertySymbols,
  kn = Object.getPrototypeOf,
  Fe = Object.prototype.hasOwnProperty,
  un = Object.prototype.propertyIsEnumerable
var Se = (e, n, a) =>
    n in e
      ? J(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a })
      : (e[n] = a),
  w = (e, n) => {
    for (var a in n || (n = {})) Fe.call(n, a) && Se(e, a, n[a])
    if (De) for (var a of De(n)) un.call(n, a) && Se(e, a, n[a])
    return e
  },
  L = (e, n) => gn(e, mn(n))
var yn = (e, n) => {
    for (var a in n) J(e, a, { get: n[a], enumerable: !0 })
  },
  Me = (e, n, a, t) => {
    if ((n && typeof n == 'object') || typeof n == 'function')
      for (let r of dn(n))
        !Fe.call(e, r) &&
          r !== a &&
          J(e, r, {
            get: () => n[r],
            enumerable: !(t = fn(n, r)) || t.enumerable,
          })
    return e
  }
var b = (e, n, a) => (
    (a = e != null ? pn(kn(e)) : {}),
    Me(
      n || !e || !e.__esModule
        ? J(a, 'default', { value: e, enumerable: !0 })
        : a,
      e
    )
  ),
  Pn = (e) => Me(J({}, '__esModule', { value: !0 }), e)
var y = (e, n, a) =>
  new Promise((t, r) => {
    var i = (f) => {
        try {
          k(a.next(f))
        } catch (d) {
          r(d)
        }
      },
      l = (f) => {
        try {
          k(a.throw(f))
        } catch (d) {
          r(d)
        }
      },
      k = (f) => (f.done ? t(f.value) : Promise.resolve(f.value).then(i, l))
    k((a = a.apply(e, n)).next())
  })
var Vn = {}
yn(Vn, {
  addPackages: () => N,
  checkManifest: () => me,
  getPackageManager: () => R,
  getPackageManagerInstallCmd: () => Fn,
  getPackageManagerUpdateCmd: () => Ve,
  getRunScriptCmd: () => Sn,
  isYarn: () => Mn,
  parsePackageName: () => _,
  pmInstallCmd: () => ue,
  pmMarkFiles: () => ke,
  pmRunScriptCmd: () => z,
  pmUpdateCmd: () => Ue,
  publishPackage: () => ve,
  readPackageManifest: () => I,
  removePackages: () => de,
  runPmUpdate: () => ye,
  updatePackages: () => G,
  writePackageManifest: () => U,
})
module.exports = Pn(Vn)
var sn = require('child_process'),
  on = require('path')
var X = b(require('fs-extra'), 1),
  tn = require('os'),
  A = require('path')
var ne = b(require('fs-extra'), 1),
  ge = b(require('path'), 1)
var W = b(require('fs-extra'), 1),
  ee = require('path')
var hn = (e) => (e.version == 'v1' && e.packages ? 'v1' : 'v0'),
  wn = { v0: (e) => ({ version: 'v1', packages: e }), v1: (e) => e },
  vn = (e) => {
    let n = hn(e)
    return wn[n](e)
  },
  Ie = (e) => {
    let n = (0, ee.join)(e.workingDir, v.lockfileName)
    W.removeSync(n)
  },
  Y = (e) => {
    let n = (0, ee.join)(e.workingDir, v.lockfileName),
      a = { version: 'v1', packages: {} }
    try {
      a = vn(W.readJSONSync(n))
    } catch (t) {
      return a
    }
    return a
  },
  pe = (e, n) => {
    let a = (0, ee.join)(n.workingDir, v.lockfileName),
      t = JSON.stringify(e, null, 2)
    W.writeFileSync(a, t)
  },
  Oe = (e, n) => {
    let a = Y(n)
    e.forEach(
      ({
        name: t,
        version: r,
        file: i,
        link: l,
        replaced: k,
        signature: f,
        pure: d,
        workspace: P,
      }) => {
        let c = a.packages[t] || {}
        ;(a.packages[t] = {}),
          r && (a.packages[t].version = r),
          f && (a.packages[t].signature = f),
          i && (a.packages[t].file = !0),
          l && (a.packages[t].link = !0),
          d && (a.packages[t].pure = !0),
          P && (a.packages[t].workspace = !0),
          (k || c.replaced) && (a.packages[t].replaced = k || c.replaced)
      }
    ),
      pe(a, n)
  }
var ae = () => {
  let e = te(),
    n = ge.default.join(e, v.installationsFile),
    a
  try {
    ne.default.accessSync(n)
    try {
      a = ne.default.readJsonSync(n)
    } catch (t) {
      console.error('Error reading installations file', n, t), (a = {})
    }
  } catch (t) {
    a = {}
  }
  return a
}
var Ce = (e) =>
    y(void 0, null, function* () {
      let n = te(),
        a = ge.default.join(n, v.installationsFile),
        t = JSON.stringify(e, null, 2)
      return ne.default.writeFile(a, t)
    }),
  Le = (e) =>
    y(void 0, null, function* () {
      let n = ae(),
        a = !1
      e.forEach((t) => {
        let r = n[t.name] || []
        ;(n[t.name] = r),
          !!r.filter((l) => l === t.path)[0] || ((a = !0), r.push(t.path))
      }),
        a && (yield Ce(n))
    }),
  H = (e) =>
    y(void 0, null, function* () {
      let n = ae(),
        a = !1
      e.forEach((t) => {
        let r = n[t.name] || []
        console.log(`Removing installation of ${t.name} in ${t.path}`)
        let i = r.indexOf(t.path)
        i >= 0 && (r.splice(i, 1), (a = !0)), r.length || delete n[t.name]
      }),
        a && (yield Ce(n))
    })
var G = (e, n) =>
  y(void 0, null, function* () {
    let { workingDir: a } = n,
      t = Y({ workingDir: a }),
      r = [],
      i = []
    e.length
      ? e.forEach((s) => {
          let { name: g, version: m } = _(s)
          t.packages[g]
            ? (m && (t.packages[g].version = m), r.push(g))
            : (i.push({ name: g, path: n.workingDir }),
              console.warn(
                `Did not find package ${g} in lockfile, please use 'add' command to add it explicitly.`
              ))
        })
      : (r = Object.keys(t.packages))
    let l = r.map((s) => ({
        name: t.packages[s].version ? s + '@' + t.packages[s].version : s,
        file: t.packages[s].file,
        link: t.packages[s].link,
        pure: t.packages[s].pure,
        workspace: t.packages[s].workspace,
      })),
      k = l.filter((s) => s.file).map((s) => s.name),
      f = {
        workingDir: n.workingDir,
        replace: n.replace,
        update: n.update,
        restore: n.restore,
      }
    yield N(k, w({}, f))
    let d = l
      .filter((s) => !s.file && !s.link && !s.pure && !s.workspace)
      .map((s) => s.name)
    yield N(d, L(w({}, f), { link: !0, pure: !1 }))
    let P = l.filter((s) => s.workspace).map((s) => s.name)
    yield N(P, L(w({}, f), { workspace: !0, pure: !1 }))
    let c = l.filter((s) => s.link).map((s) => s.name)
    yield N(c, L(w({}, f), { linkDep: !0, pure: !1 }))
    let o = l.filter((s) => s.pure).map((s) => s.name)
    return (
      yield N(o, L(w({}, f), { pure: !0 })),
      n.noInstallationsRemove || (yield H(i)),
      i
    )
  })
var $e = b(require('fs-extra'), 1),
  fe = require('child_process'),
  Re = b(require('path'), 1),
  Ee = require('path')
var Ne = 'git diff --cached --name-only',
  xn = (e) => Re.basename(e) === 'package.json'
function me(e) {
  let n = (r) => {
    let i = $e.readJSONSync(r),
      l = new RegExp(`^(file|link):(.\\/)?\\${v.yalcPackagesFolder}\\/`),
      k = (d) => Object.keys(d).filter((P) => d[P].match(l))
    return k(i.dependencies || {}).concat(k(i.devDependencies || {}))
  }
  e.commit &&
    ((0, fe.execSync)(Ne, w({ cwd: e.workingDir }, $))
      .toString()
      .trim(),
    (0, fe.execSync)(Ne, w({ cwd: e.workingDir }, $))
      .toString()
      .trim()
      .split(
        `
`
      )
      .filter(xn))
  let a = (0, Ee.join)(e.workingDir, 'package.json'),
    t = n(a)
  t.length && (console.info('Yalc dependencies found:', t), process.exit(1))
}
var E = b(require('fs-extra'), 1),
  K = require('path')
var bn = (e, n) =>
    new RegExp('file|link:' + v.yalcPackagesFolder + '/' + n).test(e),
  je = (e) => {
    let n = E.existsSync(e) && !E.readdirSync(e).length
    return n && E.removeSync(e), n
  },
  de = (e, n) =>
    y(void 0, null, function* () {
      let { workingDir: a } = n,
        t = Y({ workingDir: a }),
        r = I(a)
      if (!r) return
      let i = []
      e.length
        ? e.forEach((o) => {
            let { name: s, version: g } = _(o)
            t.packages[s]
              ? (!g || g === t.packages[s].version) && i.push(s)
              : (console.warn(
                  `Package ${o} not found in ${v.lockfileName}, still will try to remove.`
                ),
                i.push(s))
          })
        : n.all
        ? (i = Object.keys(t.packages))
        : console.info('Use --all option to remove all packages.')
      let l = !1,
        k = []
      i.forEach((o) => {
        let s = t.packages[o],
          g
        r.dependencies && r.dependencies[o] && (g = r.dependencies),
          r.devDependencies && r.devDependencies[o] && (g = r.devDependencies),
          g &&
            bn(g[o], o) &&
            (k.push(o), s && s.replaced ? (g[o] = s.replaced) : delete g[o]),
          n.retreat
            ? console.log(`Retreating package ${o} version ==>`, s.replaced)
            : ((l = !0), delete t.packages[o])
      }),
        l && pe(t, { workingDir: a }),
        k.length && U(a, r)
      let f = i.map((o) => ({ name: o, version: '', path: a })),
        d = (0, K.join)(a, v.yalcPackagesFolder)
      k.forEach((o) => {
        E.removeSync((0, K.join)(a, 'node_modules', o))
      }),
        i.forEach((o) => {
          n.retreat || E.removeSync((0, K.join)(d, o))
        })
      let P = (o) => o.startsWith('@')
      i
        .filter(P)
        .map((o) => o.split('/')[0])
        .map((o) => (0, K.join)(d, o))
        .map(je),
        !Object.keys(t.packages).length &&
          !n.retreat &&
          (Ie({ workingDir: a }),
          je(d) || console.warn(d, 'is not empty, not removing it.')),
        n.retreat || (yield H(f))
    })
var Ze = require('child_process'),
  x = b(require('fs-extra'), 1),
  O = require('path')
var Te = require('child_process'),
  Ae = b(require('fs-extra'), 1),
  _e = require('path')
var ke = {
    pnpm: ['pnpm-lock.yaml'],
    yarn: ['yarn.lock'],
    npm: ['package-lock.json'],
  },
  ue = { pnpm: 'pnpm install', yarn: 'yarn', npm: 'npm install' },
  Ue = { pnpm: 'pnpm update', yarn: 'yarn upgrade', npm: 'npm update' },
  z = { pnpm: 'pnpm', yarn: 'yarn', npm: 'npm run' },
  Dn = 'npm',
  R = (e) =>
    Object.keys(ke).reduce(
      (a, t) =>
        a ||
        (ke[t].reduce(
          (r, i) => r || (Ae.existsSync((0, _e.join)(e, i)) && t),
          !1
        ) &&
          t),
      !1
    ) || Dn,
  Sn = (e) => ue[R(e)],
  Fn = (e) => ue[R(e)],
  Ve = (e) => Ue[R(e)],
  Mn = (e) => R(e) === 'yarn',
  ye = (e, n) => {
    let a = [Ve(e), ...n].join(' ')
    console.log(`Running ${a} in ${e}`), (0, Te.execSync)(a, w({ cwd: e }, $))
  }
var qe = b(require('glob'), 1),
  Qe = b(require('util'), 1),
  T = require('path'),
  V = b(require('fs-extra'), 1)
var Pe = b(require('crypto'), 1),
  re = b(require('fs-extra'), 1),
  We = b(require('ignore'), 1),
  Ye = b(require('npm-packlist'), 1),
  j = require('path')
var In = 8,
  B = (e, n = '') =>
    new Promise((a, t) =>
      y(void 0, null, function* () {
        let r = re.default.createReadStream(e),
          i = Pe.default.createHash('md5')
        i.update(n.replace(/\\/g, '/')),
          r.on('data', (l) => i.update(l)),
          r.on('error', t).on('close', () => {
            a(i.digest('hex'))
          })
      })
    ),
  On = (e, n, a = '') =>
    y(void 0, null, function* () {
      return yield re.default.copy(e, n), B(e, a)
    }),
  Cn = (e, n) =>
    Object.keys(e).length === 0
      ? {}
      : Object.keys(e).reduce((a, t) => (e[t] && (a[t] = n(e[t], t)), a), {}),
  Ln = (e, n, a) => {
    var r
    if (e !== '*' && e !== '^' && e !== '~') return e
    let t = e === '^' || e === '~' ? e : ''
    try {
      let i = require.resolve((0, j.join)(n, 'package.json'), { paths: [a] }),
        l = (r = I((0, j.dirname)(i))) == null ? void 0 : r.version
      return `${t}${l}` || '*'
    } catch (i) {
      return (
        console.warn('Could not resolve workspace package location for', n), '*'
      )
    }
  },
  Nn = (e, n) => {
    let a = (t) =>
      t &&
      Cn(t, (r, i) => {
        if (r.startsWith('workspace:')) {
          let l = r.split(':')[1],
            k = Ln(l, i, n)
          return (
            console.log(`Resolving workspace package ${i} version ==> ${k}`), k
          )
        }
        return r
      })
    return L(w({}, e), {
      dependencies: a(e.dependencies),
      devDependencies: a(e.devDependencies),
      peerDependencies: a(e.peerDependencies),
    })
  },
  $n = (e) =>
    L(w({}, e), {
      scripts: e.scripts
        ? L(w({}, e.scripts), { prepare: void 0, prepublish: void 0 })
        : void 0,
      devDependencies: void 0,
    }),
  Rn = (e) => e.replace(/^\.\//, ''),
  He = (e) =>
    y(void 0, null, function* () {
      let { workingDir: n, devMod: a = !0 } = e,
        t = I(n)
      if (!t) throw 'Error copying package to store.'
      let r = e.workingDir,
        i = (0, j.join)(q(), t.name, t.version),
        l = Je(n),
        k = (0, We.default)().add(l),
        d = (yield (yield (0, Ye.default)({ path: n })).map(Rn)).filter(
          (u) => !k.ignores(u)
        )
      e.content &&
        (console.info('Files included in published content:'),
        d.sort().forEach((u) => {
          console.log(`- ${u}`)
        }),
        console.info(`Total ${d.length} files.`))
      let P = () =>
          y(void 0, null, function* () {
            return (
              yield re.default.remove(i),
              Promise.all(
                d.sort().map((u) => On((0, j.join)(r, u), (0, j.join)(i, u), u))
              )
            )
          }),
        c = e.changed
          ? yield Promise.all(d.sort().map((u) => B((0, j.join)(r, u), u)))
          : yield P(),
        o = Pe.default.createHash('md5').update(c.join('')).digest('hex')
      if (e.changed) {
        let u = se(i)
        if (o === u) return !1
        yield P()
      }
      Ge(i, o)
      let s = e.signature ? '+' + o.substr(0, In) : '',
        m = L(
          w({}, ((u) => (e.workspaceResolve ? Nn(u, n) : u))(a ? $n(t) : t)),
          { yalcSig: o, version: t.version + s }
        )
      return U(i, m), o
    })
var Ke = parseInt(process.versions.node.split('.').shift(), 10)
Ke >= 8 &&
  Ke < 10 &&
  (Symbol.asyncIterator =
    Symbol.asyncIterator || Symbol('Symbol.asyncIterator'))
var ze = Qe.default.promisify(qe.default),
  Q = {},
  Be = (e) => e.reduce((n, a) => ((n[a] = !0), n), {}),
  En = (e, n) => e.mtime.getTime() === n.mtime.getTime() && e.size === n.size,
  he = (e, n, a = !0) =>
    y(void 0, null, function* () {
      let t = '**/node_modules/**',
        l = Q[e]
          ? Q[e].glob
          : yield ze('**', { cwd: e, ignore: t, dot: !0, nodir: !1 }),
        k = yield ze('**', { cwd: n, ignore: t, dot: !0, nodir: !1 }),
        f = Be(l),
        d = Be(k),
        P = l.filter((p) => !d[p]),
        c = k.filter((p) => !f[p]),
        o = l.filter((p) => d[p])
      Q[e] = Q[e] || { files: {}, glob: l }
      let s = [],
        g = Q[e].files,
        m = {},
        ce = (yield Promise.all(
          o.map((p) =>
            y(void 0, null, function* () {
              var M
              let h = (0, T.resolve)(e, p),
                S = (0, T.resolve)(n, p),
                D =
                  ((M = g[p]) == null ? void 0 : M.stat) ||
                  (yield V.default.stat(h))
              g[p] = g[p] || { stat: D, hash: '' }
              let C = yield V.default.stat(S)
              return {
                file: p,
                srcFileStat: D,
                destFileStat: C,
                srcFilePath: h,
                destFilePath: S,
              }
            })
          )
        )).map((M) =>
          y(void 0, [M], function* ({
            file: p,
            srcFileStat: h,
            destFileStat: S,
            srcFilePath: D,
            destFilePath: C,
          }) {
            let Z = h.isDirectory() && S.isDirectory()
            m[p] = S.isDirectory()
            let le = h.isDirectory() && !S.isDirectory(),
              xe = !h.isDirectory() && S.isDirectory()
            ;(xe || le) && c.push(p)
            let cn = () =>
              y(void 0, null, function* () {
                let be = g[p].hash || (yield B(D, ''))
                g[p].hash = be
                let ln = yield B(C, '')
                return be === ln
              })
            ;(xe || (!Z && !En(h, S) && (!a || !(yield cn())))) && s.push(p)
          })
        )
      yield Promise.all(ce),
        yield Promise.all(
          c
            .filter((p) => !m[p])
            .map((p) => V.default.remove((0, T.resolve)(n, p)))
        ),
        yield Promise.all(
          c
            .filter((p) => m[p])
            .map((p) => V.default.remove((0, T.resolve)(n, p)))
        )
      let F = yield Promise.all(
        P.map((p) =>
          V.default.stat((0, T.resolve)(e, p)).then((h) => h.isDirectory())
        )
      )
      yield Promise.all(
        P.filter((p, h) => !F[h])
          .concat(s)
          .map((p) =>
            V.default.copy((0, T.resolve)(e, p), (0, T.resolve)(n, p))
          )
      )
    })
var Xe = x.ensureSymlinkSync,
  jn = (e) => {
    let n = oe(e)
    return (
      x
        .readdirSync(n)
        .map((r) => ({
          version: r,
          created: x.statSync((0, O.join)(n, r)).ctime.getTime(),
        }))
        .sort((r, i) => i.created - r.created)
        .map((r) => r.version)[0] || ''
    )
  },
  Tn = (e) => {
    try {
      return !!x.readlinkSync(e)
    } catch (n) {
      return !1
    }
  },
  An = (e) => x.existsSync((0, O.join)(e, 'pnpm-workspace.yaml')),
  N = (e, n) =>
    y(void 0, null, function* () {
      if (!e.length) return
      let a = n.workingDir,
        t = I(a),
        r = !1
      if (!t) return
      let i = R(a),
        l = (c) => {
          var s
          let o = (s = t.scripts) == null ? void 0 : s[c]
          o &&
            (console.log(`Running ${c} script: ${o}`),
            (0, Ze.execSync)(`${z[i]} ${c}`, w({ cwd: a }, $)))
        },
        k = !1,
        f = n.pure === !1 ? !1 : n.pure || !!t.workspaces || (k = An(a))
      l('preyalc')
      let d = e.map((c) =>
          y(void 0, null, function* () {
            l('preyalc.' + c)
            let { name: o, version: s = '' } = _(c)
            o || console.warn('Could not parse package name', c)
            let g = (0, O.join)(a, v.yalcPackagesFolder, o)
            if (n.restore) {
              if (
                (console.log(`Restoring package \`${c}\` from .yalc directory`),
                !x.existsSync(g))
              )
                return (
                  console.warn(
                    `Could not find package \`${c}\` ` + g,
                    ', skipping.'
                  ),
                  null
                )
            } else {
              let F = oe(o)
              if (!x.existsSync(F))
                return (
                  console.warn(
                    `Could not find package \`${o}\` in store (${F}), skipping.`
                  ),
                  null
                )
              let p = s || jn(o),
                h = oe(o, p)
              if (!x.existsSync(h))
                return (
                  console.warn(
                    `Could not find package \`${c}\` ` + h,
                    ', skipping.'
                  ),
                  null
                )
              yield he(h, g, !n.replace)
            }
            let m = I(g)
            if (!m) return null
            let u = ''
            if (f) {
              if (!n.pure) {
                let F =
                  '--pure option will be used by default, to override use --no-pure.'
                t.workspaces
                  ? console.warn(
                      'Because of `workspaces` enabled in this package ' + F
                    )
                  : k &&
                    console.warn(
                      'Because of `pnpm-workspace.yaml` exists in this package ' +
                        F
                    )
              }
              console.log(
                `${m.name}@${m.version} added to ${(0, O.join)(
                  v.yalcPackagesFolder,
                  o
                )} purely`
              )
            }
            if (!f) {
              let F = (0, O.join)(a, 'node_modules', o)
              if (
                ((n.link || n.linkDep || Tn(F)) && x.removeSync(F),
                n.link || n.linkDep
                  ? Xe(g, F, 'junction')
                  : yield he(g, F, !n.replace),
                !n.link)
              ) {
                let h = n.linkDep ? 'link:' : 'file:',
                  S = n.workspace
                    ? 'workspace:*'
                    : h + v.yalcPackagesFolder + '/' + m.name,
                  D = t.dependencies || {},
                  C = t.devDependencies || {},
                  M = n.dev ? C : D
                n.dev
                  ? D[m.name] && ((u = D[m.name]), delete D[m.name])
                  : D[m.name] || (C[m.name] && (M = C)),
                  M[m.name] !== S &&
                    ((u = u || M[m.name]),
                    (M[m.name] = S),
                    (t.dependencies = M === D ? D : t.dependencies),
                    (t.devDependencies = M === C ? C : t.devDependencies),
                    (r = !0)),
                  (u = u == S ? '' : u)
              }
              if (m.bin && (n.link || n.linkDep)) {
                let h = (0, O.join)(a, 'node_modules', '.bin'),
                  S = (D, C) => {
                    let M = (0, O.join)(g, D),
                      Z = (0, O.join)(h, C)
                    console.log(
                      'Linking bin script:',
                      (0, O.relative)(a, g),
                      '->',
                      (0, O.relative)(a, Z)
                    )
                    try {
                      Xe(M, Z), x.chmodSync(M, 493)
                    } catch (le) {
                      console.warn('Could not create bin symlink.'),
                        console.error(le)
                    }
                  }
                if (typeof m.bin == 'string')
                  x.ensureDirSync(h), S(m.bin, m.name)
                else if (typeof m.bin == 'object') {
                  x.ensureDirSync(h)
                  for (let D in m.bin) S(m.bin[D], D)
                }
              }
              let p = n.link ? 'linked' : 'added'
              console.log(`Package ${m.name}@${m.version} ${p} ==> ${F}`)
            }
            let ce = se(g)
            return (
              l('postyalc.' + c),
              {
                signature: ce,
                name: o,
                version: s,
                replaced: u,
                path: n.workingDir,
              }
            )
          })
        ),
        P = (yield Promise.all(d)).filter((c) => !!c).map((c) => c)
      r && U(a, t),
        Oe(
          P.map((c) => ({
            name: c.name,
            version: c.version,
            replaced: c.replaced,
            pure: f,
            workspace: n.workspace,
            file: n.workspace ? void 0 : !n.link && !n.linkDep && !f,
            link: n.linkDep && !f,
            signature: c.signature,
          })),
          { workingDir: n.workingDir }
        ),
        l('postyalc'),
        yield Le(P),
        n.update && ye(n.workingDir, e)
    })
var ie = b(require('fs-extra'), 1),
  we = require('path'),
  nn = b(require('detect-indent'), 1),
  _ = (e) => {
    let n = e.match(/(^@[^/]+\/)?([^@]+)@?(.*)/) || []
    return n
      ? { name: (n[1] || '') + n[2], version: n[3] || '' }
      : { name: '', version: '' }
  },
  _n = (e) => (0, nn.default)(e).indent
function I(e) {
  let n,
    a = (0, we.join)(e, 'package.json')
  try {
    let t = ie.readFileSync(a, 'utf-8')
    if (((n = JSON.parse(t)), !n.name && n.version))
      return (
        console.log('Package manifest', a, 'should contain name and version.'),
        null
      )
    let r = _n(t) || '  '
    return (n.__Indent = r), n
  } catch (t) {
    return console.error('Could not read', a), null
  }
}
var en = (e) =>
  Object.keys(e)
    .sort()
    .reduce((n, a) => Object.assign(n, { [a]: e[a] }), {})
function U(e, n) {
  ;(n = Object.assign({}, n)),
    n.dependencies && (n.dependencies = en(n.dependencies)),
    n.devDependencies && (n.devDependencies = en(n.devDependencies))
  let a = n.__Indent
  delete n.__Indent
  let t = (0, we.join)(e, 'package.json')
  try {
    ie.writeFileSync(
      t,
      JSON.stringify(n, null, a) +
        `
`
    )
  } catch (r) {
    console.error('Could not write ', t)
  }
}
var Un = (0, tn.homedir)(),
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
  an = global
function te() {
  return an.yalcStoreMainDir
    ? an.yalcStoreMainDir
    : process.platform === 'win32' && process.env.LOCALAPPDATA
    ? (0, A.join)(process.env.LOCALAPPDATA, v.myNameIsCapitalized)
    : (0, A.join)(Un, '.' + v.myNameIs)
}
function q() {
  return (0, A.join)(te(), 'packages')
}
var oe = (e, n = '') => (0, A.join)(q(), e, n),
  $ = { stdio: 'inherit' },
  rn = 'yalc.sig',
  se = (e) => {
    let n = (0, A.join)(e, rn)
    try {
      return X.readFileSync(n, 'utf-8')
    } catch (a) {
      return ''
    }
  },
  Je = (e) => {
    let n = (0, A.join)(e, v.ignoreFileName)
    try {
      return X.readFileSync(n, 'utf-8')
    } catch (a) {
      return ''
    }
  },
  Ge = (e, n) => {
    let a = (0, A.join)(e, rn)
    try {
      X.writeFileSync(a, n)
    } catch (t) {
      throw (console.error('Could not write signature file'), t)
    }
  }
var ve = (e) =>
  y(void 0, null, function* () {
    let n = e.workingDir,
      a = I(n)
    if (!a) return
    let t = R(n),
      r = (P) => {
        var o
        if (!e.scripts) return
        let c = (o = a.scripts) == null ? void 0 : o[P]
        c &&
          (console.log(`Running ${P} script: ${c}`),
          (0, sn.execSync)(`${z[t]} ${P}`, w({ cwd: n }, $)))
      }
    if (a.private && !e.private) {
      console.log(
        'Will not publish package with `private: true` use --private flag to force publishing.'
      )
      return
    }
    ;[
      'prepublish',
      'prepare',
      'prepublishOnly',
      'prepack',
      'preyalcpublish',
    ].forEach(r)
    let l = yield He(e)
    if (e.changed && !l) {
      console.warn('Package content has not changed, skipping publishing.')
      return
    }
    ;['postyalcpublish', 'postpack', 'publish', 'postpublish'].forEach(r)
    let f = (0, on.join)(q(), a.name, a.version),
      d = I(f)
    if ((console.log(`${d.name}@${d.version} published in store.`), e.push)) {
      let c = ae()[a.name] || [],
        o = []
      for (let s of c) {
        console.info(`Pushing ${a.name}@${a.version} in ${s}`)
        let g = yield G([a.name], {
          replace: e.replace,
          workingDir: s,
          update: e.update,
          noInstallationsRemove: !0,
        })
        o.push(...g)
      }
      yield H(o)
    }
  })
0 &&
  (module.exports = {
    addPackages,
    checkManifest,
    getPackageManager,
    getPackageManagerInstallCmd,
    getPackageManagerUpdateCmd,
    getRunScriptCmd,
    isYarn,
    parsePackageName,
    pmInstallCmd,
    pmMarkFiles,
    pmRunScriptCmd,
    pmUpdateCmd,
    publishPackage,
    readPackageManifest,
    removePackages,
    runPmUpdate,
    updatePackages,
    writePackageManifest,
  })
