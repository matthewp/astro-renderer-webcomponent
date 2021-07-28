
export const tagName = 'vanilla-element';

class VanillaElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    let div = document.createElement('div');
    div.textContent = 'This is a Vanilla element';
    this.shadowRoot.append(div);
  }
}

customElements.define(tagName, VanillaElement);