function e(e, n, r) {
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
import * as n from 'fs-extra'
import { join as r } from 'path'
import t from 'detect-indent'
var a = function (e) {
    var n = e.match(/(^@[^/]+\/)?([^@]+)@?(.*)/) || []
    return n
      ? { name: (n[1] || '') + n[2], version: n[3] || '' }
      : { name: '', version: '' }
  },
  i = function (e) {
    return t(e).indent
  }
function o(e) {
  var t,
    a = r(e, 'package.json')
  try {
    var o = n.readFileSync(a, 'utf-8')
    if (((t = JSON.parse(o)), !t.name && t.version))
      return (
        console.log('Package manifest', a, 'should contain name and version.'),
        null
      )
    var c = i(o) || '  '
    return (t.__Indent = c), t
  } catch (e) {
    return console.error('Could not read', a), null
  }
}
var c = function (n) {
  return Object.keys(n)
    .sort()
    .reduce(function (r, t) {
      return Object.assign(r, e({}, t, n[t]))
    }, {})
}
function s(e, t) {
  ;(t = Object.assign({}, t)),
    t.dependencies && (t.dependencies = c(t.dependencies)),
    t.devDependencies && (t.devDependencies = c(t.devDependencies))
  var a = t.__Indent
  delete t.__Indent
  var i = r(e, 'package.json')
  try {
    n.writeFileSync(i, JSON.stringify(t, null, a) + '\n')
  } catch (e) {
    console.error('Could not write ', i)
  }
}
export { a, o as b, s as c }
