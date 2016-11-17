import BaseTool from './BaseTool';
import {logoConfig} from '../Config';
import logo1 from './../navi/logo-2.png';
//import logo2 from './../navi/logo-2.png';

class BGTool extends BaseTool {
  constructor(props){
    super(props)
    this.state = {
      activeIndex: 0
    }
    this.logoRendered = false;
  }

  initializeLate() {
    const defaultImage = this.resourceImageById(0)
    if (defaultImage) {
      this.setBackground(defaultImage.src, 0, ()=>{
        if (this.props.initDoneFunc) {
          this.props.initDoneFunc()
        }
      })
    }
  }

  setLogo(src, tag, next=null) {

    if (this.logoRendered) {
      if (next) next()
    }
    else {

      const canvas = this.props.canvas
      const size = logoConfig.size
      const offset = logoConfig.offset

      const pos = {
        top: logoConfig.pos.top + offset.y,
        left: logoConfig.pos.left + offset.x
      }

     this.loadImageFrom(logo1, (image, func) => {
       this.props.canvas.add(image)
       image.set({
         width: size.width,
         height: size.height,
         left: pos.left,
         top: pos.top,
         transparentCorners: true,
         selectable: false,
         hasControls: false,
         hasBorders: false,
       })
       image.bringToFront()
       image.tag = tag


       if (func) func()
       if (next) next()
     })
    }
  }

  setBackground(src, id, next=null) {
    const canvas = this.props.canvas
    this.loadImageFrom(src, (image, func) => {
      image.setWidth(canvas.width)
      image.setHeight(canvas.height)
      //image.meetOrSlice = 'meet'
      this.props.canvas.setBackgroundImage(image)
      this.setLogo(logo1, 'LOGO1', () => {
        this.props.canvas.renderAll()
        if (func) func()
        if (next) next()
      })
    })

    this.setState({
      activeIndex: id,
    })
  }

  onItemClick(id) {
    return (env) => {
      const background = this.resourceImageById(id)
      if (background) {
        this.setBackground(background.src, id)
      }
    }
  }
}

export default BGTool;
