import React, {Component} from 'react';

import Tabs from './Tabs';

import BGTool from './BGTool';
import FaceTool from './FaceTool';
import HairTool from './HairTool';
import GoodsTool from './GoodsTool';
import TweetTool from './TweetTool';

import faceTitleOn from './navi/navi_faces_on.png';
import faceTitleOff from './navi/navi_faces_off.png';
import hairTitleOn from './navi/navi_hairs_on.png';
import hairTitleOff from './navi/navi_hairs_off.png';
import bgTitleOn from './navi/navi_backgrounds_on.png';
import bgTitleOff from './navi/navi_backgrounds_off.png';
import goodsTitleOn from './navi/navi_goods_on.png';
import goodsTitleOff from './navi/navi_goods_off.png';
import tweetTitleOn from './navi/navi_tweets_on.png';
import tweetTitleOff from './navi/navi_tweets_off.png';



class EditorToolBox extends Component {

  constructor() {
    super()
    this.state = {
      activeTab: 0
    }
    this.changeTab = this.changeTab.bind(this)
  }

  changeTab(index) {
    return (evt) => {
      this.setState({
        activeTab: index
      })
    }
  }

  render() {
    const titles = [
      {on: faceTitleOn, off: faceTitleOff},
      {on:hairTitleOn, off: hairTitleOff},
      {on: bgTitleOn, off: bgTitleOff},
      {on: goodsTitleOn, off: goodsTitleOff},
      {on: tweetTitleOn, off: tweetTitleOff}
    ]

    const contents = [
      <FaceTool
        canvas={this.props.canvas}
        resource={this.props.assets.face}
        onStartProcess={this.props.onStartProcess}
        onFinishProcess={this.props.onFinishProcess}
        onError={this.props.onError}
       />,
      <HairTool
        canvas={this.props.canvas}
        resource={this.props.assets.hair}
        onStartProcess={this.props.onStartProcess}
        onFinishProcess={this.props.onFinishProcess}
        onError={this.props.onError}
      />,
      <BGTool
        canvas={this.props.canvas}
        resource={this.props.assets.background}
        onStartProcess={this.props.onStartProcess}
        onFinishProcess={this.props.onFinishProcess}
        onError={this.props.onError}
      />,
      <GoodsTool
       canvas={this.props.canvas}
       resource={this.props.assets.goods}
       onStartProcess={this.props.onStartProcess}
       onFinishProcess={this.props.onFinishProcess}
       onError={this.props.onError}
      />,
      <TweetTool
       canvas={this.props.canvas}
       resource={this.props.assets.tweet}
       onStartProcess={this.props.onStartProcess}
       onFinishProcess={this.props.onFinishProcess}
       onError={this.props.onError}
      />
    ]

    return (
      <Tabs
        titles={titles}
        contents={contents}
        activeTab={this.state.activeTab}
        onTabSelect={this.changeTab}
      />
    )
  }
}

export default EditorToolBox;
