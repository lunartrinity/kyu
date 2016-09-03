import HomePage from './pages/home-page'
import DocsPage from './pages/docs-page'

import kyu from 'kyu'
import page from 'page'
import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'

require('normalize.css')

function onUpdate () {
  let newTree = app.render()
  let patches = diff(tree, newTree)
  rootNode = patch(rootNode, patches)
  tree = newTree
}

function init (currentComponent, model) {
  let app = kyu({
    model: model,
    update: currentComponent.update,
    render: currentComponent.render,
    onUpdate
  })

  let tree = app.render()
  let rootNode = createElement(tree)

  document.getElementById('app').innerHTML = ''
  document.getElementById('app').appendChild(rootNode)
}

page('/', function () {
  init(HomePage, HomePage.model())
})
page('/docs', function () {
  init(DocsPage, DocsPage.model('installation'))
})
page('/docs/:docId', function (context) {
  init(DocsPage, DocsPage.model(context.params.docId))
})
page('*', function () {
  init(HomePage, HomePage.model())
})
page({ hashbang: true })
