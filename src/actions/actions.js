// Initialize algolia search
import algoliasearch from 'algoliasearch';

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
        dispatch({ type: "EMAIL_SENT" });
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


export function search(term) {
  return dispatch => {

    dispatch({ type: "SEARCH", term: term});

    var searchObj = { hitsPerPage: 50, query: term };

    index.search(searchObj).then(res => {
      let hits = res.hits;
      let hitsCount = res.nbHits;
      let pageCount = res.nbPages;

      dispatch({
        type: "UPDATE_RESULTS",
        hits: hits,
        hitsCount: hitsCount,
        pageCount: pageCount,
      });
    });
  }
}

