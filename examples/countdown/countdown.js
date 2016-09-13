var h = require('virtual-dom/h')

module.exports = {
  model: model,
  view: view
}

var state = {
  WAITING: 0,
  COUNTING: 1,
  FINISHED: 2
}

function model (initialValue) {
  return {
    initialValue: initialValue,
    count: initialValue,
    state: state.WAITING
  }
}

function decrement (model) {
  return {
    initialValue: model.initialValue,
    count: model.count - 1,
    state: model.count === 1 ? state.FINISHED : state.COUNTING
  }
}

function startCount (model) {
  return {
    initialValue: model.initialValue,
    count: model.initialValue,
    state: state.COUNTING
  }
}

function restart (model) {
  return function (dispatch) {
    dispatch(startCount)
    dispatch(setTick)
  }
}

function setTick (model) {
  return function (dispatch) {
    setTimeout(function () {
      dispatch(decrement)

      if (model.state === state.COUNTING && model.count > 1) {
        dispatch(setTick)
      }
    }, 1000)
  }
}

function view (model, dispatch) {
  switch (model.state) {
    case state.WAITING:
      return h('div', { }, [
        ' ' + model.count + ' ',
        h('button', { 
          onclick: function () { dispatch(restart) } 
        }, ['Start'])
      ])
    case state.COUNTING:
      return h('div', { }, [
        ' ' + model.count + ' '
      ])
    case state.FINISHED:
      return h('div', { }, [
        ' BOOM!!! ',
        h('button', { onclick: function () { 
          dispatch(restart) } 
        }, ['Restart'])
      ])
  }
}
