import React, {Component}
from 'react';
import { connect } from 'react-redux'
import { search, openPhoto } from '../actions/actions'
import globalStyles from '../styles';

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
		marginBottom: '.5rem',
	},
	searchResultDate: {
		fontSize: '1.1em',
		color: '#333',
		fontFamily: 'Franklin Gothic FS,Helvetica,sans-serif',
	}
}

class SearchResults extends Component {

    render() {
        return ( 
	        <div style={styles.page} pose={this.props.screen}>

	        	{ /* Results */ }
	        	{this.props.hitsCount > 0 && 
	        		<div>
			        	<div style={{ ...globalStyles.body, ...styles.searchOptions}}> 
			        		<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
			        			Filtered by&nbsp; 
			        			<span style={{ display: 'inline-block', backgroundColor: '#bf0d3e', color: 'white', width: '5vh', height: '5vh', textAlign: 'center', lineHeight: '4.5vh' }}onClick={() => { console.log("Add filter") }}>
			        				+
		                		</span> 
		                	</div>

		                	<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
				        		{ this.props.hitsCount } Results sorted by &nbsp;
				        		<form>
					        		<select name="sort" style={{ ...globalStyles.bodySmall }}>
										<option value="date">Date</option>
										<option value="accession">Accession Number</option>
										<option value="relevance">Relevance</option>
									</select>
								</form>
							</div>
			        	</div>
			            <div style={styles.searchResults} className="smoothScroller">
			            	<div style={styles.searchResultsColumn}>
								{ this.props.hits.map((hit, i) => {
									if (i % 2 === 0)  return <SearchResult hit={hit} i={i} onClick={() => { this.props.openPhoto(hit.irn) }} />;
									return null;
								})}
							</div>
							<div style={styles.searchResultsColumn}>
								{ this.props.hits.map((hit, i) => {
									if (i % 2 === 1)  return <SearchResult hit={hit} i={i} onClick={() => { this.props.openPhoto(hit.irn) }} />;
									return null;
								})}
							</div>
						</div>
					</div>
				}

				{ /* No Results */ }
				{this.props.hitsCount === 0 && 
		            <div style={{ ...styles.bottomHalf, paddingTop: 0 }}> 
		            	<SuggestedSearchView rows={4} columns={3} />
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
				<img style={styles.searchResultImage} alt="" src={process.env.PUBLIC_URL + '/images/'+props.hit.irn+'.jpg'} width="100%" />
				<div style={{...styles.searchResultTitle, ...globalStyles.photoTitle}}> { props.hit.emuInput.TitMainTitle } </div>
				<div style={{...styles.searchResultDate, ...globalStyles.photoDetail}}> { props.hit.emuInput.CreDateCreated } </div>
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

