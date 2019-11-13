import React, {Component}
from 'react';
import { connect } from 'react-redux'
import { search, openPhoto } from '../actions/actions'

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
	searchResults: {
		display: 'flex',
		flexDirection: 'row',
		overflow: 'scroll',
		height: '78vh',
    	width: '95vw',
    	marginLeft: '2.5vw',
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
		padding: '2.5vw'
	},
	searchResultContainer: {
		width: '100%',
		paddingBottom: '2rem',
	},
	searchResult: {
		padding: searchResultPadding / 2,
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
		marginBottom: '1rem',
	},
	searchResultTitle: {
		fontFamily: 'Franklin Gothic FS,Helvetica,sans-serif',
		marginBottom: '.5rem',
    	fontWeight: 800,
    	fontSize: '1.1em',
    	lineHeight: '1.25'
	},
	searchResultDate: {
		fontSize: '1.1em',
		color: '#333',
		fontFamily: 'Franklin Gothic FS,Helvetica,sans-serif',
	}
}

class SearchResults extends Component {
    render() {

    	var suggestedSearchTerms = [
			"Hill District",
			"1950s",
			"Jazz",
			"Presidents",
			"Civil Rights",
			"Portraits",
		]

		var suggestedSearchView = suggestedSearchTerms.map((term, i) => {
			return (
				<div  
					style={styles.sampleSearchContainer}
					onClick={() => { this.props.search(term) }}
				>
					<div style={styles.sampleSearchTerm}> { term } </div>
				</div>
			)
		});

        return ( 
	        <div style={styles.page} pose={this.props.screen}>

	        	{ /* Results */ }
	        	{this.props.hitsCount > 0 && 
	        		<div>
			        	<div style={styles.searchOptions}> { this.props.hitsCount } Results</div>
			            <div style={styles.searchResults} className="smoothScroller">
			            	<div style={styles.searchResultsColumn}>
								{ this.props.hits.map((hit, i) => {
									if (i % 2 === 0)  return <SearchResult hit={hit} i={i} onClick={() => { this.props.openPhoto(hit.irn) }} />;
								})}
							</div>
							<div style={styles.searchResultsColumn}>
								{ this.props.hits.map((hit, i) => {
									if (i % 2 === 1)  return <SearchResult hit={hit} i={i} onClick={() => { this.props.openPhoto(hit.irn) }} />;
								})}
							</div>
						</div>
					</div>
				}

				{ /* No Results */ }
				{this.props.hitsCount === 0 && 
		            <div style={styles.bottomHalf}> 
		            	<div> NO RESULTS, try one of these: </div>
		                <div style={styles.sampleSearchRow}>
							{ suggestedSearchView[0] } 
							{ suggestedSearchView[1] } 
							{ suggestedSearchView[2] } 
						</div>
		                <div style={styles.sampleSearchRow}>
							{ suggestedSearchView[3] } 
							{ suggestedSearchView[4] } 
							{ suggestedSearchView[5] } 
						</div>
						<div style={styles.sampleSearchRow}>
							{ suggestedSearchView[1] } 
							{ suggestedSearchView[2] } 
							{ suggestedSearchView[3] } 
						</div>
						<div style={styles.sampleSearchRow}>
							{ suggestedSearchView[3] } 
							{ suggestedSearchView[4] } 
							{ suggestedSearchView[5] } 
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
				<img style={styles.searchResultImage} src={props.hit.url} width="100%" />
				<div style={styles.searchResultTitle}> { props.hit.emuRecord.TitMainTitle } </div>
				<div style={styles.searchResultDate}> { props.hit.emuRecord.CreDateCreated } </div>
			</div>
		</div>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		search: (term) => dispatch(search(term)),
		openPhoto: (irn) => dispatch(openPhoto(irn))
	}
}

const mapStateToProps = state => {
    return {
        searchTerm: state.search.term,
        hits: state.search.hits,
        hitsCount: state.search.hitsCount,
        screen: state.nav.screen,
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchResults)

