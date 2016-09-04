var h = require('virtual-dom/h')

module.exports = {
  model: model,
  update: update,
  render: render
}

var msgType = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT'
}

function model () {
  return {
    count: 0
  }
}

function update (model, msg) {
  switch (msg.val) {
    case msgType.INCREMENT:
      return { count: model.count + 1 }
    case msgType.DECREMENT:
      return { count: model.count - 1 }
  }
}

function render (model, update, msg, map) {
  return h('div', { }, [
    h('button', {
      onclick: function () { update(msgType.DECREMENT, msg) } 
    }, '-'),
    ' ' + model.count + ' ',
    h('button', {
      onclick: function () { update(msgType.INCREMENT, msg) }
    }, '+')
  ])
}
