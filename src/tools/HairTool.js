import BaseTool from './BaseTool';
import {hairConfig} from '../Config';

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
      this.setHair(defaultHair.src, 0, ()=>{
        if (this.props.initDoneFunc) {
          this.props.initDoneFunc()
        }
      })
    }
  }

  setHair(src, id, next=null) {
    const canvas = this.props.canvas
    const size = hairConfig.size
    const offset = hairConfig.offset
    const center = this.getCenterPos(size)
    const pos = {
      top: center.top + offset.y,
      left: center.left + offset.x
    }

    let lastHair = this.findFirstElementInCanvas(hairConfig.tag)

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
      lastHair.tag = hairConfig.tag

      canvas.renderAll()
      if (func) func()
      if (next) next()
    })

    this.setState({
      activeIndex: id,
    })
  }

  onItemClick(id) {
    return (env) => {
      const image = this.resourceImageById(id)
      if (image) {
        this.setHair(image.src, id)
      }
    }
  }
}

export default HairTool;
