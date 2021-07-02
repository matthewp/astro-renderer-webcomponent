export default {
  name: '@matthewp/astro-renderer-webcomponent',
  server: './server.js',
  external: [
    'linkedom'
    //'@lit-labs/ssr/lib/render-with-global-dom-shim.js'
  ],
  polyfills: [
    //'./client-shim.js'
  ],
  hydrationPolyfills: [
    //'lit/experimental-hydrate-support.js'
  ],
  knownEntrypoints: [
    //'@matthewp/astro-renderer-lit/client-shim.js',
    //'@webcomponents/template-shadowroot/template-shadowroot.js'
  ]
};
