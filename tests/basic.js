var test = require('tape')
var kyu = require('../')

var app = kyu({
  model: {
    count: 0
  },
  update: function (msg, model) {
    switch (msg.val) {
      case 0:
        return { count: model.count + 1 }
      case 1:
        return { count: model.count - 1 }
    }
  },
  render: function (model, update, map, msg) {
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

  app.update({ val: 0, next: null })
  t.deepEqual(app.model, { count: 1 })

  app.update({ val: 1, next: null })
  t.deepEqual(app.model, { count: 0 })
})

test('update should also run onUpdate option', function (t) {
  t.plan(1)

  var tmpApp = kyu({
    model: { },
    update: function () { return { } },
    render: function () { return '' },
    onUpdate: function () {
      t.pass()
    }
  })

  tmpApp.update()
})

test('render should return a correct value', function (t) {
  t.plan(1)

  var newView = app.render()
  t.equal(newView, '')
})

test('map should return correct value', function (t) {
  t.plan(3)

  var newMsg = app.map(0, null)
  t.deepEqual(newMsg, { val: 0, next: null })

  newMsg = app.map(1, newMsg)
  t.deepEqual(newMsg, { val: 0, next: { val: 1, next: null } })

  newMsg = app.map(0, newMsg)
  t.deepEqual(newMsg, { val: 0, next: { val: 1, next: { val: 0, next: null } } })
})
