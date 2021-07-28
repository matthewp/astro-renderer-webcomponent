
export const tagName = 'vanilla-element';

class VanillaElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    let div = document.createElement('div');
    let btn = document.createElement('button');
    let span = document.createElement('span');
    span.textContent = 'Count: 0';
    let count = 0;
    btn.addEventListener('click', () => {
      count++;
      span.textContent = `Count: ${count}`;
    });
    btn.textContent = 'Increment';
    div.textContent = 'This is a Vanilla element';
    div.append(btn);
    div.append(span);
    this.shadowRoot.append(div);
  }
}

customElements.define(tagName, VanillaElement);