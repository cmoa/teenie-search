
var initialState = {
  screen: "HOME",
  modal: "",
}

export default (state = initialState, action) => {

  var newState = Object.assign({}, state)

  switch(action.type) {

    case "SEARCH": 
      newState.screen = "SEARCH_RESULTS"
      return newState

    case "OPEN_PHOTO": 
      newState.modal = "PHOTO"
      return newState

    case "CLOSE_PHOTO": 
      newState.modal = ""
      return newState

    default:
      return state
    }
}