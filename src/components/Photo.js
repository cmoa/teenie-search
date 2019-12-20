import React, {Component} from 'react';
import { connect } from 'react-redux'
import { search, closePhoto, sendPhoto, composeEmail } from '../actions/actions'

import globalStyles from '../styles'

import HorizontalPhotoGallery from './HorizontalPhotoGallery'

import {PinchView} from 'react-pinch-zoom-pan'
import PinchZoomPan from "react-responsive-pinch-zoom-pan";

import CustomScroll from 'react-custom-scroll';



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
        width: '90vw',
        height: 'auto',
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
        color: globalStyles.cmoaRed,
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        
    },
    backIcon: {
        color: globalStyles.cmoaRed,
        transform: 'rotate(270deg)',
        width: '1.5vh',
        height: '5vh',
        marginRight: '1.5vh'
    },
    suggestionsCategory: {
        width: '90vw',
        margin: '0vh 5vw',
        marginBottom: '2.5vw',
        fontWeight: 'bold',
    },
    emailContainer: {
        ...globalStyles.body,
        display: 'flex',
        flexDirection: 'column',
    },
    emailButton: {
        height: "5vh",
        width: "5vh",
        backgroundColor: globalStyles.cmoaRed,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
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

    constructor(props) {
        super(props);
        this.scrollContainer = React.createRef();
        this.photo = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.photo.irn !== this.props.photo.irn) {
            this.scrollContainer.current.scrollTop = 0;
        }
        
    }

    componentDidMount() {
        console.log(this.photo.clientHeight);
        console.log(this.photo.current.height)
    }

    handleScroll = (e) => {
        console.log(e)
        // const top = e.target.scrollTop <= 0
        // const bottom = e.target.scrollHeight - e.target.scrollTop >= e.target.clientHeight;
        // if (bottom) { 
        //     e.preventDefault();
        //     console.log(e.target.clientHeight)
        //     e.target.scrollTop = e.target.clientHeight - 1;
        // }

        // if (top) {
        //     e.preventDefault();
        //     e.target.scrollTop = 1;
        // }
    }

    render() {

        return ( 
            <CustomScroll>

                <div style={styles.page} className="smoothScroller" ref={this.scrollContainer} onScroll={this.handleScroll}>
                    <div style={styles.photoContainer}>
                            
                        <div style={{...styles.photoTitle, ...globalStyles.photoTitle}}> { this.props.photo.TitMainTitle } </div>
                        <div style={{ ...styles.photoSubtitle, ...globalStyles.photoDetail}}> 
                            { this.props.photo.CreDateCreated }
                        </div>

                       
                        <img alt="" style={styles.photoImage} src={this.props.photo.image_url} ref={this.photo}/>
                        

                        <div style={{marginBottom: '5vw'}}> 
                            <div style={{ ...globalStyles.body }}> 
                                <div>{ this.props.photo.CatDescriptText } </div>
                            </div>
                        </div>   

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <span style={{...globalStyles.body, ...styles.backButton}} onClick={() => { this.props.closePhoto() }}>
                                <div style={styles.backButton}>
                                    <svg style={styles.backIcon} class="svg-inline--fa fa-chevron fa-w-16" aria-hidden="true" data-prefix="cmoa" data-icon="chevron" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" data-fa-i2svg="" focusable="false"><path fill="currentColor" d="M375,185.4L250,55.8L125,185.4L0,315.1l125,129.6l125-129.6l125,129.6l125-129.6L375,185.4L375,185.4L375,185.4z"></path></svg>
                                </div>                                
                                Back to search results
                            </span>  
                            <div style={styles.emailContainer}>
                                <div style={styles.emailLabel}>
                                    Share this photograph:
                                </div>
                                <form 
                                    id="photoform"
                                    style={{ display: 'flex', width: '100%'}}
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        this.props.sendPhoto(event, this.props.photo.url)
                                        document.forms["photoform"].reset();
                                    }}
                                >
                                    <input 
                                        style={{...globalStyles.searchTerm, display: 'block' }}
                                        type="email" 
                                        placeholder="Enter an email"
                                        onFocus={() => { console.log("show Keyboard") }}
                                        onBlur={() => { console.log("hide Keyboard") }}
                                        onChange={(event) => console.log(event) }
                                        required
                                    />
                                    <button type="submit" form="photoform" style={{ ...styles.emailButton }}>
                                        <svg style={{ ...styles.emailIcon }} aria-hidden="true" data-prefix="far" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" focusable="false"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg>
                                    </button>  
                                </form>  
                                                        
                            </div>
                        </div>
                    </div>

                    <div style={{ ...globalStyles.line }} />

                    { /* Suggestions */}
                    <div style={{ marginBottom: '5vw' }}>
                        <div style={{...globalStyles.body, ...styles.suggestionsCategory}}> More results for&nbsp;
                            <span style={{ color: globalStyles.cmoaRed}}>{this.props.searchTerm}</span>
                        </div>
                        <HorizontalPhotoGallery photos={this.props.hits} />
                    </div>
                    <div style={{ marginBottom: '5vw' }}>
                        <div style={{...globalStyles.body, ...styles.suggestionsCategory}}> More photos from&nbsp;
                            <span style={{ color: globalStyles.cmoaRed}}>Pittsburgh, PA</span>
                        </div>
                        <HorizontalPhotoGallery photos={this.props.hits} />
                    </div>
                    <div>
                        <div style={{...globalStyles.body, ...styles.suggestionsCategory}}> More photos from&nbsp;
                            <span style={{ color: globalStyles.cmoaRed}}>1950</span>
                        </div>
                        <HorizontalPhotoGallery photos={this.props.hits} />
                    </div>

                    <div style={{ ...globalStyles.line }} />

                    { /* Reach Out */}
                    <div style={{ ...styles.additionalInfo, marginBottom: '5vw' }}> 
                        <div style={{ ...globalStyles.title}}>
                            Record Data
                        </div>
                         <div style={{ ...globalStyles.body, marginBottom: '5vw' }}>
                            This record is subject to revision due to ongoing research. 
                            WE CAN ADD MORE ABOUT THE MACHINE LEARNING / COMPUTER VISION WORK HERE. Search powered by Algolia.
                            If you have additional information regarding this object, or have noticed an error, 
                            please send feedback or inquiries 
                            to <a 
                                style={{ color: globalStyles.cmoaRed }}
                                onClick={() => this.props.composeEmail() }
                            >collection@cmoa.org</a>
                        </div>
                        <div style={{ ...globalStyles.title}}>
                            Privacy
                        </div>
                        <div style={{ ...globalStyles.body }}> 
                         We won't collect your email to spam you. 
                        </div>
                    </div>
                </div>
        </CustomScroll>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        search: (term) => dispatch(search(term)),
        closePhoto: () => dispatch(closePhoto()),
        sendPhoto: (email, photo) => dispatch(sendPhoto(email, photo)),
        composeEmail: () => dispatch(composeEmail())
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

