import React, {Component} from 'react';
import Assets from './Assets';
import {EditorConfig, TwitterConfig} from './Config';
import './Editor.css'

import ToolBox from './ToolBox'
import Loader from './Loader';
import ExportConfirm from './ExportConfirm';
import {fabric} from 'fabric';
import {setupFabricObjectControls} from './lib/FabricEx';

import twbg from './navi/twbg.png';
import errorImage from './navi/error.png';

import $ from 'jquery';


// import Raven from 'raven-js';
//
// // install sentry js
// try {
//   Raven.config('https://a7f4310bf02f42669dfc12ad2b7dac4b@sentry.io/115577').install();
// }
// catch(error) {
//   console.error("Raven Error: ", error);
// }


class Editor extends Component {

  constructor() {
    super()

    this.state = {
      loading: false,
      loadingMessge: '',
      confirming: false
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
    this.showLoading()
  }

  initCanvas() {
    setupFabricObjectControls(fabric, true);
    const browerMaxWidth = window.outerWidth || EditorConfig.EDITOR_MAX_W
    const canvasWidth = Math.min(this.refs.canvas.clientWidth, browerMaxWidth);

    this.canvas = window.canvas = new fabric.Canvas('canvas', {
      containerClass: 'canvas-container',
      backgroundColor: 'white'
    })
    // keep canvas size - (BUG after export image)
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasWidth;
    this.setSize()
  }

  setSize() {
    this.canvas.setDimensions({
      width: this.canvasWidth,
      height: this.canvasWidth
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


  generateTwitterImage(content, done) {
    const twitterCanvas = new fabric.Canvas('tw-canvas', {
      containerClass: 'tw-canvas-container',
      backgroundColor: 'white'
    });

    twitterCanvas.setDimensions({
      width: TwitterConfig.EXPORT_WIDTH,
      height: TwitterConfig.EXPORT_HEIGHT
    }, {backstoreOnly: true});

    twitterCanvas.setDimensions({
      width: TwitterConfig.EXPORT_WIDTH,
      height: TwitterConfig.EXPORT_HEIGHT
    }, {cssOnly: false});

    const multiplier = 1 / (fabric.devicePixelRatio || 1);
    const gen = ()=> {
      try {
        const data = twitterCanvas.toDataURL({
          format: 'png',
          multiplier: multiplier
        });
        console.log("generate done twitter image.[OK YEAH]")
        done(data);
      }
      catch(eeeee) {
        console.error(eeeee)
      }
    }

    fabric.Image.fromURL(twbg, (bg) => {
      bg.crossOrigin = "anonymous"
      bg.setWidth(TwitterConfig.EXPORT_WIDTH)
      bg.setHeight(TwitterConfig.EXPORT_HEIGHT)

      twitterCanvas.setBackgroundImage(bg);

      fabric.Image.fromURL(content, (c) => {
        c.crossOrigin = "anonymous"
        c.setWidth(TwitterConfig.CONTENT_WIDTH)
        c.setHeight(TwitterConfig.CONTENT_HEIGHT)
        c.setAngle(TwitterConfig.CONTENT_ROTATE)

        twitterCanvas.centerObject(c);
        let l = c.left + TwitterConfig.CONTENT_OFFSET_X;
        c.setLeft(l)

        twitterCanvas.add(c);


        twitterCanvas.renderAll();
        console.log("generating twitter image..");
        gen()
      }, (ee) => { console.error("load twitter img content error: ", ee)})
    }, (err) => {
      console.error("load twitter bg fail: ", err)
    });
  }

  handleExport() {
　　 this.setState({confirming: false})
    this.showLoading("Loading..");

    const multiplier = 1 / (fabric.devicePixelRatio || 1);
    let data = this.state.exportedData;
    if (!data) {
      try {
         data = this.canvas.toDataURL({
          format: 'png',
          multiplier: multiplier
        });
        this.setSize();
      }
      catch(e) {
          console.error(e);
          //Raven.captureException(e)
          return;
      }
    }


    const postFunc = (twData)=> {
      console.log("start post data to server...");

      $.ajax({
        type: 'POST',
        url: EditorConfig.UPLOAD_PATH,
        data: {'file': data, 'twfile': twData},
        success: (res, textStatus, jqXHRn) => {
           this.hideLoading();
           window.location.href = EditorConfig.SHARE_PATH
                                + '?p=' + res.fileid
                                + '&t=' + res.twfileid;
        },
        error: (err) => {

          this.hideLoading();
          this.setState({confirming: true})

          try {
            console.error(JSON.stringify(err));
          }
          catch(ee) {
            console.error(err);
          }
          //Raven.captureException(err);
        },
        dataType: "json"
      });
      // No PRO
    }

    this.generateTwitterImage(data, postFunc)
  }

  handleConfirm() {
    this.showConfirmPopup()
    window.scrollTo(0, 0)
  }

  exportData() {
    const multiplier = 1 / (fabric.devicePixelRatio || 1);
    const data = this.canvas.toDataURL({
      format: 'png',
      multiplier: multiplier
    });
    this.setSize();
    return data;
  }

  showConfirmPopup() {

    this.canvas.deactivateAll();
    this.canvas.renderAll();

    try {
      const data = this.exportData()

      this.setState({
        exportedData: data,
        confirming: true,
      })
    } catch(e) {
        //Raven.captureException(e)
        console.error(e);
        this.setState({
          exportedData: errorImage,
          confirming: true,
        })
    }
  }

  handleBack() {
    this.hideConfirmPopup()
  }

  hideConfirmPopup() {
    this.setState({confirming: false})
  }

  render() {
    const twCanvasStyle = {
      display: "none"
    }

    return (
      <div>

        <div className="ui tw-canvas-wrapper" style={twCanvasStyle}>
           <canvas className='tw-preview-canvas' id="tw-canvas" ref='tw-canvas'/>
        </div>

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
          initDoneFunc={() => this.hideLoading()}
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
