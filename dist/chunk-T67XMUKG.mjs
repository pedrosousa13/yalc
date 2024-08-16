import { a as V, b as L, c as z, d as qe } from './chunk-HPX726V2.mjs'
import { a as w, b as O, c as ue, d as M, f as P } from './chunk-3WPUBFY6.mjs'
import * as H from 'fs-extra'
import { join as ce } from 'path'
var Qe,
  Xe,
  Ze,
  ye,
  T,
  le,
  Pe,
  _ = M(() => {
    I()
    ;(Qe = (e) => (e.version == 'v1' && e.packages ? 'v1' : 'v0')),
      (Xe = { v0: (e) => ({ version: 'v1', packages: e }), v1: (e) => e }),
      (Ze = (e) => {
        let a = Qe(e)
        return Xe[a](e)
      }),
      (ye = (e) => {
        let a = ce(e.workingDir, v.lockfileName)
        H.removeSync(a)
      }),
      (T = (e) => {
        let a = ce(e.workingDir, v.lockfileName),
          t = { version: 'v1', packages: {} }
        try {
          t = Ze(H.readJSONSync(a))
        } catch (n) {
          return t
        }
        return t
      }),
      (le = (e, a) => {
        let t = ce(a.workingDir, v.lockfileName),
          n = JSON.stringify(e, null, 2)
        H.writeFileSync(t, n)
      }),
      (Pe = (e, a) => {
        let t = T(a)
        e.forEach(
          ({
            name: n,
            version: o,
            file: r,
            link: l,
            replaced: k,
            signature: d,
            pure: m,
            workspace: u,
          }) => {
            let c = t.packages[n] || {}
            ;(t.packages[n] = {}),
              o && (t.packages[n].version = o),
              d && (t.packages[n].signature = d),
              r && (t.packages[n].file = !0),
              l && (t.packages[n].link = !0),
              m && (t.packages[n].pure = !0),
              u && (t.packages[n].workspace = !0),
              (k || c.replaced) && (t.packages[n].replaced = k || c.replaced)
          }
        ),
          le(t, a)
      })
  })
import pe from 'fs-extra'
import he from 'path'
var Y,
  Ua,
  Va,
  we,
  ve,
  j,
  J = M(() => {
    I()
    _()
    ;(Y = () => {
      let e = ae(),
        a = he.join(e, v.installationsFile),
        t
      try {
        pe.accessSync(a)
        try {
          t = pe.readJsonSync(a)
        } catch (n) {
          console.error('Error reading installations file', a, n), (t = {})
        }
      } catch (n) {
        t = {}
      }
      return t
    }),
      (Ua = ({ packages: e }) => {
        let a = Y()
        Object.keys(a)
          .filter((t) => (e.length ? e.indexOf(t) >= 0 : !0))
          .map((t) => ({ name: t, locations: a[t] }))
          .forEach(({ name: t, locations: n }) => {
            console.log(`Installations of package ${t}:`),
              n.forEach((o) => {
                console.log(`  ${o}`)
              })
          })
      }),
      (Va = (t) =>
        P(void 0, [t], function* ({ packages: e, dry: a }) {
          let n = Y(),
            o = Object.keys(n)
              .filter((r) => (e.length ? e.indexOf(r) >= 0 : !0))
              .map((r) => ({ name: r, locations: n[r] }))
              .reduce(
                (r, { name: l, locations: k }) =>
                  k.reduce((d, m) => {
                    let u = T({ workingDir: m })
                    return Object.keys(u.packages).indexOf(l) < 0
                      ? d.concat([{ name: l, path: m }])
                      : d
                  }, r),
                []
              )
          o.length &&
            (console.info('Installations clean up:'),
            a
              ? (o.forEach((r) => {
                  console.log(`Installation to remove: ${r.name} in ${r.path}`)
                }),
                console.warn('Dry run.'))
              : yield j(o))
        })),
      (we = (e) =>
        P(void 0, null, function* () {
          let a = ae(),
            t = he.join(a, v.installationsFile),
            n = JSON.stringify(e, null, 2)
          return pe.writeFile(t, n)
        })),
      (ve = (e) =>
        P(void 0, null, function* () {
          let a = Y(),
            t = !1
          e.forEach((n) => {
            let o = a[n.name] || []
            ;(a[n.name] = o),
              !!o.filter((l) => l === n.path)[0] || ((t = !0), o.push(n.path))
          }),
            t && (yield we(a))
        })),
      (j = (e) =>
        P(void 0, null, function* () {
          let a = Y(),
            t = !1
          e.forEach((n) => {
            let o = a[n.name] || []
            console.log(`Removing installation of ${n.name} in ${n.path}`)
            let r = o.indexOf(n.path)
            r >= 0 && (o.splice(r, 1), (t = !0)), o.length || delete a[n.name]
          }),
            t && (yield we(a))
        }))
  })
