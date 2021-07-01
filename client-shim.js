async function polyfill() {
  const {
    hydrateShadowRoots,
  } = await import('@webcomponents/template-shadowroot/template-shadowroot.js');

  hydrateShadowRoots(document.body);
}

function hasNativeDeclarativeShadowRoots() {
  const html = `<div><template shadowroot="open"></template></div>`;
  const fragment = new DOMParser().parseFromString(html, 'text/html', {
    includeShadowRoots: true
  });
  return !!fragment.querySelector('div')?.shadowRoot;
}

if(!hasNativeDeclarativeShadowRoots()) {
  polyfill();
}