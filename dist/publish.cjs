'use strict'
var qe = Object.create
var A = Object.defineProperty,
  Qe = Object.defineProperties,
  Xe = Object.getOwnPropertyDescriptor,
  Ze = Object.getOwnPropertyDescriptors,
  en = Object.getOwnPropertyNames,
  ke = Object.getOwnPropertySymbols,
  nn = Object.getPrototypeOf,
  ye = Object.prototype.hasOwnProperty,
  an = Object.prototype.propertyIsEnumerable
var ue = (n, e, a) =>
    e in n
      ? A(n, e, { enumerable: !0, configurable: !0, writable: !0, value: a })
      : (n[e] = a),
  w = (n, e) => {
    for (var a in e || (e = {})) ye.call(e, a) && ue(n, a, e[a])
    if (ke) for (var a of ke(e)) an.call(e, a) && ue(n, a, e[a])
    return n
  },
  C = (n, e) => Qe(n, Ze(e))
var tn = (n, e) => {
    for (var a in e) A(n, a, { get: e[a], enumerable: !0 })
  },
  Pe = (n, e, a, t) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let r of en(e))
        !ye.call(n, r) &&
          r !== a &&
          A(n, r, {
            get: () => e[r],
            enumerable: !(t = Xe(e, r)) || t.enumerable,
          })
    return n
  }
var D = (n, e, a) => (
    (a = n != null ? qe(nn(n)) : {}),
    Pe(
      e || !n || !n.__esModule
        ? A(a, 'default', { value: n, enumerable: !0 })
        : a,
      n
    )
  ),
  rn = (n) => Pe(A({}, '__esModule', { value: !0 }), n)
var k = (n, e, a) =>
  new Promise((t, r) => {
    var o = (f) => {
        try {
          y(a.next(f))
        } catch (P) {
          r(P)
        }
      },
      l = (f) => {
        try {
          y(a.throw(f))
        } catch (P) {
          r(P)
        }
      },
      y = (f) => (f.done ? t(f.value) : Promise.resolve(f.value).then(o, l))
    y((a = a.apply(n, e)).next())
  })
var Fn = {}
tn(Fn, { publishPackage: () => Ye })
module.exports = rn(Fn)
var Ke = require('child_process'),
  ze = require('path')
var B = D(require('fs-extra'), 1),
  He = require('os'),
  N = require('path')
var q = D(require('fs-extra'), 1),
  ie = D(require('path'), 1)
var _ = D(require('fs-extra'), 1),
  oe = require('path')
var sn = (n) => (n.version == 'v1' && n.packages ? 'v1' : 'v0'),
  on = { v0: (n) => ({ version: 'v1', packages: n }), v1: (n) => n },
  cn = (n) => {
    let e = sn(n)
    return on[e](n)
  }
var V = (n) => {
    let e = (0, oe.join)(n.workingDir, x.lockfileName),
      a = { version: 'v1', packages: {} }
    try {
      a = cn(_.readJSONSync(e))
    } catch (t) {
      return a
    }
    return a
  },
  he = (n, e) => {
    let a = (0, oe.join)(e.workingDir, x.lockfileName),
      t = JSON.stringify(n, null, 2)
    _.writeFileSync(a, t)
  },
  we = (n, e) => {
    let a = V(e)
    n.forEach(
      ({
        name: t,
        version: r,
        file: o,
        link: l,
        replaced: y,
        signature: f,
        pure: P,
        workspace: v,
      }) => {
        let i = a.packages[t] || {}
        ;(a.packages[t] = {}),
          r && (a.packages[t].version = r),
          f && (a.packages[t].signature = f),
          o && (a.packages[t].file = !0),
          l && (a.packages[t].link = !0),
          P && (a.packages[t].pure = !0),
          v && (a.packages[t].workspace = !0),
          (y || i.replaced) && (a.packages[t].replaced = y || i.replaced)
      }
    ),
      he(a, e)
  }
