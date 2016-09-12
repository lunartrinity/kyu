var kyu = require('../kyu')
var countdownlist = require('./countdownlist')

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
  model: countdownlist.model(),
  view: countdownlist.view,
  onUpdate: onUpdate
})

var tree = app.render()
var rootNode = createElement(tree)

document.getElementById('app').appendChild(rootNode)
