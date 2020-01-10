
// screens = HOME, SEARCHRESUTLS

var initialState = {
  photo: {},
}

export default (state = initialState, action) => {

  var newState = Object.assign({}, state)

  switch(action.type) {

  	case "RESET_INTERACTIVE": 
      return initialState

    case "OPEN_PHOTO": 
      newState.photo = action.photo
      return newState

    default:
      return state
    }
}