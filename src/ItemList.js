import React, {Component} from 'react';
import classNames from 'classnames';

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
      <div className='ui list selection horizontal'>
         {items}
      </div>
    )
  }
}

export default ItemList;
