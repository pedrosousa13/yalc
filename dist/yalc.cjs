#!/usr/bin/env node
'use strict'
var vn = Object.create
var ye = Object.defineProperty,
  Dn = Object.defineProperties,
  Sn = Object.getOwnPropertyDescriptor,
  xn = Object.getOwnPropertyDescriptors,
  Fn = Object.getOwnPropertyNames,
  Oe = Object.getOwnPropertySymbols,
  Mn = Object.getPrototypeOf,
  Re = Object.prototype.hasOwnProperty,
  Cn = Object.prototype.propertyIsEnumerable
var Ie = (e, n, a) =>
    n in e
      ? ye(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a })
      : (e[n] = a),
  h = (e, n) => {
    for (var a in n || (n = {})) Re.call(n, a) && Ie(e, a, n[a])
    if (Oe) for (var a of Oe(n)) Cn.call(n, a) && Ie(e, a, n[a])
    return e
  },
  O = (e, n) => Dn(e, xn(n))
var On = (e, n, a, t) => {
  if ((n && typeof n == 'object') || typeof n == 'function')
    for (let o of Fn(n))
      !Re.call(e, o) &&
        o !== a &&
        ye(e, o, {
          get: () => n[o],
          enumerable: !(t = Sn(n, o)) || t.enumerable,
        })
  return e
}
var v = (e, n, a) => (
  (a = e != null ? vn(Mn(e)) : {}),
  On(
    n || !e || !e.__esModule
      ? ye(a, 'default', { value: e, enumerable: !0 })
      : a,
    e
  )
)
var u = (e, n, a) =>
  new Promise((t, o) => {
    var r = (d) => {
        try {
          k(a.next(d))
        } catch (m) {
          o(m)
        }
      },
      c = (d) => {
        try {
          k(a.throw(d))
        } catch (m) {
          o(m)
        }
      },
      k = (d) => (d.done ? t(d.value) : Promise.resolve(d.value).then(r, c))
    k((a = a.apply(e, n)).next())
  })
var M = v(require('yargs'), 1),
  fe = require('path')
var ne = v(require('fs-extra'), 1),
  gn = require('os'),
  _ = require('path')
var Ke = require('child_process'),
  Ge = require('path')
var he = v(require('crypto'), 1),
  te = v(require('fs-extra'), 1),
  Le = v(require('ignore'), 1),
  $e = v(require('npm-packlist'), 1),
  j = require('path')
