import React, {Component} from 'react';
import classNames from 'classnames';

import './ExportConfirm.css';

class ExportConfirm extends Component {
  render() {
    const modelClasses = classNames({
      'ui dimmer fluid': true,
      'active': this.props.active
    })

    return (
      <div className={modelClasses}>
       <div className="ui column center middle aligned grid segment confirm-segment">
       <div className="ui one column">
       <div className="ui medium image">
         <img src={this.props.exportedData} alt='preview'/>
       </div>
        <div className="ui horizontal divider"></div>
        <div className="segment very padded">
          <button className="positive ui button large" onClick={this.props.onDecidedClick}>ダウンロード</button>
          <button className="negative ui button large" onClick={this.props.onCancelClick}>編集</button>
        </div>
        </div>
       </div>
      </div>
    )
  }
}

export default ExportConfirm;
