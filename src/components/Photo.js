import React, {Component} from 'react';
import { connect } from 'react-redux'
import { search, closePhoto, sendPhoto, composeEmail } from '../actions/actions'

import globalStyles from '../styles'

import HorizontalPhotoGallery from './HorizontalPhotoGallery'

import {PinchView} from 'react-pinch-zoom-pan'
import PinchZoomPan from "react-responsive-pinch-zoom-pan";

import { useGesture, withGesture, Gesture } from 'react-with-gesture'
import { motion } from "framer-motion"

const styles = {
    page: {
        display: 'flex',
        position: 'fixed',
        flex: 1,
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'white',
        overflow: 'visible',
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
        position: 'relative'
    },
    photoRenderThumb: {
        width: '100%',
        height: '100%',
        position: 'relative',
        filter: "blur(1px)",
    },
    photoRenderLarge: {
        width: '100%',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0, 
        right: 0,
        transition: "opacity ease-in 1000ms",
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
        fontWeight: 'bold'
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
        this.state = { scrollY: 0 }

        this.scrollContainer = React.createRef();
        this.photo = React.createRef();
        this.page = React.createRef();

        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(event) {

        var scrollContainerHeight;
        this.scrollContainer.current !== null ? scrollContainerHeight = this.scrollContainer.current.clientHeight : console.log("scroll container not rendered")

        var pageHeight;
        this.page.current !== null ? pageHeight = this.page.current.clientHeight : console.log("page not rendered")

        var newY = this.state.scrollY + event.direction[1]*(100*event.velocity);

        if (newY > 0) {
            newY = 0;
        } else if (newY <= pageHeight - scrollContainerHeight) {
            newY = pageHeight - scrollContainerHeight;
            // hit bottom
        }

        this.setState({ scrollY: newY })
    }


    render() {  

        return ( 
            <div style={styles.page} ref={this.page}>
                <Gesture
                    onMove={this.handleScroll}
                >
                    {event => 
                        <motion.div 
                            ref={this.scrollContainer}
                            animate={{ x: 0, y: this.state.scrollY }}
                            transition={{ duration: 1, ease: "easeOut",}}
                        >
                            <div style={styles.photoContainer}>
                                    
                                <div style={{...styles.photoTitle, ...globalStyles.photoTitle}}> { this.props.photo.TitMainTitle } </div>
                                <div style={{ ...styles.photoSubtitle, ...globalStyles.photoDetail}}> 
                                    { this.props.photo.CreDateCreated }
                                </div>

                                <div style={{ ...styles.photoImage }}>
                                    <img alt="" style={styles.photoRenderThumb} src={this.props.photo.image_url_thumb} ref={this.photo}/>
                                    <img alt="" style={styles.photoRenderLarge} src={this.props.photo.image_url} />
                                </div>

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
                                        Return to search results
                                    </span>  
                                    <div style={styles.emailContainer}>
                                        <div style={styles.emailLabel}>
                                            Share this photograph
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
                                                placeholder="Enter an email address"
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
                                { /* <HorizontalPhotoGallery photos={this.props.hits} /> */ }
                            </div>
                            <div style={{ marginBottom: '5vw' }}>
                                <div style={{...globalStyles.body, ...styles.suggestionsCategory}}> More photos from&nbsp;
                                    <span style={{ color: globalStyles.cmoaRed}}>Pittsburgh, PA</span>
                                </div>
                                 { /* <HorizontalPhotoGallery photos={this.props.hits} /> */ }
                            </div>
                            <div>
                                <div style={{...globalStyles.body, ...styles.suggestionsCategory}}> More photos from&nbsp;
                                    <span style={{ color: globalStyles.cmoaRed}}>1950</span>
                                </div>
                                 { /* <HorizontalPhotoGallery photos={this.props.hits} /> */ }
                            </div>

                            <div style={{ ...globalStyles.line }} />

                            { /* Reach Out */}
                            <div style={{ ...styles.additionalInfo, marginBottom: '5vw' }}> 
                                <div style={{ ...globalStyles.title}}>
                                    Record Data
                                </div>
                                 <div style={{ ...globalStyles.body, marginBottom: '5vw' }}>
                                    This record has been reviewed by the curatorial staff but may be incomplete. Our records are frequently revised and enhanced. If you have additional information regarding this image, or have noticed an error, please reach out to the Teenie Harris Archive staff at <a style={{ color: globalStyles.cmoaRed }} onClick={() => this.props.composeEmail() }>CMOATeenie@cmoa.org</a>. Development for this tool has been generously supported by the Collections as Data granting initiative. Search powered by Algolia.
                                </div>
                                <div style={{ ...globalStyles.title}}>
                                    Privacy
                                </div>
                                <div style={{ ...globalStyles.body }}> 
                                 We won't collect or share your email address. 
                                </div>
                            </div>
                        </motion.div>
                    }
                </Gesture>
            </div>
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

