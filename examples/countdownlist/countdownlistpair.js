var h = require('virtual-dom/h')
var countdownlist = require('./countdownlist')

module.exports = {
  model: model,
  view: view
}

function model () {
  return {
    topList: countdownlist.model(),
    bottomList: countdownlist.model()
  }
}

function updateTop (model, data, updateChild) {
  return {
    topList: updateChild(model.topList),
    bottomList: model.bottomList
  }
}

function updateBottom (model, data, updateChild) {
  return {
    topList: model.topList,
    bottomList: updateChild(model.bottomList)
  }
}

function view (model, dispatch, renderChild) {
  return h('div', { }, [
    h('div', { }, [
      renderChild(countdownlist.view, model.topList, updateTop)
    ]),
    h('div', { }, [
      renderChild(countdownlist.view, model.bottomList, updateBottom)
    ])
  ])
}
