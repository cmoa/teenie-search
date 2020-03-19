
var initialState = {
  deviceWidth: window.innerWidth,
  deviceHeight: window.innerHeight,
  deviceSize: "large", // massive, medium or small 

  largeWidth: 1200,
  mediumWidth: 992, 
  smallWidth: 768 
}


export default (state = initialState, action) => {

  var newState = Object.assign({}, state)

  switch(action.type) {

    case "RESET_INTERACTIVE": 
      return initialState

    case "RESIZE_SCREEN": 
      newState.deviceWidth = action.width;
      newState.deviceHeight = action.height;
      if (action.width < state.smallWidth) {
        newState.deviceSize = "small";
      } else if (action.width >= state.smallWidth && action.width < state.mediumWidth) {
        newState.deviceSize = "medium";
      } else if (action.width >= state.mediumWidth && action.width < state.largeWidth) {
        newState.deviceSize = "large";
      } else {
        newState.deviceSize = "massive";
      }
      return newState

    default:
      return state
    }
}