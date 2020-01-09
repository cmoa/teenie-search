
var initialState = {
  term: "",
  searchTimestamp: Date.now(),
  hits: [],
  hitsCount: 0,
  sortBy: "relevance",
  startDate: 1908, 
  endDate: 1998
}

export default (state = initialState, action) => {

  var newState = Object.assign({}, state)

  switch(action.type) {

    case "RESET_INTERACTIVE": 
      return initialState

    case "UPDATE_SEARCH":
      newState.term = action.term;
      return newState;

    case "SEARCH": 
      newState.loading = true;
      newState.term = action.term;
      newState.sortBy = action.sortBy;
      newState.startDate = action.startDate;
      newState.endDate = action.endDate;
      newState.searchTimestamp = Date.now();
      return newState;

    case "UPDATE_RESULTS":
      return Object.assign(newState, action.updates);

    case "RESULTS_LOADED": 
      newState.loading = false;
      return newState;

    default:
      return state
    }
}