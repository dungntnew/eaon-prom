import BaseTool from './BaseTool';
import {tweetConfig} from './EditorToolConfig';

class TweetTool  extends BaseTool {
  addTweet(src) {
    const canvas = this.props.canvas
    const size = tweetConfig.size
    const pos = this.getRandPos(size)

    this.loadImageFrom(src, (tweet, func) => {

      tweet.set({
        width: size.width,
        height: size.height,
        left: pos.left,
        top: pos.top,
        transparentCorners: true,
        selectable: true,
        hasControls: true,
      })
      // overwrite the prototype object based

      tweet.tag = tweetConfig.tag
      this.configDefaultObject(tweet)
      tweet.setControlsVisibility(tweetConfig.controls)
      canvas.add(tweet)

      canvas.renderAll()
      if (func) func()
    })
  }

  onItemClick(id) {
    return (env) => {
      const image = this.resourceImageById(id)
      if (image) {
        this.addTweet(image.src)
      }
    }
  }
}

export default TweetTool;
