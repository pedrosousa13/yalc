import { a as i, b as o, c as u, d } from './chunk-3WPUBFY6.mjs'
import c from 'fs'
var a,
  l,
  s,
  f,
  k,
  p = d(() => {
    ;(a = u('ini')),
      (l = [
        'sig',
        'workspace-resolve',
        'dev-mod',
        'scripts',
        'quiet',
        'files',
      ]),
      (s = '.yalcrc'),
      (f = () =>
        c.existsSync(s) ? a.parse(c.readFileSync(s, 'utf-8')) : null),
      (k = () => {
        let e = f()
        if (!e) return {}
        let t = Object.keys(e).filter((n) => !l.includes(n))
        return (
          t.length &&
            (console.warn(`Unknown option in ${s}: ${t[0]}`), process.exit()),
          Object.keys(e).reduce(
            (n, r) => (l.includes(r) ? o(i({}, n), { [r]: e[r] }) : n),
            {}
          )
        )
      })
  })
export { k as a, p as b }
