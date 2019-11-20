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
        overflow: 'scroll',
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
        marginBottom: '2.5vw',
    },
    photoSubtitle: {
        marginBottom: '5vw',
        display: 'flex',
        justifyContent: 'space-between',
    },
    backButton: {
        color: '#bf0d3e',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
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
        margin: '0vh 5vw',
    },
    emailContainer: {
        ...globalStyles.body,
        display: 'flex',
        flexDirection: 'column',
    },
    emailButton: {
        height: "5vh",
        width: "5vh",
        backgroundColor: '#bf0d3e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emailLabel: {
        marginBottom: '1vh',
    },
    emailIcon: {
        color: 'white',
        width: '50%',
    },
    additionalInfo: {
        width: '90vw',
        margin: '0 5vw',
    },
}

class Photo extends Component {
    render() {

        return ( 
            <div style={styles.page} className="smoothScroller">
                <div style={styles.photoContainer}>
                        
                    <div style={{...styles.photoTitle, ...globalStyles.photoTitle}}> { this.props.photo.emuInput.TitMainTitle } </div>
                    <div style={{ ...styles.photoSubtitle, ...globalStyles.photoDetail}}> 
                        { this.props.photo.emuInput.CreDateCreated }
                    </div>

                    <img style={styles.photoImage} src={process.env.PUBLIC_URL + '/images/'+this.props.photo.irn+'.jpg'} width="100%" />

                    <div style={{marginBottom: '5vw'}}> 
                        <div style={{ ...globalStyles.body }}> 
                            <div>{ this.props.photo.emuInput.CatDescriptText } </div>
                        </div>
                    </div>   

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                        <span style={{...globalStyles.body, ...styles.backButton}} onClick={() => { this.props.closePhoto() }}>
                            <svg style={{ height: '1.2rem', marginRight: '.5rem' }} aria-hidden="true" data-prefix="far" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z"></path></svg>                        
                            Back to search results
                        </span>  
                        <div style={styles.emailContainer}>
                            <div style={styles.emailLabel}>
                                Share this photograph:
                            </div>
                            <form 
                                style={{ display: 'flex', width: '100%'}}
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    this.props.search(this.props.searchTerm)
                                }}
                            >
                                <input 
                                    style={{...globalStyles.searchTerm, display: 'block' }}
                                    type="email" 
                                    placeholder="Enter an email"
                                    onFocus={() => { console.log("show Keyboard") }}
                                    onBlur={() => { console.log("hide Keyboard") }}
                                    onChange={(event) => console.log(event) }
                                />
                                <div style={{ ...styles.emailButton }} onClick={() => { console.log('sendEmail') }}>
                                    <svg style={{ ...styles.emailIcon }} aria-hidden="true" data-prefix="far" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" focusable="false"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg>
                                </div>
                            </form>                            
                        </div>
                    </div>
                </div>

                <div style={{ ...globalStyles.line }} />

                <div>
                    <div style={{...globalStyles.title, ...styles.suggestionsCategory}}> More Photos from [Year] </div>
                    <div style={styles.photoSuggestions} className="smoothScroller"> 
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={process.env.PUBLIC_URL + '/images/'+this.props.photo.irn+'.jpg'} height="100" />);
                        })}
                    </div>
                    <div style={{...globalStyles.title, ...styles.suggestionsCategory}}> More Photos from [Neighborhood] </div>
                    <div style={styles.photoSuggestions} className="smoothScroller">  
                        { this.props.hits.map((hit) => {
                            return(<img style={styles.recommendedImage} src={process.env.PUBLIC_URL + '/images/'+this.props.photo.irn+'.jpg'} height="100" />);
                        })}
                    </div>
                </div>

                <div style={{ ...globalStyles.line }} />

                <div style={{ ...styles.additionalInfo, marginBottom: '5vw',}}> 
                    <div style={{ ...globalStyles.title}}>
                        Record Data
                    </div>
                     <div style={{ ...globalStyles.body, marginBottom: '5vw',}}>
                        This record is subject to revision due to <a href="https://cmoa.org/collection/">ongoing research</a>. If you have additional information regarding this object, or have noticed an error, please send feedback or inquiries to <a href="mailto:collection@cmoa.org">collection@cmoa.org</a>
                    </div>
                    <div style={{ ...globalStyles.title}}>
                        Privacy
                    </div>
                    <div style={{ ...globalStyles.body}}>
                     We won't collect your email to spam you. 
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

