export default {
  name: '@matthewp/astro-renderer-lit',
  client: './client',
  server: './server',
  external: [
    '@lit-labs/ssr/lib/render-with-global-dom-shim.js'
  ]
};
