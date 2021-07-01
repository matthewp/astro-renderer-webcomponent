export default {
  name: '@matthewp/astro-renderer-lit',
  server: './server.js',
  external: [
    '@lit-labs/ssr/lib/render-with-global-dom-shim.js'
  ],
  polyfills: [
    './client-shim.js'
  ],
  hydrationPolyfills: [
    'lit/experimental-hydrate-support.js'
  ],
  knownEntrypoints: [
    '@matthewp/astro-renderer-lit/client-shim.js',
    '@webcomponents/template-shadowroot/template-shadowroot.js'
  ]
};
