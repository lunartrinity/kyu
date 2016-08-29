module.exports = kyu

// Initiate kyu apps
// (object) -> object
function kyu (options) {
  if (!options) {
    return { }
  }

  var _model = options.model
  var _update = options.update
  var _render = options.render

  var app = {
    model: _model,
    update: update,
    render: render,
    map: map
  }

  function newMsg (msg, nextMsgVal) {
    if (msg.next === null) {
      return {
        val: msg.val,
        next: {
          val: nextMsgVal,
          next: null
        }
      }
    } else {
      return {
        val: msg.val,
        next: newMsg(msg.next, nextMsgVal)
      }
    }
  }

  function update (msg) {
    app.model = _update(msg, app.model)

    if (typeof options.onUpdate === 'function') {
      options.onUpdate()
    }
  }

  function render () {
    return _render(app.model, app.update, app.map, null)
  }

  function map (msgVal, msg) {
    if (!msg) {
      return {
        val: msgVal,
        next: null
      }
    } else {
      return newMsg(msg, msgVal)
    }
  }

  return app
}
