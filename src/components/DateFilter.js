import React, {Component}
from 'react';
import { connect } from 'react-redux'
import { openPhoto } from '../actions/actions'


import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';


import globalStyles from '../styles'

import _ from 'lodash';


const styles = {
  rangeContainer: {
    display: 'inline-block',
    width: '90%'
  }
}

class DateFilter extends Component {

    constructor(props) {
      super(props);
    }

    render() {
        return ( 
          <div style={styles.rangeContainer}>
            <Range />
          </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
	return {
    openPhoto: (irn) => dispatch(openPhoto(irn)),
  }
}

const mapStateToProps = state => {
    return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DateFilter)

