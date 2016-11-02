import BaseTool from './BaseTool';

class GoodsTool extends BaseTool {
  onItemClick(id) {
    return (env) => {
      console.log('Goods Item clicked..: ' + id)
    }
  }
}

export default GoodsTool;
