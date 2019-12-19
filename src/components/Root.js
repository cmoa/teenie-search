import React, {Component} from 'react';
import { connect } from 'react-redux'

import SearchBar from './SearchBar';
import Home from './Home';
import SearchResults from './SearchResults';
import SearchSettings from './SearchSettings';
import Photo from './Photo';
import EmailAlert from './EmailAlert';


import posed, { PoseGroup } from 'react-pose';

import IdleTimer from 'react-idle-timer'

import { resetInteractive } from '../actions/actions'

const Page = posed.div({
  enter: {
    opacity: 1,
    transition: { duration: 500 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 500 }
  }
});

class Root extends Component {

    constructor(props) {
    super(props)
    this.idleTimer = null
    this.onAction = this._onAction.bind(this)
    this.onActive = this._onActive.bind(this)
    this.onIdle = this._onIdle.bind(this)
  }

    render() {
        return ( 
            <div>
                <IdleTimer
                  ref={ref => { this.idleTimer = ref }}
                  element={document}
                  onActive={this.onActive}
                  onIdle={this.onIdle}
                  onAction={this.onAction}
                  debounce={250}
                  timeout={1000 /* ms */ * 60 /* sec */ * 3 /* min */} /> 
             	<PoseGroup style={{position: 'absolute'}}>
                    {this.props.screen === "HOME" && (<Page key="home"><Home /></Page>)}
                    {this.props.screen === "SEARCH_RESULTS" && (<Page key="searchResults"><SearchResults /></Page>)}
        	        {true && <SearchBar key="searchBar" /> }

                  {this.props.modal === "SEARCH_SETTINGS" && (<Page key="searchSettings"><SearchSettings /></Page>)}
        	        {this.props.modal === "PHOTO" && (<Page key="photo"><Photo /></Page>)}
                  {this.props.emailAlert !== ""  && (<Page key="emailalert"><EmailAlert /></Page>)}
    	        </PoseGroup>
            </div>
        )
    }

    _onAction(e) {
        console.log('user did something', e)
    }

    _onActive(e) {
        console.log('user is active', e)
        console.log('time remaining', this.idleTimer.getRemainingTime())
    }

    _onIdle(e) {
        console.log('user is idle', e)
        console.log('last active', this.idleTimer.getLastActiveTime())
        this.props.resetInteractive();
    }
}

const mapDispatchToProps = dispatch => {
	return {
        resetInteractive: () => dispatch(resetInteractive()),
    }
}

const mapStateToProps = state => {
    return {
        searchTerm: state.search.term,
        screen: state.nav.screen,
        modal: state.nav.modal,
        emailAlert: state.nav.emailAlert,
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Root)