var Q = () => {
  let n = X(),
    e = ie.default.join(n, x.installationsFile),
    a
  try {
    q.default.accessSync(e)
    try {
      a = q.default.readJsonSync(e)
    } catch (t) {
      console.error('Error reading installations file', e, t), (a = {})
    }
  } catch (t) {
    a = {}
  }
  return a
}
var ve = (n) =>
    k(void 0, null, function* () {
      let e = X(),
        a = ie.default.join(e, x.installationsFile),
        t = JSON.stringify(n, null, 2)
      return q.default.writeFile(a, t)
    }),
  be = (n) =>
    k(void 0, null, function* () {
      let e = Q(),
        a = !1
      n.forEach((t) => {
        let r = e[t.name] || []
        ;(e[t.name] = r),
          !!r.filter((l) => l === t.path)[0] || ((a = !0), r.push(t.path))
      }),
        a && (yield ve(e))
    }),
  W = (n) =>
    k(void 0, null, function* () {
      let e = Q(),
        a = !1
      n.forEach((t) => {
        let r = e[t.name] || []
        console.log(`Removing installation of ${t.name} in ${t.path}`)
        let o = r.indexOf(t.path)
        o >= 0 && (r.splice(o, 1), (a = !0)), r.length || delete e[t.name]
      }),
        a && (yield ve(e))
    })
