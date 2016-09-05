var kyu = require('../kyu')
var countdown = require('./countdown')

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
  model: countdown.model(10),
  start: countdown.start,
  update: countdown.update,
  render: countdown.render,
  onUpdate: onUpdate
})

let tree = app.render()
let rootNode = createElement(tree)

document.getElementById('app').appendChild(rootNode)
