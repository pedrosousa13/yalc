#!/usr/bin/env node
import { a as P, b as A } from './chunk-YTWWLUFP.mjs'
import { a as w, b as y, c as O } from './chunk-JPHLAHS7.mjs'
import {
  A as l,
  C as n,
  E as b,
  F as C,
  G as i,
  I as f,
  J as t,
  K as g,
  R as S,
  U as d,
  j as k,
  k as h,
  o as R,
} from './chunk-T67XMUKG.mjs'
import './chunk-HPX726V2.mjs'
import { a as p, c as u, e as j, f as m } from './chunk-3WPUBFY6.mjs'
import r from 'yargs'
import { join as I, resolve as q } from 'path'
var G = j((M) => {
  S()
  R()
  C()
  O()
  A()
  var c = ['update', 'upgrade', 'up'],
    D = ['scripts', 'sig', 'dev-mod', 'changed', 'files', ...c],
    F = f.myNameIs,
    U = () => u(__dirname + '/../package.json').version
  y()
  var o = P()
  ;(process.argv.includes('--quiet') || o.quiet) && w()
  var _ = (e, a = {}) => {
    let s = e._[1]
    return p(
      {
        workingDir: I(process.cwd(), s || ''),
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
      a
    )
  }
  r
    .usage(F + ' [command] [options] [package1 [package2...]]')
    .coerce('store-folder', function (e) {
      t.yalcStoreMainDir ||
        ((t.yalcStoreMainDir = q(e)),
        console.log('Package store folder used:', t.yalcStoreMainDir))
    })
    .command({
      command: '*',
      builder: () => r.boolean(['version']),
      handler: (e) => {
        let a = 'Use `yalc help` to see available commands.'
        e._[0]
          ? (a = 'Unknown command `' + e._[0] + '`. ' + a)
          : e.version && (a = U()),
          console.log(a)
      },
    })
    .command({
      command: 'publish',
      describe: 'Publish package in yalc local repo',
      builder: () =>
        r
          .default('sig', !1)
          .default('scripts', !0)
          .default('dev-mod', !0)
          .default('workspace-resolve', !0)
          .default(o)
          .alias('script', 'scripts')
          .boolean(['push'].concat(D)),
      handler: (e) => l(_(e)),
    })
    .command({
      command: 'push',
      describe:
        'Publish package in yalc local repo and push to all installations',
      builder: () =>
        r
          .default('sig', !1)
          .default('scripts', !1)
          .default('dev-mod', !0)
          .default('workspace-resolve', !0)
          .default(o)
          .alias('script', 'scripts')
          .boolean(['safe'].concat(D))
          .option('replace', { describe: 'Force package content replacement' }),
      handler: (e) => l(_(e, { push: !0 })),
    })
    .command({
      command: 'installations',
      describe: 'Work with installations file: show/clean',
      builder: () => r.boolean(['dry']),
      handler: (e) =>
        m(M, null, function* () {
          let a = e._[1],
            s = e._.slice(2)
          switch (a) {
            case 'show':
              k({ packages: s })
              break
            case 'clean':
              yield h({ packages: s, dry: e.dry })
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
        r
          .boolean(['file', 'dev', 'link', ...c])
          .alias('D', 'dev')
          .boolean('workspace')
          .alias('save-dev', 'dev')
          .alias('workspace', 'W')
          .default(o)
          .help(!0),
      handler: (e) =>
        d(e._.slice(1), {
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
      builder: () => r.default(o).help(!0),
      handler: (e) =>
        d(e._.slice(1), { link: !0, pure: e.pure, workingDir: process.cwd() }),
    })
    .command({
      command: 'update',
      describe: 'Update packages from yalc repo',
      builder: () =>
        r
          .boolean([...c])
          .default(o)
          .help(!0),
      handler: (e) =>
        n(e._.slice(1), {
          update: e.update || e.upgrade,
          restore: e.restore,
          workingDir: process.cwd(),
        }),
    })
    .command({
      command: 'restore',
      describe: 'Restore retreated packages',
      builder: () =>
        r
          .boolean([...c])
          .default(o)
          .help(!0),
      handler: (e) =>
        n(e._.slice(1), {
          update: e.update || e.upgrade,
          restore: !0,
          workingDir: process.cwd(),
        }),
    })
    .command({
      command: 'remove',
      describe: 'Remove packages from the project',
      builder: () => r.boolean(['retreat', 'all']).default(o).help(!0),
      handler: (e) =>
        i(e._.slice(1), {
          retreat: e.retreat,
          workingDir: process.cwd(),
          all: e.all,
        }),
    })
    .command({
      command: 'retreat',
      describe:
        'Remove packages from project, but leave in lock file (to be restored later)',
      builder: () => r.boolean(['all']).help(!0),
      handler: (e) =>
        i(e._.slice(1), { all: e.all, retreat: !0, workingDir: process.cwd() }),
    })
    .command({
      command: 'check',
      describe: 'Check package.json for yalc packages',
      builder: () => r.boolean(['commit']).usage('check usage here').help(!0),
      handler: (e) => {
        let a = process.env.GIT_PARAMS
        e.commit && console.log('gitParams', a),
          b({ commit: e.commit, all: e.all, workingDir: process.cwd() })
      },
    })
    .command({
      command: 'dir',
      describe: 'Show yalc system directory',
      handler: () => {
        console.log(g())
      },
    })
    .help('help').argv
})
export default G()
