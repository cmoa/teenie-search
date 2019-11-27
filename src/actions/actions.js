// Initialize algolia search
import algoliasearch from 'algoliasearch';
import _ from 'lodash';

const client = algoliasearch('9HG4DVEE7B', 'a37550f68ea3cd1834893b238971b6d6');
const index = client.initIndex('teenie-harris-collection');



// Actions

export function resetInteractive() {
  console.log("reset interactive")
  return {
    type: "RESET_INTERACTIVE",
  }
}


export function openPhoto(irn) {
    return dispatch => {
        index.findObject(hit => hit.irn === irn, {}, (err, photo) => {
          console.log(photo);
          dispatch({
            type: "OPEN_PHOTO",
            photo: photo.object,
          });
        });
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

    dispatch({ type: "SEARCH", term: query});

    var searchParameters = {};

    var searchObj = { 
      hitsPerPage: 50, 
      query, 
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
          hits: res.hits,
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

