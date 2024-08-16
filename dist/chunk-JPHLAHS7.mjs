import { d as a } from './chunk-3WPUBFY6.mjs'
import r from 'chalk'
var d,
  f,
  p,
  i = a(() => {
    ;(d = ({ output: t, methods: s }) => {
      let e = {}
      s.forEach((l) => {
        let o = l
        typeof console[o] == 'function' &&
          ((e[o] = console[o]),
          (console[o] = (...n) => {
            t({ method: o, args: n, oldMethods: e })
          }))
      })
    }),
      (f = () => {
        d({ methods: ['log', 'warn', 'info'], output: () => {} })
      }),
      (p = () => {
        d({
          methods: ['log', 'warn', 'error', 'info'],
          output: ({ method: t, args: s, oldMethods: e }) => {
            let o =
              { warn: r.yellowBright, info: r.blueBright, error: r.redBright }[
                t
              ] || ((n) => n)
            e[t](...s.map((n) => (typeof n == 'string' ? o(n) : n)))
          },
        })
      })
  })
export { f as a, p as b, i as c }
