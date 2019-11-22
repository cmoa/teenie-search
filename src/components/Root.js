import React, {Component} from 'react';
import { connect } from 'react-redux'

import SearchBar from './SearchBar';
import Home from './Home';
import SearchResults from './SearchResults';
import Photo from './Photo';

import posed, { PoseGroup } from 'react-pose';

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
    render() {
        return ( 
        	<PoseGroup>
                {this.props.screen === "HOME" && (<Page key="home"><Home /></Page>)}
                {this.props.screen === "SEARCH_RESULTS" && (<Page key="searchResults"><SearchResults /></Page>)}
    	        {true && <SearchBar key="searchBar" /> }

    	        {this.props.modal === "PHOTO" && (<Page key="photo"><Photo /></Page>)}
	        </PoseGroup>
        )
    }
}

const mapDispatchToProps = dispatch => {
	return {}
}

const mapStateToProps = state => {
    return {
        searchTerm: state.search.term,
        screen: state.nav.screen,
        modal: state.nav.modal,
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Root)

