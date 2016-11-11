import BaseTool from './BaseTool';
import {goodsConfig} from '../Config';

class GoodsTool extends BaseTool {

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
        transparentCorners: true,
        selectable: true,
        hasControls: true,
      })
      // overwrite the prototype object based

      goods.tag = goodsConfig.tag
      this.configDefaultObject(goods)
      goods.setControlsVisibility(goodsConfig.controls)
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
