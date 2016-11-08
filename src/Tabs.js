import React, {Component} from 'react';
import classNames from 'classnames';
import './Tabs.css';

class Tabs extends Component {

  render() {
    const titles = this.props.titles.map((title, index) => {
      const itemClass = classNames({
        'item': true,
        'active': this.props.activeTab === index
      })

      return (
        <div key={'tab-item-' + index} className={itemClass}
             onClick={this.props.onTabSelect(index)}
        > {title} </div>
      )
    });

    const contents = this.props.contents.map((body, index) => {
      const itemClass = classNames({
        'ui attached tab bottom': true,
        'active': this.props.activeTab === index
      })

      return (
        <div key={'tab-' + index} className={itemClass}> {body}</div>
      )
    });

    return (
      <div className='ui container mytab'>
        <div className='mytabmenu ui top attached tabular menu'>
            {titles}
        </div>
        {contents}
      </div>
    )
  }
}

export default Tabs;
