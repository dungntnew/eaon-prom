import BaseTool from './BaseTool';

class BGTool extends BaseTool {
  constructor(props){
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  initializeLate() {
    const defaultImage = this.resourceImageById(0)
    if (defaultImage) {
      this.setBackground(defaultImage.src, 0)
    }
  }

  setBackground(src, id) {
    const canvas = this.props.canvas
    this.loadImageFrom(src, (image, func) => {
      image.setWidth(canvas.width)
      image.setHeight(canvas.height)
      //image.meetOrSlice = 'meet'
      this.props.canvas.setBackgroundImage(image)
      this.props.canvas.renderAll()
      if (func) func()
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