var In = 8,
  z = (e, n = '') =>
    new Promise((a, t) =>
      u(void 0, null, function* () {
        let o = te.default.createReadStream(e),
          r = he.default.createHash('md5')
        r.update(n.replace(/\\/g, '/')),
          o.on('data', (c) => r.update(c)),
          o.on('error', t).on('close', () => {
            a(r.digest('hex'))
          })
      })
    ),
  Rn = (e, n, a = '') =>
    u(void 0, null, function* () {
      return yield te.default.copy(e, n), z(e, a)
    }),
  Ln = (e, n) =>
    Object.keys(e).length === 0
      ? {}
      : Object.keys(e).reduce((a, t) => (e[t] && (a[t] = n(e[t], t)), a), {}),
  $n = (e, n, a) => {
    var o
    if (e !== '*' && e !== '^' && e !== '~') return e
    let t = e === '^' || e === '~' ? e : ''
    try {
      let r = require.resolve((0, j.join)(n, 'package.json'), { paths: [a] }),
        c = (o = L((0, j.dirname)(r))) == null ? void 0 : o.version
      return `${t}${c}` || '*'
    } catch (r) {
      return (
        console.warn('Could not resolve workspace package location for', n), '*'
      )
    }
  },
  Nn = (e, n) => {
    let a = (t) =>
      t &&
      Ln(t, (o, r) => {
        if (o.startsWith('workspace:')) {
          let c = o.split(':')[1],
            k = $n(c, r, n)
          return (
            console.log(`Resolving workspace package ${r} version ==> ${k}`), k
          )
        }
        return o
      })
    return O(h({}, e), {
      dependencies: a(e.dependencies),
      devDependencies: a(e.devDependencies),
      peerDependencies: a(e.peerDependencies),
    })
  },
  jn = (e) =>
    O(h({}, e), {
      scripts: e.scripts
        ? O(h({}, e.scripts), { prepare: void 0, prepublish: void 0 })
        : void 0,
      devDependencies: void 0,
    }),
  En = (e) => e.replace(/^\.\//, ''),
  Ne = (e) =>
    u(void 0, null, function* () {
      let { workingDir: n, devMod: a = !0 } = e,
        t = L(n)
      if (!t) throw 'Error copying package to store.'
      let o = e.workingDir,
        r = (0, j.join)(Q(), t.name, t.version),
        c = je(n),
        k = (0, Le.default)().add(c),
        m = (yield (yield (0, $e.default)({ path: n })).map(En)).filter(
          (y) => !k.ignores(y)
        )
      e.content &&
        (console.info('Files included in published content:'),
        m.sort().forEach((y) => {
          console.log(`- ${y}`)
        }),
        console.info(`Total ${m.length} files.`))
      let P = () =>
          u(void 0, null, function* () {
            return (
              yield te.default.remove(r),
              Promise.all(
                m.sort().map((y) => Rn((0, j.join)(o, y), (0, j.join)(r, y), y))
              )
            )
          }),
        l = e.changed
          ? yield Promise.all(m.sort().map((y) => z((0, j.join)(o, y), y)))
          : yield P(),
        i = he.default.createHash('md5').update(l.join('')).digest('hex')
      if (e.changed) {
        let y = oe(r)
        if (i === y) return !1
        yield P()
      }
      Ee(r, i)
      let s = e.signature ? '+' + i.substr(0, In) : '',
        f = O(
          h({}, ((y) => (e.workspaceResolve ? Nn(y, n) : y))(a ? jn(t) : t)),
          { yalcSig: i, version: t.version + s }
        )
      return H(r, f), i
    })
var se = v(require('fs-extra'), 1),
  we = v(require('path'), 1)
var J = v(require('fs-extra'), 1),
  re = require('path')
var Tn = (e) => (e.version == 'v1' && e.packages ? 'v1' : 'v0'),
  _n = { v0: (e) => ({ version: 'v1', packages: e }), v1: (e) => e },
  An = (e) => {
    let n = Tn(e)
    return _n[n](e)
  },
  Te = (e) => {
    let n = (0, re.join)(e.workingDir, w.lockfileName)
    J.removeSync(n)
  },
  U = (e) => {
    let n = (0, re.join)(e.workingDir, w.lockfileName),
      a = { version: 'v1', packages: {} }
    try {
      a = An(J.readJSONSync(n))
    } catch (t) {
      return a
    }
    return a
  },
  Pe = (e, n) => {
    let a = (0, re.join)(n.workingDir, w.lockfileName),
      t = JSON.stringify(e, null, 2)
    J.writeFileSync(a, t)
  },
  _e = (e, n) => {
    let a = U(n)
    e.forEach(
      ({
        name: t,
        version: o,
        file: r,
        link: c,
        replaced: k,
        signature: d,
        pure: m,
        workspace: P,
      }) => {
        let l = a.packages[t] || {}
        ;(a.packages[t] = {}),
          o && (a.packages[t].version = o),
          d && (a.packages[t].signature = d),
          r && (a.packages[t].file = !0),
          c && (a.packages[t].link = !0),
          m && (a.packages[t].pure = !0),
          P && (a.packages[t].workspace = !0),
          (k || l.replaced) && (a.packages[t].replaced = k || l.replaced)
      }
    ),
      Pe(a, n)
  }
var B = () => {
    let e = Y(),
      n = we.default.join(e, w.installationsFile),
      a
    try {
      se.default.accessSync(n)
      try {
        a = se.default.readJsonSync(n)
      } catch (t) {
        console.error('Error reading installations file', n, t), (a = {})
      }
    } catch (t) {
      a = {}
    }
    return a
  },
  Ae = ({ packages: e }) => {
    let n = B()
    Object.keys(n)
      .filter((a) => (e.length ? e.indexOf(a) >= 0 : !0))
      .map((a) => ({ name: a, locations: n[a] }))
      .forEach(({ name: a, locations: t }) => {
        console.log(`Installations of package ${a}:`),
          t.forEach((o) => {
            console.log(`  ${o}`)
          })
      })
  },
  Ue = (a) =>
    u(void 0, [a], function* ({ packages: e, dry: n }) {
      let t = B(),
        o = Object.keys(t)
          .filter((r) => (e.length ? e.indexOf(r) >= 0 : !0))
          .map((r) => ({ name: r, locations: t[r] }))
          .reduce(
            (r, { name: c, locations: k }) =>
              k.reduce((d, m) => {
                let P = U({ workingDir: m })
                return Object.keys(P.packages).indexOf(c) < 0
                  ? d.concat([{ name: c, path: m }])
                  : d
              }, r),
            []
          )
      o.length &&
        (console.info('Installations clean up:'),
        n
          ? (o.forEach((r) => {
              console.log(`Installation to remove: ${r.name} in ${r.path}`)
            }),
            console.warn('Dry run.'))
          : yield W(o))
    }),
  We = (e) =>
    u(void 0, null, function* () {
      let n = Y(),
        a = we.default.join(n, w.installationsFile),
        t = JSON.stringify(e, null, 2)
      return se.default.writeFile(a, t)
    }),
  Ve = (e) =>
    u(void 0, null, function* () {
      let n = B(),
        a = !1
      e.forEach((t) => {
        let o = n[t.name] || []
        ;(n[t.name] = o),
          !!o.filter((c) => c === t.path)[0] || ((a = !0), o.push(t.path))
      }),
        a && (yield We(n))
    }),
  W = (e) =>
    u(void 0, null, function* () {
      let n = B(),
        a = !1
      e.forEach((t) => {
        let o = n[t.name] || []
        console.log(`Removing installation of ${t.name} in ${t.path}`)
        let r = o.indexOf(t.path)
        r >= 0 && (o.splice(r, 1), (a = !0)), o.length || delete n[t.name]
      }),
        a && (yield We(n))
    })
var Je = require('child_process'),
  Be = v(require('fs-extra'), 1),
  Ye = require('path')
var He = {
  pnpm: ['pnpm-lock.yaml'],
  yarn: ['yarn.lock'],
  npm: ['package-lock.json'],
}
var Un = { pnpm: 'pnpm update', yarn: 'yarn upgrade', npm: 'npm update' },
  ie = { pnpm: 'pnpm', yarn: 'yarn', npm: 'npm run' },
  Wn = 'npm',
  X = (e) =>
    Object.keys(He).reduce(
      (a, t) =>
        a ||
        (He[t].reduce(
          (o, r) => o || (Be.existsSync((0, Ye.join)(e, r)) && t),
          !1
        ) &&
          t),
      !1
    ) || Wn
var Vn = (e) => Un[X(e)]
var qe = (e, n) => {
  let a = [Vn(e), ...n].join(' ')
  console.log(`Running ${a} in ${e}`), (0, Je.execSync)(a, h({ cwd: e }, N))
}
var ce = (e) =>
  u(void 0, null, function* () {
    let n = e.workingDir,
      a = L(n)
    if (!a) return
    let t = X(n),
      o = (P) => {
        var i
        if (!e.scripts) return
        let l = (i = a.scripts) == null ? void 0 : i[P]
        l &&
          (console.log(`Running ${P} script: ${l}`),
          (0, Ke.execSync)(`${ie[t]} ${P}`, h({ cwd: n }, N)))
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
    ].forEach(o)
    let c = yield Ne(e)
    if (e.changed && !c) {
      console.warn('Package content has not changed, skipping publishing.')
      return
    }
    ;['postyalcpublish', 'postpack', 'publish', 'postpublish'].forEach(o)
    let d = (0, Ge.join)(Q(), a.name, a.version),
      m = L(d)
    if ((console.log(`${m.name}@${m.version} published in store.`), e.push)) {
      let l = B()[a.name] || [],
        i = []
      for (let s of l) {
        console.info(`Pushing ${a.name}@${a.version} in ${s}`)
        let g = yield q([a.name], {
          replace: e.replace,
          workingDir: s,
          update: e.update,
          noInstallationsRemove: !0,
        })
        i.push(...g)
      }
      yield W(i)
    }
  })
var q = (e, n) =>
  u(void 0, null, function* () {
    let { workingDir: a } = n,
      t = U({ workingDir: a }),
      o = [],
      r = []
    e.length
      ? e.forEach((s) => {
          let { name: g, version: f } = K(s)
          t.packages[g]
            ? (f && (t.packages[g].version = f), o.push(g))
            : (r.push({ name: g, path: n.workingDir }),
              console.warn(
                `Did not find package ${g} in lockfile, please use 'add' command to add it explicitly.`
              ))
        })
      : (o = Object.keys(t.packages))
    let c = o.map((s) => ({
        name: t.packages[s].version ? s + '@' + t.packages[s].version : s,
        file: t.packages[s].file,
        link: t.packages[s].link,
        pure: t.packages[s].pure,
        workspace: t.packages[s].workspace,
      })),
      k = c.filter((s) => s.file).map((s) => s.name),
      d = {
        workingDir: n.workingDir,
        replace: n.replace,
        update: n.update,
        restore: n.restore,
      }
    yield $(k, h({}, d))
    let m = c
      .filter((s) => !s.file && !s.link && !s.pure && !s.workspace)
      .map((s) => s.name)
    yield $(m, O(h({}, d), { link: !0, pure: !1 }))
    let P = c.filter((s) => s.workspace).map((s) => s.name)
    yield $(P, O(h({}, d), { workspace: !0, pure: !1 }))
    let l = c.filter((s) => s.link).map((s) => s.name)
    yield $(l, O(h({}, d), { linkDep: !0, pure: !1 }))
    let i = c.filter((s) => s.pure).map((s) => s.name)
    return (
      yield $(i, O(h({}, d), { pure: !0 })),
      n.noInstallationsRemove || (yield W(r)),
      r
    )
  })
var Qe = v(require('fs-extra'), 1),
  be = require('child_process'),
  Xe = v(require('path'), 1),
  Ze = require('path')
var ze = 'git diff --cached --name-only',
  Hn = (e) => Xe.basename(e) === 'package.json'
function ve(e) {
  let n = (o) => {
    let r = Qe.readJSONSync(o),
      c = new RegExp(`^(file|link):(.\\/)?\\${w.yalcPackagesFolder}\\/`),
      k = (m) => Object.keys(m).filter((P) => m[P].match(c))
    return k(r.dependencies || {}).concat(k(r.devDependencies || {}))
  }
  e.commit &&
    ((0, be.execSync)(ze, h({ cwd: e.workingDir }, N))
      .toString()
      .trim(),
    (0, be.execSync)(ze, h({ cwd: e.workingDir }, N))
      .toString()
      .trim()
      .split(
        `
`
      )
      .filter(Hn))
  let a = (0, Ze.join)(e.workingDir, 'package.json'),
    t = n(a)
  t.length && (console.info('Yalc dependencies found:', t), process.exit(1))
}
var E = v(require('fs-extra'), 1),
  Z = require('path')
var Jn = (e, n) =>
    new RegExp('file|link:' + w.yalcPackagesFolder + '/' + n).test(e),
  en = (e) => {
    let n = E.existsSync(e) && !E.readdirSync(e).length
    return n && E.removeSync(e), n
  },
  le = (e, n) =>
    u(void 0, null, function* () {
      let { workingDir: a } = n,
        t = U({ workingDir: a }),
        o = L(a)
      if (!o) return
      let r = []
      e.length
        ? e.forEach((i) => {
            let { name: s, version: g } = K(i)
            t.packages[s]
              ? (!g || g === t.packages[s].version) && r.push(s)
              : (console.warn(
                  `Package ${i} not found in ${w.lockfileName}, still will try to remove.`
                ),
                r.push(s))
          })
        : n.all
        ? (r = Object.keys(t.packages))
        : console.info('Use --all option to remove all packages.')
      let c = !1,
        k = []
      r.forEach((i) => {
        let s = t.packages[i],
          g
        o.dependencies && o.dependencies[i] && (g = o.dependencies),
          o.devDependencies && o.devDependencies[i] && (g = o.devDependencies),
          g &&
            Jn(g[i], i) &&
            (k.push(i), s && s.replaced ? (g[i] = s.replaced) : delete g[i]),
          n.retreat
            ? console.log(`Retreating package ${i} version ==>`, s.replaced)
            : ((c = !0), delete t.packages[i])
      }),
        c && Pe(t, { workingDir: a }),
        k.length && H(a, o)
      let d = r.map((i) => ({ name: i, version: '', path: a })),
        m = (0, Z.join)(a, w.yalcPackagesFolder)
      k.forEach((i) => {
        E.removeSync((0, Z.join)(a, 'node_modules', i))
      }),
        r.forEach((i) => {
          n.retreat || E.removeSync((0, Z.join)(m, i))
        })
      let P = (i) => i.startsWith('@')
      r
        .filter(P)
        .map((i) => i.split('/')[0])
        .map((i) => (0, Z.join)(m, i))
        .map(en),
        !Object.keys(t.packages).length &&
          !n.retreat &&
          (Te({ workingDir: a }),
          en(m) || console.warn(m, 'is not empty, not removing it.')),
        n.retreat || (yield W(d))
    })
var cn = require('child_process'),
  D = v(require('fs-extra'), 1),
  I = require('path')
var on = v(require('glob'), 1),
  rn = v(require('util'), 1),
  T = require('path'),
  V = v(require('fs-extra'), 1)
var nn = parseInt(process.versions.node.split('.').shift(), 10)
nn >= 8 &&
  nn < 10 &&
  (Symbol.asyncIterator =
    Symbol.asyncIterator || Symbol('Symbol.asyncIterator'))
var an = rn.default.promisify(on.default),
  ee = {},
  tn = (e) => e.reduce((n, a) => ((n[a] = !0), n), {}),
  Bn = (e, n) => e.mtime.getTime() === n.mtime.getTime() && e.size === n.size,
  De = (e, n, a = !0) =>
    u(void 0, null, function* () {
      let t = '**/node_modules/**',
        c = ee[e]
          ? ee[e].glob
          : yield an('**', { cwd: e, ignore: t, dot: !0, nodir: !1 }),
        k = yield an('**', { cwd: n, ignore: t, dot: !0, nodir: !1 }),
        d = tn(c),
        m = tn(k),
        P = c.filter((p) => !m[p]),
        l = k.filter((p) => !d[p]),
        i = c.filter((p) => m[p])
      ee[e] = ee[e] || { files: {}, glob: c }
      let s = [],
        g = ee[e].files,
        f = {},
        ke = (yield Promise.all(
          i.map((p) =>
            u(void 0, null, function* () {
              var C
              let b = (0, T.resolve)(e, p),
                x = (0, T.resolve)(n, p),
                S =
                  ((C = g[p]) == null ? void 0 : C.stat) ||
                  (yield V.default.stat(b))
              g[p] = g[p] || { stat: S, hash: '' }
              let R = yield V.default.stat(x)
              return {
                file: p,
                srcFileStat: S,
                destFileStat: R,
                srcFilePath: b,
                destFilePath: x,
              }
            })
          )
        )).map((C) =>
          u(void 0, [C], function* ({
            file: p,
            srcFileStat: b,
            destFileStat: x,
            srcFilePath: S,
            destFilePath: R,
          }) {
            let ae = b.isDirectory() && x.isDirectory()
            f[p] = x.isDirectory()
            let ue = b.isDirectory() && !x.isDirectory(),
              Me = !b.isDirectory() && x.isDirectory()
            ;(Me || ue) && l.push(p)
            let wn = () =>
              u(void 0, null, function* () {
                let Ce = g[p].hash || (yield z(S, ''))
                g[p].hash = Ce
                let bn = yield z(R, '')
                return Ce === bn
              })
            ;(Me || (!ae && !Bn(b, x) && (!a || !(yield wn())))) && s.push(p)
          })
        )
      yield Promise.all(ke),
        yield Promise.all(
          l
            .filter((p) => !f[p])
            .map((p) => V.default.remove((0, T.resolve)(n, p)))
        ),
        yield Promise.all(
          l
            .filter((p) => f[p])
            .map((p) => V.default.remove((0, T.resolve)(n, p)))
        )
      let F = yield Promise.all(
        P.map((p) =>
          V.default.stat((0, T.resolve)(e, p)).then((b) => b.isDirectory())
        )
      )
      yield Promise.all(
        P.filter((p, b) => !F[b])
          .concat(s)
          .map((p) =>
            V.default.copy((0, T.resolve)(e, p), (0, T.resolve)(n, p))
          )
      )
    })
var sn = D.ensureSymlinkSync,
  Yn = (e) => {
    let n = pe(e)
    return (
      D.readdirSync(n)
        .map((o) => ({
          version: o,
          created: D.statSync((0, I.join)(n, o)).ctime.getTime(),
        }))
        .sort((o, r) => r.created - o.created)
        .map((o) => o.version)[0] || ''
    )
  },
  qn = (e) => {
    try {
      return !!D.readlinkSync(e)
    } catch (n) {
      return !1
    }
  },
  Kn = (e) => D.existsSync((0, I.join)(e, 'pnpm-workspace.yaml')),
  $ = (e, n) =>
    u(void 0, null, function* () {
      if (!e.length) return
      let a = n.workingDir,
        t = L(a),
        o = !1
      if (!t) return
      let r = X(a),
        c = (l) => {
          var s
          let i = (s = t.scripts) == null ? void 0 : s[l]
          i &&
            (console.log(`Running ${l} script: ${i}`),
            (0, cn.execSync)(`${ie[r]} ${l}`, h({ cwd: a }, N)))
        },
        k = !1,
        d = n.pure === !1 ? !1 : n.pure || !!t.workspaces || (k = Kn(a))
      c('preyalc')
      let m = e.map((l) =>
          u(void 0, null, function* () {
            c('preyalc.' + l)
            let { name: i, version: s = '' } = K(l)
            i || console.warn('Could not parse package name', l)
            let g = (0, I.join)(a, w.yalcPackagesFolder, i)
            if (n.restore) {
              if (
                (console.log(`Restoring package \`${l}\` from .yalc directory`),
                !D.existsSync(g))
              )
                return (
                  console.warn(
                    `Could not find package \`${l}\` ` + g,
                    ', skipping.'
                  ),
                  null
                )
            } else {
              let F = pe(i)
              if (!D.existsSync(F))
                return (
                  console.warn(
                    `Could not find package \`${i}\` in store (${F}), skipping.`
                  ),
                  null
                )
              let p = s || Yn(i),
                b = pe(i, p)
              if (!D.existsSync(b))
                return (
                  console.warn(
                    `Could not find package \`${l}\` ` + b,
                    ', skipping.'
                  ),
                  null
                )
              yield De(b, g, !n.replace)
            }
            let f = L(g)
            if (!f) return null
            let y = ''
            if (d) {
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
                `${f.name}@${f.version} added to ${(0, I.join)(
                  w.yalcPackagesFolder,
                  i
                )} purely`
              )
            }
            if (!d) {
              let F = (0, I.join)(a, 'node_modules', i)
              if (
                ((n.link || n.linkDep || qn(F)) && D.removeSync(F),
                n.link || n.linkDep
                  ? sn(g, F, 'junction')
                  : yield De(g, F, !n.replace),
                !n.link)
              ) {
                let b = n.linkDep ? 'link:' : 'file:',
                  x = n.workspace
                    ? 'workspace:*'
                    : b + w.yalcPackagesFolder + '/' + f.name,
                  S = t.dependencies || {},
                  R = t.devDependencies || {},
                  C = n.dev ? R : S
                n.dev
                  ? S[f.name] && ((y = S[f.name]), delete S[f.name])
                  : S[f.name] || (R[f.name] && (C = R)),
                  C[f.name] !== x &&
                    ((y = y || C[f.name]),
                    (C[f.name] = x),
                    (t.dependencies = C === S ? S : t.dependencies),
                    (t.devDependencies = C === R ? R : t.devDependencies),
                    (o = !0)),
                  (y = y == x ? '' : y)
              }
              if (f.bin && (n.link || n.linkDep)) {
                let b = (0, I.join)(a, 'node_modules', '.bin'),
                  x = (S, R) => {
                    let C = (0, I.join)(g, S),
                      ae = (0, I.join)(b, R)
                    console.log(
                      'Linking bin script:',
                      (0, I.relative)(a, g),
                      '->',
                      (0, I.relative)(a, ae)
                    )
                    try {
                      sn(C, ae), D.chmodSync(C, 493)
                    } catch (ue) {
                      console.warn('Could not create bin symlink.'),
                        console.error(ue)
                    }
                  }
                if (typeof f.bin == 'string')
                  D.ensureDirSync(b), x(f.bin, f.name)
                else if (typeof f.bin == 'object') {
                  D.ensureDirSync(b)
                  for (let S in f.bin) x(f.bin[S], S)
                }
              }
              let p = n.link ? 'linked' : 'added'
              console.log(`Package ${f.name}@${f.version} ${p} ==> ${F}`)
            }
            let ke = oe(g)
            return (
              c('postyalc.' + l),
              {
                signature: ke,
                name: i,
                version: s,
                replaced: y,
                path: n.workingDir,
              }
            )
          })
        ),
        P = (yield Promise.all(m)).filter((l) => !!l).map((l) => l)
      o && H(a, t),
        _e(
          P.map((l) => ({
            name: l.name,
            version: l.version,
            replaced: l.replaced,
            pure: d,
            workspace: n.workspace,
            file: n.workspace ? void 0 : !n.link && !n.linkDep && !d,
            link: n.linkDep && !d,
            signature: l.signature,
          })),
          { workingDir: n.workingDir }
        ),
        c('postyalc'),
        yield Ve(P),
        n.update && qe(n.workingDir, e)
    })
