module.exports = {
  model: model,
  view: view,
  setData: setData,
  fetch: fetch,
  fetchEmpty: fetchEmpty
}

var mockData = 'MOCK'

function model () {
  return {
    data: ''
  }
}

function setData (model, data) {
  return {
    data: data
  }
}

function fetch (model) {
  return function (dispatch) {
    setTimeout(function () {
      dispatch(setData, mockData)
    }, 500)
  }
}

function fetchEmpty (model) {
  return function (dispatch) {
    setTimeout(function () {
      dispatch(setData)
    })
  }
}

function view (model, dispatch) {
  return 'data: ' + model.data
}
