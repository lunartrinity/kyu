var h = require('virtual-dom/h')

module.exports = {
  model: model,
  view: view
}

function model () {
  return { count: 0 }
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
      onclick: function () { dispatch(decrement) }
    }, '-'),
    ' ' + model.count + ' ',
    h('button', {
      onclick: function () { dispatch(increment) }
    }, '+')
  ])
}