import { execSync as ea } from 'child_process'
import * as De from 'fs-extra'
import { join as aa } from 'path'
var Se,
  xe,
  ta,
  te,
  na,
  R,
  Ba,
  Ga,
  oa,
  qa,
  be,
  ne = M(() => {
    I()
    ;(Se = {
      pnpm: ['pnpm-lock.yaml'],
      yarn: ['yarn.lock'],
      npm: ['package-lock.json'],
    }),
      (xe = { pnpm: 'pnpm install', yarn: 'yarn', npm: 'npm install' }),
      (ta = { pnpm: 'pnpm update', yarn: 'yarn upgrade', npm: 'npm update' }),
      (te = { pnpm: 'pnpm', yarn: 'yarn', npm: 'npm run' }),
      (na = 'npm'),
      (R = (e) =>
        Object.keys(Se).reduce(
          (t, n) =>
            t ||
            (Se[n].reduce((o, r) => o || (De.existsSync(aa(e, r)) && n), !1) &&
              n),
          !1
        ) || na),
      (Ba = (e) => xe[R(e)]),
      (Ga = (e) => xe[R(e)]),
      (oa = (e) => ta[R(e)]),
      (qa = (e) => R(e) === 'yarn'),
      (be = (e, a) => {
        let t = [oa(e), ...a].join(' ')
        console.log(`Running ${t} in ${e}`), ea(t, w({ cwd: e }, $))
      })
  })
import { execSync as sa } from 'child_process'
import { join as ra } from 'path'
var ia,
  Ce = M(() => {
    I()
    ge()
    J()
    ne()
    ia = (e) =>
      P(void 0, null, function* () {
        let a = e.workingDir,
          t = L(a)
        if (!t) return
        let n = R(a)
        console.log('Run PM script')
        let o = (u) => {
          var i
          if (!e.scripts) return
          let c = (i = t.scripts) == null ? void 0 : i[u]
          c &&
            (console.log(`Running ${u} script: ${c}`),
            sa(`${te[n]} ${u}`, w({ cwd: a }, $)))
        }
        if (t.private && !e.private) {
          console.log(
            'Will not publish package with `private: true` use --private flag to force publishing.'
          )
          return
        }
        console.log('run pre scripts'),
          [
            'prepublish',
            'prepare',
            'prepublishOnly',
            'prepack',
            'preyalcpublish',
          ].forEach(o),
          console.log('Copy package to store')
        let l = yield Fe(e)
        if (e.changed && !l) {
          console.warn('Package content has not changed, skipping publishing.')
          return
        }
        console.log('Post scripts'),
          ['postyalcpublish', 'postpack', 'publish', 'postpublish'].forEach(o)
        let d = ra(B(), t.name, t.version),
          m = L(d)
        if (
          (console.log(`${m.name}@${m.version} published in store.`),
          console.log({ publishedPkg: m }),
          e.push)
        ) {
          let u = Y()
          console.log({ installationsConfig: u })
          let c = u[t.name] || []
          console.log({ installationPaths: c })
          let i = []
          for (let s of c) {
            console.info(`Pushing ${t.name}@${t.version} in ${s}`)
            let p = yield fe([t.name], {
              replace: e.replace,
              workingDir: s,
              update: e.update,
              noInstallationsRemove: !0,
            })
            i.push(...p)
          }
          yield j(i)
        }
      })
  })
