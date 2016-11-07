import React, {Component} from 'react';

import {
        Divider,
} from 'semantic-ui-react';

import Assets from './Assets';
import EditorConfig from './EditorConfig';
import './Editor.css'

import EditorToolBox from './EditorToolBox'
import Loader from './Loader';
import ExportConfirm from './ExportConfirm';

import {fabric} from 'fabric';
import {setupFabricObjectControls} from './FabricEx';
// import './Blob';
// import './CanvasToBlob';
import filesaver from 'filesaver.js-npm';
import blobUtil from 'blob-util';

class Editor extends Component {

  constructor() {
    super()

    this.state = {
      loading: false,
      loadingMessge: '',
      confirming: false,
      exportedData: null,
    }
    this.showWaitDimmer = this.showWaitDimmer.bind(this)
    this.hideWaitDimmer = this.hideWaitDimmer.bind(this)
    this.showError = this.showError.bind(this)
    this.hideError = this.hideError.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
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

  handleConfirm() {
    this.showConfirmPopup()
    window.scrollTo(0, 0)
  }

  handleExport() {
    blobUtil.dataURLToBlob(this.state.exportedData)
    .then(blob => {
      filesaver.saveAs(blob, 'img.png')
      this.hideConfirmPopup()
    })
    .catch(err => {
      console.error(err)
      this.showError(err)
      this.hideConfirmPopup()
    })
  }

  handleCancel() {
    this.hideConfirmPopup()
  }

  showConfirmPopup() {
    const data = this.canvas.toDataURL({
      format: 'jpeg',
      quality: 1,
      multiplier: 0.5
    })
    this.setState({confirming: true, exportedData: data})
  }

  hideConfirmPopup() {
    this.setState({confirming: false})
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

         <button className='ui button primary fluid' onClick={this.handleConfirm}>
            Confirm
         </button>
         <ExportConfirm
           active={this.state.confirming}
           exportedData={this.state.exportedData}
           onDecidedClick={this.handleExport}
           onCancelClick={this.handleCancel}
          />
      </div>
    )
  }
};

export default Editor;
