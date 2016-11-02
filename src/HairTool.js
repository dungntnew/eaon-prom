import BaseTool from './BaseTool';

class HairTool extends BaseTool {
  onItemClick(id) {
    return (env) => {
      console.log('Hair Item clicked..: ' + id)
    }
  }
}

export default HairTool;
