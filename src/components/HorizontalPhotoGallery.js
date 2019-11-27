import React, {Component}
from 'react';
import { connect } from 'react-redux'

import globalStyles from '../styles'

import _ from 'lodash';


const styles = {
    photoSuggestions: {
        overflow: 'scroll',
        display: 'flex',
        width:'100vw',
        paddingLeft: '0vw',
    },
    recommendedImage: {
        height: '20vh',
        paddingRight: '5vw',
    },
}

class HorizontalPhotoGallery extends Component {

    constructor(props) {
      super(props);
      this.scrollingGallery = React.createRef();
      this.lastImages = React.createRef();
      this.firstImages = React.createRef();
      this.middleImages = React.createRef();
    }

    componentDidMount() {
      this.scrollingGallery.current.scrollLeft = this.lastImages.current.offsetWidth - this.vw(4.9);
    }

    vh = (v) => {
      var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      return (v * h) / 100;
    }

    vw = (v) => {
      var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      return (v * w) / 100;
    }

    handleScroll = (e) => {
        const right = e.target.scrollWidth - e.target.scrollLeft === e.target.clientWidth;
        const left = e.target.scrollLeft === 0;

        if (right) { 
            console.log("RIGHT!")
            this.scrollingGallery.current.scrollLeft = this.lastImages.current.offsetWidth + this.firstImages.current.offsetWidth - this.vw(100);

        } else if (left) {
            console.log("LEFT!")
            this.scrollingGallery.current.scrollLeft = this.scrollingGallery.current.scrollLeft + this.middleImages.current.offsetWidth;
        }
    }

    render() {

        var lastImages = _.takeRight(this.props.photos, 5);
        var firstImages = _.take(this.props.photos, 5);

        return ( 
          <div style={styles.photoSuggestions} className="smoothScroller" onScroll={this.handleScroll} ref={this.scrollingGallery}> 
              
              <div style={{ display: 'flex' }} ref={this.lastImages}>
                { lastImages.map((photo) => {
                    return(<img alt="" style={styles.recommendedImage} src={process.env.PUBLIC_URL + '/images/'+photo.irn+'.jpg'} height="100" />);
                })}    
              </div>

              <div style={{ display: 'flex' }} ref={this.middleImages}>
                { this.props.photos.map((photo) => {
                    return(<img alt="" style={styles.recommendedImage} src={process.env.PUBLIC_URL + '/images/'+photo.irn+'.jpg'} height="100" />);
                })}
              </div>
              
              <div style={{ display: 'flex' }} ref={this.firstImages}>
                { firstImages.map((photo) => {
                    return(<img alt="" style={styles.recommendedImage} src={process.env.PUBLIC_URL + '/images/'+photo.irn+'.jpg'} height="100" />);
                })}
              </div>
          </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
	return {}
}

const mapStateToProps = state => {
    return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HorizontalPhotoGallery)

