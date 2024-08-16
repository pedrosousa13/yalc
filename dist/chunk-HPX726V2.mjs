import { d as o } from './chunk-3WPUBFY6.mjs'
import * as r from 'fs-extra'
import { join as c } from 'path'
import g from 'detect-indent'
function u(n) {
  let e,
    t = c(n, 'package.json')
  try {
    let s = r.readFileSync(t, 'utf-8')
    if (((e = JSON.parse(s)), !e.name && e.version))
      return (
        console.log('Package manifest', t, 'should contain name and version.'),
        null
      )
    let a = p(s) || '  '
    return (e.__Indent = a), e
  } catch (s) {
    return console.error('Could not read', t), null
  }
}
function P(n, e) {
  ;(e = Object.assign({}, e)),
    e.dependencies && (e.dependencies = i(e.dependencies)),
    e.devDependencies && (e.devDependencies = i(e.devDependencies))
  let t = e.__Indent
  delete e.__Indent
  let s = c(n, 'package.json')
  try {
    r.writeFileSync(
      s,
      JSON.stringify(e, null, t) +
        `
`
    )
  } catch (a) {
    console.error('Could not write ', s)
  }
}
var f,
  p,
  i,
  l = o(() => {
    ;(f = (n) => {
      let e = n.match(/(^@[^/]+\/)?([^@]+)@?(.*)/) || []
      return e
        ? { name: (e[1] || '') + e[2], version: e[3] || '' }
        : { name: '', version: '' }
    }),
      (p = (n) => g(n).indent)
    i = (n) =>
      Object.keys(n)
        .sort()
        .reduce((e, t) => Object.assign(e, { [t]: n[t] }), {})
  })
export { f as a, u as b, P as c, l as d }
