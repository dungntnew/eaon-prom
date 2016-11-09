import React, {Component} from 'react';
import Assets from './Assets';
import EditorConfig from './EditorConfig';
import './Editor.css'

import EditorToolBox from './EditorToolBox'
import Loader from './Loader';

import {fabric} from 'fabric';
import {setupFabricObjectControls} from './FabricEx';

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
    this.handleExport = this.handleExport.bind(this)
  }

  componentDidMount() {
    this.initCanvas()
    this.forceUpdate()
  }

  initCanvas() {

    setupFabricObjectControls(fabric, true);

    this.canvas = window.canvas = new fabric.Canvas('canvas', {
      containerClass: 'canvas-container',
      backgroundColor: 'white'
    })

    const size = this.canvasViewSize()
    this.setViewSize(size.width, size.height, size.zoom)
  }

  setViewSize(width, height, zoom) {
    if(this.canvas) {
      this.canvas.setWidth(width, {cssOnly: false})
      this.canvas.setHeight(height, {cssOnly: false})
      this.canvas.setWidth(EditorConfig.EXPORT_WIDTH, {backstoreOnly: true})
      this.canvas.setHeight(EditorConfig.EXPORT_HEIGHT, {backstoreOnly: true})
    }
  }

  canvasViewSize() {
    const height = this.props.editorHeight - EditorConfig.TOOLBAR_HEIGHT;
    const width = this.props.editorWidth - EditorConfig.EDITOR_MARGIN_X * 2;
    const canvasHeight = Math.max(Math.min(width, height), EditorConfig.EDITOR_MIN_H);


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

  showError(error) {}

  hideError() {}

  handleExport() {
    const data = this.canvas.toDataURL({
      format: 'jpeg',
      quality: 1,
      multiplier: 0.5
    })
    try {
      localStorage.setItem(EditorConfig.EXPORT_ITEM_KEY, data);
      window.location.pathname = EditorConfig.FINISH_PATH;
    }
    catch(e) {
      console.error('something wrong: ' + e);
      this.showError(e);
    }
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
      <div>
        <div className='ui canvas-wrapper'>
           <canvas style={style.size} className='' id="canvas" ref='canvas'/>
        </div>
        <Loader
          active={this.state.loading}
          message={this.state.loadingMessage}
        />

         <div className='ui hidden divider'></div>
         <EditorToolBox
          canvas={this.canvas}
          assets={Assets}
          onStartProcess={this.showWaitDimmer}
          onFinishProcess={this.hideWaitDimmer}
          onError={this.showError}
         />
         <div className='mybuttons'>
             <button className='ui large button myconfirm' onClick={this.handleExport}>
                OK
             </button>
         </div>
      </div>
    )
  }
};

export default Editor;
