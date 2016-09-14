var counter = require('./counter')

module.exports = {
  model: model,
  view: view,
  viewWithoutData,
  addCounter: addCounter,
  updateCounter: updateCounter
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
  return model.counters.map(function (x, i) {
    return renderChild(counter.view, x, updateCounter, { index: i })
  }).reduce(function (a, b) {
    return a + ' ' + b
  }, '')
}

function viewWithoutData (model, dispatch, renderChild) {
  return model.counters.map(function (x, i) {
    return renderChild(counter.view, x, updateCounter)
  }).reduce(function (a, b) {
    return a + ' ' + b
  }, '')
}
