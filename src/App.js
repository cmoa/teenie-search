import React, {Component} from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

import Root from './components/Root';

class App extends Component {

    render() {
        return (
          <Provider store={store}>
            <Root />
          </Provider>
       );
    }
}

export default App;