var fe,
  Me = M(() => {
    I()
    J()
    _()
    fe = (e, a) =>
      P(void 0, null, function* () {
        let { workingDir: t } = a
        console.log('update')
        let n = T({ workingDir: t }),
          o = [],
          r = []
        console.log({ packages: e }),
          e.length
            ? e.forEach((s) => {
                let { name: p, version: f } = V(s)
                n.packages[p]
                  ? (f && (n.packages[p].version = f), o.push(p))
                  : (r.push({ name: p, path: a.workingDir }),
                    console.warn(
                      `Did not find package ${p} in lockfile, please use 'add' command to add it explicitly.`
                    ))
              })
            : (o = Object.keys(n.packages)),
          console.log({ packagesToUpdate: o })
        let l = o.map((s) => ({
          name: n.packages[s].version ? s + '@' + n.packages[s].version : s,
          file: n.packages[s].file,
          link: n.packages[s].link,
          pure: n.packages[s].pure,
          workspace: n.packages[s].workspace,
        }))
        console.log({ lockPackages: l })
        let k = l.filter((s) => s.file).map((s) => s.name)
        console.log({ packagesFiles: k })
        let d = {
          workingDir: a.workingDir,
          replace: a.replace,
          update: a.update,
          restore: a.restore,
        }
        console.log('add packages 1'),
          console.log({ addOpts: d }),
          yield A(k, w({}, d))
        let m = l
          .filter((s) => !s.file && !s.link && !s.pure && !s.workspace)
          .map((s) => s.name)
        console.log({ packagesLinks: m }),
          yield A(m, O(w({}, d), { link: !0, pure: !1 }))
        let u = l.filter((s) => s.workspace).map((s) => s.name)
        console.log({ packagesWks: u }),
          yield A(u, O(w({}, d), { workspace: !0, pure: !1 }))
        let c = l.filter((s) => s.link).map((s) => s.name)
        console.log({ packagesLinkDep: c }),
          yield A(c, O(w({}, d), { linkDep: !0, pure: !1 }))
        let i = l.filter((s) => s.pure).map((s) => s.name)
        return (
          console.log({ packagesPure: i }),
          yield A(i, O(w({}, d), { pure: !0 })),
          a.noInstallationsRemove || (yield j(r)),
          r
        )
      })
  })
import * as Oe from 'fs-extra'
import { execSync as Le } from 'child_process'
import * as $e from 'path'
import { join as ca } from 'path'
function pa(e) {
  let a = (o) => {
    let r = Oe.readJSONSync(o),
      l = new RegExp(`^(file|link):(.\\/)?\\${v.yalcPackagesFolder}\\/`),
      k = (m) => Object.keys(m).filter((u) => m[u].match(l))
    return k(r.dependencies || {}).concat(k(r.devDependencies || {}))
  }
  e.commit &&
    (Le(Ie, w({ cwd: e.workingDir }, $))
      .toString()
      .trim(),
    Le(Ie, w({ cwd: e.workingDir }, $))
      .toString()
      .trim()
      .split(
        `
`
      )
      .filter(la))
  let t = ca(e.workingDir, 'package.json'),
    n = a(t)
  n.length && (console.info('Yalc dependencies found:', n), process.exit(1))
}
var Ie,
  la,
  Re = M(() => {
    I()
    ;(Ie = 'git diff --cached --name-only'),
      (la = (e) => $e.basename(e) === 'package.json')
  })
import * as E from 'fs-extra'
import { join as oe } from 'path'
var ga,
  Ee,
  fa,
  Ne = M(() => {
    J()
    _()
    I()
    ;(ga = (e, a) =>
      new RegExp('file|link:' + v.yalcPackagesFolder + '/' + a).test(e)),
      (Ee = (e) => {
        let a = E.existsSync(e) && !E.readdirSync(e).length
        return a && E.removeSync(e), a
      }),
      (fa = (e, a) =>
        P(void 0, null, function* () {
          let { workingDir: t } = a,
            n = T({ workingDir: t }),
            o = L(t)
          if (!o) return
          let r = []
          e.length
            ? e.forEach((i) => {
                let { name: s, version: p } = V(i)
                n.packages[s]
                  ? (!p || p === n.packages[s].version) && r.push(s)
                  : (console.warn(
                      `Package ${i} not found in ${v.lockfileName}, still will try to remove.`
                    ),
                    r.push(s))
              })
            : a.all
            ? (r = Object.keys(n.packages))
            : console.info('Use --all option to remove all packages.')
          let l = !1,
            k = []
          r.forEach((i) => {
            let s = n.packages[i],
              p
            o.dependencies && o.dependencies[i] && (p = o.dependencies),
              o.devDependencies &&
                o.devDependencies[i] &&
                (p = o.devDependencies),
              p &&
                ga(p[i], i) &&
                (k.push(i),
                s && s.replaced ? (p[i] = s.replaced) : delete p[i]),
              a.retreat
                ? console.log(`Retreating package ${i} version ==>`, s.replaced)
                : ((l = !0), delete n.packages[i])
          }),
            l && le(n, { workingDir: t }),
            k.length && z(t, o)
          let d = r.map((i) => ({ name: i, version: '', path: t })),
            m = oe(t, v.yalcPackagesFolder)
          k.forEach((i) => {
            E.removeSync(oe(t, 'node_modules', i))
          }),
            r.forEach((i) => {
              a.retreat || E.removeSync(oe(m, i))
            })
          let u = (i) => i.startsWith('@')
          r
            .filter(u)
            .map((i) => i.split('/')[0])
            .map((i) => oe(m, i))
            .map(Ee),
            !Object.keys(n.packages).length &&
              !a.retreat &&
              (ye({ workingDir: t }),
              Ee(m) || console.warn(m, 'is not empty, not removing it.')),
            a.retreat || (yield j(d))
        }))
  })
