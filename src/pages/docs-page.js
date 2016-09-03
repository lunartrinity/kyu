export default { model, update, render }

import h from 'virtual-dom/h'
import marked from 'marked'

let docs = {}
docs.installation = require('../docs/INSTALLATION.md')

const msgType = {
}

function model (docId) {
  return {
    docsHTML: marked(docs.installation)
  }
}

function update (msg, model) {
}

function render (model, update, map, msg) {
  return h('div', { class: 'page' }, [
    'Docs Page ',
    h('ul', { class: 'app-nav' }, [
      h('li', { }, [
        h('a', { href: '/' }, ['home'])
      ]),
      h('li', { }, [
        h('a', { href: '/docs' }, ['docs'])
      ]),
    ]),
    h('ol', { class: 'side-nav' }, [
      h('li', { }, [
        h('a', { href: '/docs/installation' }, ['Installation'])
      ])
    ]),
    h('div', { innerHTML: model.docsHTML }, [])
  ])
}