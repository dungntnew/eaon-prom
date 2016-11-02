import React, {Component} from 'react';

import {
        Segment,
        Divider,
} from 'semantic-ui-react';

import Assets from './Assets';
import EditorConfig from './EditorConfig';
import './Editor.css'

import EditorToolBox from './EditorToolBox'
import AppMenu from './AppMenu'
import Loader from './Loader';

import {fabric} from 'fabric';

class Editor extends Component {

  constructor() {
    super()

    this.state = {
      loading: false,
      loadingMessge: '',
    }
    this.showWaitDimmer = this.showWaitDimmer.bind(this)
    this.hideWaitDimmer = this.hideWaitDimmer.bind(this)
    this.showError = this.showError.bind(this)
    this.hideError = this.hideError.bind(this)
  }

  componentDidMount() {
    this.initCanvas()
    this.forceUpdate()
  }

  initCanvas() {
    this.canvas = window.canvas = new fabric.Canvas('canvas', {
      containerClass: 'canvas-container',
      backgroundColor: 'white'
    })

    const size = this.canvasViewSize()
    this.setViewSize(size.width, size.height, size.zoom)
  }

  setViewSize(width, height, zoom) {
    if (this.canvas) {
      this.canvas.setWidth(width)
      this.canvas.setHeight(height)
      this.canvas.renderAll()
    }
  }

  canvasViewSize() {
    const height = this.props.editorHeight - EditorConfig.TOOLBAR_HEIGHT;
    const width = this.props.editorWidth - EditorConfig.EDITOR_MARGIN_X * 2;
    const canvasHeight = Math.min(width, height)

    const zoom = canvasHeight / EditorConfig.EXPORT_HEIGHT;
    return {
      width: canvasHeight,
      height: canvasHeight,
      zoom: zoom,
    }
  }

  showWaitDimmer(message) {
    if (!EditorConfig.USE_DIMMER) {
      return;
    }
    this.setState({
      loading: true,
      loadingMessge: message || 'Loading'
    })
  }

  hideWaitDimmer() {
    if (!EditorConfig.USE_DIMMER) {
      return;
    }
    setTimeout(() => {
      this.setState({
        loading: false,
        loadingMessge: ''
      })
    }, EditorConfig.DIMMER_TIMEOUT);
  }

  showError(error) {
  }

  hideError() {
  }

  render() {
    const size = this.canvasViewSize()
    this.setViewSize(size.width, size.height, size.zoom)

    const style = {
      size: {
        height: size.height + 'px',
        width: size.width + 'px',
        margin: '0px auto',
      }
    }

    return (
      <div className='ui'>
        <div className='ui'>
          <div className='ui canvas-wrapper'>
             <canvas style={style.size} className='' id="canvas" ref='canvas'/>
          </div>
          <Loader
            active={this.state.loading}
            message={this.state.loadingMessage}
          />
        </div>

         <Divider/>
         <EditorToolBox
          canvas={this.canvas}
          assets={Assets}
          onStartProcess={this.showWaitDimmer}
          onFinishProcess={this.hideWaitDimmer}
          onError={this.showError}
         />
         <Divider/>

        <AppMenu
            onConfirmClick={this.confirmHandler}
            onCloseClick={this.closeHandler}
        />
      </div>
    )
  }
};

export default Editor;