import ma from 'glob'
import ka from 'util'
import { resolve as W } from 'path'
import K from 'fs-extra'
import Ae from 'tar'
var Te,
  G,
  je,
  da,
  ua,
  me,
  We = M(() => {
    ge()
    ;(Te = ka.promisify(ma)),
      (G = {}),
      (je = (e) => e.reduce((a, t) => ((a[t] = !0), a), {})),
      (da = (e, a) =>
        e.mtime.getTime() === a.mtime.getTime() && e.size === a.size),
      (ua = (e, a, t) =>
        P(void 0, null, function* () {
          yield Ae.c({ gzip: !0, file: t, cwd: e }, a)
        })),
      (me = (e, a, t = !0) =>
        P(void 0, null, function* () {
          let n = '**/node_modules/**',
            l = G[e]
              ? G[e].glob
              : yield Te('**', { cwd: e, ignore: n, dot: !0, nodir: !1 }),
            k = yield Te('**', { cwd: a, ignore: n, dot: !0, nodir: !1 }),
            d = je(l),
            m = je(k),
            u = l.filter((g) => !m[g]),
            c = k.filter((g) => !d[g]),
            i = l.filter((g) => m[g])
          G[e] = G[e] || { files: {}, glob: l }
          let s = [],
            p = G[e].files,
            f = {},
            y = yield Promise.all(
              i.map((g) =>
                P(void 0, null, function* () {
                  var F
                  let h = W(e, g),
                    b = W(a, g),
                    D =
                      ((F = p[g]) == null ? void 0 : F.stat) ||
                      (yield K.stat(h))
                  p[g] = p[g] || { stat: D, hash: '' }
                  let C = yield K.stat(b)
                  return {
                    file: g,
                    srcFileStat: D,
                    destFileStat: C,
                    srcFilePath: h,
                    destFilePath: b,
                  }
                })
              )
            )
          for (let {
            file: g,
            srcFileStat: h,
            destFileStat: b,
            srcFilePath: D,
            destFilePath: C,
          } of y) {
            let F = h.isDirectory() && b.isDirectory()
            f[g] = b.isDirectory()
            let Z = h.isDirectory() && !b.isDirectory(),
              ee = !h.isDirectory() && b.isDirectory()
            ;(ee || Z) && c.push(g)
            let Be = () =>
              P(void 0, null, function* () {
                let de = p[g].hash || (yield q(D, ''))
                p[g].hash = de
                let Ge = yield q(C, '')
                return de === Ge
              })
            ;(ee || (!F && !da(h, b) && (!t || !(yield Be())))) && s.push(g)
          }
          yield Promise.all(
            c.filter((g) => !f[g]).map((g) => K.remove(W(a, g)))
          ),
            yield Promise.all(
              c.filter((g) => f[g]).map((g) => K.remove(W(a, g)))
            )
          let ie = yield Promise.all(
              u.map((g) => K.stat(W(e, g)).then((h) => h.isDirectory()))
            ),
            x = W(a, 'newFiles.tgz')
          yield ua(e, u.filter((g, h) => !ie[h]).concat(s), x),
            yield K.copy(x, W(a, 'newFiles.tgz')),
            yield Ae.x({ file: x, cwd: a })
        }))
  })
