import BaseTool from './BaseTool';
import {faceConfig} from './EditorToolConfig';

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
      this.setFace(defaultFace.src, 0)
    }
  }

  setFace(src, id) {
    const canvas = this.props.canvas
    const size = faceConfig.size
    const offset = faceConfig.offset
    const center = this.getCenterPos(size)
    const pos = {
      top: center.top + offset.y,
      left: center.left + offset.x
    }

    let lastFace = this.findFirstElementInCanvas(faceConfig.tag)

    this.loadImageFrom(src, (image, func) => {

      if (lastFace) {
        lastFace.setElement(image.getElement())
      } else {
        lastFace = image
        canvas.add(lastFace)
      }

      lastFace.set({
        width: size.width,
        height: size.height,
        left: pos.left,
        top: pos.top,
        transparentCorners: true,
        selectable: false,
        hasControls: false,
        hasBorders: false,
      })
      lastFace.moveTo(0)
      lastFace.tag = faceConfig.tag

      canvas.renderAll()
      if (func) func()
    })

    this.setState({
      activeIndex: id,
    })
  }

  onItemClick(id) {
    return (env) => {
      const image = this.resourceImageById(id)
      if (image) {
        this.setFace(image.src, id)
      }
    }
  }
}

export default FaceTool;
