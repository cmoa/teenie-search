
// screens = HOME, SEARCHRESUTLS

var initialState = {
  photo: {},
  related: {},
  relatedStatus: "NOT_LOADED"
}

export default (state = initialState, action) => {

  var newState = Object.assign({}, state)

  switch(action.type) {

  	case "RESET_INTERACTIVE": 
      return initialState

    case "OPEN_PHOTO": 
      newState.photo = action.photo
      return newState

    case "LOADING_RELATED":
      newState.related = {};
      newState.relatedStatus = "LOADING";
      return newState;

    case "RELATED_LOADED":
      newState.related = action.related;
      newState.relatedStatus = "LOADED";
      return newState;

    default:
      return state
    }
}