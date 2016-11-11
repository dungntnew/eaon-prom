import React, {Component} from 'react';
import {fabric} from 'fabric';

import List from '../containers/ItemList';
import {Messages} from '../Config';


class BaseTool extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeIndex: -1
    }

    this.onItemClick = this.onItemClick.bind(this)
    this.isLateInitialized = false
  }

  componentDidUpdate() {
    if (!this.isLateInitialized) {
      this.initializeLate()
      this.isLateInitialized = true
      this.forceUpdate()
    }
  }

  initializeLate() {
  }

  onItemClick(id, src) {
    return (env) => {
      console.log('Item clicked..: ' + id + ' => ' + src)
    }
  }

  loadImageFrom(src, func) {
    this.props.onStartProcess(Messages.loading)

    fabric.Image.fromURL(src, (res) => {
      if (func) {
        func(res, this.props.onFinishProcess)
      } else {
        this.props.onFinishProcess()
      }
    }, this.props.onError)
  }

  resourceImageById(id) {
    return this.props.resource.images.find(x => x.id === id)
  }

  findFirstElementInCanvas(tag) {
    const canvas = this.props.canvas
    const objects = canvas.getObjects()

    for(let i = 0; i < objects.length; i++) {
      if (objects[i].tag === tag) {
        return objects[i]
      }
    }
    return null
  }

  getCenterPos(size) {
      const canvas = this.props.canvas
      return {
        left: canvas.width/2 - size.width/2,
        top: canvas.height/2 - size.height/2
      }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandPos(size) {
    const canvas = this.props.canvas
    const haftWidth = canvas.width/2
    const haftHeight = canvas.height/2
    let left = this.getRandomInt(0, haftWidth)
    let top = this.getRandomInt(0, haftHeight)
    return {left, top}
  }

  configDefaultObject(obj) {
    obj.customiseCornerIcons( {
        settings: {
            borderColor: 'black',
            cornerSize: 25,
            cornerShape: 'rect',
            cornerBackgroundColor: 'black',
            cornerPadding: 10
        },
        tl: {
            icon: 'icons/icon_rotate.svg'
        },
        tr: {
            icon: 'icons/icon_zoom.svg'
        },
        bl: {
            icon: 'icons/icon_trash.svg'
        },
        br: {
            icon: 'icons/up.svg'
        },
        mb: {
            icon: 'icons/down.svg'
        },
        mt: {
            icon: 'icons/acute.svg'
        },
        mr: {
            icon: 'icons/repair-tools-cross.svg'
        }
    });
  }

  render() {
    const thumbnais = this.props.resource.thumbnails.map((item) =>  {
      return {
        id: item.id,
        key: 'thumbnail-' + item.id,
        src: item.src,
      }
    })

    return (
      <List
        activeIndex={this.state.activeIndex}
        items={thumbnais}
        onItemClick={this.onItemClick}
      />
    )
  }
}

export default BaseTool;
