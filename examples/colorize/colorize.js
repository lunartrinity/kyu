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

function getNewColor (update, msg) {
  var params = {
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255)
  }
  update(msgType.CHANGE_COLOR, msg, params)
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

function render (model, update, msg, map) {
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
      onclick: function () { update(msgType.GET_NEW_COLOR, msg) } 
    }, 'Colorize')
  ])
}
