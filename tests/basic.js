var test = require('tape')
var kyu = require('../')

var app = kyu({
  model: {
    count: 0
  },
  view: function (model, update, map, msg) {
    return ''
  }
})

test('kyu should return empty object if no options are provided', function (t) {
  t.plan(1)

  var emptyApp = kyu()
  t.deepEqual(emptyApp, { })
})

test('model should have a correct value', function (t) {
  t.plan(1)
  t.deepEqual(app.model, { count: 0 })
})

test('update should return a correct model', function (t) {
  t.plan(2)

  var inc = function (model) {
    return { count: model.count + 1 }
  }

  app.update([{ action: inc, data: { } }], [], [])
  t.deepEqual(app.model, { count: 1 })

  app.update([{ action: inc, data: { } }], [], [])
  t.deepEqual(app.model, { count: 2 })
})

test('update should also run onUpdate option', function (t) {
  t.plan(1)

  var tmpApp = kyu({
    model: { },
    view: function () { return '' },
    onUpdate: function () {
      t.pass()
    }
  })

  tmpApp.update([], [], [])
})

test('render should return a correct value', function (t) {
  t.plan(1)

  var newView = app.render()
  t.equal(newView, '')
})
