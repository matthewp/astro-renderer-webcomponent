import {parseHTML} from 'linkedom';

export default function() {
  const {
    document, customElements, HTMLElement
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

  return assigns;
}