var h = require('virtual-dom/h')

module.exports = {
  model: model,
  view: view
}

function model () {
  return { count: 0 }
}

function startInc (model) {
  return function (dispatch) {
    dispatch(increment)
  }
}

function increment (model) {
  return { count: model.count + 1 }
}

function decrement (model) {
  return { count: model.count - 1 }
}

function view (model, dispatch) {
  return h('div', { }, [
    h('button', {
      onclick: dispatch(decrement)
    }, '-'),
    ' ' + model.count + ' ',
    h('button', {
      onclick: dispatch(startInc)
    }, '+')
  ])
}
