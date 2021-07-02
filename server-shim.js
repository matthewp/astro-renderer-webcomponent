import { render } from '@lit-labs/ssr/lib/render-with-global-dom-shim.js';
document.getElementsByTagName = () => [];

export { render }