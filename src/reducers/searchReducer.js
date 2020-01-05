
var initialState = {
  term: "",
  searchTime: Date.now(),
  hits: [],
  hitsCount: 0,
  sortBy: "relevance",
  startDate: 1908, 
  endDate: 1998
}

export default (state = initialState, action) => {

  var newState = Object.assign({}, state)
  console.log(action);

  switch(action.type) {

    case "RESET_INTERACTIVE": 
      return initialState

    case "UPDATE_SEARCH":
      newState.term = action.term;
      return newState;

    case "SEARCH": 
      newState.term = action.term;
      newState.sortBy = action.sortBy;
      newState.startDate = action.startDate;
      newState.endDate = action.endDate;
      newState.searchTime = Date.now();
      newState.loading = true;
      return newState;

    case "UPDATE_RESULTS":
      newState.loading = false;
      return Object.assign(newState, action.updates);

    default:
      return state
    }
}