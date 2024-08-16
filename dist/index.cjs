'use strict'
var pn = Object.create
var K = Object.defineProperty,
  gn = Object.defineProperties,
  fn = Object.getOwnPropertyDescriptor,
  mn = Object.getOwnPropertyDescriptors,
  dn = Object.getOwnPropertyNames,
  Se = Object.getOwnPropertySymbols,
  kn = Object.getPrototypeOf,
  Fe = Object.prototype.hasOwnProperty,
  un = Object.prototype.propertyIsEnumerable
var xe = (e, n, a) =>
    n in e
      ? K(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a })
      : (e[n] = a),
  v = (e, n) => {
    for (var a in n || (n = {})) Fe.call(n, a) && xe(e, a, n[a])
    if (Se) for (var a of Se(n)) un.call(n, a) && xe(e, a, n[a])
    return e
  },
  L = (e, n) => gn(e, mn(n))
var yn = (e, n) => {
    for (var a in n) K(e, a, { get: n[a], enumerable: !0 })
  },
  Me = (e, n, a, t) => {
    if ((n && typeof n == 'object') || typeof n == 'function')
      for (let r of dn(n))
        !Fe.call(e, r) &&
          r !== a &&
          K(e, r, {
            get: () => n[r],
            enumerable: !(t = fn(n, r)) || t.enumerable,
          })
    return e
  }
var D = (e, n, a) => (
    (a = e != null ? pn(kn(e)) : {}),
    Me(
      n || !e || !e.__esModule
        ? K(a, 'default', { value: e, enumerable: !0 })
        : a,
      e
    )
  ),
  Pn = (e) => Me(K({}, '__esModule', { value: !0 }), e)
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
var Wn = {}
yn(Wn, {
  addPackages: () => j,
  checkManifest: () => ze,
  execLoudOptions: () => $,
  getPackageManager: () => R,
  getPackageManagerInstallCmd: () => Ln,
  getPackageManagerUpdateCmd: () => _e,
  getPackageStoreDir: () => Z,
  getRunScriptCmd: () => Cn,
  getStoreMainDir: () => G,
  getStorePackagesDir: () => U,
  isYarn: () => $n,
  parsePackageName: () => V,
  pmInstallCmd: () => ue,
  pmMarkFiles: () => ke,
  pmRunScriptCmd: () => q,
  pmUpdateCmd: () => Ae,
  publishPackage: () => Ue,
  readIgnoreFile: () => ge,
  readPackageManifest: () => I,
  readSignatureFile: () => B,
  removePackages: () => Ge,
  runPmUpdate: () => ye,
  updatePackages: () => oe,
  values: () => w,
  writePackageManifest: () => _,
  writeSignatureFile: () => fe,
  yalcGlobal: () => ve,
})
module.exports = Pn(Wn)
var ee = D(require('fs-extra'), 1),
  sn = require('os'),
  A = require('path')
var Ve = require('child_process'),
  We = require('path')
var pe = D(require('crypto'), 1),
  ae = D(require('fs-extra'), 1),
  Ie = D(require('ignore'), 1),
  Oe = D(require('npm-packlist'), 1),
  N = require('path')
