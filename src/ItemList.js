import React, {Component} from 'react';
import classNames from 'classnames';
import './ItemList.css';

class ItemList extends Component {
  render() {
    const items = this.props.items.map((item) => {
      const classes = classNames({
        'item': true,
        'active': this.props.activeIndex === item.id
      })
      return (
          <div className={classes}
               key={item.key}
               onClick={this.props.onItemClick(item.id, item.src)}>
            <div className='tiny image'>
              <img width={80} height={80} src={item.src} alt=''/>
            </div>
          </div>
      )
    })

    return (
      <div className='list-wrapper'>
      <div className='ui list selection horizontal item-list'>
         {items}
      </div>
      </div>
    )
  }
}

export default ItemList;
