import React, {Component} from 'react';
import classNames from 'classnames';
import './ItemList.css';

import btnPrev from './img/btn_prev.png';
import btnNext from './img/btn_next.png';

const threadshot = 250

function scrollTo(element, from, to, duration, currentTime, done=null) {
    if (from <= 0) { from = 0;}
    if (to <= 0) { to = 0;}
    if (currentTime>=duration) {
      if (done) done();
      return;
    }

    let delta = to-from;
    let progress = currentTime / duration * Math.PI / 2;
    let position = delta * (Math.sin(progress));

    setTimeout(() => {
       element.scrollLeft = from + position;
       scrollTo(element, from, to, duration, currentTime + 10, done);
    }, 10);
}

class List extends Component {
  constructor() {
    super()
    this.state ={
      hasPrev: false,
      hasNext: true,
    }
    this.nextHandler = this.nextHandler.bind(this)
    this.prevHandler = this.prevHandler.bind(this)
  }

  componentDidMount() {
    this.updateInterval = setInterval(()=> this.updateScrollState(), 500)
  }

  componentWillUnmount() {
    if(this.updateInterval){
      clearInterval(this.updateInterval);
    }
  }

  updateScrollState() {
    const el = this.refs.content
    this.setState({
      hasPrev: el.scrollLeft > 0,
      hasNext: el.scrollLeft + el.offsetWidth !== el.scrollWidth
    })
  }

  nextHandler(e) {
    e.preventDefault()
    if (!this.state.hasNext) {
      return;
    }
    const el = this.refs.content
    const start = el.scrollLeft;
    const to = start + threadshot
    const duration = 500

    scrollTo(el,
      start,
      to,
      duration, 0, ()=> this.updateScrollState());

  }

  prevHandler(e) {
    e.preventDefault()
    if (!this.state.hasPrev) {
      return;
    }
    const el = this.refs.content
    const start = el.scrollLeft;
    const to = Math.max(0, start - threadshot)
    const duration = 500

    scrollTo(el,
      start,
      to,
      duration, 0, ()=> this.updateScrollState());
  }

  render() {
    let prevBtnClasses = classNames({
      'mini image': true,
      'disabled': !this.state.hasPrev
    })

    let nextBtnClasses = classNames({
      'mini image': true,
      'disabled': !this.state.hasNext
    })

    return (
      <div className='ui middle aligned  grid'>
        <div className='row'>
            <div className='right aligned two wide column'>
              <a href="#" className={prevBtnClasses} onClick={this.prevHandler}>
              <img width={40} height={40} src={btnPrev} alt='prev'/>
              </a>
            </div>

            <div className='twelve wide column'>
                <div ref="content" className='list-wrapper' >
                  <ItemList items={this.props.items}
                      onItemClick={this.props.onItemClick}
                      activeIndex={this.props.activeIndex}
                  />
              </div>
            </div>

            <div className='left aligned two wide column'>
               <a href="#" className={nextBtnClasses} onClick={this.nextHandler}>
               <img width={40} height={40} src={btnNext} alt='next'/>
               </a>
            </div>
        </div>
      </div>
    )
  }
}

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
               <div className='ui tiny circular image'>
                  <img className='ui tiny circular image' width={80} height={80} src={item.src} alt=''/>
               </div>

          </div>
      )
    })

    return (
      <div className='ui mylist list selection horizontal item-list'>
         {items}
      </div>
    )
  }
}

export default List;
