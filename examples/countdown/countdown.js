var h = require('virtual-dom/h')

module.exports = {
  model: model,
  start: start,
  update: update,
  render: render
}

var msgType = {
  DECREMENT: 'DECREMENT',
  SET_TICK: 'SET_TICK'
}

function model (initialValue) {
  return {
    initialValue: initialValue,
    count: initialValue
  }
}

function start (model, dispatch) {
  dispatch(msgType.SET_TICK)
}

function update (model, msg, params) {
  switch (msg.val) {
    case msgType.DECREMENT:
      return {
        initialValue: model.initialValue,
        count: model.count - 1
      }
    case msgType.SET_TICK:
      return function (dispatch) {
        setTimeout(function () {
          dispatch(msgType.DECREMENT)
          dispatch(msgType.SET_TICK)
        }, 1000)
      }
  }
}

function render (model, dispatch) {
  return h('div', { }, [
    ' ' + model.count + ' ',
    h('button', { onclick: dispatch(msgType.SET_TICK) }, ['Start'])
  ])
}
