// Initialize algolia search
import algoliasearch from 'algoliasearch';
import _ from 'lodash';

const client = algoliasearch('PAR4VRQ7FL', '54989bad1637769e025e36cb106973b0');
const index = client.initIndex('irn_record_search');

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

export function openSearchSettings(){
  return {
      type: "OPEN_SEARCH_SETTINGS"
  }
}

export function dismissSearchSettings(){
  return {
      type: "DISMISS_SEARCH_SETTINGS"
  }
}

export function updateSearchSettings(){
  return {
      type: "DISMISS_SEARCH_SETTINGS"
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


export function search(query) {
  return dispatch => {

    dispatch({ type: "SEARCH", term: query });

    var searchParameters = {};

    var searchObj = { 
      hitsPerPage: 50, 
      query: query + " ", 
    };

    index.search(searchObj).then(res => {
      console.log(res);
      let hits = res.hits;
      let page = res.page;
      let hitsCount = res.nbHits;
      let pageCount = res.nbPages;
      let hitsPerPage = res.hitsPerPage;

      dispatch({
        type: "UPDATE_RESULTS",
        updates: {
          hits: res.hits.filter((hit) => {
            if (hit["AdmPublishWebNoPassword"] === "Yes") {
              return true;
            } else {
              return false;
            }
          }),
          page: res.page,
          hitsCount: res.nbHits,
          pageCount: res.nbPages,
          hitsPerPage: res.hitsPerPage,
          term: query,
          searchParameters,
          timestamp: new Date().getTime(),
        }
      });
    });
  }
}

export function retrieveMoreHits() {
  console.log("Sdfadf'");
  return (dispatch, getState) => {
    const searchState = getState().search;
    console.log(searchState);

    var searchObj = { 
      hitsPerPage: 50, 
      query: searchState.term, 
      page: searchState.page + 1,
      // add search pararm if 
    };

    index.search(searchObj).then(res => {
      let hits = res.hits;
      let page = res.page;
      // let hitsCount = res.nbHits;
      // let pageCount = res.nbPages;
      // let hitsPerPage = res.hitsPerPage;

      dispatch({
        type: "UPDATE_RESULTS",
        updates: {
          hits: _.concat(searchState.hits, res.hits),
          page: res.page,
          // term: query,
          // searchParameters,
        }
      });
    });
  }
}

