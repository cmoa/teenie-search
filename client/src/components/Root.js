import React, {Component} from 'react';
import { connect } from 'react-redux'

import SearchBar from './SearchBar';
import Home from './Home';
import SearchResults from './SearchResults';
import Photo from './Photo';
import EmailAlert from './EmailAlert';
import SafariScroller from './SafariScroller';


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
            <React.Fragment>
              <SafariScroller scrollHeight='100vh' scrollWidth='100vw'>
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
                    {(this.props.screen === "SEARCH_RESULTS" || this.props.screen === "PHOTO") && (<Page key="searchResults"><SearchResults /></Page>)}
                    <SearchBar key="searchBar" />
          	        {this.props.screen === "PHOTO" && <Page key="photo"><Photo /></Page>}
      	        </PoseGroup>
              </SafariScroller>
              {this.props.emailAlert !== "" ? (<Page key="emailalert"><EmailAlert /></Page>) : null}
            </React.Fragment>
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
        window.location.reload()
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
        emailAlert: state.nav.emailAlert,
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Root)