var hn = 8,
  z = (e, n = '') =>
    new Promise((a, t) =>
      y(void 0, null, function* () {
        let r = ae.default.createReadStream(e),
          i = pe.default.createHash('md5')
        i.update(n.replace(/\\/g, '/')),
          r.on('data', (l) => i.update(l)),
          r.on('error', t).on('close', () => {
            a(i.digest('hex'))
          })
      })
    ),
  wn = (e, n, a = '') =>
    y(void 0, null, function* () {
      return yield ae.default.copy(e, n), z(e, a)
    }),
  vn = (e, n) =>
    Object.keys(e).length === 0
      ? {}
      : Object.keys(e).reduce((a, t) => (e[t] && (a[t] = n(e[t], t)), a), {}),
  bn = (e, n, a) => {
    var r
    if (e !== '*' && e !== '^' && e !== '~') return e
    let t = e === '^' || e === '~' ? e : ''
    try {
      let i = require.resolve((0, N.join)(n, 'package.json'), { paths: [a] }),
        l = (r = I((0, N.dirname)(i))) == null ? void 0 : r.version
      return `${t}${l}` || '*'
    } catch (i) {
      return (
        console.warn('Could not resolve workspace package location for', n), '*'
      )
    }
  },
  Dn = (e, n) => {
    let a = (t) =>
      t &&
      vn(t, (r, i) => {
        if (r.startsWith('workspace:')) {
          let l = r.split(':')[1],
            k = bn(l, i, n)
          return (
            console.log(`Resolving workspace package ${i} version ==> ${k}`), k
          )
        }
        return r
      })
    return L(v({}, e), {
      dependencies: a(e.dependencies),
      devDependencies: a(e.devDependencies),
      peerDependencies: a(e.peerDependencies),
    })
  },
  Sn = (e) =>
    L(v({}, e), {
      scripts: e.scripts
        ? L(v({}, e.scripts), { prepare: void 0, prepublish: void 0 })
        : void 0,
      devDependencies: void 0,
    }),
  xn = (e) => e.replace(/^\.\//, ''),
  Ce = (e) =>
    y(void 0, null, function* () {
      let { workingDir: n, devMod: a = !0 } = e,
        t = I(n)
      if (!t) throw 'Error copying package to store.'
      let r = e.workingDir,
        i = (0, N.join)(U(), t.name, t.version),
        l = ge(n),
        k = (0, Ie.default)().add(l),
        d = (yield (yield (0, Oe.default)({ path: n })).map(xn)).filter(
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
              yield ae.default.remove(i),
              Promise.all(
                d.sort().map((u) => wn((0, N.join)(r, u), (0, N.join)(i, u), u))
              )
            )
          }),
        c = e.changed
          ? yield Promise.all(d.sort().map((u) => z((0, N.join)(r, u), u)))
          : yield P(),
        o = pe.default.createHash('md5').update(c.join('')).digest('hex')
      if (e.changed) {
        let u = B(i)
        if (o === u) return !1
        yield P()
      }
      fe(i, o)
      let s = e.signature ? '+' + o.substr(0, hn) : '',
        m = L(
          v({}, ((u) => (e.workspaceResolve ? Dn(u, n) : u))(a ? Sn(t) : t)),
          { yalcSig: o, version: t.version + s }
        )
      return _(i, m), o
    })
var re = D(require('fs-extra'), 1),
  de = D(require('path'), 1)
var H = D(require('fs-extra'), 1),
  te = require('path')
var Fn = (e) => (e.version == 'v1' && e.packages ? 'v1' : 'v0'),
  Mn = { v0: (e) => ({ version: 'v1', packages: e }), v1: (e) => e },
  In = (e) => {
    let n = Fn(e)
    return Mn[n](e)
  },
  Le = (e) => {
    let n = (0, te.join)(e.workingDir, w.lockfileName)
    H.removeSync(n)
  },
  J = (e) => {
    let n = (0, te.join)(e.workingDir, w.lockfileName),
      a = { version: 'v1', packages: {} }
    try {
      a = In(H.readJSONSync(n))
    } catch (t) {
      return a
    }
    return a
  },
  me = (e, n) => {
    let a = (0, te.join)(n.workingDir, w.lockfileName),
      t = JSON.stringify(e, null, 2)
    H.writeFileSync(a, t)
  },
  $e = (e, n) => {
    let a = J(n)
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
      me(a, n)
  }
var se = () => {
  let e = G(),
    n = de.default.join(e, w.installationsFile),
    a
  try {
    re.default.accessSync(n)
    try {
      a = re.default.readJsonSync(n)
    } catch (t) {
      console.error('Error reading installations file', n, t), (a = {})
    }
  } catch (t) {
    a = {}
  }
  return a
}
var Re = (e) =>
    y(void 0, null, function* () {
      let n = G(),
        a = de.default.join(n, w.installationsFile),
        t = JSON.stringify(e, null, 2)
      return re.default.writeFile(a, t)
    }),
  Ne = (e) =>
    y(void 0, null, function* () {
      let n = se(),
        a = !1
      e.forEach((t) => {
        let r = n[t.name] || []
        ;(n[t.name] = r),
          !!r.filter((l) => l === t.path)[0] || ((a = !0), r.push(t.path))
      }),
        a && (yield Re(n))
    }),
  Y = (e) =>
    y(void 0, null, function* () {
      let n = se(),
        a = !1
      e.forEach((t) => {
        let r = n[t.name] || []
        console.log(`Removing installation of ${t.name} in ${t.path}`)
        let i = r.indexOf(t.path)
        i >= 0 && (r.splice(i, 1), (a = !0)), r.length || delete n[t.name]
      }),
        a && (yield Re(n))
    })
