var kyu = require('../kyu')
var colorize = require('./colorize')

var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var createElement = require('virtual-dom/create-element')

function onUpdate () {
  var newTree = app.render()
  var patches = diff(tree, newTree)
  rootNode = patch(rootNode, patches)
  tree = newTree
}

var app = kyu({
  model: colorize.model(),
  view: colorize.view,
  onUpdate: onUpdate
})

var tree = app.render()
var rootNode = createElement(tree)

document.getElementById('app').appendChild(rootNode)
