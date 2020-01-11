import React, {Component}
from 'react';
import { connect } from 'react-redux'
import { openPhoto } from '../actions/actions'
import { search } from '../actions/actions'

import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

import globalStyles from '../styles'

import posed from 'react-pose';

import _ from 'lodash';

const styles = {
  searchOptionContainer: {
    background: "linear-gradient(to bottom, rgba(255,255,255, 1) 0%, rgba(255,255,255,0.9) 100%)",
    display: 'flex',
    flexDirection: 'column',
    padding: '0 5vw 2.5vw 5vw',
    zIndex: 100,
  },
  optionLabel: {
    width: '13vw',
    display: 'inline-block',
    opacity: 0.6
  },
  sortOptionContainer: {
    height: '5vh',
    position: 'relative',
    display: 'flex',
    marginBottom: '1vw',
    alignItems: 'center',
  },
  sortOption: {
    color: globalStyles.cmoaRed,
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'inline-block',
    backgroundColor: 'white !important',
    MozUserSelect:'none',
    WebkitUserSelect:'none',
    msUserSelect:'none',
    width: '15vw'
  },
  directionIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'inline-block',
    marginLeft: '.5vh'
  },
  directionIcon: {
    color: globalStyles.cmoaRed,
    width: '1.25vh',
  },
  underline: {
    height: '4px',
    backgroundColor: globalStyles.cmoaRed,
    bottom: '18px',
    position: 'absolute',
    top: 40
  },
  dateRangeContainer: {
    display: 'inline-block',
    width: '71vw'
  }
}

const SelectionUnderline = posed.div({
  relevance: { 
    x: '11vw',
    width: '90px',
    ease: 'linear'
  },
  dateAscending: {
    x: '26vw',
    width: '63px',
    ease: 'linear'
  },
  dateDescending: {
    x: '26vw',
    width: '63px',
    ease: 'linear'
  },
});

const DirectionIcon = posed.div({
  relevance: { 
    opacity: 0,
    rotate: '0deg',
    ease: 'linear'
  },
  dateAscending: {
    opacity: 1,
    rotate: '180deg',
    ease: 'linear'
  },
  dateDescending: {
    opacity: 1,
    rotate: '0deg',
    ease: 'linear'
  },
});



class SearchOptions extends Component {

    constructor(props) {
      super(props);

      // find initial start and end dates ....

      this.state = { startDate: this.props.startDate, endDate: this.props.endDate };
    }

    searchWithOptions(updatedOptions) {

      var options = {
        startDate: this.props.startDate, 
        endDate: this.props.endDate,
        sortBy: this.props.sortBy
      }

      this.props.search(this.props.term, Object.assign(options, updatedOptions));
    }

    render() {

      var marks = {};
      marks[this.state.startDate] = (<div style={{...globalStyles.photoDetail, fontSize: '16px', paddingTop: '10px' }}>{this.state.startDate}</div>);
      marks[this.state.endDate] = (<div style={{...globalStyles.photoDetail, fontSize: '16px', transform: 'translateY(-29px)' }}>{this.state.endDate}</div>);

      var handleStyle = {
        backgroundColor: globalStyles.cmoaRed, 
        borderColor: globalStyles.cmoaRed,
      }

      return ( 
        <div style={{...styles.searchOptionContainer}}>
          <div style={styles.sortOptionContainer}>
            <span style={{ ...styles.optionLabel, marginRight: '4vw' }}>Date range</span>
            <div style={styles.dateRangeContainer}>
              <Range 
                min={1915}
                max={1980}
                handleStyle={[handleStyle, handleStyle]}
                trackStyle={[{ backgroundColor: globalStyles.cmoaRed }]}
                railStyle={{ backgroundColor: '#ccc' }}
                marks={marks}
               // {number: { style, label }}
                value={[this.state.startDate, this.state.endDate]}
                onChange={(event) => {
                  this.setState({
                    startDate: event[0],
                    endDate: event[1]
                  })
                }}
                onAfterChange={(event) => {
                  this.searchWithOptions({ startDate: event[0], endDate: event[1] })
                }}
              />
            </div>
          </div>

          <div style={{ ...styles.sortOptionContainer }}>
            <span style={{ ...styles.optionLabel, width: '11vw' }}>Sort by</span>
              <span 
                style={{ ...globalStyles.body, ...styles.sortOption}}  
                onClick={() => {
                  if (this.props.sortBy !== "relevance") {
                    this.searchWithOptions({ sortBy: "relevance" })
                  }
                }}
              >
                relevance
              </span>
            <span 
              style={{ ...globalStyles.body, ...styles.sortOption }}  
              onClick={() => {
                if (this.props.sortBy === "dateAscending") {
                  this.searchWithOptions({ sortBy: "dateDescending"})
                } else if (this.props.sortBy === "dateDescending") {
                  this.searchWithOptions({ sortBy: "dateAscending"})
                } else if (this.props.sortBy === "relevance") {
                  this.searchWithOptions({ sortBy: "dateAscending" })
                }
              }}
            >
              date
              <DirectionIcon pose={this.props.sortBy} style={{ ...styles.directionIconContainer }}>
                <svg style={{ ...styles.directionIcon }} className="svg-inline--fa fa-chevron fa-w-16" aria-hidden="true" data-prefix="cmoa" data-icon="chevron" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" data-fa-i2svg="" focusable="false"><path fill="currentColor" d="M375,185.4L250,55.8L125,185.4L0,315.1l125,129.6l125-129.6l125,129.6l125-129.6L375,185.4L375,185.4L375,185.4z"></path></svg>
              </DirectionIcon>
            </span>
            <SelectionUnderline pose={this.props.sortBy} style={{ ...styles.underline }} />
          </div>

            <div style={{ ...globalStyles.body, display: this.props.loading ? 'none' : 'block'}}>
              {this.props.resultsString}
            </div>  

        </div>
      )
    }
}

/*
changeOption={(options) => {
                          this.props.search(this.props.term, options);
                        }}
                        */

const mapDispatchToProps = dispatch => {
	return {
    search: (term, options) => dispatch(search(term, options || {})),
  }
}

const mapStateToProps = state => {
    return {
      term: state.search.term,
      startDate: state.search.startDate,
      endDate: state.search.endDate,
      sortBy: state.search.sortBy
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchOptions)

