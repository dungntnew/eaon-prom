import React, {Component} from 'react'
import classNames from 'classnames'

class Loader extends Component {

  render() {
    const loadingMessge = this.props.message || 'Loading'
    const classes = classNames({
      'ui dimmer inverted': true,
      'active': this.props.active,
    })

    return (
      <div className={classes}>
          <div className="content">
            <div className="center">
              <div className="ui text loader">
                {loadingMessge}
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default Loader;