import { execSync as ya } from 'child_process'
import * as S from 'fs-extra'
import { join as N, relative as Ue } from 'path'
var Ve,
  Pa,
  ha,
  wa,
  A,
  ze = M(() => {
    I()
    J()
    _()
    ne()
    We()
    ;(Ve = S.ensureSymlinkSync),
      (Pa = (e) => {
        let a = se(e)
        return (
          S.readdirSync(a)
            .map((o) => ({
              version: o,
              created: S.statSync(N(a, o)).ctime.getTime(),
            }))
            .sort((o, r) => r.created - o.created)
            .map((o) => o.version)[0] || ''
        )
      }),
      (ha = (e) => {
        try {
          return !!S.readlinkSync(e)
        } catch (a) {
          return !1
        }
      }),
      (wa = (e) => S.existsSync(N(e, 'pnpm-workspace.yaml'))),
      (A = (e, a) =>
        P(void 0, null, function* () {
          if (!e.length) return
          let t = a.workingDir,
            n = L(t),
            o = !1
          if (!n) return
          let r = R(t),
            l = (c) => {
              var s
              let i = (s = n.scripts) == null ? void 0 : s[c]
              i &&
                (console.log(`Running ${c} script: ${i}`),
                ya(`${te[r]} ${c}`, w({ cwd: t }, $)))
            },
            k = !1,
            d = a.pure === !1 ? !1 : a.pure || !!n.workspaces || (k = wa(t))
          l('preyalc')
          let m = e.map((c) =>
              P(void 0, null, function* () {
                l('preyalc.' + c)
                let { name: i, version: s = '' } = V(c)
                i || console.warn('Could not parse package name', c)
                let p = N(t, v.yalcPackagesFolder, i)
                if (a.restore) {
                  if (
                    (console.log(
                      `Restoring package \`${c}\` from .yalc directory`
                    ),
                    !S.existsSync(p))
                  )
                    return (
                      console.warn(
                        `Could not find package \`${c}\` ` + p,
                        ', skipping.'
                      ),
                      null
                    )
                } else {
                  let x = se(i)
                  if (!S.existsSync(x))
                    return (
                      console.warn(
                        `Could not find package \`${i}\` in store (${x}), skipping.`
                      ),
                      null
                    )
                  let g = s || Pa(i),
                    h = se(i, g)
                  if (!S.existsSync(h))
                    return (
                      console.warn(
                        `Could not find package \`${c}\` ` + h,
                        ', skipping.'
                      ),
                      null
                    )
                  console.time('Copy dir safe'),
                    yield me(h, p, !a.replace),
                    console.timeEnd('Copy dir safe')
                }
                let f = L(p)
                if (!f) return null
                let y = ''
                if (d) {
                  if (!a.pure) {
                    let x =
                      '--pure option will be used by default, to override use --no-pure.'
                    n.workspaces
                      ? console.warn(
                          'Because of `workspaces` enabled in this package ' + x
                        )
                      : k &&
                        console.warn(
                          'Because of `pnpm-workspace.yaml` exists in this package ' +
                            x
                        )
                  }
                  console.log(
                    `${f.name}@${f.version} added to ${N(
                      v.yalcPackagesFolder,
                      i
                    )} purely`
                  )
                }
                if (!d) {
                  let x = N(t, 'node_modules', i)
                  if (
                    ((a.link || a.linkDep || ha(x)) && S.removeSync(x),
                    a.link || a.linkDep
                      ? Ve(p, x, 'junction')
                      : (console.log({
                          destYalcCopyDir: p,
                          destModulesDir: x,
                          replace: a.replace,
                        }),
                        console.time('Copy dir safe'),
                        yield me(p, x, !a.replace),
                        console.timeEnd('Copy dir safe')),
                    !a.link)
                  ) {
                    let h = a.linkDep ? 'link:' : 'file:',
                      b = a.workspace
                        ? 'workspace:*'
                        : h + v.yalcPackagesFolder + '/' + f.name,
                      D = n.dependencies || {},
                      C = n.devDependencies || {},
                      F = a.dev ? C : D
                    a.dev
                      ? D[f.name] && ((y = D[f.name]), delete D[f.name])
                      : D[f.name] || (C[f.name] && (F = C)),
                      F[f.name] !== b &&
                        ((y = y || F[f.name]),
                        (F[f.name] = b),
                        (n.dependencies = F === D ? D : n.dependencies),
                        (n.devDependencies = F === C ? C : n.devDependencies),
                        (o = !0)),
                      (y = y == b ? '' : y)
                  }
                  if (f.bin && (a.link || a.linkDep)) {
                    let h = N(t, 'node_modules', '.bin'),
                      b = (D, C) => {
                        let F = N(p, D),
                          Z = N(h, C)
                        console.log(
                          'Linking bin script:',
                          Ue(t, p),
                          '->',
                          Ue(t, Z)
                        )
                        try {
                          Ve(F, Z), S.chmodSync(F, 493)
                        } catch (ee) {
                          console.warn('Could not create bin symlink.'),
                            console.error(ee)
                        }
                      }
                    if (typeof f.bin == 'string')
                      S.ensureDirSync(h), b(f.bin, f.name)
                    else if (typeof f.bin == 'object') {
                      S.ensureDirSync(h)
                      for (let D in f.bin) b(f.bin[D], D)
                    }
                  }
                  let g = a.link ? 'linked' : 'added'
                  console.log(`Package ${f.name}@${f.version} ${g} ==> ${x}`)
                }
                let ie = re(p)
                return (
                  l('postyalc.' + c),
                  {
                    signature: ie,
                    name: i,
                    version: s,
                    replaced: y,
                    path: a.workingDir,
                  }
                )
              })
            ),
            u = (yield Promise.all(m)).filter((c) => !!c).map((c) => c)
          o && z(t, n),
            Pe(
              u.map((c) => ({
                name: c.name,
                version: c.version,
                replaced: c.replaced,
                pure: d,
                workspace: a.workspace,
                file: a.workspace ? void 0 : !a.link && !a.linkDep && !d,
                link: a.linkDep && !d,
                signature: c.signature,
              })),
              { workingDir: a.workingDir }
            ),
            l('postyalc'),
            yield ve(u),
            a.update && be(a.workingDir, e)
        }))
  })
