import {parseHTML} from 'linkedom';

function renderingComplete() {
  if(this.constructor._$litElement$) {
    return this.updateComplete;
  }
}

export default function() {
  const {
    document, customElements, HTMLElement, window
    // other exports ..
  } = parseHTML(`
    <!doctype html>
    <html>
      <head>
        <title></title>
      </head>
      <body></body>
    </html>
  `);

  const assigns = {
    document,
    customElements,
    HTMLElement
  };

  Object.assign(globalThis, assigns);
  Object.assign(globalThis, window);

  Object.defineProperty(HTMLElement.prototype, Symbol.for('wc.renderingComplete'), {
    enumerable: false,
    writable: true,
    value: renderingComplete
  })

  return assigns;
}