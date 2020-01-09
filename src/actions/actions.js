// Initialize algolia search
import algoliasearch from 'algoliasearch';
import _ from 'lodash';

const client = algoliasearch('PAR4VRQ7FL', '54989bad1637769e025e36cb106973b0');
const relevanceIndex = client.initIndex("teenie-search");
const dateAscendingIndex = client.initIndex("date_ascending");
const dateDescendingIndex = client.initIndex("date_descending");

// Default - sort by relevance , set by search action, read also by retrieve more hits action
var indexToSearch = relevanceIndex;

// Actions
export function resetInteractive() {
  console.log("reset interactive")
  return {
    type: "RESET_INTERACTIVE",
  }
}

export function openPhoto(photo) {
    console.log(photo);
    return {
      type: "OPEN_PHOTO",
      photo: photo,
    }
}


export function composeEmail() {
  return {
        type: "COMPOSE_EMAIL"
  }
}

export function sendPhoto(email, photo) {
  return dispatch => {
    dispatch({ type: "SEND_EMAIL" });

    // Send the email via mail chimp or whatever here
    setTimeout(() => {
        dispatch({ type: "PHOTO_SENT" });
    }, 2000);
  }
}

export function sendMessage(message, name, contact, photo) {
  return dispatch => {
    dispatch({ type: "SEND_EMAIL" });

    // Send the email via mail chimp or whatever here
    setTimeout(() => {
        dispatch({ type: "MESSAGE_SENT" });
    }, 2000);
  }
}

export function dismissEmailAlert() {
    return {
        type: "DISMISS_EMAIL_ALERT"
    }
}

export function closePhoto() {
    return {
        type: "CLOSE_PHOTO"
    }
}

export function updateSearchTerm(term){
  return {
      type: "UPDATE_SEARCH",
      term: term
  }
}


export function search(query, options = {}) {

  return dispatch => {

    var sortBy = options.sortBy || "relevance";
    var startDate = options.startDate || "1915";
    var endDate = options.endDate || "1980";

    dispatch({ type: "SEARCH", term: query, sortBy, startDate, endDate });

    var start_datetime = new Date(startDate, 0, 0, 0, 0, 0, 0);
    var end_datetime = new Date(endDate+1, 0, 0, 0, 0, 0, 0);
    var searchObj = { 
      hitsPerPage: 50, 
      query: query, 
      filters: `date_timestamp_earliest >= ${start_datetime.getTime() / 1000} AND date_timestamp_latest <= ${end_datetime.getTime() / 1000}`,
    };

    if (sortBy === "relevance") indexToSearch = relevanceIndex;
    else if (sortBy === "dateAscending") indexToSearch = dateAscendingIndex;
    else if (sortBy === "dateDescending") indexToSearch = dateDescendingIndex;

    indexToSearch.search(searchObj).then(res => {
      dispatch({
        type: "UPDATE_RESULTS",
        updates: {
          hits: res.hits,
          page: res.page,
          hitsCount: res.nbHits,
          pageCount: res.nbPages,
          hitsPerPage: res.hitsPerPage,
          term: query,
          timestamp: new Date().getTime(),
        }
      });
    });
  }
}

export function retrieveMoreHits() {

  console.log("RETRIEVING MORE HITS")

  return (dispatch, getState) => {
    const searchState = getState().search;

    var start_datetime = new Date(searchState.startDate, 0, 0, 0, 0, 0, 0);
    var end_datetime = new Date(searchState.endDate+1, 0, 0, 0, 0, 0, 0);

    var searchObj = { 
      hitsPerPage: 50, 
      query: searchState.term, 
      page: searchState.page + 1,
      filters: `date_timestamp_earliest >= ${start_datetime.getTime() / 1000} AND date_timestamp_latest <= ${end_datetime.getTime() / 1000}`,
    };

    indexToSearch.search(searchObj).then(res => {
      dispatch({
        type: "UPDATE_RESULTS",
        updates: {
          hits: _.concat(searchState.hits, res.hits),
          page: res.page,
        }
      });
    });
  }
}

