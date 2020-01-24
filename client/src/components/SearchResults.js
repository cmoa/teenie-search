import React, {Component}
from 'react';
import { connect } from 'react-redux'
import { openPhoto, retrieveMoreHits, resultsLoaded } from '../actions/actions'
import globalStyles from '../styles';

import SuggestedSearchView from './SuggestedSearchView';
import SearchOptions from './SearchOptions';
import SafariScroller from './SafariScroller';

import Masonry from 'react-masonry-component';


import posed from 'react-pose';

const searchSuggestionPadding = 20;
const searchResultPadding = 0;

const styles = {
	page: {
		position: 'absolute',
		top: "12vh",
		right: 0,
		left: 0,
		bottom: 0,
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		width: '100vw',
	},
	searchBarBackground: {
		height: '12.5vh',
	    background: '#ffffff',
	    position: 'fixed',
	    top: 0,
	    left: 0,
	    right: 0,
	    zIndex: 100,
	    width: '100vw'
	},
	searchResults: {
    	padding: '30vh 2.5vw 0 2.5vw',
    	minHeight: '70vh',
	},
	searchOptions: {
		height: "10vh",
		width: '90vw',
    	marginLeft: '5vw',
	},
	searchResultContainer: {
		width: '50%',
		paddingBottom: '1rem'
	},
	searchResult: {
		padding: searchResultPadding / 2,
	},
	endOfResults: {
		backgroundColor: 'black',
    	height: '20vh',
	},
	bottomHalf: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		backgroundColor: 'white',
		padding: searchSuggestionPadding / 2,
	},
	sampleSearchRow: {
		flexDirection: 'row',
	    display: 'flex',
	    flex: 1,
	},
	reachOutRow: {
		flex: .25,
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		backgroundColor: 'black',
		color: 'white',
		margin: searchSuggestionPadding / 2,
	},
	sampleSearchContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		backgroundImage: 'url("https://via.placeholder.com/200x200")',
		backgroundRepeat: 'no-repeat',
    	backgroundSize: 'cover',
    	margin: searchSuggestionPadding / 2,
	},
	sampleSearchTerm: {
		backgroundColor: 'rgba(0, 0, 0, .5)',
		color: 'white',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		height: '100%',
	},
	searchResultImage: {
		boxShadow: "0px 0px 5px #777",
		marginBottom: '1rem',
	},
	searchResultTitle: {
		marginBottom: '.5rem',
	},
	searchResultDate: {
		fontSize: '1.1em',
		color: '#333',
		fontFamily: 'Franklin Gothic FS,Helvetica,sans-serif',
	},
	sortOption: {
		borderBottom: 3,
		borderColor: 'black',
	},
	searchOptionsContainer: {
		zIndex: 100,
		position: 'absolute',
	}
}

const ResultsContainer = posed.div({
  default: { opacity: 1 },
  hidden: { opacity: 0 }
});


class SearchResults extends Component {

	constructor(props) {
        super(props);
        this.scroller = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    	if (this.scroller.current !== null && this.props.searchTimestamp !== prevProps.searchTimestamp && this.props.searchTimestamp !== "") {
	    	this.scroller.current.scrollToTop();
	  	} else if (this.props.hitsCount === 0) {
	  		this.props.resultsLoaded();
	  	}
    }

    handleScroll = (ref) => {
        const bottom = ref.current.scrollHeight - ref.current.clientHeight === ref.current.scrollTop;
        if (bottom && this.props.hits.length < this.props.hitsCount) { 
            this.props.retrieveMoreHits();
        } 
    }

    render() {

    	var pose = "default";
	    if (this.props.screen === "PHOTO") {
	    	pose = "hidden";
	    }

    	var resultsString;
    	if (this.props.hitsCount === 0) {
    		resultsString = ""
    	} else if (this.props.hitsCount === 1) {
    		resultsString = "1 result"
    	} else if (this.props.hitsCount > 10000) {
    		resultsString = "10000+ results"
    	} else {
    		resultsString = `${this.props.hitsCount} results`
    	}

        return ( 

	        <ResultsContainer style={styles.page} pose={pose}>

	        	<div style={styles.searchBarBackground} id="searchBarBackground" />

        		<SearchOptions resultsString={resultsString} loading={this.props.loading}/>

	        	{ /* Results */ }
	        	{this.props.hitsCount > 0 && 
	        		<div style={{ position: 'fixed', top: 0, opacity: this.props.loading ? 0 : 1}}>
		        		<SafariScroller 
		        			scrollHeight='100vh' 
		        			scrollWidth='100vw' 
		        			ref={this.scroller}
		        			handleScroll={(ref) => {
		        				this.handleScroll(ref)
		        			}}
		        		>
			            	<div style={styles.searchResults} >
				            	<Masonry
					         		style={{ width: '95vw', minWidth: '95vw'}}
					         		onLayoutComplete={() => {
					         			this.props.resultsLoaded();
					         		}}
					            >
					               { this.props.hits.map((hit, i) => {
										return <SearchResult key={"result_"+i} hit={hit} i={i} onClick={() => { this.props.openPhoto(hit) }} />;
									})}
					            </Masonry>
							</div>
							{ /* End of Results */ }
							{(this.props.hits.length === 1000 || ((this.props.page + 1) === this.props.pageCount)) && 
					            <div style={{ ...styles.endOfResults }}>
					            </div> 
							}
						</SafariScroller>
					</div>
				}

				{ /* No Results */ }
				{!this.props.loading && this.props.hitsCount === 0 && this.props.screen === "SEARCH_RESULTS" &&
		            <React.Fragment>
			            <div style={{ ...globalStyles.body, padding: '0 2.5vh 2.5vh 2.5vh', textAlign: 'center' }}> 
			        		<div style={{ fontWeight: 'bold' }}>NO RESULTS</div> 
			        		Try one of these topics:
			        	</div>
			        	<div style={{ position: 'absolute', top: '23vh', left: 0, right: 0, height: '64vh', padding: '5px' }}>
		            		<SuggestedSearchView rows={3} columns={3} />
		            	</div>
		            </React.Fragment>
				}
				{ /* Loading Results */ }
				{this.props.loading &&
		          	<div style={{ ...styles.bottomHalf, flex: 1, display: 'flex', alignItems:'center' }}> 
		              <div className="lds-ellipsis">
		                <div></div>
		                <div></div>
		                <div></div>
		                <div></div>
		              </div>
		            </div>
				}
	        </ResultsContainer>
        )
    }
}

const SearchResult = (props) => {
	return(
		<div style={styles.searchResultContainer} className="touchTarget searchResultPhoto" onClick={props.onClick}>
			<div style={{ ...styles.searchResult, padding: '2.5vw'}}>
				<img style={styles.searchResultImage} alt="" src={props.hit.image_url_small} width="100%" />
				<div style={{...styles.searchResultTitle, ...globalStyles.photoTitle}}> { props.hit.TitMainTitle } </div>
				<div style={{...styles.searchResultDate, ...globalStyles.photoDetail}}> { props.hit.CreDateCreated } </div>
			</div>
		</div>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		openPhoto: (irn) => dispatch(openPhoto(irn)),
		retrieveMoreHits: () => dispatch(retrieveMoreHits()),
		resultsLoaded: () => dispatch(resultsLoaded())
	}
}

const mapStateToProps = state => {
    return {
    	term: state.search.term,
    	loading: state.search.loading,
        searchTimestamp: state.search.searchTimestamp,
        hits: state.search.hits,
        hitsCount: state.search.hitsCount,
        screen: state.nav.screen,
        page: state.search.page,
        pageCount: state.search.pageCount,
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchResults)

