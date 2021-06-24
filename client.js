import 'lit/experimental-hydrate-support.js';
import {
  hasNativeDeclarativeShadowRoots,
  hydrateShadowRoots
} from '@webcomponents/template-shadowroot/template-shadowroot.js';

export default (element, moduleUrl) => async (_Component, props, _children) => {
  if (!hasNativeDeclarativeShadowRoots) {
    hydrateShadowRoots(element);
  }

  await import(moduleUrl);
}
