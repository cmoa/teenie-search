import React, {Component} from 'react';
import { connect } from 'react-redux'
import { search, closePhoto } from '../actions/actions'

const searchSuggestionPadding = 10;

const styles = {
    page: {
        display: 'flex',
        position: 'fixed',
        flex: 1,
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'white',
        overflow: 'scroll'
    },
    photoContainer: {
        width: '90vw',
        marginTop: '5vw',
        marginLeft: '5vw',
        marginRight: '5vw',
    },
    photoImage: {
        width: '95vw',
        height: 'auto',
    },
    photoImage: {
        marginBottom: '1rem',
    },
    photoTitle: {
        marginBottom: '1.25rem',
        fontWeight: 800,
        fontSize: '1em',
        lineHeight: '1.25',
        fontFamily: 'Klavika Basic,Helvetica,sans-serif',
        fontWeight: 800,
    },
    photoDate: {
        fontSize: '.75em',
        color: '#333',
        marginBottom: '2rem',
        fontFamily: 'Klavika Basic,Helvetica,sans-serif',
    },
    backButton: {
        color: 'red',
        marginBottom: '1.25rem',
    },
    photoSuggestions: {
        overflow: 'scroll',
        display: 'flex',
        width:'95vw',
        paddingLeft: '5vw',
    },
    recommendedImage: {
        height: '20vh',
        paddingRight: '5vw',
    },
    suggestionsCategory: {
        width: '90vw',
        margin: '5vw',
    }
}

class Photo extends Component {
    render() {

        return ( 
            <div style={styles.page} className="smoothScroller">
                <div style={styles.photoContainer}>
                    <div style={styles.backButton} onClick={() => { this.props.closePhoto() }}>
                       {"<"} Back to search reults
                    </div>
                    <div style={styles.photoTitle}> { this.props.photo.emuRecord.TitMainTitle } </div>
                    <div style={styles.photoDate}> { this.props.photo.emuRecord.CreDateCreated } </div>
                    <img style={styles.photoImage} src={this.props.photo.url} width="100%" />
                    

                    <div style={{marginBottom: 50}}> Object Information 
                        {Object.keys(this.props.photo.emuRecord).map((key) => {
                            return ( <div> { key +" : " + this.props.photo.emuRecord[key] } </div>);
                        })}
                    </div>
                </div>
                <div>
                    <div style={styles.suggestionsCategory}> More Photos of Jesse Jackson </div>
                    <div style={styles.photoSuggestions} className="smoothScroller"> 
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={hit.url} height="100" />);
                        })}
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={hit.url} height="100" />);
                        })}
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={hit.url} height="100" />);
                        })}
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={hit.url} height="100" />);
                        })}
                    </div>
                    <div style={styles.suggestionsCategory}> More Photos from Downtown </div>
                    <div style={styles.photoSuggestions} className="smoothScroller">  
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={hit.url} height="100" />);
                        })}
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={hit.url} height="100" />);
                        })}
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={hit.url} height="100" />);
                        })}
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={hit.url} height="100" />);
                        })}
                    </div>
                </div>
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        search: (term) => dispatch(search(term)),
        closePhoto: () => dispatch(closePhoto()),
    }
}

const mapStateToProps = state => {
    return {
        searchTerm: state.search.term,
        screen: state.nav.screen,
        photo: state.photo.photo,
        hits: state.search.hits
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Photo)

