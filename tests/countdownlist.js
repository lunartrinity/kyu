var countdown = require('./countdown')

module.exports = {
  model: model,
  view: view
}

function model () {
  return {
    countdowns: []
  }
}

function addCountdown (model, params) {
  var newCountdowns = model.countdowns.slice(0)
  newCountdowns.push(countdown.model(params.initialCount))

  return {
    countdowns: newCountdowns
  }
}

function updateCountdown (model, params, updateChild) {
  var newCountdowns = model.countdowns.slice(0)
  newCountdowns[params.index] = updateChild(model.countdowns[params.index])

  return {
    countdowns: newCountdowns
  }
}

function view (model, dispatch, renderChild) {
  return 'countdownlist'
}
