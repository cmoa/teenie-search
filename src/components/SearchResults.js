import React, {Component}
from 'react';
import { connect } from 'react-redux'
import { openPhoto, retrieveMoreHits, openSearchSettings } from '../actions/actions'
import globalStyles from '../styles';

import { useGesture, withGesture, Gesture } from 'react-with-gesture'
import { motion } from "framer-motion"

import SuggestedSearchView from './SuggestedSearchView';
import SearchOptions from './SearchOptions';

import Masonry from 'react-masonry-component';

const searchSuggestionPadding = 20;
const searchResultPadding = 0;

const styles = {
	page: {
		position: 'fixed',
		top: "12vh",
		right: 0,
		left: 0,
		bottom: 0,
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
	},
	searchBarBackground: {
		height: '12.5vh',
	    background: '#ffffff',
	    position: 'fixed',
	    top: 0,
	    left: 0,
	    right: 0,
	    zIndex: 100,
	},
	searchResults: {
		display: 'flex',
		flexDirection: 'row',
    	width: '95vw',
    	marginLeft: '2.5vw',
	},
	searchResultsContainer: {
		flexDirection: 'row',
		height: '90vh',
		overflow: 'visible',
	},
	searchOptions: {
		height: "10vh",
		width: '90vw',
    	marginLeft: '5vw',
	},
	searchResultContainer: {
		width: '50%',
		paddingBottom: '1rem',
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
		paddingLeft: '5vw',
		zIndex: 100,
		backgroundColor: 'white',
		paddingBottom: '2.5vw',
	},
	fade : {
		width: '100vw',
		height: '5vh',
		backgroundImage: 'linear-gradient(white, #ffffff00)'
	}
}

class SearchResults extends Component {

	constructor(props) {
        super(props);

        this.results = React.createRef();
        this.page = React.createRef();

        this.handleScroll = this.handleScroll.bind(this);

        this.state = { scrollY: 0 }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    	if (this.props.searchTime !== prevProps.searchTime && this.props.searchTime !== "") {
	    	this.setState({ scrollY: 0 })
	  	}
    }

    handleScroll(event) {

        var resultsHeight;
        this.results.current !== null ? resultsHeight = this.results.current.clientHeight : console.log("scroll container not rendered")
        console.log(resultsHeight)
        var pageHeight;
        this.page.current !== null ? pageHeight = this.page.current.clientHeight : console.log("page not rendered")
        console.log(pageHeight)
        var newY = this.state.scrollY + event.direction[1]*(100*event.velocity);

        if (newY > 0) {
            newY = 0;
        } else if (newY <= pageHeight - resultsHeight) {
            newY = pageHeight - resultsHeight;
            
        }

        // getting close to bottom...
        if (((this.props.page + 1) < this.props.pageCount) && newY - 1000 <= pageHeight - resultsHeight) {
        	// hit bottom
            console.log("Getting close to BOTTOM... load more...")
            // load more hits
           	this.props.retrieveMoreHits();
            console.log("retrieveing more hits...")
        }

        this.setState({ scrollY: newY })
    }

    render() {
    	var resultsHeight
    	this.results.current !== null ? resultsHeight = this.results.current.clientHeight : console.log("scroll container not rendered")

        return ( 
	        <div style={styles.page} ref={this.page} pose={this.props.screen}>

	        	<div style={styles.searchBarBackground} id="searchBarBackground" />

	        	<div style={{ ...globalStyles.body, ...styles.searchOptionsContainer }}> 

        			<React.Fragment>
        				<SearchOptions />
        				<div>
        					{ this.props.hitsCount === 1 && <div>{"1 result" }</div> }
        					{ this.props.hitsCount > 1 && <div>{this.props.hitsCount + " results" }</div> }
        				</div>
        			</React.Fragment>
	        	</div> 

	        	{ /* Results */ }
	        	{!this.props.loading && this.props.hitsCount > 0 && 
	        		<React.Fragment>

		        		<Gesture
		        			onMove={this.handleScroll}
		        		>
				            {event => <motion.div 
				            	style={{
				            		...styles.searchResultsContainer
				            	}} 
				            	animate={{ x: 0, y: this.state.scrollY }}
				            	transition={{ duration: 1, ease: "easeOut",}}
				            >
				            	<div ref={this.results}>
					            	<div style={styles.searchResults}>
					            	<Masonry
						                options={{ horizontalOrder: true, fitWidth: true, transitionDuration: 0 }} // default {}
						                disableImagesLoaded={false} // default false
						                updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
						         		style={{ width: '95vw', minWidth: '95vw'}}
						            >
						               { this.props.hits.map((hit, i) => {
											return <SearchResult hit={hit} i={i} onClick={() => { this.props.openPhoto(hit) }} />;
										})}
						            </Masonry>
									</div>
									{ /* End of Results */ }
									{(this.props.page + 1) === this.props.pageCount && 
							            <div style={{ ...styles.endOfResults }}>
							            </div> 
									}
								</div>
							</motion.div>
							}
						</Gesture>
					</React.Fragment>
				}

				{ /* No Results */ }
				{!this.props.loading && this.props.hitsCount === 0 && 
		            <React.Fragment>
			            <div style={{ ...globalStyles.body, padding: '2.5vh', textAlign: 'center' }}> 
			        		<div style={{ fontWeight: 'bold' }}>NO RESULTS</div> 
			        		Please try another search.
			        	</div>
			        	<div style={{ padding: '2.5vh', display: 'flex', flex: 1 }}>
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
	        </div>
        )
    }
}


const SearchResult = (props) => {
	return(
		<div style={styles.searchResultContainer} onClick={props.onClick}>
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
		openSearchSettings: () => dispatch(openSearchSettings()),
	}
}

const mapStateToProps = state => {
    return {
    	term: state.search.term,
    	loading: state.search.loading,
        searchTime: state.search.searchTime,
        searchTime: state.search.timestamp,
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