import * as Q from 'fs-extra'
import { homedir as va } from 'os'
import { join as U } from 'path'
function ae() {
  return He.yalcStoreMainDir
    ? He.yalcStoreMainDir
    : process.platform === 'win32' && process.env.LOCALAPPDATA
    ? U(process.env.LOCALAPPDATA, v.myNameIsCapitalized)
    : U(Sa, '.' + v.myNameIs)
}
function B() {
  return U(ae(), 'packages')
}
var Sa,
  v,
  He,
  se,
  $,
  Ye,
  re,
  Ke,
  _e,
  I = M(() => {
    Ce()
    Me()
    Re()
    Ne()
    ze()
    qe()
    ne()
    ;(Sa = va()),
      (v = {
        myNameIs: 'yalc',
        ignoreFileName: '.yalcignore',
        myNameIsCapitalized: 'Yalc',
        lockfileName: 'yalc.lock',
        yalcPackagesFolder: '.yalc',
        prescript: 'preyalc',
        postscript: 'postyalc',
        installationsFile: 'installations.json',
      }),
      (He = global)
    ;(se = (e, a = '') => U(B(), e, a)),
      ($ = { stdio: 'inherit' }),
      (Ye = 'yalc.sig'),
      (re = (e) => {
        let a = U(e, Ye)
        try {
          return Q.readFileSync(a, 'utf-8')
        } catch (t) {
          return ''
        }
      }),
      (Ke = (e) => {
        let a = U(e, v.ignoreFileName)
        try {
          return Q.readFileSync(a, 'utf-8')
        } catch (t) {
          return ''
        }
      }),
      (_e = (e, a) => {
        let t = U(e, Ye)
        try {
          Q.writeFileSync(t, a)
        } catch (n) {
          throw (console.error('Could not write signature file'), n)
        }
      })
  })
