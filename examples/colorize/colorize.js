var h = require('virtual-dom/h')

module.exports = {
  model: model,
  update: update,
  render: render
}

var msgType = {
  CHANGE_COLOR: 'CHANGE_COLOR',
  GET_NEW_COLOR: 'GET_NEW_COLOR'
}

function model () {
  return {
    red: 0,
    green: 0,
    blue: 0,
  }
}

function getNewColor (dispatch) {
  var params = {
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255)
  }
  dispatch(msgType.CHANGE_COLOR, params)
}

function update (model, msg, params) {
  switch (msg.val) {
    case msgType.GET_NEW_COLOR:
      return getNewColor
    case msgType.CHANGE_COLOR:
      return { 
        red: params.red, 
        green: params.green, 
        blue: params.blue 
      }
  }
}

function render (model, dispatch) {
  var colorString = 'rgb(' + model.red +
    ', ' + model.green + ', ' + model.blue + ')'

  return h('div', { }, [
    h('div', { 
      style: {
        width: '100px',
        height: '100px',
        backgroundColor: colorString
      } 
    }, []),
    h('button', {
      onclick: dispatch (msgType.GET_NEW_COLOR) 
    }, 'Colorize')
  ])
}
