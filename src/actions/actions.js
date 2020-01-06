// Initialize algolia search
import algoliasearch from 'algoliasearch';
import _ from 'lodash';

const client = algoliasearch('PAR4VRQ7FL', '54989bad1637769e025e36cb106973b0');
var index = client.initIndex("teenie-search");

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


export function search(query, options = {}) {

  /*
  # 2. Get the index name based on sort_by_price
  index_name = "products_price_desc" if sort_by_price else "products"

  # 3. Search on dynamic index name (primary or replica)
  client.init_index(index_name).search('phone');
*/
 
  return dispatch => {

    var sortBy = options.sortBy || "relevance";
    var startDate = options.startDate || "1908";
    var endDate = options.endDate || "1998";

    dispatch({ type: "SEARCH", term: query, sortBy, startDate, endDate });

    var searchParameters = {};

    //date = datetime.datetime.now() - datetime.timedelta(weeks=1)
    //date_timestamp = int(time.mktime(date.timetuple()))

    // results = index.search('query', {
    //     'filters': 'datetime_unix > ' + str(date_timestamp)
    // })// .getTime();

    var start_datetime = new Date(startDate, 0, 0, 0, 0, 0, 0);
    var end_datetime = new Date(endDate+1, 0, 0, 0, 0, 0, 0);

    console.log(start_datetime);
    console.log(end_datetime)

    var searchObj = { 
      hitsPerPage: 50, 
      query: query + " ", 
      filters: `date_timestamp:${start_datetime.getTime()} TO ${end_datetime.getTime()}`
    };

    var indexName = "teenie-search";
    if (sortBy === "dateAscending") indexName = "date_ascending";
    else if (sortBy === "dateDescending") indexName = "date_descending";
    index = client.initIndex(indexName);

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

