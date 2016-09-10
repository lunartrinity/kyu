var h = require('virtual-dom/h')
var counter = require('./counter')

module.exports = {
  model: model,
  view: view
}

function model () {
  return {
    counters: []
  }
}

function addCounter (model, params) {
  var newCounters = model.counters.slice(0)
  newCounters.push(counter.model())

  return {
    counters: newCounters
  }
}

function updateCounter (model, params, updateChild) {
  var newCounters = model.counters.slice(0)
  newCounters[params.index] = updateChild(model.counters[params.index])

  return {
    counters: newCounters
  }
}

function view (model, dispatch, renderChild) {
  return h('div', { }, [
    h('button', {
      onclick: dispatch(addCounter)
    }, 'Add'),
    model.counters.map(function (x, i) {
      return h('div', { }, [
        renderChild (counter.view, x, updateCounter, { index: i })
      ])
    })
  ])
}
