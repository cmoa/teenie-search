// Initialize algolia search
import algoliasearch from 'algoliasearch';
import _ from 'lodash';

import relatedMap from './relatedMap';
import relatedAliases from './relatedAliases';

const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_API_KEY);
const relevanceIndex = client.initIndex("teenie-search");
const dateAscendingIndex = client.initIndex("date_ascending");
const dateDescendingIndex = client.initIndex("date_descending");

// Default - sort by relevance , set by search action, read also by retrieve more hits action
var indexToSearch = relevanceIndex;

// Actions
export function resetInteractive() {
  return {
    type: "RESET_INTERACTIVE",
  }
}

function getRelated(photo, dispatch) {
  dispatch({ type: "LOADING_RELATED" });

  var relatedTerms = [];

  var date = photo["CreDateCreated"]
  if (date && !relatedTerms.includes(date)) {
      relatedTerms.push({
        term: date,
        label: "More from",
      });
  }

  var places = _.shuffle(photo["places"])
  var placesAdded = 0;
  for (var i in places) {
    var place = places[i];
    if ((['establishment', 'place', 'neighborhood', 'route']).includes(place.type)) {
      if (placesAdded < 2 && place.long_name && !relatedTerms.includes(place.long_name)) {
        relatedTerms.push({
          term: place.long_name,
          label: "More near",
        });
        placesAdded++;
      }
    } 
  }

  var people = _.shuffle(photo["people"])
  var peopleAdded = 0;
  for (var i in people) {
    var name = people[i];
    if (peopleAdded < 2 && !relatedTerms.includes(name)) {
      relatedTerms.push({
        term: name,
        label: "More that mention",
      })
      peopleAdded++;
    }
  }

  var relatedirns = _.map(relatedTerms, ({term, label}) => { return relatedMap[term]; });

  var getRelatedPromises = []
  for (var i=0; i<relatedTerms.length; i++) {
    if (relatedirns[i]) {
      var objectIds = _.shuffle(_.take(_.without(_.map(relatedirns[i], (irn)=>{return String(irn)}), photo["irn"]), 50));
      getRelatedPromises.push(relevanceIndex.getObjects(objectIds))
    } else {
      getRelatedPromises.push(null)
    }
  }

  Promise.all(getRelatedPromises).then(function(values) {
    var related = [];

    for (var i=0; i<relatedTerms.length; i++) {
      if (values[i] !== null){
        if (relatedAliases[relatedTerms[i].term]) {
          var relatedResults = {
            term: relatedAliases[relatedTerms[i].term],
            label: relatedTerms[i].label,
            photos: _.without(values[i].results, null)
          }
          related.push(relatedResults);
        }
      }
    }

    dispatch({ type: "RELATED_LOADED",  related});
  });
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

  window.ga('send', 'pageview', `/?s=${query}`);

  return dispatch => {

    var sortBy = options.sortBy || "relevance";
    var startDate = options.startDate || 1915;
    var endDate = options.endDate || 1980;

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

