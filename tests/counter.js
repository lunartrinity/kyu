module.exports = {
  model: model,
  view: view,
  increment: increment,
  decrement: decrement
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
  return 'counter'
}
