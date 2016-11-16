import React, {Component} from 'react';
import Assets from './Assets';
import {EditorConfig} from './Config';
import './Editor.css'

import ToolBox from './ToolBox'
import Loader from './Loader';
import ExportConfirm from './ExportConfirm';
import {fabric} from 'fabric';
import {setupFabricObjectControls} from './lib/FabricEx';

import $ from 'jquery';

class Editor extends Component {

  constructor() {
    super()

    this.state = {
      loading: false,
      loadingMessge: '',
      confirming: false,
    }

    this.showWaitDimmer = this.showWaitDimmer.bind(this)
    this.hideWaitDimmer = this.hideWaitDimmer.bind(this)
    this.showError = this.showError.bind(this)
    this.hideError = this.hideError.bind(this)

    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleExport = this.handleExport.bind(this)
  }

  componentDidMount() {
    this.initCanvas()
    this.forceUpdate()
  }

  initCanvas() {
    setupFabricObjectControls(fabric, true);
    const canvasWidth = this.refs.canvas.clientWidth;
    this.canvas = window.canvas = new fabric.Canvas('canvas', {
      containerClass: 'canvas-container',
      backgroundColor: 'white'
    })

    this.canvas.setDimensions({
      width: canvasWidth,
      height: canvasWidth
    }, {cssOnly: false})

    this.canvas.setDimensions({
      width: EditorConfig.EXPORT_WIDTH,
      height: EditorConfig.EXPORT_HEIGHT
    }, {backstoreOnly: true})
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

  showLoading(message) {

    this.setState({
      loading: true,
      loadingMessge: message || 'Loading'
    })
  }

  hideLoading() {
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
    const data = this.state.exportedData
    this.showLoading("Processing..");
    $.ajax({
      type: 'POST',
      url: EditorConfig.UPLOAD_PATH,
      data: {'file': data},
      success: (res, textStatus, jqXHRn) => {
         this.hideLoading();
         window.location.href = EditorConfig.SHARE_PATH + '?p=' + res.fileid;
      },
      error: (err) => {
        this.hideLoading();
        console.error(err);
      },
      dataType: "json"
    })

    // try {
    //   localStorage.setItem(EditorConfig.EXPORT_ITEM_KEY, data);
    //   window.location.pathname = EditorConfig.FINISH_PATH;
    // }
    // catch(e) {
    //   console.error('something wrong: ' + e);
    //   this.showError(e);
    // }
  }

  handleConfirm() {
    this.showConfirmPopup()
    window.scrollTo(0, 0)
  }

  showConfirmPopup() {
    this.canvas.deactivateAll();
    this.canvas.renderAll();
    
    const data = this.canvas.toDataURL({
      format: 'jpeg',
      quality: 1,
      multiplier: 1
    })

    this.setState({
      exportedData: data,
      confirming: true,
    })
  }

  handleBack() {
    this.hideConfirmPopup()
  }

  hideConfirmPopup() {
    this.setState({confirming: false})
  }

  render() {
    return (
      <div>
        <div className='ui canvas-wrapper'>
           <canvas className='editor-canvas' id="canvas" ref='canvas'/>
        </div>
        <Loader
          active={this.state.loading}
          message={this.state.loadingMessage}
        />

         <div className='ui hidden divider'></div>
         <ToolBox
          canvas={this.canvas}
          assets={Assets}
          onStartProcess={this.showWaitDimmer}
          onFinishProcess={this.hideWaitDimmer}
          onError={this.showError}
         />
         <div className='mybuttons'>
             <button className='ui large button myconfirm' onClick={this.handleConfirm}>
                OK
             </button>
         </div>

         <ExportConfirm
           active={this.state.confirming}
           exportedData={this.state.exportedData}
           onDecidedClick={this.handleExport}
           onCancelClick={this.handleBack}
          />
      </div>
    )
  }
};

export default Editor;
