import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import searchReducer from './reducers/searchReducer';
import navReducer from './reducers/navReducer';
import photoReducer from './reducers/photoReducer';
import deviceReducer from './reducers/deviceReducer';

const store = createStore(
  combineReducers({
    search: searchReducer,
    nav: navReducer,
    photo: photoReducer,
    device: deviceReducer,
  }),
  applyMiddleware(
    thunk
  )
);

export default store;