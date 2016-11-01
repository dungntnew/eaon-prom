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

    const exportSize = this.exportSize()
    this.canvas.setWidth(exportSize.width, {
      backstoreOnly: true
    })

    this.canvas.setHeight(exportSize.height, {
      backstoreOnly: true
    })

    const size = this.canvasSize()
    this.setViewSize(size.width, size.height)
  }

  setViewSize(width, height) {
    if (this.canvas) {
      this.canvas.setWidth(width, {cssOnly: false})
      this.canvas.setHeight(height, {cssOnly: false})
      this.canvas.renderAll()
      console.log('canvas refreshed on resize')
    }
  }

  canvasSize() {
    const height = this.props.editorHeight - EditorConfig.TOOLBAR_HEIGHT;
    return {
      width: height,
      height: height
    }
  }

  exportSize() {
    return {
      width: EditorConfig.EXPORT_WIDTH,
      height: EditorConfig.EXPORT_HEIGHT
    }
  }

  showWaitDimmer(message) {
    return;
    this.setState({
      loading: true,
      loadingMessge: message || 'Loading'
    })
  }

  hideWaitDimmer() {
    return;
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
    const size = this.canvasSize()
    this.setViewSize(size.width, size.height)

    const style = {
      size: {
        height: size.height + 'px',
        width: size.width + 'px',
        margin: '0px auto',
      }
    }

    return (
      <Segment padded>
        <Segment>
          <div className='ui container canvas-wrapper'>
             <canvas style={style.size} className='' id="canvas" ref='canvas'/>
          </div>
          <Loader
            active={this.state.loading}
            message={this.state.loadingMessage}
          />
        </Segment>

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
      </Segment>
    )
  }
};

export default Editor;
