import { render } from './server-shim.js';
import { html } from 'lit';

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
  const Ctr = getCustomElementConstructor(Component);
  return !!(Ctr && Ctr._$litElement$);
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
  for(const [key] of Object.entries(props)) {
    let lastEntry = template[template.length - 1];
    lastEntry += ` ${key}=`;
    template[template.length - 1] = lastEntry;
    template.push('');
  }
  if(template.length > 1) {
    template.pop();
    template.push(`></${tag}>`);
  } else {
    template[0] += `></${tag}>`;
  }
  
  Object.defineProperty(template, 'raw', {
    enumerable: false,
    writable: false,
    value: Array.from(template)
  });
  return template;
}

const templateCache = new Map();

function getTemplate(tag, props) {
  const key = tag + '-' + Object.keys(props).join('-');
  if(templateCache.has(key)) {
    return templateCache.get(key);
  }
  const template = compileTemplate(tag, props);
  templateCache.set(key, template);
  return template;
}

async function renderToStaticMarkup(Component, props, children) {
  const template = getTemplate(Component, props);
  const values = Object.values(props);

  const result = render(html(template, ...values));
  let out = '';
  for(let chunk of result) {
    out += chunk;
  }

  return {
    html: out
  };
}

export default {
  check,
  renderToStaticMarkup
};
