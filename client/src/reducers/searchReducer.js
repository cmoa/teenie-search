
var initialState = {
  term: "",
  hits: [],
  hitsCount: 0,
}

export default (state = initialState, action) => {

  var newState = Object.assign({}, state)
  console.log(action);

  switch(action.type) {

    case "UPDATE_SEARCH":
      newState.term = action.term;
      console.log(newState)
      return newState;

    case "SEARCH": 
      newState.term = action.term;
      return newState;

    case "UPDATE_RESULTS": 
      newState.hits = action.hits;
      newState.hitsCount = action.hitsCount;
      return newState;

    default:
      return state
    }
}