var ce = (n, e) =>
  k(void 0, null, function* () {
    let { workingDir: a } = e,
      t = V({ workingDir: a }),
      r = [],
      o = []
    n.length
      ? n.forEach((s) => {
          let { name: m, version: p } = U(s)
          t.packages[m]
            ? (p && (t.packages[m].version = p), r.push(m))
            : (o.push({ name: m, path: e.workingDir }),
              console.warn(
                `Did not find package ${m} in lockfile, please use 'add' command to add it explicitly.`
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
      y = l.filter((s) => s.file).map((s) => s.name),
      f = {
        workingDir: e.workingDir,
        replace: e.replace,
        update: e.update,
        restore: e.restore,
      }
    yield j(y, w({}, f))
    let P = l
      .filter((s) => !s.file && !s.link && !s.pure && !s.workspace)
      .map((s) => s.name)
    yield j(P, C(w({}, f), { link: !0, pure: !1 }))
    let v = l.filter((s) => s.workspace).map((s) => s.name)
    yield j(v, C(w({}, f), { workspace: !0, pure: !1 }))
    let i = l.filter((s) => s.link).map((s) => s.name)
    yield j(i, C(w({}, f), { linkDep: !0, pure: !1 }))
    let g = l.filter((s) => s.pure).map((s) => s.name)
    return (
      yield j(g, C(w({}, f), { pure: !0 })),
      e.noInstallationsRemove || (yield W(o)),
      o
    )
  })
var ln = D(require('fs-extra'), 1)
var le = D(require('fs-extra'), 1)
var _e = require('child_process'),
  h = D(require('fs-extra'), 1),
  I = require('path')
var Se = require('child_process'),
  xe = D(require('fs-extra'), 1),
  Fe = require('path')
var De = {
  pnpm: ['pnpm-lock.yaml'],
  yarn: ['yarn.lock'],
  npm: ['package-lock.json'],
}
var pn = { pnpm: 'pnpm update', yarn: 'yarn upgrade', npm: 'npm update' },
  Z = { pnpm: 'pnpm', yarn: 'yarn', npm: 'npm run' },
  gn = 'npm',
  J = (n) =>
    Object.keys(De).reduce(
      (a, t) =>
        a ||
        (De[t].reduce(
          (r, o) => r || (xe.existsSync((0, Fe.join)(n, o)) && t),
          !1
        ) &&
          t),
      !1
    ) || gn
var fn = (n) => pn[J(n)]
var Me = (n, e) => {
  let a = [fn(n), ...e].join(' ')
  console.log(`Running ${a} in ${n}`), (0, Se.execSync)(a, w({ cwd: n }, E))
}
var Ee = D(require('glob'), 1),
  Te = D(require('util'), 1),
  R = require('path'),
  T = D(require('fs-extra'), 1)
var pe = D(require('crypto'), 1),
  ee = D(require('fs-extra'), 1),
  Ie = D(require('ignore'), 1),
  Oe = D(require('npm-packlist'), 1),
  $ = require('path')
var mn = 8,
  Y = (n, e = '') =>
    new Promise((a, t) =>
      k(void 0, null, function* () {
        let r = ee.default.createReadStream(n),
          o = pe.default.createHash('md5')
        o.update(e.replace(/\\/g, '/')),
          r.on('data', (l) => o.update(l)),
          r.on('error', t).on('close', () => {
            a(o.digest('hex'))
          })
      })
    ),
  dn = (n, e, a = '') =>
    k(void 0, null, function* () {
      return yield ee.default.copy(n, e), Y(n, a)
    }),
  kn = (n, e) =>
    Object.keys(n).length === 0
      ? {}
      : Object.keys(n).reduce((a, t) => (n[t] && (a[t] = e(n[t], t)), a), {}),
  un = (n, e, a) => {
    var r
    if (n !== '*' && n !== '^' && n !== '~') return n
    let t = n === '^' || n === '~' ? n : ''
    try {
      let o = require.resolve((0, $.join)(e, 'package.json'), { paths: [a] }),
        l = (r = L((0, $.dirname)(o))) == null ? void 0 : r.version
      return `${t}${l}` || '*'
    } catch (o) {
      return (
        console.warn('Could not resolve workspace package location for', e), '*'
      )
    }
  },
  yn = (n, e) => {
    let a = (t) =>
      t &&
      kn(t, (r, o) => {
        if (r.startsWith('workspace:')) {
          let l = r.split(':')[1],
            y = un(l, o, e)
          return (
            console.log(`Resolving workspace package ${o} version ==> ${y}`), y
          )
        }
        return r
      })
    return C(w({}, n), {
      dependencies: a(n.dependencies),
      devDependencies: a(n.devDependencies),
      peerDependencies: a(n.peerDependencies),
    })
  },
  Pn = (n) =>
    C(w({}, n), {
      scripts: n.scripts
        ? C(w({}, n.scripts), { prepare: void 0, prepublish: void 0 })
        : void 0,
      devDependencies: void 0,
    }),
  hn = (n) => n.replace(/^\.\//, ''),
  Ce = (n) =>
    k(void 0, null, function* () {
      let { workingDir: e, devMod: a = !0 } = n,
        t = L(e)
      if (!t) throw 'Error copying package to store.'
      let r = n.workingDir,
        o = (0, $.join)(K(), t.name, t.version),
        l = Le(e),
        y = (0, Ie.default)().add(l),
        P = (yield (yield (0, Oe.default)({ path: e })).map(hn)).filter(
          (d) => !y.ignores(d)
        )
      n.content &&
        (console.info('Files included in published content:'),
        P.sort().forEach((d) => {
          console.log(`- ${d}`)
        }),
        console.info(`Total ${P.length} files.`))
      let v = () =>
          k(void 0, null, function* () {
            return (
              yield ee.default.remove(o),
              Promise.all(
                P.sort().map((d) => dn((0, $.join)(r, d), (0, $.join)(o, d), d))
              )
            )
          }),
        i = n.changed
          ? yield Promise.all(P.sort().map((d) => Y((0, $.join)(r, d), d)))
          : yield v(),
        g = pe.default.createHash('md5').update(i.join('')).digest('hex')
      if (n.changed) {
        let d = ne(o)
        if (g === d) return !1
        yield v()
      }
      $e(o, g)
      let s = n.signature ? '+' + g.substr(0, mn) : '',
        p = C(
          w({}, ((d) => (n.workspaceResolve ? yn(d, e) : d))(a ? Pn(t) : t)),
          { yalcSig: g, version: t.version + s }
        )
      return H(o, p), g
    })
var Re = parseInt(process.versions.node.split('.').shift(), 10)
Re >= 8 &&
  Re < 10 &&
  (Symbol.asyncIterator =
    Symbol.asyncIterator || Symbol('Symbol.asyncIterator'))
var Ne = Te.default.promisify(Ee.default),
  z = {},
  je = (n) => n.reduce((e, a) => ((e[a] = !0), e), {}),
  wn = (n, e) => n.mtime.getTime() === e.mtime.getTime() && n.size === e.size,
  ge = (n, e, a = !0) =>
    k(void 0, null, function* () {
      let t = '**/node_modules/**',
        l = z[n]
          ? z[n].glob
          : yield Ne('**', { cwd: n, ignore: t, dot: !0, nodir: !1 }),
        y = yield Ne('**', { cwd: e, ignore: t, dot: !0, nodir: !1 }),
        f = je(l),
        P = je(y),
        v = l.filter((c) => !P[c]),
        i = y.filter((c) => !f[c]),
        g = l.filter((c) => P[c])
      z[n] = z[n] || { files: {}, glob: l }
      let s = [],
        m = z[n].files,
        p = {},
        re = (yield Promise.all(
          g.map((c) =>
            k(void 0, null, function* () {
              var M
              let u = (0, R.resolve)(n, c),
                S = (0, R.resolve)(e, c),
                b =
                  ((M = m[c]) == null ? void 0 : M.stat) ||
                  (yield T.default.stat(u))
              m[c] = m[c] || { stat: b, hash: '' }
              let O = yield T.default.stat(S)
              return {
                file: c,
                srcFileStat: b,
                destFileStat: O,
                srcFilePath: u,
                destFilePath: S,
              }
            })
          )
        )).map((M) =>
          k(void 0, [M], function* ({
            file: c,
            srcFileStat: u,
            destFileStat: S,
            srcFilePath: b,
            destFilePath: O,
          }) {
            let G = u.isDirectory() && S.isDirectory()
            p[c] = S.isDirectory()
            let se = u.isDirectory() && !S.isDirectory(),
              me = !u.isDirectory() && S.isDirectory()
            ;(me || se) && i.push(c)
            let Be = () =>
              k(void 0, null, function* () {
                let de = m[c].hash || (yield Y(b, ''))
                m[c].hash = de
                let Ge = yield Y(O, '')
                return de === Ge
              })
            ;(me || (!G && !wn(u, S) && (!a || !(yield Be())))) && s.push(c)
          })
        )
      yield Promise.all(re),
        yield Promise.all(
          i
            .filter((c) => !p[c])
            .map((c) => T.default.remove((0, R.resolve)(e, c)))
        ),
        yield Promise.all(
          i
            .filter((c) => p[c])
            .map((c) => T.default.remove((0, R.resolve)(e, c)))
        )
      let F = yield Promise.all(
        v.map((c) =>
          T.default.stat((0, R.resolve)(n, c)).then((u) => u.isDirectory())
        )
      )
      yield Promise.all(
        v
          .filter((c, u) => !F[u])
          .concat(s)
          .map((c) =>
            T.default.copy((0, R.resolve)(n, c), (0, R.resolve)(e, c))
          )
      )
    })
var Ae = h.ensureSymlinkSync,
  vn = (n) => {
    let e = ae(n)
    return (
      h
        .readdirSync(e)
        .map((r) => ({
          version: r,
          created: h.statSync((0, I.join)(e, r)).ctime.getTime(),
        }))
        .sort((r, o) => o.created - r.created)
        .map((r) => r.version)[0] || ''
    )
  },
  bn = (n) => {
    try {
      return !!h.readlinkSync(n)
    } catch (e) {
      return !1
    }
  },
  Dn = (n) => h.existsSync((0, I.join)(n, 'pnpm-workspace.yaml')),
  j = (n, e) =>
    k(void 0, null, function* () {
      if (!n.length) return
      let a = e.workingDir,
        t = L(a),
        r = !1
      if (!t) return
      let o = J(a),
        l = (i) => {
          var s
          let g = (s = t.scripts) == null ? void 0 : s[i]
          g &&
            (console.log(`Running ${i} script: ${g}`),
            (0, _e.execSync)(`${Z[o]} ${i}`, w({ cwd: a }, E)))
        },
        y = !1,
        f = e.pure === !1 ? !1 : e.pure || !!t.workspaces || (y = Dn(a))
      l('preyalc')
      let P = n.map((i) =>
          k(void 0, null, function* () {
            l('preyalc.' + i)
            let { name: g, version: s = '' } = U(i)
            g || console.warn('Could not parse package name', i)
            let m = (0, I.join)(a, x.yalcPackagesFolder, g)
            if (e.restore) {
              if (
                (console.log(`Restoring package \`${i}\` from .yalc directory`),
                !h.existsSync(m))
              )
                return (
                  console.warn(
                    `Could not find package \`${i}\` ` + m,
                    ', skipping.'
                  ),
                  null
                )
            } else {
              let F = ae(g)
              if (!h.existsSync(F))
                return (
                  console.warn(
                    `Could not find package \`${g}\` in store (${F}), skipping.`
                  ),
                  null
                )
              let c = s || vn(g),
                u = ae(g, c)
              if (!h.existsSync(u))
                return (
                  console.warn(
                    `Could not find package \`${i}\` ` + u,
                    ', skipping.'
                  ),
                  null
                )
              yield ge(u, m, !e.replace)
            }
            let p = L(m)
            if (!p) return null
            let d = ''
            if (f) {
              if (!e.pure) {
                let F =
                  '--pure option will be used by default, to override use --no-pure.'
                t.workspaces
                  ? console.warn(
                      'Because of `workspaces` enabled in this package ' + F
                    )
                  : y &&
                    console.warn(
                      'Because of `pnpm-workspace.yaml` exists in this package ' +
                        F
                    )
              }
              console.log(
                `${p.name}@${p.version} added to ${(0, I.join)(
                  x.yalcPackagesFolder,
                  g
                )} purely`
              )
            }
            if (!f) {
              let F = (0, I.join)(a, 'node_modules', g)
              if (
                ((e.link || e.linkDep || bn(F)) && h.removeSync(F),
                e.link || e.linkDep
                  ? Ae(m, F, 'junction')
                  : yield ge(m, F, !e.replace),
                !e.link)
              ) {
                let u = e.linkDep ? 'link:' : 'file:',
                  S = e.workspace
                    ? 'workspace:*'
                    : u + x.yalcPackagesFolder + '/' + p.name,
                  b = t.dependencies || {},
                  O = t.devDependencies || {},
                  M = e.dev ? O : b
                e.dev
                  ? b[p.name] && ((d = b[p.name]), delete b[p.name])
                  : b[p.name] || (O[p.name] && (M = O)),
                  M[p.name] !== S &&
                    ((d = d || M[p.name]),
                    (M[p.name] = S),
                    (t.dependencies = M === b ? b : t.dependencies),
                    (t.devDependencies = M === O ? O : t.devDependencies),
                    (r = !0)),
                  (d = d == S ? '' : d)
              }
              if (p.bin && (e.link || e.linkDep)) {
                let u = (0, I.join)(a, 'node_modules', '.bin'),
                  S = (b, O) => {
                    let M = (0, I.join)(m, b),
                      G = (0, I.join)(u, O)
                    console.log(
                      'Linking bin script:',
                      (0, I.relative)(a, m),
                      '->',
                      (0, I.relative)(a, G)
                    )
                    try {
                      Ae(M, G), h.chmodSync(M, 493)
                    } catch (se) {
                      console.warn('Could not create bin symlink.'),
                        console.error(se)
                    }
                  }
                if (typeof p.bin == 'string')
                  h.ensureDirSync(u), S(p.bin, p.name)
                else if (typeof p.bin == 'object') {
                  h.ensureDirSync(u)
                  for (let b in p.bin) S(p.bin[b], b)
                }
              }
              let c = e.link ? 'linked' : 'added'
              console.log(`Package ${p.name}@${p.version} ${c} ==> ${F}`)
            }
            let re = ne(m)
            return (
              l('postyalc.' + i),
              {
                signature: re,
                name: g,
                version: s,
                replaced: d,
                path: e.workingDir,
              }
            )
          })
        ),
        v = (yield Promise.all(P)).filter((i) => !!i).map((i) => i)
      r && H(a, t),
        we(
          v.map((i) => ({
            name: i.name,
            version: i.version,
            replaced: i.replaced,
            pure: f,
            workspace: e.workspace,
            file: e.workspace ? void 0 : !e.link && !e.linkDep && !f,
            link: e.linkDep && !f,
            signature: i.signature,
          })),
          { workingDir: e.workingDir }
        ),
        l('postyalc'),
        yield be(v),
        e.update && Me(e.workingDir, n)
    })
var te = D(require('fs-extra'), 1),
  fe = require('path'),
  We = D(require('detect-indent'), 1),
  U = (n) => {
    let e = n.match(/(^@[^/]+\/)?([^@]+)@?(.*)/) || []
    return e
      ? { name: (e[1] || '') + e[2], version: e[3] || '' }
      : { name: '', version: '' }
  },
  Sn = (n) => (0, We.default)(n).indent
function L(n) {
  let e,
    a = (0, fe.join)(n, 'package.json')
  try {
    let t = te.readFileSync(a, 'utf-8')
    if (((e = JSON.parse(t)), !e.name && e.version))
      return (
        console.log('Package manifest', a, 'should contain name and version.'),
        null
      )
    let r = Sn(t) || '  '
    return (e.__Indent = r), e
  } catch (t) {
    return console.error('Could not read', a), null
  }
}
var Ve = (n) =>
  Object.keys(n)
    .sort()
    .reduce((e, a) => Object.assign(e, { [a]: n[a] }), {})
function H(n, e) {
  ;(e = Object.assign({}, e)),
    e.dependencies && (e.dependencies = Ve(e.dependencies)),
    e.devDependencies && (e.devDependencies = Ve(e.devDependencies))
  let a = e.__Indent
  delete e.__Indent
  let t = (0, fe.join)(n, 'package.json')
  try {
    te.writeFileSync(
      t,
      JSON.stringify(e, null, a) +
        `
`
    )
  } catch (r) {
    console.error('Could not write ', t)
  }
}
var xn = (0, He.homedir)(),
  x = {
    myNameIs: 'yalc',
    ignoreFileName: '.yalcignore',
    myNameIsCapitalized: 'Yalc',
    lockfileName: 'yalc.lock',
    yalcPackagesFolder: '.yalc',
    prescript: 'preyalc',
    postscript: 'postyalc',
    installationsFile: 'installations.json',
  },
  Ue = global
function X() {
  return Ue.yalcStoreMainDir
    ? Ue.yalcStoreMainDir
    : process.platform === 'win32' && process.env.LOCALAPPDATA
    ? (0, N.join)(process.env.LOCALAPPDATA, x.myNameIsCapitalized)
    : (0, N.join)(xn, '.' + x.myNameIs)
}
function K() {
  return (0, N.join)(X(), 'packages')
}
var ae = (n, e = '') => (0, N.join)(K(), n, e),
  E = { stdio: 'inherit' },
  Je = 'yalc.sig',
  ne = (n) => {
    let e = (0, N.join)(n, Je)
    try {
      return B.readFileSync(e, 'utf-8')
    } catch (a) {
      return ''
    }
  },
  Le = (n) => {
    let e = (0, N.join)(n, x.ignoreFileName)
    try {
      return B.readFileSync(e, 'utf-8')
    } catch (a) {
      return ''
    }
  },
  $e = (n, e) => {
    let a = (0, N.join)(n, Je)
    try {
      B.writeFileSync(a, e)
    } catch (t) {
      throw (console.error('Could not write signature file'), t)
    }
  }
var Ye = (n) =>
  k(void 0, null, function* () {
    let e = n.workingDir,
      a = L(e)
    if (!a) return
    let t = J(e),
      r = (v) => {
        var g
        if (!n.scripts) return
        let i = (g = a.scripts) == null ? void 0 : g[v]
        i &&
          (console.log(`Running ${v} script: ${i}`),
          (0, Ke.execSync)(`${Z[t]} ${v}`, w({ cwd: e }, E)))
      }
    if (a.private && !n.private) {
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
    let l = yield Ce(n)
    if (n.changed && !l) {
      console.warn('Package content has not changed, skipping publishing.')
      return
    }
    ;['postyalcpublish', 'postpack', 'publish', 'postpublish'].forEach(r)
    let f = (0, ze.join)(K(), a.name, a.version),
      P = L(f)
    if ((console.log(`${P.name}@${P.version} published in store.`), n.push)) {
      let i = Q()[a.name] || [],
        g = []
      for (let s of i) {
        console.info(`Pushing ${a.name}@${a.version} in ${s}`)
        let m = yield ce([a.name], {
          replace: n.replace,
          workingDir: s,
          update: n.update,
          noInstallationsRemove: !0,
        })
        g.push(...m)
      }
      yield W(g)
    }
  })
0 && (module.exports = { publishPackage })