var ge = v(require('fs-extra'), 1),
  Se = require('path'),
  pn = v(require('detect-indent'), 1),
  K = (e) => {
    let n = e.match(/(^@[^/]+\/)?([^@]+)@?(.*)/) || []
    return n
      ? { name: (n[1] || '') + n[2], version: n[3] || '' }
      : { name: '', version: '' }
  },
  Gn = (e) => (0, pn.default)(e).indent
function L(e) {
  let n,
    a = (0, Se.join)(e, 'package.json')
  try {
    let t = ge.readFileSync(a, 'utf-8')
    if (((n = JSON.parse(t)), !n.name && n.version))
      return (
        console.log('Package manifest', a, 'should contain name and version.'),
        null
      )
    let o = Gn(t) || '  '
    return (n.__Indent = o), n
  } catch (t) {
    return console.error('Could not read', a), null
  }
}
var ln = (e) =>
  Object.keys(e)
    .sort()
    .reduce((n, a) => Object.assign(n, { [a]: e[a] }), {})
function H(e, n) {
  ;(n = Object.assign({}, n)),
    n.dependencies && (n.dependencies = ln(n.dependencies)),
    n.devDependencies && (n.devDependencies = ln(n.devDependencies))
  let a = n.__Indent
  delete n.__Indent
  let t = (0, Se.join)(e, 'package.json')
  try {
    ge.writeFileSync(
      t,
      JSON.stringify(n, null, a) +
        `
`
    )
  } catch (o) {
    console.error('Could not write ', t)
  }
}
var zn = (0, gn.homedir)(),
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
  G = global
