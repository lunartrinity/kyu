var h = require('virtual-dom/h')
var countdownlistpair = require('./countdownlistpair')

module.exports = {
  model: model,
  view: view
}

function model () {
  return {
    topList: countdownlistpair.model(),
    bottomList: countdownlistpair.model()
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
      renderChild(countdownlistpair.view, model.topList, updateTop)
    ]),
    h('div', { }, [
      renderChild(countdownlistpair.view, model.bottomList, updateBottom)
    ])
  ])
}
