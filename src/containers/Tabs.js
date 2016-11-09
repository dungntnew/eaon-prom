import React, {Component} from 'react';
import classNames from 'classnames';
import './Tabs.css';

class Tabs extends Component {

  render() {
    const titles = this.props.titles.map((title, index) => {
      const active = this.props.activeTab === index
      const itemClass = classNames({
        'ui label image': true,
        'active': active
      })
      const itemTitle = active ? title.on : title.off

      return (
        <div key={'tab-item-' + index} className={itemClass}
             onClick={this.props.onTabSelect(index)}
        >
          <img width={50} height={30} src={itemTitle} className="ui large centered image" alt='tab-item'/>
        </div>
      )
    });

    const contents = this.props.contents.map((body, index) => {
      const itemClass = classNames({
        'ui attached tab bottom mytabcontent': true,
        'active': this.props.activeTab === index
      })

      return (
        <div key={'tab-' + index} className={itemClass}> {body}</div>
      )
    });
    
    return (
      <div className='ui container mytab'>
        <div className='mytabmenu ui tabular menu compact large labels'>
            {titles}
        </div>
        {contents}
      </div>
    )
  }
}

export default Tabs;
