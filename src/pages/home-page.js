export default { model, update, render }

import h from 'virtual-dom/h'

const msgType = {
}

function model () {
  return {
  }
}

function update (msg, model) {
}

function render (model, update, map, msg) {
  return h('div', { class: 'page' }, [
    'Home Page',
    h('ul', { class: 'app-nav' }, [
      h('li', { }, [
        h('a', { href: '/' }, ['home'])
      ]),
      h('li', { }, [
        h('a', { href: '/docs' }, ['docs'])
      ]),
    ])
  ])
}
