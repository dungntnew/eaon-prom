import React, {Component} from 'react';
import classNames from 'classnames';
import {fabric} from 'fabric';

import Messages from './Messages';
import EditorToolConfig from './EditorToolConfig';

console.log(EditorToolConfig);

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
        'ui attached tab bottom segment': true,
        'active': this.props.activeTab === index
      })

      return (
        <div key={'tab-' + index} className={itemClass}> {body}</div>
      )
    });

    return (
      <div className='ui container'>
        <div className='ui top attached tabular menu'>
            {titles}
        </div>
        {contents}
      </div>
    )
  }
}

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
    console.log('component initialize late')
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

  findFirstElementInCanvas(name) {
    const canvas = this.props.canvas
    const objects = canvas.getObjects()

    for(let i = 0; i < objects.length; i++) {
      if (objects[i].name === name) {
        return objects[i]
      }
    }
    return null
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
      <div>
        <ItemList
          activeIndex={this.state.activeIndex}
          items={thumbnais}
          onItemClick={this.onItemClick}
        />
      </div>
    )
  }
}

class FaceTool extends BaseTool {
  constructor(props){
    super(props)
    this.state = {
      activeIndex: -1
    }
  }

  initializeLate() {
    const defaultFace = this.resourceImageById(0)
    if (defaultFace) {
      this.setFace(defaultFace.src)
    }
  }

  setFace(src) {
    const canvas = this.props.canvas
    const faceConfig = EditorToolConfig.faceConfig
    let lastFace = this.findFirstElementInCanvas('face')

    this.loadImageFrom(src, (image, func) => {

      if (lastFace) {
        lastFace.setElement(image.getElement())
      } else {
        lastFace = image
        this.props.canvas.add(lastFace)
      }

      lastFace.setWidth(faceConfig.size.width)
      lastFace.setHeight(faceConfig.size.height)
      lastFace.name = 'face'

      this.props.canvas.renderAll()
      if (func) func()
    })
  }

  onItemClick(id) {
    return (env) => {
      const image = this.resourceImageById(id)
      if (image) {
        this.setFace(image.src)
      }
    }
  }
}

class HairTool extends BaseTool {
  onItemClick(id) {
    return (env) => {
      console.log('Hair Item clicked..: ' + id)
    }
  }
}

class BGTool extends BaseTool {
  constructor(props){
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  initializeLate() {
    const defaultImage = this.resourceImageById(0)
    if (defaultImage) {
      this.setBackground(defaultImage.src)
    }
  }

  setBackground(src) {
    const canvas = this.props.canvas
    this.loadImageFrom(src, (image, func) => {
      image.setWidth(canvas.width)
      image.setHeight(canvas.height)
      //image.meetOrSlice = 'meet'
      this.props.canvas.setBackgroundImage(image)
      this.props.canvas.renderAll()
      if (func) func()
    })
  }

  onItemClick(id) {
    return (env) => {
      const background = this.resourceImageById(id)
      if (background) {
        this.setState({
          activeIndex: id,
        })
        this.setBackground(background.src)
      }
    }
  }
}

class GoodsTool extends BaseTool {
  onItemClick(id) {
    return (env) => {
      console.log('Goods Item clicked..: ' + id)
    }
  }
}

class EditorToolBox extends Component {

  constructor() {
    super()
    this.state = {
      activeTab: 0
    }
    this.changeTab = this.changeTab.bind(this)
  }

  changeTab(index) {
    return (evt) => {
      this.setState({
        activeTab: index
      })
    }
  }

  render() {
    const titles = [
      this.props.assets.face.title,
      this.props.assets.hair.title,
      this.props.assets.background.title,
      this.props.assets.goods.title,
    ]

    const contents = [
      <FaceTool
        canvas={this.props.canvas}
        resource={this.props.assets.face}
        onStartProcess={this.props.onStartProcess}
        onFinishProcess={this.props.onFinishProcess}
        onError={this.props.onError}
       />,
      <HairTool
        canvas={this.props.canvas}
        resource={this.props.assets.hair}
        onStartProcess={this.props.onStartProcess}
        onFinishProcess={this.props.onFinishProcess}
        onError={this.props.onError}
      />,
      <BGTool
        canvas={this.props.canvas}
        resource={this.props.assets.background}
        onStartProcess={this.props.onStartProcess}
        onFinishProcess={this.props.onFinishProcess}
        onError={this.props.onError}
      />,
      <GoodsTool
       canvas={this.props.canvas}
       resource={this.props.assets.goods}
       onStartProcess={this.props.onStartProcess}
       onFinishProcess={this.props.onFinishProcess}
       onError={this.props.onError}
      />
    ]

    return (
      <div className='ui container'>
        <Tabs
          titles={titles}
          contents={contents}
          activeTab={this.state.activeTab}
          onTabSelect={this.changeTab}
        />
      </div>
    )
  }
}

export default EditorToolBox;
