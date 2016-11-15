import React, {Component} from 'react';
import {fabric} from 'fabric';

import List from '../containers/ItemList';
import {Messages} from '../Config';

import iconRotate from '../icons/icon_rotate.svg';
import iconZoom from '../icons/icon_zoom.svg';
import iconTrash from '../icons/icon_trash.svg';
import iconUp from '../icons/up.svg';
import iconDown from '../icons/down.svg';
import iconAcute from '../icons/acute.svg';
import iconRepair from '../icons/repair-tools-cross.svg';

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
      res.crossOrigin = "anonymous"
      if (func) {
        func(res, this.props.onFinishProcess)
      } else {
        this.props.onFinishProcess()
      }
    }, this.props.onError, {
        crossOrigin: 'Anonymous'
    })
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
            icon: iconRotate
        },
        tr: {
            icon: iconZoom
        },
        bl: {
            icon: iconTrash
        },
        br: {
            icon: iconUp
        },
        mb: {
            icon: iconDown
        },
        mt: {
            icon: iconAcute
        },
        mr: {
            icon: iconRepair
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
