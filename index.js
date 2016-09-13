module.exports = kyu

// Initiate a new kyu app
function kyu (options) {
  if (!options) {
    return { }
  }

  var app = { }

  // Application model
  app.model = options.model

  // Get current view
  app.render = function () {
    var dispatch = createDispatch([])
    var renderChild = createRenderChild([])

    return options.view(app.model, dispatch, renderChild)
  }

  // Update the app's model
  app.update = function (newMsgs, oldMsgs, effects) {
    var updateChild = createUpdateChild(newMsgs, oldMsgs, effects)

    var res = updateChild(app.model)

    app.model = res

    while (effects.length > 0) {
      var eff = effects.shift()
      eff.action(eff.dispatch)
    }

    if (typeof options.onUpdate === 'function') {
      options.onUpdate()
    }
  }

  // Create a function for dispatching message
  function createDispatch (msgs) {
    return function (action, data) {
      data = data || { }

      var newMsgs = msgs.slice(0)
      newMsgs.push({ action: action, data: data })

      app.update(newMsgs, msgs, [])
    }
  }

  // Create a function for rendering child view
  function createRenderChild (msgs) {
    return function (view, model, action, data) {
      data = data || { }

      var newMsgs = msgs.slice(0)
      newMsgs.push({ action: action, data: data })

      var dispatch = createDispatch(newMsgs)
      var renderChild = createRenderChild(newMsgs)

      return view(model, dispatch, renderChild)
    }
  }

  // Create a function to update child component
  function createUpdateChild (newMsgs, oldMsgs, effects) {
    return function (model) {
      if (!newMsgs || newMsgs.length === 0) {
        return model
      } else {
        var currentMsgs = newMsgs.slice(0)
        var currentMsg = currentMsgs.shift()

        var updateChild = createUpdateChild(currentMsgs, oldMsgs, effects)

        var res = currentMsg.action(model, currentMsg.data, updateChild)

        if (typeof res === 'function') {
          var dispatch = createDispatch(oldMsgs)
          effects.push({ action: res, dispatch: dispatch })

          return model
        } else {
          return res
        }
      }
    }
  }

  return app
}
