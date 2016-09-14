var test = require('tape')
var kyu = require('../')

var counter = require('./counter')
var fetcher = require('./fetcher')
var counterlist = require('./counterlist')

test('kyu should return empty object if no options are provided', function (t) {
  t.plan(1)

  var emptyApp = kyu()
  t.deepEqual(emptyApp, { })
})

test('model should have a correct value', function (t) {
  t.plan(1)

  var app = kyu({ model: counter.model(), view: counter.view })

  t.deepEqual(app.model, { count: 0 })
})

test('update should return a correct model', function (t) {
  t.plan(2)

  var app = kyu({ model: counter.model(), view: counter.view })

  app.update([{ action: counter.increment, data: { } }], [], [])
  t.deepEqual(app.model, { count: 1 })

  app.update([{ action: counter.decrement, data: { } }], [], [])
  t.deepEqual(app.model, { count: 0 })
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

  var app = kyu({ model: counter.model(), view: counter.view })
  var newView = app.render()

  t.equal(newView, 'counter')
})

test('update should handle effects correctly', function (t) {
  t.plan(1)

  var app = kyu({ model: fetcher.model(), view: fetcher.view })
  app.update([{ action: fetcher.fetch, data: { } }], [], [])

  setTimeout(function () {
    t.deepEqual(app.model, { data: 'MOCK' })
  }, 500)
})

test('render child should return correct value', function (t) {
  t.plan(1)

  var app = kyu({ model: counterlist.model(), view: counterlist.view })
  app.update([{ action: counterlist.addCounter, data: { } }], [], [])

  var rendered = app.render()

  t.equal(rendered, ' counter')
})

test('data should be empty object if not specified', function (t) {
  t.plan(2)

  var app = kyu({ model: fetcher.model(), view: fetcher.view })
  app.update([{ action: fetcher.fetchEmpty, data: { } }], [], [])

  setTimeout(function () {
    t.deepEqual(app.model, { data: { } })
  }, 500)

  var app2 = kyu({ model: counterlist.model(), view: counterlist.viewWithoutData })
  app2.update([{ action: counterlist.addCounter, data: { } }], [], [])

  var rendered = app2.render()

  t.equal(rendered, ' counter')
})
