import React, {Component} from 'react';
import classNames from 'classnames';

import './ExportConfirm.css';

import titleImage from './navi/title_naomi_generator.png';

class ExportConfirm extends Component {
  render() {
    const modelClasses = classNames({
      'ui dimmer fluid': true,
      'active': this.props.active
    })

    return (
      <div className={modelClasses}>
      <div className="ui center aligned very padded segment confirm-segment">

        <div className="titleImage">
           <img className="ui" width={250} height={25} src={titleImage} alt="GENERATOR"/>
        </div>
        <div className="ui hidden divider"></div>
        <div className="ui hidden divider"></div>

         <img className="ui confirm-image" src={this.props.exportedData} alt='preview'/>

         <div className="ui hidden divider"></div>

         <h2 className="ui header confirm-text">これでOK ?</h2>

         <div className="ui hidden divider"></div>

         <button
             className="ui grey large button confirm-btn"
             onClick={this.props.onCancelClick}>戻る
         </button>

         <button
            className="ui pink large button confirm-btn"
            onClick={this.props.onDecidedClick}>決定する
         </button>

       </div>

      </div>
    )
  }
}

export default ExportConfirm;