var je = require('child_process'),
  Ee = D(require('fs-extra'), 1),
  Te = require('path')
var ke = {
    pnpm: ['pnpm-lock.yaml'],
    yarn: ['yarn.lock'],
    npm: ['package-lock.json'],
  },
  ue = { pnpm: 'pnpm install', yarn: 'yarn', npm: 'npm install' },
  Ae = { pnpm: 'pnpm update', yarn: 'yarn upgrade', npm: 'npm update' },
  q = { pnpm: 'pnpm', yarn: 'yarn', npm: 'npm run' },
  On = 'npm',
  R = (e) =>
    Object.keys(ke).reduce(
      (a, t) =>
        a ||
        (ke[t].reduce(
          (r, i) => r || (Ee.existsSync((0, Te.join)(e, i)) && t),
          !1
        ) &&
          t),
      !1
    ) || On,
  Cn = (e) => ue[R(e)],
  Ln = (e) => ue[R(e)],
  _e = (e) => Ae[R(e)],
  $n = (e) => R(e) === 'yarn',
  ye = (e, n) => {
    let a = [_e(e), ...n].join(' ')
    console.log(`Running ${a} in ${e}`), (0, je.execSync)(a, v({ cwd: e }, $))
  }
var Ue = (e) =>
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
          (0, Ve.execSync)(`${q[t]} ${P}`, v({ cwd: n }, $)))
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
    let l = yield Ce(e)
    if (e.changed && !l) {
      console.warn('Package content has not changed, skipping publishing.')
      return
    }
    ;['postyalcpublish', 'postpack', 'publish', 'postpublish'].forEach(r)
    let f = (0, We.join)(U(), a.name, a.version),
      d = I(f)
    if ((console.log(`${d.name}@${d.version} published in store.`), e.push)) {
      let c = se()[a.name] || [],
        o = []
      for (let s of c) {
        console.info(`Pushing ${a.name}@${a.version} in ${s}`)
        let g = yield oe([a.name], {
          replace: e.replace,
          workingDir: s,
          update: e.update,
          noInstallationsRemove: !0,
        })
        o.push(...g)
      }
      yield Y(o)
    }
  })
