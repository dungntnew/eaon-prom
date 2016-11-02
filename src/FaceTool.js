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
      this.setFace(defaultFace.src)
    }
  }

  setFace(src) {
    const canvas = this.props.canvas
    let lastFace = this.findFirstElementInCanvas('face')

    this.loadImageFrom(src, (image, func) => {

      if (lastFace) {
        lastFace.setElement(image.getElement())
      } else {
        lastFace = image
        canvas.add(lastFace)
      }

      lastFace.setWidth(faceConfig.size.width)
      lastFace.setHeight(faceConfig.size.height)
      lastFace.name = 'face'

      canvas.renderAll()
      if (func) func()
    })
  }

  onItemClick(id) {
    return (env) => {
      const image = this.resourceImageById(id)
      if (image) {
        this.setFace(image.src)
      }
    }
  }
}

export default FaceTool;
