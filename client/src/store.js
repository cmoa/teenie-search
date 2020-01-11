import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import searchReducer from './reducers/searchReducer';
import navReducer from './reducers/navReducer';
import photoReducer from './reducers/photoReducer';

const store = createStore(
  combineReducers({
    search: searchReducer,
    nav: navReducer,
    photo: photoReducer,
  }),
  applyMiddleware(
    thunk
  )
);

export default store;