var oe = (e, n) =>
  y(void 0, null, function* () {
    let { workingDir: a } = n,
      t = J({ workingDir: a }),
      r = [],
      i = []
    e.length
      ? e.forEach((s) => {
          let { name: g, version: m } = V(s)
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
    yield j(k, v({}, f))
    let d = l
      .filter((s) => !s.file && !s.link && !s.pure && !s.workspace)
      .map((s) => s.name)
    yield j(d, L(v({}, f), { link: !0, pure: !1 }))
    let P = l.filter((s) => s.workspace).map((s) => s.name)
    yield j(P, L(v({}, f), { workspace: !0, pure: !1 }))
    let c = l.filter((s) => s.link).map((s) => s.name)
    yield j(c, L(v({}, f), { linkDep: !0, pure: !1 }))
    let o = l.filter((s) => s.pure).map((s) => s.name)
    return (
      yield j(o, L(v({}, f), { pure: !0 })),
      n.noInstallationsRemove || (yield Y(i)),
      i
    )
  })
var Je = D(require('fs-extra'), 1),
  Pe = require('child_process'),
  Ye = D(require('path'), 1),
  Ke = require('path')
var He = 'git diff --cached --name-only',
  Rn = (e) => Ye.basename(e) === 'package.json'
function ze(e) {
  let n = (r) => {
    let i = Je.readJSONSync(r),
      l = new RegExp(`^(file|link):(.\\/)?\\${w.yalcPackagesFolder}\\/`),
      k = (d) => Object.keys(d).filter((P) => d[P].match(l))
    return k(i.dependencies || {}).concat(k(i.devDependencies || {}))
  }
  e.commit &&
    ((0, Pe.execSync)(He, v({ cwd: e.workingDir }, $))
      .toString()
      .trim(),
    (0, Pe.execSync)(He, v({ cwd: e.workingDir }, $))
      .toString()
      .trim()
      .split(
        `
`
      )
      .filter(Rn))
  let a = (0, Ke.join)(e.workingDir, 'package.json'),
    t = n(a)
  t.length && (console.info('Yalc dependencies found:', t), process.exit(1))
}
var E = D(require('fs-extra'), 1),
  Q = require('path')
var Nn = (e, n) =>
    new RegExp('file|link:' + w.yalcPackagesFolder + '/' + n).test(e),
  Be = (e) => {
    let n = E.existsSync(e) && !E.readdirSync(e).length
    return n && E.removeSync(e), n
  },
  Ge = (e, n) =>
    y(void 0, null, function* () {
      let { workingDir: a } = n,
        t = J({ workingDir: a }),
        r = I(a)
      if (!r) return
      let i = []
      e.length
        ? e.forEach((o) => {
            let { name: s, version: g } = V(o)
            t.packages[s]
              ? (!g || g === t.packages[s].version) && i.push(s)
              : (console.warn(
                  `Package ${o} not found in ${w.lockfileName}, still will try to remove.`
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
            Nn(g[o], o) &&
            (k.push(o), s && s.replaced ? (g[o] = s.replaced) : delete g[o]),
          n.retreat
            ? console.log(`Retreating package ${o} version ==>`, s.replaced)
            : ((l = !0), delete t.packages[o])
      }),
        l && me(t, { workingDir: a }),
        k.length && _(a, r)
      let f = i.map((o) => ({ name: o, version: '', path: a })),
        d = (0, Q.join)(a, w.yalcPackagesFolder)
      k.forEach((o) => {
        E.removeSync((0, Q.join)(a, 'node_modules', o))
      }),
        i.forEach((o) => {
          n.retreat || E.removeSync((0, Q.join)(d, o))
        })
      let P = (o) => o.startsWith('@')
      i
        .filter(P)
        .map((o) => o.split('/')[0])
        .map((o) => (0, Q.join)(d, o))
        .map(Be),
        !Object.keys(t.packages).length &&
          !n.retreat &&
          (Le({ workingDir: a }),
          Be(d) || console.warn(d, 'is not empty, not removing it.')),
        n.retreat || (yield Y(f))
    })
var an = require('child_process'),
  b = D(require('fs-extra'), 1),
  O = require('path')
var Ze = D(require('glob'), 1),
  en = D(require('util'), 1),
  T = require('path'),
  W = D(require('fs-extra'), 1)
var qe = parseInt(process.versions.node.split('.').shift(), 10)
qe >= 8 &&
  qe < 10 &&
  (Symbol.asyncIterator =
    Symbol.asyncIterator || Symbol('Symbol.asyncIterator'))
var Qe = en.default.promisify(Ze.default),
  X = {},
  Xe = (e) => e.reduce((n, a) => ((n[a] = !0), n), {}),
  jn = (e, n) => e.mtime.getTime() === n.mtime.getTime() && e.size === n.size,
  he = (e, n, a = !0) =>
    y(void 0, null, function* () {
      let t = '**/node_modules/**',
        l = X[e]
          ? X[e].glob
          : yield Qe('**', { cwd: e, ignore: t, dot: !0, nodir: !1 }),
        k = yield Qe('**', { cwd: n, ignore: t, dot: !0, nodir: !1 }),
        f = Xe(l),
        d = Xe(k),
        P = l.filter((p) => !d[p]),
        c = k.filter((p) => !f[p]),
        o = l.filter((p) => d[p])
      X[e] = X[e] || { files: {}, glob: l }
      let s = [],
        g = X[e].files,
        m = {},
        ce = (yield Promise.all(
          o.map((p) =>
            y(void 0, null, function* () {
              var M
              let h = (0, T.resolve)(e, p),
                x = (0, T.resolve)(n, p),
                S =
                  ((M = g[p]) == null ? void 0 : M.stat) ||
                  (yield W.default.stat(h))
              g[p] = g[p] || { stat: S, hash: '' }
              let C = yield W.default.stat(x)
              return {
                file: p,
                srcFileStat: S,
                destFileStat: C,
                srcFilePath: h,
                destFilePath: x,
              }
            })
          )
        )).map((M) =>
          y(void 0, [M], function* ({
            file: p,
            srcFileStat: h,
            destFileStat: x,
            srcFilePath: S,
            destFilePath: C,
          }) {
            let ne = h.isDirectory() && x.isDirectory()
            m[p] = x.isDirectory()
            let le = h.isDirectory() && !x.isDirectory(),
              be = !h.isDirectory() && x.isDirectory()
            ;(be || le) && c.push(p)
            let cn = () =>
              y(void 0, null, function* () {
                let De = g[p].hash || (yield z(S, ''))
                g[p].hash = De
                let ln = yield z(C, '')
                return De === ln
              })
            ;(be || (!ne && !jn(h, x) && (!a || !(yield cn())))) && s.push(p)
          })
        )
      yield Promise.all(ce),
        yield Promise.all(
          c
            .filter((p) => !m[p])
            .map((p) => W.default.remove((0, T.resolve)(n, p)))
        ),
        yield Promise.all(
          c
            .filter((p) => m[p])
            .map((p) => W.default.remove((0, T.resolve)(n, p)))
        )
      let F = yield Promise.all(
        P.map((p) =>
          W.default.stat((0, T.resolve)(e, p)).then((h) => h.isDirectory())
        )
      )
      yield Promise.all(
        P.filter((p, h) => !F[h])
          .concat(s)
          .map((p) =>
            W.default.copy((0, T.resolve)(e, p), (0, T.resolve)(n, p))
          )
      )
    })
var nn = b.ensureSymlinkSync,
  En = (e) => {
    let n = Z(e)
    return (
      b
        .readdirSync(n)
        .map((r) => ({
          version: r,
          created: b.statSync((0, O.join)(n, r)).ctime.getTime(),
        }))
        .sort((r, i) => i.created - r.created)
        .map((r) => r.version)[0] || ''
    )
  },
  Tn = (e) => {
    try {
      return !!b.readlinkSync(e)
    } catch (n) {
      return !1
    }
  },
  An = (e) => b.existsSync((0, O.join)(e, 'pnpm-workspace.yaml')),
  j = (e, n) =>
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
            (0, an.execSync)(`${q[i]} ${c}`, v({ cwd: a }, $)))
        },
        k = !1,
        f = n.pure === !1 ? !1 : n.pure || !!t.workspaces || (k = An(a))
      l('preyalc')
      let d = e.map((c) =>
          y(void 0, null, function* () {
            l('preyalc.' + c)
            let { name: o, version: s = '' } = V(c)
            o || console.warn('Could not parse package name', c)
            let g = (0, O.join)(a, w.yalcPackagesFolder, o)
            if (n.restore) {
              if (
                (console.log(`Restoring package \`${c}\` from .yalc directory`),
                !b.existsSync(g))
              )
                return (
                  console.warn(
                    `Could not find package \`${c}\` ` + g,
                    ', skipping.'
                  ),
                  null
                )
            } else {
              let F = Z(o)
              if (!b.existsSync(F))
                return (
                  console.warn(
                    `Could not find package \`${o}\` in store (${F}), skipping.`
                  ),
                  null
                )
              let p = s || En(o),
                h = Z(o, p)
              if (!b.existsSync(h))
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
                  w.yalcPackagesFolder,
                  o
                )} purely`
              )
            }
            if (!f) {
              let F = (0, O.join)(a, 'node_modules', o)
              if (
                ((n.link || n.linkDep || Tn(F)) && b.removeSync(F),
                n.link || n.linkDep
                  ? nn(g, F, 'junction')
                  : yield he(g, F, !n.replace),
                !n.link)
              ) {
                let h = n.linkDep ? 'link:' : 'file:',
                  x = n.workspace
                    ? 'workspace:*'
                    : h + w.yalcPackagesFolder + '/' + m.name,
                  S = t.dependencies || {},
                  C = t.devDependencies || {},
                  M = n.dev ? C : S
                n.dev
                  ? S[m.name] && ((u = S[m.name]), delete S[m.name])
                  : S[m.name] || (C[m.name] && (M = C)),
                  M[m.name] !== x &&
                    ((u = u || M[m.name]),
                    (M[m.name] = x),
                    (t.dependencies = M === S ? S : t.dependencies),
                    (t.devDependencies = M === C ? C : t.devDependencies),
                    (r = !0)),
                  (u = u == x ? '' : u)
              }
              if (m.bin && (n.link || n.linkDep)) {
                let h = (0, O.join)(a, 'node_modules', '.bin'),
                  x = (S, C) => {
                    let M = (0, O.join)(g, S),
                      ne = (0, O.join)(h, C)
                    console.log(
                      'Linking bin script:',
                      (0, O.relative)(a, g),
                      '->',
                      (0, O.relative)(a, ne)
                    )
                    try {
                      nn(M, ne), b.chmodSync(M, 493)
                    } catch (le) {
                      console.warn('Could not create bin symlink.'),
                        console.error(le)
                    }
                  }
                if (typeof m.bin == 'string')
                  b.ensureDirSync(h), x(m.bin, m.name)
                else if (typeof m.bin == 'object') {
                  b.ensureDirSync(h)
                  for (let S in m.bin) x(m.bin[S], S)
                }
              }
              let p = n.link ? 'linked' : 'added'
              console.log(`Package ${m.name}@${m.version} ${p} ==> ${F}`)
            }
            let ce = B(g)
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
      r && _(a, t),
        $e(
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
        yield Ne(P),
        n.update && ye(n.workingDir, e)
    })
var ie = D(require('fs-extra'), 1),
  we = require('path'),
  rn = D(require('detect-indent'), 1),
  V = (e) => {
    let n = e.match(/(^@[^/]+\/)?([^@]+)@?(.*)/) || []
    return n
      ? { name: (n[1] || '') + n[2], version: n[3] || '' }
      : { name: '', version: '' }
  },
  _n = (e) => (0, rn.default)(e).indent
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
var tn = (e) =>
  Object.keys(e)
    .sort()
    .reduce((n, a) => Object.assign(n, { [a]: e[a] }), {})
function _(e, n) {
  ;(n = Object.assign({}, n)),
    n.dependencies && (n.dependencies = tn(n.dependencies)),
    n.devDependencies && (n.devDependencies = tn(n.devDependencies))
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
var Vn = (0, sn.homedir)(),
  w = {
    myNameIs: 'yalc',
    ignoreFileName: '.yalcignore',
    myNameIsCapitalized: 'Yalc',
    lockfileName: 'yalc.lock',
    yalcPackagesFolder: '.yalc',
    prescript: 'preyalc',
    postscript: 'postyalc',
    installationsFile: 'installations.json',
  },
  ve = global
function G() {
  return ve.yalcStoreMainDir
    ? ve.yalcStoreMainDir
    : process.platform === 'win32' && process.env.LOCALAPPDATA
    ? (0, A.join)(process.env.LOCALAPPDATA, w.myNameIsCapitalized)
    : (0, A.join)(Vn, '.' + w.myNameIs)
}
function U() {
  return (0, A.join)(G(), 'packages')
}
var Z = (e, n = '') => (0, A.join)(U(), e, n),
  $ = { stdio: 'inherit' },
  on = 'yalc.sig',
  B = (e) => {
    let n = (0, A.join)(e, on)
    try {
      return ee.readFileSync(n, 'utf-8')
    } catch (a) {
      return ''
    }
  },
  ge = (e) => {
    let n = (0, A.join)(e, w.ignoreFileName)
    try {
      return ee.readFileSync(n, 'utf-8')
    } catch (a) {
      return ''
    }
  },
  fe = (e, n) => {
    let a = (0, A.join)(e, on)
    try {
      ee.writeFileSync(a, n)
    } catch (t) {
      throw (console.error('Could not write signature file'), t)
    }
  }
0 &&
  (module.exports = {
    addPackages,
    checkManifest,
    execLoudOptions,
    getPackageManager,
    getPackageManagerInstallCmd,
    getPackageManagerUpdateCmd,
    getPackageStoreDir,
    getRunScriptCmd,
    getStoreMainDir,
    getStorePackagesDir,
    isYarn,
    parsePackageName,
    pmInstallCmd,
    pmMarkFiles,
    pmRunScriptCmd,
    pmUpdateCmd,
    publishPackage,
    readIgnoreFile,
    readPackageManifest,
    readSignatureFile,
    removePackages,
    runPmUpdate,
    updatePackages,
    values,
    writePackageManifest,
    writeSignatureFile,
    yalcGlobal,
  })
