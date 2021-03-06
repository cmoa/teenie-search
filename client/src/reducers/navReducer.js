
var initialState = {
  screen: "HOME",
  emailAlert: "" // "" or "sending" or "photoSent" or "messageSent" or "error" or "composing"
}

export default (state = initialState, action) => {

  var newState = Object.assign({}, state)

  switch(action.type) {

    case "RESET_INTERACTIVE": 
      return initialState

    case "SEARCH": 
      newState.screen = "SEARCH_RESULTS"
      return newState

    case "OPEN_PHOTO": 
      newState.screen = "PHOTO"
      return newState

    case "CLOSE_PHOTO": 
      newState.screen = "SEARCH_RESULTS"
      return newState

    case "SEND_EMAIL":
      newState.emailAlert = "sending"
      return newState

    case "PHOTO_SENT":
      newState.emailAlert = "photoSent"
      return newState

    case "MESSAGE_SENT":
      newState.emailAlert = "messageSent"
      return newState

    case "DISMISS_EMAIL_ALERT":
      newState.emailAlert = ""
      return newState

    case "COMPOSE_EMAIL":
      newState.emailAlert = "composing"
      return newState

    default:
      return state
    }
}