function Y() {
  return G.yalcStoreMainDir
    ? G.yalcStoreMainDir
    : process.platform === 'win32' && process.env.LOCALAPPDATA
    ? (0, _.join)(process.env.LOCALAPPDATA, w.myNameIsCapitalized)
    : (0, _.join)(zn, '.' + w.myNameIs)
}
function Q() {
  return (0, _.join)(Y(), 'packages')
}
var pe = (e, n = '') => (0, _.join)(Q(), e, n),
  N = { stdio: 'inherit' },
  dn = 'yalc.sig',
  oe = (e) => {
    let n = (0, _.join)(e, dn)
    try {
      return ne.readFileSync(n, 'utf-8')
    } catch (a) {
      return ''
    }
  },
  je = (e) => {
    let n = (0, _.join)(e, w.ignoreFileName)
    try {
      return ne.readFileSync(n, 'utf-8')
    } catch (a) {
      return ''
    }
  },
  Ee = (e, n) => {
    let a = (0, _.join)(e, dn)
    try {
      ne.writeFileSync(a, n)
    } catch (t) {
      throw (console.error('Could not write signature file'), t)
    }
  }
var de = v(require('chalk'), 1),
  mn = ({ output: e, methods: n }) => {
    let a = {}
    n.forEach((t) => {
      let o = t
      typeof console[o] == 'function' &&
        ((a[o] = console[o]),
        (console[o] = (...r) => {
          e({ method: o, args: r, oldMethods: a })
        }))
    })
  },
  fn = () => {
    mn({ methods: ['log', 'warn', 'info'], output: () => {} })
  },
  kn = () => {
    mn({
      methods: ['log', 'warn', 'error', 'info'],
      output: ({ method: e, args: n, oldMethods: a }) => {
        let o =
          {
            warn: de.default.yellowBright,
            info: de.default.blueBright,
            error: de.default.redBright,
          }[e] || ((r) => r)
        a[e](...n.map((r) => (typeof r == 'string' ? o(r) : r)))
      },
    })
  }
