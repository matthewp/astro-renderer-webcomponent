//import { h, Component as BaseComponent } from 'preact';
//import { renderToString } from 'preact-render-to-string';
//import StaticHtml from './static-html.js';
import { render } from '@lit-labs/ssr/lib/render-with-global-dom-shim.js';

function isCustomElementTag(name) {
  return typeof name === 'string' && /-/.test(name);
}

function getCustomElementConstructor(name) {
  if(typeof customElements !== 'undefined' && isCustomElementTag(name)) {
    return customElements.get(name) || null;
  }
  if(typeof name === 'function') {
    return name;
  }
  return null;
}

async function isLitElement(Component) {
  const { LitElement } = await import('lit');
  const Ctr = getCustomElementConstructor(Component);
  if(Ctr && LitElement.isPrototypeOf(Ctr)) {
    return true;
  }
  return false;
}

async function check(Component, _props, _children) {
  if(await isLitElement(Component)) {
    return true;
  }
  // TODO other checks (Haunted?)
  return false;
}

function compileTemplate(tag, props) {
  const template = [`<${tag} `];
  const values = [];
  for(const [key, value] of Object.entries(props)) {
    let lastEntry = template[template.length - 1];
    lastEntry += `${key}=`;
    template[template.length - 1] = lastEntry;
    values.push(value);
    template.push('');
  }
  template.pop();
  template.push(`></${tag}>`);
  Object.defineProperty(template, 'raw', {
    enumerable: false,
    writable: false,
    value: Array.from(template)
  });
  return template;
}

const templateCache = new Map();

async function getTemplate(tag, props) {
  const key = tag + '-' + Object.keys(props).join('-');
  if(templateCache.has(key)) {
    return templateCache.get(key);
  }
  const template = compileTemplate(tag, props);
  templateCache.set(key, template);
  return template;
}

async function renderToStaticMarkup(Component, props, children) {
  // TODO caching templates
  const { html } = await import('lit');
  const template = compileTemplate(Component, props);

  const result = render(html(template, ...values));
  let out = '';
  for(let chunk of result) {
    out += chunk;
  }

  return {
    html: out
  };
}

function getComponentInfo(Component, _props, _children, options = {}) {
  

  return {
    url: `/_astro/src/components/Test.js`,
    export: 'default'
  };
}

const hydrationMethod = 'self';

export default {
  check,
  renderToStaticMarkup,
  getComponentInfo,
  hydrationMethod,
};
