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

  // Update the app's model and run custom command
  // (object)
  function update (msgVal, msg, params) {
    let newMsg = map(msgVal, msg)
    let res = _update(app.model, newMsg, params)

    if (typeof res === 'function') {
      res(update, msg)
    } else {
      app.model = res
      
      if (typeof options.onUpdate === 'function') {
        options.onUpdate()
      }
    }
  }

  // Get current view
  // () -> any
  function render () {
    return _render(app.model, app.update, null, app.map)
  }

  // Add new msg
  // (number/string, object) -> object
  function map (msgVal, msg) {
    if (!msg) {
      return {
        val: msgVal,
        next: null
      }
    } else if (!msg.next) {
      return {
        val: msg.val,
        next: {
          val: msgVal,
          next: null
        }
      }
    } else {
      return {
        val: msg.val,
        next: map(msgVal, msg.next)
      }
    }
  }

  return app
}
