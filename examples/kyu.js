module.exports = kyu

// Initiate kyu apps
// (object) -> object
function kyu (options) {
  if (!options) {
    return { }
  }

  var _model = options.model
  var _start = options.start
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
  function update (newMsg, oldMsg, params) {
    let res = _update(app.model, newMsg, params)

    if (typeof res === 'function') {      
      var dispatch = createDispatch(oldMsg)

      res(dispatch)
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
    var dispatch = createDispatchWithEvent(null)
    var renderChild = createRenderChild(null)

    return _render(app.model, dispatch, renderChild)
  }

  // Create a function for rendering child
  // (object) -> (string, (object, function, function) -> any)
  function createRenderChild (msg) {
    return function (msgVal, renderFunc) {
      var newMsg = map(msgVal, msg)
      var dispatch = createDispatchWithEvent(newMsg)
      var renderChild = createRenderChild(newMsg)      

      return renderFunc(app.model, dispatch, renderChild)
    }
  }

  // Create a function for dispatching message
  // (object) -> (string, object)
  function createDispatch (msg) {
    return function (msgVal, params) {
      var newMsg = map(msgVal, msg)
      app.update(newMsg, msg, params)
    }
  }
  
  // Create a function for dispatching message, with event
  // (object) -> ((string, object) -> (e))
  function createDispatchWithEvent (msg) {
    return function (msgVal, params) {
      return function (e) {
        var newMsg = map(msgVal, msg)
        app.update(newMsg, msg, params, e)
      }
    }
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

  if (typeof _start === 'function') {
    var dispatch = createDispatch(null)

    _start(app.model, dispatch)
  }

  return app
}
