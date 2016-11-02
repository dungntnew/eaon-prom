import BaseTool from './BaseTool';
import {goodsConfig} from './EditorToolConfig';

class GoodsTool extends BaseTool {

  randPos(pos) {

  }

  addGoods(src) {
    const canvas = this.props.canvas
    const size = goodsConfig.size
    const pos = this.getRandPos(size)

    this.loadImageFrom(src, (goods, func) => {

      goods.set({
        width: size.width,
        height: size.height,
        left: pos.left,
        top: pos.top,
        transparentCorners: false,
        selectable: true,
        hasControls: true,
        hasBorders: true,
      })
      goods.tag = 'goods'
      canvas.setActiveObject(goods)
      canvas.add(goods)

      canvas.renderAll()
      if (func) func()
    })
  }

  onItemClick(id) {
    return (env) => {
      const image = this.resourceImageById(id)
      if (image) {
        this.addGoods(image.src)
      }
    }
  }
}

export default GoodsTool;
