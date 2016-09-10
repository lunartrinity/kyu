module.exports = kyu

function kyu (options) {
  var app = { }

  app.model = options.model

  app.render = function () {
    var dispatch = createDispatchWithEvent([])
    var renderChild = createRenderChild([])

    return options.view(app.model, dispatch, renderChild)
  }

  app.update = function (newMsgs, oldMsgs, e) {    
    var updateChild = createUpdateChild(newMsgs, oldMsgs)

    var res = updateChild(app.model)            
    
    if (typeof res === 'function') {      
      var dispatch = createDispatch(oldMsgs)

      res(dispatch)
    } else {
      app.model = res
    }

    if (typeof options.onUpdate === 'function') {
      options.onUpdate()
    }
  }
  
  // Create a function for dispatching message
  // (object) -> (string, object)
  function createDispatch (msgs) {
    return function (action, data) {      
      data = data || { }

      var newMsgs = msgs.slice(0)
      newMsgs.push({ action: action, data: data })

      app.update(newMsgs, msgs)
    }
  }
  
  // Create a function for dispatching message, with event
  // (object) -> ((string, object) -> (e))
  function createDispatchWithEvent (msgs) {
    return function (action, data) {
      data = data || { }

      return function (e) {        
        var newMsgs = msgs.slice(0)
        newMsgs.push({ action: action, data: data })

        app.update(newMsgs, msgs, e)
      }
    }
  }

  function createRenderChild (msgs) {
    return function (view, model, action, data) {
      data = data || { }

      var newMsgs = msgs.slice(0)
      newMsgs.push({ action: action, data: data })

      var dispatch = createDispatchWithEvent(newMsgs)
      var renderChild = createRenderChild(newMsgs)

      return view (model, dispatch, renderChild)
    }
  }

  function createUpdateChild (newMsgs, oldMsgs) {
    return function (model) {
      if (!newMsgs || newMsgs.length == 0) {
        return model
      } else {
        var currentMsgs = newMsgs.slice(0)
        var currentMsg = currentMsgs.shift()
        
        var updateChild = createUpdateChild(currentMsgs, newMsgs)

        var res = currentMsg.action(model, currentMsg.data, updateChild)

        return res
      }
    }
  }

  return app
}