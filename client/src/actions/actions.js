// Initialize algolia search
import algoliasearch from 'algoliasearch';
import _ from 'lodash';

import relatedMap from './relatedMap';
console.log(relatedMap)

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


/*

  
type
establishment
score
90
long_name
Duquesne Incline
short_name
Duquesne Incline
type
neighborhood
score
80
long_name
South Shore
short_name
South Shore
type
neighborhood
score
80
long_name
Middle Hill
short_name
Middle Hill
type
neighborhood
score
80
long_name
Downtown
short_name
Downtown
type
locality
score
50
long_name
Pittsburgh
short_name
Pittsburgh
type
route
score
50
long_name
West Carson Street
short_name
W Carson St
type
route
score
50
long_name
Webster Avenue
short_name
Webster Ave
type
route
score
50
long_name
Smithfield Street
short_name
Smithfield St
type
route
score
50
long_name
Sixth Avenue
short_name
Sixth Avenue
type
administrative_area_level_2
score
30
long_name
Allegheny County
short_name
Allegheny County
type
administrative_area_level_1
score
20
long_name
Pennsylvania
short_name
PA
type
country
score
10
long_name
United States
short_name
US=*/

function getRelated(photo, dispatch) {
  dispatch({ type: "LOADING_RELATED" });

  var related = {};

  var relatedTerms = [];

  console.log(photo);

  console.log(relatedTerms);

  for (var i in photo["people"]) {
    var name = photo["people"][i];
    relatedTerms.push(name)
  }

  var date = photo["CreDateCreated"]
  if (date) relatedTerms.push(date);

  for (var i in photo["places"]) {
    var place = photo["places"][i];
    if ((['establishment', 'place', 'neighborhood', 'route']).includes(place.type)) {
      if (place.short_name) relatedTerms.push(place.short_name);
      if (place.long_name) relatedTerms.push(place.long_name);
    } 
  }

  console.log(relatedTerms)

  var relatedirns = _.map(relatedTerms, (term) => { return relatedMap[term]; });

  for (var i=0; i<relatedTerms.length; i++) {
    if (relatedirns[i]) {
      var objectIds = _.take(_.map(relatedirns[i], (irn)=>{return String(irn)}), 100);
      relevanceIndex.getObjects(objectIds).then(res => {
        console.log(res);
        var j = objectIds.indexOf(String(res.irn))
        console.log(j)
        console.log(objectIds)
        // console.log(String(res.irn))

        if (j !== -1) related[relatedTerms[j]] = _.without(res.results, null);
      })
    }
  }

  // console.log(relatedTerms);
  console.log(related);
}

export function openPhoto(photo) {
  return dispatch => {
    
    dispatch({ type: "OPEN_PHOTO", photo });

    getRelated(photo, dispatch);
  
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

    var args = [
      `accession=${encodeURIComponent(photo.TitAccessionNo)}&`,
      `image=${encodeURIComponent(photo.image_url)}&`,
      `to=${encodeURIComponent(email)}&`,
      `title=${encodeURIComponent(photo.TitMainTitle)}&`,
      `date=${encodeURIComponent(photo.CreDateCreated)}&`,
      `description=${encodeURIComponent(photo.CatDescriptText)}`,
    ]
    fetch(`/api/mail/share_photograph?${args.join("")}`)
      .then(response => {
        dispatch({ type: "PHOTO_SENT" });
    })

  }
}

export function sendMessage(message, sender, contact, photo) {
  return dispatch => {
    dispatch({ type: "SEND_EMAIL" });

    var args = [
      `accession=${encodeURIComponent(photo.TitAccessionNo)}&`,
      `image=${encodeURIComponent(photo.image_url)}&`,
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

  // window.ga('send', 'pageview', `/?s=${query}`);

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

