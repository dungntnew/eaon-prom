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

import {fabric} from 'fabric';

class Editor extends Component {

  componentDidMount() {
    this.initCanvas()
  }

  initCanvas() {
    this.canvas = new fabric.Canvas('canvas')

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
      this.canvas.setWidth(width)
      this.canvas.setHeight(height)
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

  render() {
    const size = this.canvasSize()
    this.setViewSize(size.width, size.height)

    const style = {
      size: {
        height: size.height + 'px',
        width: size.width + 'px',
      }
    }

    return (
      <Segment padded>

        <div
          className='ui container'
          style={style.size}
        >
        <canvas
           id="canvas"
           ref='canvas'
           />
        </div>

        <EditorToolBox
          canvas={this.canvas}
          assets={Assets}
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
