export default {
  name: '@matthewp/astro-renderer-webcomponent',
  server: './server.js',
  external: [
    'linkedom'
  ],
  polyfills: [
    '@matthewp/astro-renderer-webcomponent/client-shim.js'
  ],
  knownEntrypoints: [
    '@webcomponents/template-shadowroot/template-shadowroot.js'
  ]
};
