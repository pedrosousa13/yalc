function e(e, n) {
  if (n == null || n > e.length) n = e.length
  for (var r = 0, t = new Array(n); r < n; r++) t[r] = e[r]
  return t
}
function n(n) {
  if (Array.isArray(n)) return e(n)
}
function r(e, n, r, t, a, o, i) {
  try {
    var c = e[o](i)
    var s = c.value
  } catch (e) {
    r(e)
    return
  }
  if (c.done) {
    n(s)
  } else {
    Promise.resolve(s).then(t, a)
  }
}
function t(e) {
  return function () {
    var n = this,
      t = arguments
    return new Promise(function (a, o) {
      var i = e.apply(n, t)
      function c(e) {
        r(i, a, o, c, s, 'next', e)
      }
      function s(e) {
        r(i, a, o, c, s, 'throw', e)
      }
      c(undefined)
    })
  }
}
function a(e, n, r) {
  if (n in e) {
    Object.defineProperty(e, n, {
      value: r,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    e[n] = r
  }
  return e
}
function o(e) {
  if (
    (typeof Symbol !== 'undefined' && e[Symbol.iterator] != null) ||
    e['@@iterator'] != null
  )
    return Array.from(e)
}
function i() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}
function c(e) {
  for (var n = 1; n < arguments.length; n++) {
    var r = arguments[n] != null ? arguments[n] : {}
    var t = Object.keys(r)
    if (typeof Object.getOwnPropertySymbols === 'function') {
      t = t.concat(
        Object.getOwnPropertySymbols(r).filter(function (e) {
          return Object.getOwnPropertyDescriptor(r, e).enumerable
        })
      )
    }
    t.forEach(function (n) {
      a(e, n, r[n])
    })
  }
  return e
}
function s(e, n) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(e)
    if (n) {
      t = t.filter(function (n) {
        return Object.getOwnPropertyDescriptor(e, n).enumerable
      })
    }
    r.push.apply(r, t)
  }
  return r
}
function u(e, n) {
  n = n != null ? n : {}
  if (Object.getOwnPropertyDescriptors) {
    Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
  } else {
    s(Object(n)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
    })
  }
  return e
}
function l(e) {
  return n(e) || o(e) || f(e) || i()
}
function p(e) {
  '@swc/helpers - typeof'
  return e && typeof Symbol !== 'undefined' && e.constructor === Symbol
    ? 'symbol'
    : typeof e
}
function f(n, r) {
  if (!n) return
  if (typeof n === 'string') return e(n, r)
  var t = Object.prototype.toString.call(n).slice(8, -1)
  if (t === 'Object' && n.constructor) t = n.constructor.name
  if (t === 'Map' || t === 'Set') return Array.from(t)
  if (t === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
    return e(n, r)
}
function d(e, n) {
  var r,
    t,
    a,
    o,
    i = {
      label: 0,
      sent: function () {
        if (a[0] & 1) throw a[1]
        return a[1]
      },
      trys: [],
      ops: [],
    }
  return (
    (o = { next: c(0), throw: c(1), return: c(2) }),
    typeof Symbol === 'function' &&
      (o[Symbol.iterator] = function () {
        return this
      }),
    o
  )
  function c(e) {
    return function (n) {
      return s([e, n])
    }
  }
  function s(o) {
    if (r) throw new TypeError('Generator is already executing.')
    while (i)
      try {
        if (
          ((r = 1),
          t &&
            (a =
              o[0] & 2
                ? t['return']
                : o[0]
                ? t['throw'] || ((a = t['return']) && a.call(t), 0)
                : t.next) &&
            !(a = a.call(t, o[1])).done)
        )
          return a
        if (((t = 0), a)) o = [o[0] & 2, a.value]
        switch (o[0]) {
          case 0:
          case 1:
            a = o
            break
          case 4:
            i.label++
            return { value: o[1], done: false }
          case 5:
            i.label++
            t = o[1]
            o = [0]
            continue
          case 7:
            o = i.ops.pop()
            i.trys.pop()
            continue
          default:
            if (
              !((a = i.trys), (a = a.length > 0 && a[a.length - 1])) &&
              (o[0] === 6 || o[0] === 2)
            ) {
              i = 0
              continue
            }
            if (o[0] === 3 && (!a || (o[1] > a[0] && o[1] < a[3]))) {
              i.label = o[1]
              break
            }
            if (o[0] === 6 && i.label < a[1]) {
              i.label = a[1]
              a = o
              break
            }
            if (a && i.label < a[2]) {
              i.label = a[2]
              i.ops.push(o)
              break
            }
            if (a[2]) i.ops.pop()
            i.trys.pop()
            continue
        }
        o = n.call(e, i)
      } catch (e) {
        o = [6, e]
        t = 0
      } finally {
        r = a = 0
      }
    if (o[0] & 5) throw o[1]
    return { value: o[0] ? o[1] : void 0, done: true }
  }
}
function g(e) {
  var n = typeof Symbol === 'function' && Symbol.iterator,
    r = n && e[n],
    t = 0
  if (r) return r.call(e)
  if (e && typeof e.length === 'number')
    return {
      next: function () {
        if (e && t >= e.length) e = void 0
        return { value: e && e[t++], done: !e }
      },
    }
  throw new TypeError(
    n ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
  )
}
import { b as m, a as v, c as y } from './chunk-ML3EONAP.mjs'
import { a as h } from './chunk-3SAEGOMQ.mjs'
import k from 'crypto'
import * as b from 'fs-extra'
import w from 'fs-extra'
import D from 'ignore'
import S from 'npm-packlist'
import * as O from 'path'
import P, { join as j, resolve as x, relative as F, dirname as E } from 'path'
import { homedir as C } from 'os'
import { execSync as A } from 'child_process'
import N from 'glob'
import R from 'util'
import I from 'tar'
var M = function (e) {
    return e.version == 'v1' && e.packages ? 'v1' : 'v0'
  },
  T = {
    v0: function (e) {
      return { version: 'v1', packages: e }
    },
    v1: function (e) {
      return e
    },
  },
  z = function (e) {
    var n = M(e)
    return T[n](e)
  },
  L = function (e) {
    var n = j(e.workingDir, eP.lockfileName)
    b.removeSync(n)
  },
  J = function (e) {
    var n = j(e.workingDir, eP.lockfileName),
      r = { version: 'v1', packages: {} }
    try {
      r = z(b.readJSONSync(n))
    } catch (e) {
      return r
    }
    return r
  },
  B = function (e, n) {
    var r = j(n.workingDir, eP.lockfileName),
      t = JSON.stringify(e, null, 2)
    b.writeFileSync(r, t)
  },
  W = function (e, n) {
    var r = J(n)
    e.forEach(function (e) {
      var n = e.name,
        t = e.version,
        a = e.file,
        o = e.link,
        i = e.replaced,
        c = e.signature,
        s = e.pure,
        u = e.workspace
      var l = r.packages[n] || {}
      ;(r.packages[n] = {}),
        t && (r.packages[n].version = t),
        c && (r.packages[n].signature = c),
        a && (r.packages[n].file = !0),
        o && (r.packages[n].link = !0),
        s && (r.packages[n].pure = !0),
        u && (r.packages[n].workspace = !0),
        (i || l.replaced) && (r.packages[n].replaced = i || l.replaced)
    }),
      B(r, n)
  }
var _ = function () {
    var e = ex(),
      n = P.join(e, eP.installationsFile),
      r
    try {
      w.accessSync(n)
      try {
        r = w.readJsonSync(n)
      } catch (e) {
        console.error('Error reading installations file', n, e), (r = {})
      }
    } catch (e) {
      r = {}
    }
    return r
  },
  G = function (e) {
    var n = e.packages
    var r = _()
    Object.keys(r)
      .filter(function (e) {
        return n.length ? n.indexOf(e) >= 0 : !0
      })
      .map(function (e) {
        return { name: e, locations: r[e] }
      })
      .forEach(function (e) {
        var n = e.name,
          r = e.locations
        console.log('Installations of package '.concat(n, ':')),
          r.forEach(function (e) {
            console.log('  '.concat(e))
          })
      })
  },
  H = (function () {
    var e = t(function (e) {
      var n, r, t, a, o, i
      return d(this, function (c) {
        switch (c.label) {
          case 0:
            ;(n = e.packages), (r = e.dry)
            ;(t = _()),
              (a = Object.keys(t)
                .filter(function (e) {
                  return n.length ? n.indexOf(e) >= 0 : !0
                })
                .map(function (e) {
                  return { name: e, locations: t[e] }
                })
                .reduce(function (e, n) {
                  var r = n.name,
                    t = n.locations
                  return t.reduce(function (e, n) {
                    var t = J({ workingDir: n })
                    return Object.keys(t.packages).indexOf(r) < 0
                      ? e.concat([{ name: r, path: n }])
                      : e
                  }, e)
                }, []))
            o = a.length
            if (!o) return [3, 4]
            console.info('Installations clean up:')
            if (!r) return [3, 1]
            i =
              (a.forEach(function (e) {
                console.log(
                  'Installation to remove: '
                    .concat(e.name, ' in ')
                    .concat(e.path)
                )
              }),
              console.warn('Dry run.'))
            return [3, 3]
          case 1:
            return [4, $(a)]
          case 2:
            i = c.sent()
            c.label = 3
          case 3:
            o = i
            c.label = 4
          case 4:
            o
            return [2]
        }
      })
    })
    return function n(n) {
      return e.apply(this, arguments)
    }
  })(),
  U = (function () {
    var e = t(function (e) {
      var n, r, t
      return d(this, function (a) {
        ;(n = ex()),
          (r = P.join(n, eP.installationsFile)),
          (t = JSON.stringify(e, null, 2))
        return [2, w.writeFile(r, t)]
      })
    })
    return function n(n) {
      return e.apply(this, arguments)
    }
  })(),
  Y = (function () {
    var e = t(function (e) {
      var n, r, t
      return d(this, function (a) {
        switch (a.label) {
          case 0:
            ;(n = _()), (r = !1)
            e.forEach(function (e) {
              var t = n[e.name] || []
              ;(n[e.name] = t),
                !!t.filter(function (n) {
                  return n === e.path
                })[0] || ((r = !0), t.push(e.path))
            })
            t = r
            if (!t) return [3, 2]
            return [4, U(n)]
          case 1:
            t = a.sent()
            a.label = 2
          case 2:
            t
            return [2]
        }
      })
    })
    return function n(n) {
      return e.apply(this, arguments)
    }
  })(),
  $ = (function () {
    var e = t(function (e) {
      var n, r, t
      return d(this, function (a) {
        switch (a.label) {
          case 0:
            ;(n = _()), (r = !1)
            e.forEach(function (e) {
              var t = n[e.name] || []
              console.log(
                'Removing installation of '
                  .concat(e.name, ' in ')
                  .concat(e.path)
              )
              var a = t.indexOf(e.path)
              a >= 0 && (t.splice(a, 1), (r = !0)), t.length || delete n[e.name]
            })
            t = r
            if (!t) return [3, 2]
            return [4, U(n)]
          case 1:
            t = a.sent()
            a.label = 2
          case 2:
            t
            return [2]
        }
      })
    })
    return function n(n) {
      return e.apply(this, arguments)
    }
  })()
var q = {
    pnpm: ['pnpm-lock.yaml'],
    yarn: ['yarn.lock'],
    npm: ['package-lock.json'],
  },
  K = { pnpm: 'pnpm install', yarn: 'yarn', npm: 'npm install' },
  Q = { pnpm: 'pnpm update', yarn: 'yarn upgrade', npm: 'npm update' },
  V = { pnpm: 'pnpm', yarn: 'yarn', npm: 'npm run' },
  X = 'npm',
  Z = function (e) {
    return (
      Object.keys(q).reduce(function (n, r) {
        return (
          n ||
          (q[r].reduce(function (n, t) {
            return n || (b.existsSync(j(e, t)) && r)
          }, !1) &&
            r)
        )
      }, !1) || X
    )
  },
  ee = function (e) {
    return K[Z(e)]
  },
  en = function (e) {
    return K[Z(e)]
  },
  er = function (e) {
    return Q[Z(e)]
  },
  et = function (e) {
    return Z(e) === 'yarn'
  },
  ea = function (e, n) {
    var r = [er(e)].concat(l(n)).join(' ')
    console.log('Running '.concat(r, ' in ').concat(e)), A(r, c({ cwd: e }, eC))
  }
var eo = (function () {
  var e = t(function (e) {
    var n, r, t, a, o, i, s, u, p, f, g, v, y, h, k, b, w, D, S
    return d(this, function (d) {
      switch (d.label) {
        case 0:
          ;(n = e.workingDir), (r = m(n))
          if (!r) return [2]
          t = Z(n)
          console.log('Run PM script')
          a = function (a) {
            var o
            if (!e.scripts) return
            var i = (o = r.scripts) === null || o === void 0 ? void 0 : o[a]
            i &&
              (console.log('Running '.concat(a, ' script: ').concat(i)),
              A(''.concat(V[t], ' ').concat(a), c({ cwd: n }, eC)))
          }
          if (r.private && !e.private) {
            console.log(
              'Will not publish package with `private: true` use --private flag to force publishing.'
            )
            return [2]
          }
          console.log('run pre scripts'),
            [
              'prepublish',
              'prepare',
              'prepublishOnly',
              'prepack',
              'preyalcpublish',
            ].forEach(a),
            console.log('Copy package to store')
          return [4, eG(e)]
        case 1:
          o = d.sent()
          if (e.changed && !o) {
            console.warn(
              'Package content has not changed, skipping publishing.'
            )
            return [2]
          }
          console.log('Post scripts'),
            ['postyalcpublish', 'postpack', 'publish', 'postpublish'].forEach(a)
          ;(i = j(eF(), r.name, r.version)), (s = m(i))
          if (
            !(console.log(
              ''.concat(s.name, '@').concat(s.version, ' published in store.')
            ),
            console.log({ publishedPkg: s }),
            e.push)
          )
            return [3, 11]
          u = _()
          console.log({ installationsConfig: u })
          p = u[r.name] || []
          console.log({ installationPaths: p })
          f = []
          ;(g = true), (v = false), (y = undefined)
          d.label = 2
        case 2:
          d.trys.push([2, 7, 8, 9])
          h = p[Symbol.iterator]()
          d.label = 3
        case 3:
          if (!!(g = (k = h.next()).done)) return [3, 6]
          b = k.value
          console.info(
            'Pushing '.concat(r.name, '@').concat(r.version, ' in ').concat(b)
          )
          return [
            4,
            ei([r.name], {
              replace: e.replace,
              workingDir: b,
              update: e.update,
              noInstallationsRemove: !0,
            }),
          ]
        case 4:
          D = d.sent()
          ;(w = f).push.apply(w, l(D))
          d.label = 5
        case 5:
          g = true
          return [3, 3]
        case 6:
          return [3, 9]
        case 7:
          S = d.sent()
          v = true
          y = S
          return [3, 9]
        case 8:
          try {
            if (!g && h.return != null) {
              h.return()
            }
          } finally {
            if (v) {
              throw y
            }
          }
          return [7]
        case 9:
          return [4, $(f)]
        case 10:
          d.sent()
          d.label = 11
        case 11:
          return [2]
      }
    })
  })
  return function n(n) {
    return e.apply(this, arguments)
  }
})()
var ei = (function () {
  var e = t(function (e, n) {
    var r, t, a, o, i, s, l, p, f, g, m, y
    return d(this, function (d) {
      switch (d.label) {
        case 0:
          r = n.workingDir
          console.log('update')
          ;(t = J({ workingDir: r })), (a = []), (o = [])
          console.log({ packages: e }),
            e.length
              ? e.forEach(function (e) {
                  var r = v(e),
                    i = r.name,
                    c = r.version
                  t.packages[i]
                    ? (c && (t.packages[i].version = c), a.push(i))
                    : (o.push({ name: i, path: n.workingDir }),
                      console.warn(
                        'Did not find package '.concat(
                          i,
                          " in lockfile, please use 'add' command to add it explicitly."
                        )
                      ))
                })
              : (a = Object.keys(t.packages)),
            console.log({ packagesToUpdate: a })
          i = a.map(function (e) {
            return {
              name: t.packages[e].version ? e + '@' + t.packages[e].version : e,
              file: t.packages[e].file,
              link: t.packages[e].link,
              pure: t.packages[e].pure,
              workspace: t.packages[e].workspace,
            }
          })
          console.log({ lockPackages: i })
          s = i
            .filter(function (e) {
              return e.file
            })
            .map(function (e) {
              return e.name
            })
          console.log({ packagesFiles: s })
          l = {
            workingDir: n.workingDir,
            replace: n.replace,
            update: n.update,
            restore: n.restore,
          }
          console.log('add packages 1'), console.log({ addOpts: l })
          return [4, eS(s, c({}, l))]
        case 1:
          d.sent()
          p = i
            .filter(function (e) {
              return !e.file && !e.link && !e.pure && !e.workspace
            })
            .map(function (e) {
              return e.name
            })
          console.log({ packagesLinks: p })
          return [4, eS(p, u(c({}, l), { link: !0, pure: !1 }))]
        case 2:
          d.sent()
          f = i
            .filter(function (e) {
              return e.workspace
            })
            .map(function (e) {
              return e.name
            })
          console.log({ packagesWks: f })
          return [4, eS(f, u(c({}, l), { workspace: !0, pure: !1 }))]
        case 3:
          d.sent()
          g = i
            .filter(function (e) {
              return e.link
            })
            .map(function (e) {
              return e.name
            })
          console.log({ packagesLinkDep: g })
          return [4, eS(g, u(c({}, l), { linkDep: !0, pure: !1 }))]
        case 4:
          d.sent()
          m = i
            .filter(function (e) {
              return e.pure
            })
            .map(function (e) {
              return e.name
            })
          console.log({ packagesPure: m })
          return [4, eS(m, u(c({}, l), { pure: !0 }))]
        case 5:
          d.sent()
          y = n.noInstallationsRemove
          if (y) return [3, 7]
          return [4, $(o)]
        case 6:
          y = d.sent()
          d.label = 7
        case 7:
          return [2, (y, o)]
      }
    })
  })
  return function n(n, r) {
    return e.apply(this, arguments)
  }
})()
var ec = 'git diff --cached --name-only',
  es = function (e) {
    return O.basename(e) === 'package.json'
  }
function eu(e) {
  var n = function (e) {
    var n = b.readJSONSync(e),
      r = new RegExp(
        '^(file|link):(.\\/)?\\'.concat(eP.yalcPackagesFolder, '\\/')
      ),
      t = function (e) {
        return Object.keys(e).filter(function (n) {
          return e[n].match(r)
        })
      }
    return t(n.dependencies || {}).concat(t(n.devDependencies || {}))
  }
  e.commit &&
    (A(ec, c({ cwd: e.workingDir }, eC))
      .toString()
      .trim(),
    A(ec, c({ cwd: e.workingDir }, eC))
      .toString()
      .trim()
      .split('\n')
      .filter(es))
  var r = j(e.workingDir, 'package.json'),
    t = n(r)
  t.length && (console.info('Yalc dependencies found:', t), process.exit(1))
}
var el = function (e, n) {
    return new RegExp('file|link:' + eP.yalcPackagesFolder + '/' + n).test(e)
  },
  ep = function (e) {
    var n = b.existsSync(e) && !b.readdirSync(e).length
    return n && b.removeSync(e), n
  },
  ef = (function () {
    var e = t(function (e, n) {
      var r, t, a, o, i, c, s, u, l, p
      return d(this, function (f) {
        switch (f.label) {
          case 0:
            ;(r = n.workingDir), (t = J({ workingDir: r })), (a = m(r))
            if (!a) return [2]
            o = []
            e.length
              ? e.forEach(function (e) {
                  var n = v(e),
                    r = n.name,
                    a = n.version
                  t.packages[r]
                    ? (!a || a === t.packages[r].version) && o.push(r)
                    : (console.warn(
                        'Package '
                          .concat(e, ' not found in ')
                          .concat(
                            eP.lockfileName,
                            ', still will try to remove.'
                          )
                      ),
                      o.push(r))
                })
              : n.all
              ? (o = Object.keys(t.packages))
              : console.info('Use --all option to remove all packages.')
            ;(i = !1), (c = [])
            o.forEach(function (e) {
              var r = t.packages[e],
                o
              a.dependencies && a.dependencies[e] && (o = a.dependencies),
                a.devDependencies &&
                  a.devDependencies[e] &&
                  (o = a.devDependencies),
                o &&
                  el(o[e], e) &&
                  (c.push(e),
                  r && r.replaced ? (o[e] = r.replaced) : delete o[e]),
                n.retreat
                  ? console.log(
                      'Retreating package '.concat(e, ' version ==>'),
                      r.replaced
                    )
                  : ((i = !0), delete t.packages[e])
            }),
              i && B(t, { workingDir: r }),
              c.length && y(r, a)
            ;(s = o.map(function (e) {
              return { name: e, version: '', path: r }
            })),
              (u = j(r, eP.yalcPackagesFolder))
            c.forEach(function (e) {
              b.removeSync(j(r, 'node_modules', e))
            }),
              o.forEach(function (e) {
                n.retreat || b.removeSync(j(u, e))
              })
            l = function (e) {
              return e.startsWith('@')
            }
            o
              .filter(l)
              .map(function (e) {
                return e.split('/')[0]
              })
              .map(function (e) {
                return j(u, e)
              })
              .map(ep),
              !Object.keys(t.packages).length &&
                !n.retreat &&
                (L({ workingDir: r }),
                ep(u) || console.warn(u, 'is not empty, not removing it.'))
            p = n.retreat
            if (p) return [3, 2]
            return [4, $(s)]
          case 1:
            p = f.sent()
            f.label = 2
          case 2:
            p
            return [2]
        }
      })
    })
    return function n(n, r) {
      return e.apply(this, arguments)
    }
  })()
var ed = R.promisify(N),
  eg = {},
  em = function (e) {
    return e.reduce(function (e, n) {
      return (e[n] = !0), e
    }, {})
  },
  ev = function (e, n) {
    return e.mtime.getTime() === n.mtime.getTime() && e.size === n.size
  },
  ey = (function () {
    var e = t(function (e, n, r) {
      return d(this, function (t) {
        switch (t.label) {
          case 0:
            return [4, I.c({ gzip: !0, file: r, cwd: e }, n)]
          case 1:
            t.sent()
            return [2]
        }
      })
    })
    return function n(n, r, t) {
      return e.apply(this, arguments)
    }
  })(),
  eh = (function () {
    var e = t(function (e, n) {
      var r, a, o, i, c, s, u, l, p, f, m, v, y, h, k, b, D, S, O, P, j, F, E
      var C = arguments
      return d(this, function (A) {
        switch (A.label) {
          case 0:
            r = C.length > 2 && C[2] !== void 0 ? C[2] : !0
            a = '**/node_modules/**'
            if (!eg[e]) return [3, 1]
            f = eg[e].glob
            return [3, 3]
          case 1:
            return [4, ed('**', { cwd: e, ignore: a, dot: !0, nodir: !1 })]
          case 2:
            f = A.sent()
            A.label = 3
          case 3:
            o = f
            return [4, ed('**', { cwd: n, ignore: a, dot: !0, nodir: !1 })]
          case 4:
            ;(i = A.sent()),
              (c = em(o)),
              (s = em(i)),
              (u = o.filter(function (e) {
                return !s[e]
              })),
              (l = i.filter(function (e) {
                return !c[e]
              })),
              (p = o.filter(function (e) {
                return s[e]
              }))
            eg[e] = eg[e] || { files: {}, glob: o }
            ;(m = []), (v = eg[e].files), (y = {})
            return [
              4,
              Promise.all(
                p.map(
                  (function () {
                    var r = t(function (r) {
                      var t, a, o, i, c, s
                      return d(this, function (u) {
                        switch (u.label) {
                          case 0:
                            ;(a = x(e, r)), (o = x(n, r))
                            c =
                              (t = v[r]) === null || t === void 0
                                ? void 0
                                : t.stat
                            if (c) return [3, 2]
                            return [4, w.stat(a)]
                          case 1:
                            c = u.sent()
                            u.label = 2
                          case 2:
                            i = c
                            v[r] = v[r] || { stat: i, hash: '' }
                            return [4, w.stat(o)]
                          case 3:
                            s = u.sent()
                            return [
                              2,
                              {
                                file: r,
                                srcFileStat: i,
                                destFileStat: s,
                                srcFilePath: a,
                                destFilePath: o,
                              },
                            ]
                        }
                      })
                    })
                    return function (e) {
                      return r.apply(this, arguments)
                    }
                  })()
                )
              ),
            ]
          case 5:
            h = A.sent()
            ;(k = true), (b = false), (D = undefined)
            A.label = 6
          case 6:
            A.trys.push([6, 11, 12, 13])
            S = function () {
              var e, n, a, o, i, c, s, u, p, f, g, h, k
              return d(this, function (b) {
                switch (b.label) {
                  case 0:
                    ;(e = P.value),
                      (n = e.file),
                      (a = e.srcFileStat),
                      (o = e.destFileStat),
                      (i = e.srcFilePath),
                      (c = e.destFilePath)
                    s = a.isDirectory() && o.isDirectory()
                    y[n] = o.isDirectory()
                    ;(u = a.isDirectory() && !o.isDirectory()),
                      (p = !a.isDirectory() && o.isDirectory())
                    ;(p || u) && l.push(n)
                    f = (function () {
                      var e = t(function () {
                        var e, r, t
                        return d(this, function (a) {
                          switch (a.label) {
                            case 0:
                              r = v[n].hash
                              if (r) return [3, 2]
                              return [4, eT(i, '')]
                            case 1:
                              r = a.sent()
                              a.label = 2
                            case 2:
                              e = r
                              v[n].hash = e
                              return [4, eT(c, '')]
                            case 3:
                              t = a.sent()
                              return [2, e === t]
                          }
                        })
                      })
                      return function n() {
                        return e.apply(this, arguments)
                      }
                    })()
                    g = p
                    if (g) return [3, 4]
                    h = !s && !ev(a, o)
                    if (!h) return [3, 3]
                    k = !r
                    if (k) return [3, 2]
                    return [4, f()]
                  case 1:
                    k = !b.sent()
                    b.label = 2
                  case 2:
                    h = k
                    b.label = 3
                  case 3:
                    g = h
                    b.label = 4
                  case 4:
                    g && m.push(n)
                    return [2]
                }
              })
            }
            O = h[Symbol.iterator]()
            A.label = 7
          case 7:
            if (!!(k = (P = O.next()).done)) return [3, 10]
            return [5, g(S())]
          case 8:
            A.sent()
            A.label = 9
          case 9:
            k = true
            return [3, 7]
          case 10:
            return [3, 13]
          case 11:
            j = A.sent()
            b = true
            D = j
            return [3, 13]
          case 12:
            try {
              if (!k && O.return != null) {
                O.return()
              }
            } finally {
              if (b) {
                throw D
              }
            }
            return [7]
          case 13:
            return [
              4,
              Promise.all(
                l
                  .filter(function (e) {
                    return !y[e]
                  })
                  .map(function (e) {
                    return w.remove(x(n, e))
                  })
              ),
            ]
          case 14:
            A.sent()
            return [
              4,
              Promise.all(
                l
                  .filter(function (e) {
                    return y[e]
                  })
                  .map(function (e) {
                    return w.remove(x(n, e))
                  })
              ),
            ]
          case 15:
            A.sent()
            return [
              4,
              Promise.all(
                u.map(function (n) {
                  return w.stat(x(e, n)).then(function (e) {
                    return e.isDirectory()
                  })
                })
              ),
            ]
          case 16:
            ;(F = A.sent()), (E = x(n, 'newFiles.tgz'))
            return [
              4,
              ey(
                e,
                u
                  .filter(function (e, n) {
                    return !F[n]
                  })
                  .concat(m),
                E
              ),
            ]
          case 17:
            A.sent()
            return [4, w.copy(E, x(n, 'newFiles.tgz'))]
          case 18:
            A.sent()
            return [4, I.x({ file: E, cwd: n })]
          case 19:
            A.sent()
            return [2]
        }
      })
    })
    return function n(n, r) {
      return e.apply(this, arguments)
    }
  })()
var ek = b.ensureSymlinkSync,
  eb = function (e) {
    var n = eE(e)
    return (
      b
        .readdirSync(n)
        .map(function (e) {
          return { version: e, created: b.statSync(j(n, e)).ctime.getTime() }
        })
        .sort(function (e, n) {
          return n.created - e.created
        })
        .map(function (e) {
          return e.version
        })[0] || ''
    )
  },
  ew = function (e) {
    try {
      return !!b.readlinkSync(e)
    } catch (e) {
      return !1
    }
  },
  eD = function (e) {
    return b.existsSync(j(e, 'pnpm-workspace.yaml'))
  },
  eS = (function () {
    var e = t(function (e, n) {
      var r, a, o, i, s, u, l, f, g
      return d(this, function (h) {
        switch (h.label) {
          case 0:
            if (!e.length) return [2]
            ;(r = n.workingDir), (a = m(r)), (o = !1)
            if (!a) return [2]
            ;(i = Z(r)),
              (s = function (e) {
                var n
                var t = (n = a.scripts) === null || n === void 0 ? void 0 : n[e]
                t &&
                  (console.log('Running '.concat(e, ' script: ').concat(t)),
                  A(''.concat(V[i], ' ').concat(e), c({ cwd: r }, eC)))
              }),
              (u = !1),
              (l = n.pure === !1 ? !1 : n.pure || !!a.workspaces || (u = eD(r)))
            s('preyalc')
            f = e.map(
              (function () {
                var e = t(function (e) {
                  var t,
                    i,
                    c,
                    f,
                    g,
                    y,
                    h,
                    k,
                    w,
                    D,
                    S,
                    O,
                    P,
                    x,
                    E,
                    C,
                    A,
                    N,
                    R,
                    I,
                    M,
                    T,
                    z
                  return d(this, function (d) {
                    switch (d.label) {
                      case 0:
                        s('preyalc.' + e)
                        ;(t = v(e)),
                          (i = t.name),
                          (c = t.version),
                          (f = c === void 0 ? '' : c)
                        i || console.warn('Could not parse package name', e)
                        g = j(r, eP.yalcPackagesFolder, i)
                        if (!n.restore) return [3, 1]
                        if (
                          (console.log(
                            'Restoring package `'.concat(
                              e,
                              '` from .yalc directory'
                            )
                          ),
                          !b.existsSync(g))
                        )
                          return [
                            2,
                            (console.warn(
                              'Could not find package `'.concat(e, '` ') + g,
                              ', skipping.'
                            ),
                            null),
                          ]
                        return [3, 3]
                      case 1:
                        y = eE(i)
                        if (!b.existsSync(y))
                          return [
                            2,
                            (console.warn(
                              'Could not find package `'
                                .concat(i, '` in store (')
                                .concat(y, '), skipping.')
                            ),
                            null),
                          ]
                        ;(h = f || eb(i)), (k = eE(i, h))
                        if (!b.existsSync(k))
                          return [
                            2,
                            (console.warn(
                              'Could not find package `'.concat(e, '` ') + k,
                              ', skipping.'
                            ),
                            null),
                          ]
                        console.time('Copy dir safe')
                        return [4, eh(k, g, !n.replace)]
                      case 2:
                        d.sent(), console.timeEnd('Copy dir safe')
                        d.label = 3
                      case 3:
                        w = m(g)
                        if (!w) return [2, null]
                        D = ''
                        if (l) {
                          if (!n.pure) {
                            S =
                              '--pure option will be used by default, to override use --no-pure.'
                            a.workspaces
                              ? console.warn(
                                  'Because of `workspaces` enabled in this package ' +
                                    S
                                )
                              : u &&
                                console.warn(
                                  'Because of `pnpm-workspace.yaml` exists in this package ' +
                                    S
                                )
                          }
                          console.log(
                            ''
                              .concat(w.name, '@')
                              .concat(w.version, ' added to ')
                              .concat(j(eP.yalcPackagesFolder, i), ' purely')
                          )
                        }
                        if (!!l) return [3, 7]
                        O = j(r, 'node_modules', i)
                        ;(n.link || n.linkDep || ew(O)) && b.removeSync(O)
                        if (!(n.link || n.linkDep)) return [3, 4]
                        P = ek(g, O, 'junction')
                        return [3, 6]
                      case 4:
                        console.log({
                          destYalcCopyDir: g,
                          destModulesDir: O,
                          replace: n.replace,
                        }),
                          console.time('Copy dir safe')
                        return [4, eh(g, O, !n.replace)]
                      case 5:
                        P = (d.sent(), console.timeEnd('Copy dir safe'))
                        d.label = 6
                      case 6:
                        if ((P, !n.link)) {
                          ;(x = n.linkDep ? 'link:' : 'file:'),
                            (E = n.workspace
                              ? 'workspace:*'
                              : x + eP.yalcPackagesFolder + '/' + w.name),
                            (C = a.dependencies || {}),
                            (A = a.devDependencies || {}),
                            (N = n.dev ? A : C)
                          n.dev
                            ? C[w.name] && ((D = C[w.name]), delete C[w.name])
                            : C[w.name] || (A[w.name] && (N = A)),
                            N[w.name] !== E &&
                              ((D = D || N[w.name]),
                              (N[w.name] = E),
                              (a.dependencies = N === C ? C : a.dependencies),
                              (a.devDependencies =
                                N === A ? A : a.devDependencies),
                              (o = !0)),
                            (D = D == E ? '' : D)
                        }
                        if (w.bin && (n.link || n.linkDep)) {
                          ;(R = j(r, 'node_modules', '.bin')),
                            (I = function (e, n) {
                              var t = j(g, e),
                                a = j(R, n)
                              console.log(
                                'Linking bin script:',
                                F(r, g),
                                '->',
                                F(r, a)
                              )
                              try {
                                ek(t, a), b.chmodSync(t, 493)
                              } catch (e) {
                                console.warn('Could not create bin symlink.'),
                                  console.error(e)
                              }
                            })
                          if (typeof w.bin == 'string')
                            b.ensureDirSync(R), I(w.bin, w.name)
                          else if (p(w.bin) == 'object') {
                            b.ensureDirSync(R)
                            for (var M in w.bin) I(w.bin[M], M)
                          }
                        }
                        T = n.link ? 'linked' : 'added'
                        console.log(
                          'Package '
                            .concat(w.name, '@')
                            .concat(w.version, ' ')
                            .concat(T, ' ==> ')
                            .concat(O)
                        )
                        d.label = 7
                      case 7:
                        z = eN(g)
                        return [
                          2,
                          (s('postyalc.' + e),
                          {
                            signature: z,
                            name: i,
                            version: f,
                            replaced: D,
                            path: n.workingDir,
                          }),
                        ]
                    }
                  })
                })
                return function (n) {
                  return e.apply(this, arguments)
                }
              })()
            )
            return [4, Promise.all(f)]
          case 1:
            g = h
              .sent()
              .filter(function (e) {
                return !!e
              })
              .map(function (e) {
                return e
              })
            o && y(r, a),
              W(
                g.map(function (e) {
                  return {
                    name: e.name,
                    version: e.version,
                    replaced: e.replaced,
                    pure: l,
                    workspace: n.workspace,
                    file: n.workspace ? void 0 : !n.link && !n.linkDep && !l,
                    link: n.linkDep && !l,
                    signature: e.signature,
                  }
                }),
                { workingDir: n.workingDir }
              ),
              s('postyalc')
            return [4, Y(g)]
          case 2:
            h.sent(), n.update && ea(n.workingDir, e)
            return [2]
        }
      })
    })
    return function n(n, r) {
      return e.apply(this, arguments)
    }
  })()
var eO = C(),
  eP = {
    myNameIs: 'yalc',
    ignoreFileName: '.yalcignore',
    myNameIsCapitalized: 'Yalc',
    lockfileName: 'yalc.lock',
    yalcPackagesFolder: '.yalc',
    prescript: 'preyalc',
    postscript: 'postyalc',
    installationsFile: 'installations.json',
  },
  ej = global
function ex() {
  return ej.yalcStoreMainDir
    ? ej.yalcStoreMainDir
    : process.platform === 'win32' && process.env.LOCALAPPDATA
    ? j(process.env.LOCALAPPDATA, eP.myNameIsCapitalized)
    : j(eO, '.' + eP.myNameIs)
}
function eF() {
  return j(ex(), 'packages')
}
var eE = function (e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ''
    return j(eF(), e, n)
  },
  eC = { stdio: 'inherit' },
  eA = 'yalc.sig',
  eN = function (e) {
    var n = j(e, eA)
    try {
      return b.readFileSync(n, 'utf-8')
    } catch (e) {
      return ''
    }
  },
  eR = function (e) {
    var n = j(e, eP.ignoreFileName)
    try {
      return b.readFileSync(n, 'utf-8')
    } catch (e) {
      return ''
    }
  },
  eI = function (e, n) {
    var r = j(e, eA)
    try {
      b.writeFileSync(r, n)
    } catch (e) {
      throw (console.error('Could not write signature file'), e)
    }
  }
var eM = 8,
  eT = function (e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ''
    return new Promise(
      (function () {
        var r = t(function (r, t) {
          var a, o
          return d(this, function (i) {
            ;(a = w.createReadStream(e)), (o = k.createHash('md5'))
            o.update(n.replace(/\\/g, '/')),
              a.on('data', function (e) {
                return o.update(e)
              }),
              a.on('error', t).on('close', function () {
                r(o.digest('hex'))
              })
            return [2]
          })
        })
        return function (e, n) {
          return r.apply(this, arguments)
        }
      })()
    )
  },
  ez = (function () {
    var e = t(function (e, n) {
      var r
      var t = arguments
      return d(this, function (a) {
        switch (a.label) {
          case 0:
            r = t.length > 2 && t[2] !== void 0 ? t[2] : ''
            return [4, w.copy(e, n)]
          case 1:
            return [2, (a.sent(), eT(e, r))]
        }
      })
    })
    return function n(n, r) {
      return e.apply(this, arguments)
    }
  })(),
  eL = function (e, n) {
    return Object.keys(e).length === 0
      ? {}
      : Object.keys(e).reduce(function (r, t) {
          return e[t] && (r[t] = n(e[t], t)), r
        }, {})
  },
  eJ = function (e, n, r) {
    if (e !== '*' && e !== '^' && e !== '~') return e
    var t = e === '^' || e === '~' ? e : ''
    try {
      var a
      var o = h.resolve(j(n, 'package.json'), { paths: [r] }),
        i = (a = m(E(o))) === null || a === void 0 ? void 0 : a.version
      return ''.concat(t).concat(i) || '*'
    } catch (e) {
      return (
        console.warn('Could not resolve workspace package location for', n), '*'
      )
    }
  },
  eB = function (e, n) {
    var r = function (e) {
      return (
        e &&
        eL(e, function (e, r) {
          if (e.startsWith('workspace:')) {
            var t = e.split(':')[1],
              a = eJ(t, r, n)
            return (
              console.log(
                'Resolving workspace package '
                  .concat(r, ' version ==> ')
                  .concat(a)
              ),
              a
            )
          }
          return e
        })
      )
    }
    return u(c({}, e), {
      dependencies: r(e.dependencies),
      devDependencies: r(e.devDependencies),
      peerDependencies: r(e.peerDependencies),
    })
  },
  eW = function (e) {
    return u(c({}, e), {
      scripts: e.scripts
        ? u(c({}, e.scripts), { prepare: void 0, prepublish: void 0 })
        : void 0,
      devDependencies: void 0,
    })
  },
  e_ = function (e) {
    return e.replace(/^\.\//, '')
  },
  eG = (function () {
    var e = t(function (e) {
      var n, r, a, o, i, s, l, p, f, g, v, h, b, O, P, x
      return d(this, function (F) {
        switch (F.label) {
          case 0:
            ;(n = e.workingDir),
              (r = e.devMod),
              (a = r === void 0 ? !0 : r),
              (o = m(n))
            if (!o) throw 'Error copying package to store.'
            ;(i = e.workingDir),
              (s = j(eF(), o.name, o.version)),
              (l = eR(n)),
              (p = D().add(l))
            return [4, S({ path: n })]
          case 1:
            return [4, F.sent().map(e_)]
          case 2:
            f = F.sent().filter(function (e) {
              return !p.ignores(e)
            })
            e.content &&
              (console.info('Files included in published content:'),
              f.sort().forEach(function (e) {
                console.log('- '.concat(e))
              }),
              console.info('Total '.concat(f.length, ' files.')))
            g = (function () {
              var e = t(function () {
                return d(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [4, w.remove(s)]
                    case 1:
                      return [
                        2,
                        (e.sent(),
                        Promise.all(
                          f.sort().map(function (e) {
                            return ez(j(i, e), j(s, e), e)
                          })
                        )),
                      ]
                  }
                })
              })
              return function n() {
                return e.apply(this, arguments)
              }
            })()
            if (!e.changed) return [3, 4]
            return [
              4,
              Promise.all(
                f.sort().map(function (e) {
                  return eT(j(i, e), e)
                })
              ),
            ]
          case 3:
            b = F.sent()
            return [3, 6]
          case 4:
            return [4, g()]
          case 5:
            b = F.sent()
            F.label = 6
          case 6:
            ;(v = b), (h = k.createHash('md5').update(v.join('')).digest('hex'))
            if (!e.changed) return [3, 8]
            O = eN(s)
            if (h === O) return [2, !1]
            return [4, g()]
          case 7:
            F.sent()
            F.label = 8
          case 8:
            eI(s, h)
            ;(P = e.signature ? '+' + h.substr(0, eM) : ''),
              (x = u(
                c(
                  {},
                  (function (r) {
                    return e.workspaceResolve ? eB(r, n) : r
                  })(a ? eW(o) : o)
                ),
                { yalcSig: h, version: o.version + P }
              ))
            return [2, (y(s, x), h)]
        }
      })
    })
    return function n(n) {
      return e.apply(this, arguments)
    }
  })()
export {
  eP as A,
  ej as B,
  ex as C,
  eF as D,
  eE as E,
  eC as F,
  eN as G,
  eR as H,
  eI as I,
  eh as J,
  eS as K,
  eT as a,
  eG as b,
  L as c,
  J as d,
  B as e,
  W as f,
  _ as g,
  G as h,
  H as i,
  U as j,
  Y as k,
  $ as l,
  q as m,
  K as n,
  Q as o,
  V as p,
  Z as q,
  ee as r,
  en as s,
  er as t,
  et as u,
  ea as v,
  eo as w,
  ei as x,
  eu as y,
  ef as z,
}