import Je from 'crypto'
import ke from 'fs-extra'
import Da from 'ignore'
import xa from 'npm-packlist'
import { dirname as ba, join as X } from 'path'
var Fa,
  q,
  Ca,
  Ma,
  La,
  Ia,
  Oa,
  $a,
  Fe,
  ge = M(() => {
    I()
    I()
    ;(Fa = 8),
      (q = (e, a = '') =>
        new Promise((t, n) =>
          P(void 0, null, function* () {
            let o = ke.createReadStream(e),
              r = Je.createHash('md5')
            r.update(a.replace(/\\/g, '/')),
              o.on('data', (l) => r.update(l)),
              o.on('error', n).on('close', () => {
                t(r.digest('hex'))
              })
          })
        )),
      (Ca = (e, a, t = '') =>
        P(void 0, null, function* () {
          return yield ke.copy(e, a), q(e, t)
        })),
      (Ma = (e, a) =>
        Object.keys(e).length === 0
          ? {}
          : Object.keys(e).reduce(
              (t, n) => (e[n] && (t[n] = a(e[n], n)), t),
              {}
            )),
      (La = (e, a, t) => {
        var o
        if (e !== '*' && e !== '^' && e !== '~') return e
        let n = e === '^' || e === '~' ? e : ''
        try {
          let r = ue.resolve(X(a, 'package.json'), { paths: [t] }),
            l = (o = L(ba(r))) == null ? void 0 : o.version
          return `${n}${l}` || '*'
        } catch (r) {
          return (
            console.warn('Could not resolve workspace package location for', a),
            '*'
          )
        }
      }),
      (Ia = (e, a) => {
        let t = (n) =>
          n &&
          Ma(n, (o, r) => {
            if (o.startsWith('workspace:')) {
              let l = o.split(':')[1],
                k = La(l, r, a)
              return (
                console.log(
                  `Resolving workspace package ${r} version ==> ${k}`
                ),
                k
              )
            }
            return o
          })
        return O(w({}, e), {
          dependencies: t(e.dependencies),
          devDependencies: t(e.devDependencies),
          peerDependencies: t(e.peerDependencies),
        })
      }),
      (Oa = (e) =>
        O(w({}, e), {
          scripts: e.scripts
            ? O(w({}, e.scripts), { prepare: void 0, prepublish: void 0 })
            : void 0,
          devDependencies: void 0,
        })),
      ($a = (e) => e.replace(/^\.\//, '')),
      (Fe = (e) =>
        P(void 0, null, function* () {
          let { workingDir: a, devMod: t = !0 } = e,
            n = L(a)
          if (!n) throw 'Error copying package to store.'
          let o = e.workingDir,
            r = X(B(), n.name, n.version),
            l = Ke(a),
            k = Da().add(l),
            m = (yield (yield xa({ path: a })).map($a)).filter(
              (y) => !k.ignores(y)
            )
          e.content &&
            (console.info('Files included in published content:'),
            m.sort().forEach((y) => {
              console.log(`- ${y}`)
            }),
            console.info(`Total ${m.length} files.`))
          let u = () =>
              P(void 0, null, function* () {
                return (
                  yield ke.remove(r),
                  Promise.all(m.sort().map((y) => Ca(X(o, y), X(r, y), y)))
                )
              }),
            c = e.changed
              ? yield Promise.all(m.sort().map((y) => q(X(o, y), y)))
              : yield u(),
            i = Je.createHash('md5').update(c.join('')).digest('hex')
          if (e.changed) {
            let y = re(r)
            if (i === y) return !1
            yield u()
          }
          _e(r, i)
          let s = e.signature ? '+' + i.substr(0, Fa) : '',
            f = O(
              w(
                {},
                ((y) => (e.workspaceResolve ? Ia(y, a) : y))(t ? Oa(n) : n)
              ),
              { yalcSig: i, version: n.version + s }
            )
          return z(r, f), i
        }))
  })
export {
  q as a,
  Fe as b,
  ge as c,
  ye as d,
  T as e,
  le as f,
  Pe as g,
  _ as h,
  Y as i,
  Ua as j,
  Va as k,
  we as l,
  ve as m,
  j as n,
  J as o,
  Se as p,
  xe as q,
  ta as r,
  te as s,
  R as t,
  Ba as u,
  Ga as v,
  oa as w,
  qa as x,
  be as y,
  ne as z,
  ia as A,
  Ce as B,
  fe as C,
  Me as D,
  pa as E,
  Re as F,
  fa as G,
  Ne as H,
  v as I,
  He as J,
  ae as K,
  B as L,
  se as M,
  $ as N,
  re as O,
  Ke as P,
  _e as Q,
  I as R,
  me as S,
  We as T,
  A as U,
  ze as V,
}
