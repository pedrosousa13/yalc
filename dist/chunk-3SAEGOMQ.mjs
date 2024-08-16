function e(e) {
  '@swc/helpers - typeof'
  return e && typeof Symbol !== 'undefined' && e.constructor === Symbol
    ? 'symbol'
    : typeof e
}
var r = (function (r) {
  return (typeof require === 'undefined' ? 'undefined' : e(require)) < 'u'
    ? require
    : (typeof Proxy === 'undefined' ? 'undefined' : e(Proxy)) < 'u'
    ? new Proxy(r, {
        get: function (r, n) {
          return ((typeof require === 'undefined' ? 'undefined' : e(require)) <
          'u'
            ? require
            : r)[n]
        },
      })
    : r
})(function (r) {
  if ((typeof require === 'undefined' ? 'undefined' : e(require)) < 'u')
    return require.apply(this, arguments)
  throw Error('Dynamic require of "' + r + '" is not supported')
})
export { r as a }
