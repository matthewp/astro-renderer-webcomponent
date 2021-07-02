async function polyfill() {
  const mod = '@webcomponents/template-shadowroot/template-shadowroot.js';
  const { hydrateShadowRoots } = await import(mod);
  hydrateShadowRoots(document.body);
}

if(new DOMParser().parseFromString(`<p><template shadowroot="open"></template></p>`, 'text/html', {
  includeShadowRoots: true
}).querySelector('p')?.shadowRoot)
  polyfill();