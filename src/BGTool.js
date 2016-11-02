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
      this.setBackground(defaultImage.src)
    }
  }

  setBackground(src) {
    const canvas = this.props.canvas
    this.loadImageFrom(src, (image, func) => {
      image.setWidth(canvas.width)
      image.setHeight(canvas.height)
      //image.meetOrSlice = 'meet'
      this.props.canvas.setBackgroundImage(image)
      this.props.canvas.renderAll()
      if (func) func()
    })
  }

  onItemClick(id) {
    return (env) => {
      const background = this.resourceImageById(id)
      if (background) {
        this.setState({
          activeIndex: id,
        })
        this.setBackground(background.src)
      }
    }
  }
}

export default BGTool;
