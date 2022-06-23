if (!self.define) {
  let e,
    s = {}
  const r = (r, i) => (
    (r = new URL(r + '.js', i).href),
    s[r] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;(e.src = r), (e.onload = s), document.head.appendChild(e)
        } else (e = r), importScripts(r), s()
      }).then(() => {
        let e = s[r]
        if (!e) throw new Error(`Module ${r} didn’t register its module`)
        return e
      })
  )
  self.define = (i, n) => {
    const t =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href
    if (s[t]) return
    let l = {}
    const o = (e) => r(e, t),
      u = { module: { uri: t }, exports: l, require: o }
    s[t] = Promise.all(i.map((e) => u[e] || o(e))).then((e) => (n(...e), l))
  }
}
define(['./workbox-b3e22772'], function (e) {
  self.addEventListener('message', (e) => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting()
  }),
    e.precacheAndRoute(
      [
        { url: 'assets/index.01acb311.js', revision: null },
        { url: 'assets/others.75052606.js', revision: null },
        { url: 'assets/react.890c30fa.js', revision: null },
        { url: 'assets/reactFamily.357558b2.js', revision: null },
        { url: 'assets/rtk.2613b31b.js', revision: null },
        { url: 'index.html', revision: '08efadc8e8265a847f024dbc02efd433' },
        {
          url: 'mockServiceWorker.js',
          revision: 'e053b9791c172d649dff822585356e94',
        },
        {
          url: 'manifest.webmanifest',
          revision: 'ad6bab1cfac48cbb37a42aaab7f7e95f',
        },
      ],
      {},
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL('index.html')),
    )
})
