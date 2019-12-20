import React, {Component}
from 'react';
import { connect } from 'react-redux'
import { search, openPhoto, retrieveMoreHits, openSearchSettings } from '../actions/actions'
import globalStyles from '../styles';

import { useGesture, withGesture, Gesture } from 'react-with-gesture'
import { motion } from "framer-motion"

import SuggestedSearchView from './SuggestedSearchView';

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
	    background: 'white',
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
		overflow: 'auto',
		height: '90vh',
		overflow: 'visible',
	},
	searchOptions: {
		height: "10vh",
		width: '90vw',
    	marginLeft: '5vw',
	},
	searchResultsColumn: {
		display: 'flex',
		flexDirection: 'column',
		width: '50%',
		padding: '2.5vw',
		minHeight: '78vh',
	},
	searchResultContainer: {
		width: '100%',
		paddingBottom: '2rem',
	},
	searchResult: {
		padding: searchResultPadding / 2,
	},
	endOfResults: {
		backgroundColor: 'black',
    	padding: '200px 0px',
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
	}
}

class SearchResults extends Component {

	constructor(props) {
        super(props);
        this.resultsContainer = React.createRef();

        this.state = { scrollY: 0 }
    }

  // // Bind it to a component
  // return <animated.div {...bind()} style={{ x, y }} />

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.hitsCount !== 0 && prevProps.searchTime !== this.props.searchTime) {
    //         this.resultsContainer.current.scrollTop = 0;
    //     }
    // }

	// handleScroll = (e) => {
	// 	const top = e.target.scrollTop <= 0
	//     const bottom = e.target.scrollHeight - e.target.scrollTop >= e.target.clientHeight;
	//     if (bottom) { 
	//     	if (this.props.page + 1 < this.props.pageCount) {
	//     		this.props.retrieveMoreHits();
	//     	}
	//     }
 //        if (bottom) { 
 //            e.preventDefault();
 //            console.log(e.target.clientHeight)
 //          	// e.target.scrollTop = e.target.scrollHeight - e.target.scrollTop - 1;
 //        }

 //        if (top) {
 //            e.target.scrollTop = 1;
 //        }
	// }

    render() {

    	let x = 0;
    	let y = -100;

        return ( 
	        <div style={styles.page} pose={this.props.screen}>
	        	<div style={styles.searchBarBackground}>
	        	</div>


	        	{ /* Results */ }
	        	{!this.props.loading && this.props.hitsCount > 0 && 
	        		<Gesture
	        			onMove={(event) => {
	        				console.log("up");
	        				console.log(this.state.scrollY)
	        				var newY = this.state.scrollY + event.direction[1]*(100*event.velocity);
	        				if (newY > 0) newY = 0
	        				this.setState({ scrollY: newY })

	        			}}
	        		>
			            {event => <motion.div 
			            	style={{
			            		...styles.searchResultsContainer
			            	}} 
			            	animate={{ x: 0, y: this.state.scrollY }}
			            	transition={{ duration: 1, ease: "easeOut",}}
			            	ref={this.resultsContainer}
			            >
			            	<div style={{ ...globalStyles.body, margin: 5, marginLeft: '5vw', opacity: 0.5 }}> 
				        		{this.props.hitsCount} results
				        	</div> 
			            	<div style={styles.searchResults}>
				            	<div style={styles.searchResultsColumn}>
									{ this.props.hits.map((hit, i) => {
										if (i % 2 === 0)  return <SearchResult hit={hit} i={i} onClick={() => { this.props.openPhoto(hit) }} />;
										return null;
									})}
								</div>
								<div style={styles.searchResultsColumn}>
									{ this.props.hits.map((hit, i) => {
										if (i % 2 === 1)  return <SearchResult hit={hit} i={i} onClick={() => { 
											this.props.openPhoto(hit) 
										}} />;
										return null;
									})}
								</div>
							</div>
							{ /* End of Results */ }
							{(this.props.page + 1) === this.props.pageCount && 
					            <div style={{ ...styles.endOfResults }}>
					            </div> 
							}
						</motion.div>
						}
					</Gesture>
				}

				{ /* No Results */ }
				{!this.props.loading && this.props.hitsCount === 0 && 
						
			            <div style={{ ...styles.bottomHalf, paddingTop: 0 }}>
				            <div style={{ ...globalStyles.body, margin: 5 }}> 
				        		No results, try one of these topics:
				        	</div> 
			            	<SuggestedSearchView rows={4} columns={3} />
			            </div>
				}

			{ /* Loading Results */ }
				{this.props.loading &&
		          	<div style={{ ...styles.bottomHalf, flex: 1, display: 'flex', alignItems:'center' }}> 
		              <div class="lds-ellipsis">
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
			<div style={styles.searchResult}>
				<img style={styles.searchResultImage} alt="" src={props.hit.image_url.replace('1680.jpg', '420.jpg')} width="100%" />
				<div style={{...styles.searchResultTitle, ...globalStyles.photoTitle}}> { props.hit.TitMainTitle } </div>
				<div style={{...styles.searchResultDate, ...globalStyles.photoDetail}}> { props.hit.CreDateCreated } </div>
			</div>
		</div>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		search: (term) => dispatch(search(term)),
		openPhoto: (irn) => dispatch(openPhoto(irn)),
		retrieveMoreHits: () => dispatch(retrieveMoreHits()),
		openSearchSettings: () => dispatch(openSearchSettings()),
	}
}

const mapStateToProps = state => {
    return {
    	loading: state.search.loading,
        searchTerm: state.search.term,
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

