import React, {Component} from 'react';
import { connect } from 'react-redux'
import { search, closePhoto } from '../actions/actions'

import globalStyles from '../styles'

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
    },
    photoDate: {
        marginBottom: '2rem',
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
        margin: '1vh 5vw',
    }
}

class Photo extends Component {
    render() {

        return ( 
            <div style={styles.page} className="smoothScroller">
                <div style={styles.photoContainer}>
                    <div style={{ ...styles.photoTitle, ...globalStyles.photoTitle}}> { this.props.photo.emuInput.TitMainTitle } </div>
                    <div style={{ ...styles.photoDate, ...globalStyles.photoDetail}}> { this.props.photo.emuInput.CreDateCreated } </div>
                    <img style={styles.photoImage} src={process.env.PUBLIC_URL + '/images/'+this.props.photo.irn+'.jpg'} width="100%" />
                    
                    <div style={{...styles.backButton, ...globalStyles.body, fontWeight: 'bold'}} onClick={() => { this.props.closePhoto() }}>
                       {"<"} Back to search reults
                    </div>

                    <div style={{marginBottom: 50}}> 
                        <div style={{...globalStyles.body, fontWeight: 'bold'}}>Object Information </div>
                        <table>
                            {Object.keys(this.props.photo.emuInput).map((key) => {
                                return ( 
                                    <tr>
                                        <td style={{...globalStyles.body }}> 
                                            { key +": " } 
                                        </td>
                                        <td style={{...globalStyles.body }}> 
                                            { this.props.photo.emuInput[key] } 
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>      
                </div>
                <div>
                    <div style={{...globalStyles.body, fontWeight: 'bold', ...styles.suggestionsCategory}}> More Photos from [Year] </div>
                    <div style={styles.photoSuggestions} className="smoothScroller"> 
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={process.env.PUBLIC_URL + '/images/'+this.props.photo.irn+'.jpg'} height="100" />);
                        })}
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={process.env.PUBLIC_URL + '/images/'+this.props.photo.irn+'.jpg'} height="100" />);
                        })}
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={process.env.PUBLIC_URL + '/images/'+this.props.photo.irn+'.jpg'} height="100" />);
                        })}
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={process.env.PUBLIC_URL + '/images/'+this.props.photo.irn+'.jpg'} height="100" />);
                        })}
                    </div>
                    <div style={{...globalStyles.body, fontWeight: 'bold', ...styles.suggestionsCategory}}> More Photos from [Neighborhood] </div>
                    <div style={styles.photoSuggestions} className="smoothScroller">  
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={process.env.PUBLIC_URL + '/images/'+this.props.photo.irn+'.jpg'} height="100" />);
                        })}
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={process.env.PUBLIC_URL + '/images/'+this.props.photo.irn+'.jpg'} height="100" />);
                        })}
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={process.env.PUBLIC_URL + '/images/'+this.props.photo.irn+'.jpg'} height="100" />);
                        })}
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={process.env.PUBLIC_URL + '/images/'+this.props.photo.irn+'.jpg'} height="100" />);
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

