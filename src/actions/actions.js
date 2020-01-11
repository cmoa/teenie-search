// Initialize algolia search
import algoliasearch from 'algoliasearch';
import _ from 'lodash';

const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_API_KEY);
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


export function resultsLoaded() {
  return {
        type: "RESULTS_LOADED"
  }
}

export function sendPhoto(email, photo) {
  return dispatch => {
    dispatch({ type: "SEND_EMAIL" });

    // console.log(photo);

    // const data = {
    //   from: "Mailgun Sandbox <postmaster@sandbox1f8a0605ffa94e749e35b298621acd19.mailgun.org>",
    //   to: email,
    //   subject: "NEEDS COPY - Here's a photograph!",
    //   template: "share_photograph",
    //   'h:X-Mailgun-Variables': {test: "test"}
    // };
    // mg.messages().send(data, function (error, body) {
    //   dispatch({ type: "PHOTO_SENT" });
    // });

  }
}

export function sendMessage(message, sender, contact, photo) {
  return dispatch => {
    dispatch({ type: "SEND_EMAIL" });
    console.log(photo);

    var args = [
      `accession=${photo.TitAccessionNo}&`,
      `image=${photo.image_url}&`,
      `message=${encodeURIComponent(message)}&`,
      `sender=${encodeURIComponent(sender)}&`,
      `contact=${encodeURIComponent(contact)}`
    ]
    fetch(`/api/mail/collection_inquiry?${args.join("")}`)
      .then(response => {
        dispatch({ type: "PHOTO_SENT" });
    })
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

  window.ga('send', 'pageview', `/?s=${query}`);

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

