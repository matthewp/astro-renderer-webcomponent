import {DOMParser} from 'linkedom';
import shim from './server-shim.js';
const { customElements } = shim();

function getConstructor(tagNameOrComponent) {
  if(typeof tagNameOrComponent === 'string') {
    const Ctr = customElements.get(tagNameOrComponent);
    return Ctr;
  }
  return null;
}

async function check(tagNameOrComponent, _props, _children) {
  if(getConstructor(tagNameOrComponent)) {
    return true;
  }

  return false;
}

function * serializeFragment(frag) {
  for(let node of frag.childNodes) {
    yield * serialize(node);
  }
}

function * serializeElement(el) {
  yield `<${el.localName}`;
  for(let {name, value} of el.attributes) {
    yield ` ${name}="${value}"`;
  }
  yield `>`;
  if(el.shadowRoot) {
    yield `<template shadowroot="open">`;
    yield * serializeFragment(el.shadowRoot);
    yield `</template>`;
  }
  for(let child of el.childNodes) {
    yield * serialize(child);
  }
  yield `</${el.localName}>`;
}

function * serialize(node) {
  switch(node.nodeType) {
    case 1: {
      yield * serializeElement(node);
      break;
    }
    case 3: {
      yield node.data;
      break;
    }
    case 8: {
      throw new Error('Cannot serialize comments');
    }
    case 11: {
      yield * serializeFragment(node);
      break;
    }
  }
}

async function renderToStaticMarkup(tagNameOrComponent, props, children) {
  const Element = getConstructor(tagNameOrComponent);
  const el = new Element();
  for(let [key, value] of Object.entries(props)) {
    el.setAttribute(key, value.toString());
  }

  if(children) {
    const nodes = new DOMParser().parseFromString(children, 'text/html').childNodes;
    el.append(...nodes);
  }

  if(typeof el.connectedCallback === 'function') {
    el.connectedCallback();
  }

  let out = '';
  try {
    for(let chunk of serialize(el)) {
      out += chunk;
    }
  } catch(err) {
    debugger;
  }

  


  console.log('out is...', out);

  return {
    html: out
  };
}

export default {
  check,
  renderToStaticMarkup
};