var xe = v(require('fs'), 1)
var Qn = require('ini'),
  un = ['sig', 'workspace-resolve', 'dev-mod', 'scripts', 'quiet', 'files'],
  Fe = '.yalcrc',
  Xn = () =>
    xe.default.existsSync(Fe)
      ? Qn.parse(xe.default.readFileSync(Fe, 'utf-8'))
      : null,
  yn = () => {
    let e = Xn()
    if (!e) return {}
    let n = Object.keys(e).filter((a) => !un.includes(a))
    return (
      n.length &&
        (console.warn(`Unknown option in ${Fe}: ${n[0]}`), process.exit()),
      Object.keys(e).reduce(
        (a, t) => (un.includes(t) ? O(h({}, a), { [t]: e[t] }) : a),
        {}
      )
    )
  }
var me = ['update', 'upgrade', 'up'],
  hn = ['scripts', 'sig', 'dev-mod', 'changed', 'files', ...me],
  Zn = w.myNameIs,
  ea = () => require(__dirname + '/../package.json').version
kn()
var A = yn()
;(process.argv.includes('--quiet') || A.quiet) && fn()
var Pn = (e, n = {}) => {
  let a = e._[1]
  return h(
    {
      workingDir: (0, fe.join)(process.cwd(), a || ''),
      push: e.push,
      replace: e.replace,
      signature: e.sig,
      changed: e.changed,
      content: e.content,
      private: e.private,
      scripts: e.scripts,
      update: e.update || e.upgrade,
      workspaceResolve: e.workspaceResolve,
      devMod: e.devMod,
    },
    n
  )
}
M.default
  .usage(Zn + ' [command] [options] [package1 [package2...]]')
  .coerce('store-folder', function (e) {
    G.yalcStoreMainDir ||
      ((G.yalcStoreMainDir = (0, fe.resolve)(e)),
      console.log('Package store folder used:', G.yalcStoreMainDir))
  })
  .command({
    command: '*',
    builder: () => M.default.boolean(['version']),
    handler: (e) => {
      let n = 'Use `yalc help` to see available commands.'
      e._[0]
        ? (n = 'Unknown command `' + e._[0] + '`. ' + n)
        : e.version && (n = ea()),
        console.log(n)
    },
  })
  .command({
    command: 'publish',
    describe: 'Publish package in yalc local repo',
    builder: () =>
      M.default
        .default('sig', !1)
        .default('scripts', !0)
        .default('dev-mod', !0)
        .default('workspace-resolve', !0)
        .default(A)
        .alias('script', 'scripts')
        .boolean(['push'].concat(hn)),
    handler: (e) => ce(Pn(e)),
  })
  .command({
    command: 'push',
    describe:
      'Publish package in yalc local repo and push to all installations',
    builder: () =>
      M.default
        .default('sig', !1)
        .default('scripts', !1)
        .default('dev-mod', !0)
        .default('workspace-resolve', !0)
        .default(A)
        .alias('script', 'scripts')
        .boolean(['safe'].concat(hn))
        .option('replace', { describe: 'Force package content replacement' }),
    handler: (e) => ce(Pn(e, { push: !0 })),
  })
  .command({
    command: 'installations',
    describe: 'Work with installations file: show/clean',
    builder: () => M.default.boolean(['dry']),
    handler: (e) =>
      u(void 0, null, function* () {
        let n = e._[1],
          a = e._.slice(2)
        switch (n) {
          case 'show':
            Ae({ packages: a })
            break
          case 'clean':
            yield Ue({ packages: a, dry: e.dry })
            break
          default:
            console.info('Need installation action: show | clean')
        }
      }),
  })
  .command({
    command: 'add',
    describe: 'Add package from yalc repo to the project',
    builder: () =>
      M.default
        .boolean(['file', 'dev', 'link', ...me])
        .alias('D', 'dev')
        .boolean('workspace')
        .alias('save-dev', 'dev')
        .alias('workspace', 'W')
        .default(A)
        .help(!0),
    handler: (e) =>
      $(e._.slice(1), {
        dev: e.dev,
        linkDep: e.link,
        restore: e.restore,
        pure: e.pure,
        workspace: e.workspace,
        update: e.update || e.upgrade,
        workingDir: process.cwd(),
      }),
  })
  .command({
    command: 'link',
    describe: 'Link package from yalc repo to the project',
    builder: () => M.default.default(A).help(!0),
    handler: (e) =>
      $(e._.slice(1), { link: !0, pure: e.pure, workingDir: process.cwd() }),
  })
  .command({
    command: 'update',
    describe: 'Update packages from yalc repo',
    builder: () =>
      M.default
        .boolean([...me])
        .default(A)
        .help(!0),
    handler: (e) =>
      q(e._.slice(1), {
        update: e.update || e.upgrade,
        restore: e.restore,
        workingDir: process.cwd(),
      }),
  })
  .command({
    command: 'restore',
    describe: 'Restore retreated packages',
    builder: () =>
      M.default
        .boolean([...me])
        .default(A)
        .help(!0),
    handler: (e) =>
      q(e._.slice(1), {
        update: e.update || e.upgrade,
        restore: !0,
        workingDir: process.cwd(),
      }),
  })
  .command({
    command: 'remove',
    describe: 'Remove packages from the project',
    builder: () => M.default.boolean(['retreat', 'all']).default(A).help(!0),
    handler: (e) =>
      le(e._.slice(1), {
        retreat: e.retreat,
        workingDir: process.cwd(),
        all: e.all,
      }),
  })
  .command({
    command: 'retreat',
    describe:
      'Remove packages from project, but leave in lock file (to be restored later)',
    builder: () => M.default.boolean(['all']).help(!0),
    handler: (e) =>
      le(e._.slice(1), { all: e.all, retreat: !0, workingDir: process.cwd() }),
  })
  .command({
    command: 'check',
    describe: 'Check package.json for yalc packages',
    builder: () =>
      M.default.boolean(['commit']).usage('check usage here').help(!0),
    handler: (e) => {
      let n = process.env.GIT_PARAMS
      e.commit && console.log('gitParams', n),
        ve({ commit: e.commit, all: e.all, workingDir: process.cwd() })
    },
  })
  .command({
    command: 'dir',
    describe: 'Show yalc system directory',
    handler: () => {
      console.log(Y())
    },
  })
  .help('help').argv
