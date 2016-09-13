var h = require('virtual-dom/h')

module.exports = {
  model: model,
  view: view
}

function model () {
  return {
    red: 0,
    green: 0,
    blue: 0,
  }
}

function getNewColor (model) {
  return function (dispatch) {
    var params = {
      red: Math.floor(Math.random() * 255),
      green: Math.floor(Math.random() * 255),
      blue: Math.floor(Math.random() * 255)
    }
    dispatch(changeColor, params)
  }
}

function changeColor (model, params) {
  return {
    red: params.red, 
    green: params.green, 
    blue: params.blue
  }
}

function view (model, dispatch) {
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
      onclick: function () { dispatch (getNewColor) }
    }, 'Colorize')
  ])
}
