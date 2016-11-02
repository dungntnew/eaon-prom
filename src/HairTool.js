import BaseTool from './BaseTool';
import {hairConfig} from './EditorToolConfig';

class HairTool extends BaseTool {
  constructor(props){
    super(props)
    this.state = {
      activeIndex: -1
    }
  }

  initializeLate() {
    const defaultHair = this.resourceImageById(0)
    if (defaultHair) {
      this.setHair(defaultHair.src)
    }
  }

  setHair(src) {
    const canvas = this.props.canvas
    const size = hairConfig.size
    const offset = hairConfig.offset
    const center = this.getCenterPos(size)
    const pos = {
      top: center.top + offset.y,
      left: center.left + offset.x
    }

    let lastHair = this.findFirstElementInCanvas('hair')

    this.loadImageFrom(src, (image, func) => {

      if (lastHair) {
        lastHair.setElement(image.getElement())
      } else {
        lastHair = image
        canvas.add(lastHair)
      }

      lastHair.set({
        width: size.width,
        height: size.height,
        left: pos.left,
        top: pos.top,
        transparentCorners: true,
        selectable: false,
        hasControls: false,
        hasBorders: false,
      })
      lastHair.moveTo(1)
      lastHair.name = 'hair'

      canvas.renderAll()
      if (func) func()
    })
  }

  onItemClick(id) {
    return (env) => {
      const image = this.resourceImageById(id)
      if (image) {
        this.setHair(image.src)
      }
    }
  }
}

export default HairTool;
