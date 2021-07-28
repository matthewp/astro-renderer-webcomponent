
import { stamp } from 'grim2';

const raw = document.createElement('template');
raw.innerHTML = /* html */ `
  <h1>Hello {{name}}!</h1>
`;
const template = stamp(raw);

const tagName = 'hello-world';

class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const name = this.getAttribute('name');
    let frag = template.createInstance({
      name
    });
  
    this.shadowRoot.append(frag);
  }
}

customElements.define(tagName, HelloWorld);